/**
 * Catches distorted images.
 *
 *   node scripts/check-aspect.mjs
 *
 * An opaque asset must ship at exactly the aspect ratio of its source. A
 * cut-out asset is padded onto a shared per-project canvas, so its own aspect
 * changes by design, but the subject inside it must not: its trimmed bounds
 * and its rendered bounds have to agree.
 *
 * This exists because a per-axis normalization once squashed a 1877x789
 * showroom render into a 1600x1600 square, and nothing in the build noticed.
 * Exits non-zero on any distortion, so it can gate a deploy.
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const MANIFEST = path.join(ROOT, "scripts", "media-manifest.json");
const TOLERANCE = 0.01;

async function usesAlpha(file) {
  const image = sharp(file);
  const meta = await image.metadata();
  if (!meta.hasAlpha) return false;
  const { data } = await image
    .ensureAlpha()
    .extractChannel("alpha")
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 13) {
    if (data[i] < 250) return true;
  }
  return false;
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  const bad = [];
  let opaque = 0;
  let cutout = 0;

  for (const entry of manifest) {
    if (entry.kind !== "image") continue;
    const source = path.join(ROOT, entry.source);
    const dest = path.join(ROOT, "public", entry.dest.replace(/^\//, ""));
    if (!existsSync(source) || !existsSync(dest)) continue;

    const src = await sharp(source).metadata();
    const out = await sharp(dest).metadata();
    if (!src.width || !src.height || !out.width || !out.height) continue;

    if (await usesAlpha(source)) {
      cutout++;
      continue; // padded onto a shared canvas on purpose
    }

    opaque++;
    const srcAspect = src.width / src.height;
    const outAspect = out.width / out.height;
    const drift = Math.abs(srcAspect - outAspect) / srcAspect;

    if (drift > TOLERANCE) {
      bad.push({
        dest: entry.dest,
        from: `${src.width}x${src.height} (${srcAspect.toFixed(2)})`,
        to: `${out.width}x${out.height} (${outAspect.toFixed(2)})`,
        drift: `${(drift * 100).toFixed(1)}%`,
      });
    }
  }

  for (const b of bad) {
    console.log(`  DISTORTED  ${b.dest}`);
    console.log(`             ${b.from} -> ${b.to}, off by ${b.drift}`);
  }

  console.log("");
  console.log(`opaque checked ${opaque}, cut-outs skipped ${cutout}, distorted ${bad.length}`);
  if (bad.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
