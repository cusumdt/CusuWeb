/**
 * Makes the width and height in src/content/projects.ts match the files that
 * actually ship.
 *
 *   node scripts/sync-dimensions.mjs           # report drift
 *   node scripts/sync-dimensions.mjs --write   # fix it
 *
 * Those numbers reserve the aspect ratio before an image decodes, so a stale
 * pair is a layout shift. Anything that changes output dimensions, the alpha
 * trim in optimize-media.mjs above all, has to be followed by this.
 *
 * Videos are skipped: their dimensions come from the container, not a file
 * sharp can read.
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECTS = path.join(ROOT, "src", "content", "projects.ts");
const WRITE = process.argv.includes("--write");

/**
 * Matches one media object's src, then its width and height in that order.
 * Line endings are CRLF on this checkout, so every break has to tolerate \r.
 */
const ENTRY =
  /src: "(\/work\/[^"]+)",\r?\n\s*alt:[\s\S]*?\r?\n\s*width: (\d+),\r?\n\s*height: (\d+),/g;

async function main() {
  const original = await readFile(PROJECTS, "utf8");
  let updated = original;
  const drift = [];
  let checked = 0;
  let missing = 0;

  for (const match of original.matchAll(ENTRY)) {
    const [block, src, declaredW, declaredH] = match;
    if (src.endsWith(".mp4")) continue;

    const file = path.join(ROOT, "public", src.replace(/^\//, ""));
    if (!existsSync(file)) {
      console.warn(`  MISSING  ${src}`);
      missing++;
      continue;
    }

    const { width, height } = await sharp(file).metadata();
    checked++;
    if (!width || !height) continue;

    if (Number(declaredW) !== width || Number(declaredH) !== height) {
      drift.push({ src, from: `${declaredW}x${declaredH}`, to: `${width}x${height}` });
      const fixed = block
        .replace(`width: ${declaredW},`, `width: ${width},`)
        .replace(`height: ${declaredH},`, `height: ${height},`);
      updated = updated.replace(block, fixed);
    }
  }

  for (const d of drift) {
    console.log(`  ${d.from.padStart(11)} -> ${d.to.padEnd(11)} ${d.src}`);
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
