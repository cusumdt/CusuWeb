/**
 * Converts the recovered legacy assets into web-ready media.
 *
 *   node scripts/optimize-media.mjs            # convert everything not already done
 *   node scripts/optimize-media.mjs --force    # re-convert, overwriting
 *   node scripts/optimize-media.mjs --project ohbb-raid
 *
 * Reads scripts/media-manifest.json (source -> destination map, generated once from
 * the recovered site) and writes AVIF + WebP into public/work/<project>/.
 * Source files in _legacy-scrape/ are never modified.
 *
 * Video entries are reported but not transcoded here - ffmpeg is not a dependency.
 * See TASKS.md for the video pass.
 */
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const MANIFEST = path.join(ROOT, "scripts", "media-manifest.json");

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const projectFilter = args.includes("--project")
  ? args[args.indexOf("--project") + 1]
  : null;

/** Longest edge per role. First asset of a project is its cover/hero. */
const MAX_EDGE = { hero: 2400, body: 1600 };
const AVIF = { quality: 62, effort: 6, chromaSubsampling: "4:4:4" };
const WEBP = { quality: 80, effort: 5 };

const fmt = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;

async function blurPlaceholder(input) {
  const buf = await sharp(input).resize(12, 12, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

const BLUR_PATH = path.join(ROOT, "src", "content", "blur-placeholders.json");

async function readBlurMap() {
  try {
    return JSON.parse(await readFile(BLUR_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  const entries = projectFilter ? manifest.filter((m) => m.project === projectFilter) : manifest;

  let srcBytes = 0;
  let outBytes = 0;
  let converted = 0;
  let skipped = 0;
  // Merged, never replaced — a --project run must not drop other projects' placeholders.
  const blur = await readBlurMap();
  const videos = [];

  const seenProject = new Set();

  for (const entry of entries) {
    const source = path.join(ROOT, entry.source);
    const dest = path.join(ROOT, "public", entry.dest.replace(/^\//, ""));

    if (!existsSync(source)) {
      console.warn(`  MISSING SOURCE  ${entry.source}`);
      continue;
    }

    if (entry.kind === "video") {
      videos.push(entry);
      continue;
    }

    await mkdir(path.dirname(dest), { recursive: true });

    const isHero = !seenProject.has(entry.project);
    seenProject.add(entry.project);
    const maxEdge = isHero ? MAX_EDGE.hero : MAX_EDGE.body;

    const webpDest = dest.replace(/\.avif$/, ".webp");
    if (!FORCE && existsSync(dest) && existsSync(webpDest)) {
      // Already converted — but backfill the placeholder if it went missing.
      if (!blur[entry.dest]) blur[entry.dest] = await blurPlaceholder(source);
      skipped++;
      continue;
    }

    const pipeline = sharp(source).rotate().resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    });

    await pipeline.clone().avif(AVIF).toFile(dest);
    await pipeline.clone().webp(WEBP).toFile(webpDest);

    const [sIn, sAvif, sWebp] = await Promise.all([stat(source), stat(dest), stat(webpDest)]);
    srcBytes += sIn.size;
    outBytes += sAvif.size;
    converted++;

    blur[entry.dest] = await blurPlaceholder(source);

    const meta = await sharp(dest).metadata();
    console.log(
      `  ${entry.dest}  ${meta.width}x${meta.height}  ` +
        `${fmt(sIn.size)} -> ${fmt(sAvif.size)} avif / ${fmt(sWebp.size)} webp`,
    );
  }

  await writeFile(
    path.join(ROOT, "src", "content", "blur-placeholders.json"),
    JSON.stringify(blur, null, 1),
    "utf8",
  );

  console.log("");
  console.log(`converted ${converted}, skipped ${skipped}`);
  if (converted) {
    console.log(
      `source ${fmt(srcBytes)} -> avif ${fmt(outBytes)} ` +
        `(${(100 - (outBytes / srcBytes) * 100).toFixed(1)}% smaller)`,
    );
  }
  if (videos.length) {
    console.log(`\n${videos.length} video entr${videos.length === 1 ? "y" : "ies"} not transcoded:`);
    for (const v of videos) console.log(`  ${v.source} -> ${v.dest}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
