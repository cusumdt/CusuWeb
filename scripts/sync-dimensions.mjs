/**
 * Makes the width, height and transparency flag in src/content/projects.ts
 * match the files that actually ship.
 *
 *   node scripts/sync-dimensions.mjs           # report drift
 *   node scripts/sync-dimensions.mjs --write   # fix it
 *
 * The dimensions reserve the aspect ratio before an image decodes, so a stale
 * pair is a layout shift. Anything that changes output dimensions, the alpha
 * trim and per-project canvas in optimize-media.mjs above all, has to be
 * followed by this.
 *
 * It also marks which assets carry real transparency. A transparent asset has
 * to sit on the page ground with no panel behind it, and be contained rather
 * than cropped. The components cannot know that without being told.
 *
 * Videos are skipped: their dimensions come from the container, not from a
 * file sharp can read.
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECTS = path.join(ROOT, "src", "content", "projects.ts");
const WRITE = process.argv.includes("--write");

/**
 * One media object: its src, then width, height and an optional transparency
 * flag. Line endings are CRLF on this checkout, so every break tolerates \r.
 */
const ENTRY =
  /src: "(\/work\/[^"]+)",\r?\n\s*alt:[\s\S]*?\r?\n\s*width: (\d+),\r?\n\s*height: (\d+),(\r?\n\s*transparent: true,)?/g;

/** hasAlpha only says a channel exists. Ask whether any pixel actually uses it. */
async function hasRealTransparency(file) {
  const image = sharp(file);
  const meta = await image.metadata();
  if (!meta.hasAlpha) return false;

  const { data } = await image
    .ensureAlpha()
    .extractChannel("alpha")
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 97) {
    if (data[i] < 250) return true;
  }
  return false;
}

async function main() {
  const original = await readFile(PROJECTS, "utf8");
  let updated = original;
  const drift = [];
  let checked = 0;
  let missing = 0;

  for (const match of original.matchAll(ENTRY)) {
    const [block, src, declaredW, declaredH, declaredTransparent] = match;
    if (src.endsWith(".mp4")) continue;

    const file = path.join(ROOT, "public", src.replace(/^\//, ""));
    if (!existsSync(file)) {
      console.warn(`  MISSING  ${src}`);
      missing++;
      continue;
    }

    const { width, height } = await sharp(file).metadata();
    if (!width || !height) continue;
    checked++;

    const transparent = await hasRealTransparency(file);
    const wasTransparent = Boolean(declaredTransparent);

    const sizeDrift = Number(declaredW) !== width || Number(declaredH) !== height;
    const alphaDrift = wasTransparent !== transparent;
    if (!sizeDrift && !alphaDrift) continue;

    drift.push({
      src,
      from: `${declaredW}x${declaredH}${wasTransparent ? " +a" : ""}`,
      to: `${width}x${height}${transparent ? " +a" : ""}`,
    });

    const indent = block.match(/\r?\n(\s*)width:/)[1];
    const eol = block.includes("\r\n") ? "\r\n" : "\n";
    const rebuilt =
      block
        .replace(/(\r?\n\s*)width: \d+,/, `$1width: ${width},`)
        .replace(/(\r?\n\s*)height: \d+,/, `$1height: ${height},`)
        .replace(/\r?\n\s*transparent: true,/, "") +
      (transparent ? `${eol}${indent}transparent: true,` : "");

    updated = updated.replace(block, rebuilt);
  }

  for (const d of drift) {
    console.log(`  ${d.from.padStart(14)} -> ${d.to.padEnd(14)} ${d.src}`);
  }

  console.log("");
  console.log(`checked ${checked}, drifted ${drift.length}, missing ${missing}`);

  if (!drift.length) return;

  if (WRITE) {
    await writeFile(PROJECTS, updated, "utf8");
    console.log("projects.ts updated.");
  } else {
    console.log("Run with --write to apply.");
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
