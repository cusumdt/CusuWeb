/**
 * Converts the recovered legacy assets into web-ready media.
 *
 *   node scripts/optimize-media.mjs            # convert everything not already done
 *   node scripts/optimize-media.mjs --force    # re-convert, overwriting
 *   node scripts/optimize-media.mjs --project ohbb-raid
 *
 * Reads scripts/media-manifest.json (source -> destination map, generated once
 * from the recovered site) and writes WebP masters into public/work/<project>/.
 * next/image serves AVIF to browsers that accept it, generated from those.
 * Source files in _legacy-scrape/ are never modified.
 *
 * Images with an alpha channel are cropped to their subject, then padded back
 * out to one shared canvas per project. The isolated prop renders carry wide
 * empty margins, which left each subject filling a fraction of its tile; the
 * shared canvas keeps the grid even and preserves relative scale between
 * props.
 *
 * Videos are copied through unconverted. They are already H.264 in an MP4
 * container, ffmpeg is not a dependency of this project, and the clips are
 * small enough that a WebM sibling would save bytes nobody is short of.
 */
import { readFile, writeFile, mkdir, stat, copyFile } from "node:fs/promises";
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
/**
 * WebP is the master that ships. next/image downsamples and re-encodes from it
 * to AVIF per device, so quality is set high here: this file is the input to
 * that second encode, not usually the thing a reader downloads.
 *
 * It deliberately does not emit AVIF. next/image cannot resize an AVIF source,
 * it streams the original back at every width, so an AVIF master silently
 * defeats responsive images.
 */
const WEBP = { quality: 90, effort: 6 };

const fmt = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;

/** Alpha below this counts as empty when measuring the subject's bounds. */
const ALPHA_THRESHOLD = 8;
/** Breathing room around the trimmed subject, as a share of its longest edge. */
const TRIM_PADDING = 0.04;

/**
 * Bounding box of the non-transparent pixels.
 *
 * The isolated prop renders were exported with generous empty margins, which
 * left the subject occupying a fraction of its tile in the gallery. Returns
 * null for an opaque image, which passes through untouched. Every image that
 * does have alpha is trimmed, even one already tight: the project canvas pads
 * it back, and skipping it would leave one odd-sized tile in an even grid.
 */
async function alphaTrimBox(source) {
  const image = sharp(source);
  const meta = await image.metadata();
  if (!meta.hasAlpha || !meta.width || !meta.height) return null;

  const { data, info } = await image
    .ensureAlpha()
    .extractChannel("alpha")
    .raw()
    .toBuffer({ resolveWithObject: true });

  let top = info.height;
  let left = info.width;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < info.height; y++) {
    const row = y * info.width;
    for (let x = 0; x < info.width; x++) {
      if (data[row + x] > ALPHA_THRESHOLD) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }

  if (right < 0 || bottom < 0) return null; // fully transparent

  const pad = Math.round(Math.max(right - left, bottom - top) * TRIM_PADDING);
  const box = {
    left: Math.max(left - pad, 0),
    top: Math.max(top - pad, 0),
  };
  box.width = Math.min(right + pad, info.width - 1) - box.left + 1;
  box.height = Math.min(bottom + pad, info.height - 1) - box.top + 1;

  const gain = 1 - (box.width * box.height) / (info.width * info.height);
  return { ...box, gain };
}

/** Must be produced from the same crop that ships, or it will not line up. */
async function blurPlaceholder(input, trim) {
  let img = sharp(input);
  if (trim) {
    img = img.extract({ left: trim.left, top: trim.top, width: trim.width, height: trim.height });
  }
  const buf = await img.resize(12, 12, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
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

/**
 * One canvas per project, sized to the largest trimmed subject in it.
 *
 * Trimming each image to its own bounds made every tile a different shape and
 * left small subjects upscaled to fill their slot. Padding them all back out
 * to a shared canvas, with transparent padding, keeps the grid even and keeps
 * the props at their true relative sizes: a small tower still reads smaller
 * than a big one, which is what a turntable sheet is supposed to show.
 */
async function projectCanvases(entries) {
  const boxes = new Map();
  const norms = new Map();
  const perProject = new Map();

  for (const entry of entries) {
    if (entry.kind !== "image") continue;
    const source = path.join(ROOT, entry.source);
    if (!existsSync(source)) continue;

    const meta = await sharp(source).metadata();
    const trim = await alphaTrimBox(source);
    boxes.set(entry.dest, trim);
    if (!trim || !meta.width || !meta.height) continue;

    // Normalized against its own source, because one project can mix a 3840
    // render with a 1920 one. Comparing raw pixel boxes across those makes the
    // shared canvas meaningless and blows small sources up to fit it.
    const norm = { w: trim.width / meta.width, h: trim.height / meta.height };
    norms.set(entry.dest, norm);

    const cur = perProject.get(entry.project) ?? { w: 0, h: 0, minSourceEdge: Infinity };
    perProject.set(entry.project, {
      w: Math.max(cur.w, norm.w),
      h: Math.max(cur.h, norm.h),
      minSourceEdge: Math.min(cur.minSourceEdge, Math.max(meta.width, meta.height)),
    });
  }

  // Turn each normalized canvas into real pixels, capped so no subject in the
  // project is ever enlarged past the resolution it actually has.
  const canvases = new Map();
  for (const [project, c] of perProject) {
    const scale = Math.min(MAX_EDGE.body / Math.max(c.w, c.h), c.minSourceEdge);
    canvases.set(project, {
      scale,
      width: Math.round(c.w * scale),
      height: Math.round(c.h * scale),
    });
  }

  return { boxes, norms, canvases };
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  const entries = projectFilter ? manifest.filter((m) => m.project === projectFilter) : manifest;

  const { boxes, norms, canvases } = await projectCanvases(entries);

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
      // No ffmpeg in this project, so no transcode. The recovered clips are
      // already H.264 in an MP4 container, which every current browser plays,
      // and they are small enough that a WebM sibling would save bytes nobody
      // is short of. Copy them through so the pipeline stays the single path
      // from source to public/.
      await mkdir(path.dirname(dest), { recursive: true });
      if (FORCE || !existsSync(dest)) {
        await copyFile(source, dest);
        const s = await stat(dest);
        console.log(`  ${entry.dest}  copied, ${fmt(s.size)}`);
        converted++;
      } else {
        skipped++;
      }
      videos.push(entry);
      continue;
    }

    await mkdir(path.dirname(dest), { recursive: true });

    const isHero = !seenProject.has(entry.project);
    seenProject.add(entry.project);
    const trim = boxes.get(entry.dest);
    const canvas = trim ? canvases.get(entry.project) : null;

    // A manifest entry can cap itself, for assets whose display size is known
    // and much smaller than a full-bleed hero. Padded images all take the body
    // edge, hero included: they share one canvas, so they have to share one
    // resize or the cover lands on a different size than its own gallery.
    const maxEdge =
      entry.maxEdge ?? (canvas ? MAX_EDGE.body : isHero ? MAX_EDGE.hero : MAX_EDGE.body);

    if (!FORCE && existsSync(dest)) {
      // Already converted, but backfill the placeholder if it went missing.
      if (!blur[entry.dest]) {
        blur[entry.dest] = await blurPlaceholder(source, boxes.get(entry.dest));
      }
      skipped++;
      continue;
    }

    if (trim && canvas) {
      // Two passes on purpose. sharp always runs extract, then resize, then
      // extend, whatever order you call them in, so padding in one pass would
      // add source-sized margins to an already-resized image.
      const norm = norms.get(entry.dest);
      const subject = await sharp(source)
        .rotate()
        .extract({ left: trim.left, top: trim.top, width: trim.width, height: trim.height })
        .resize({
          width: Math.max(1, Math.round(norm.w * canvas.scale)),
          height: Math.max(1, Math.round(norm.h * canvas.scale)),
          fit: "fill",
        })
        .toBuffer();

      const meta = await sharp(subject).metadata();
      const extraX = Math.max(0, canvas.width - (meta.width ?? 0));
      const extraY = Math.max(0, canvas.height - (meta.height ?? 0));

      await sharp(subject)
        .extend({
          left: Math.floor(extraX / 2),
          right: Math.ceil(extraX / 2),
          top: Math.floor(extraY / 2),
          bottom: Math.ceil(extraY / 2),
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .webp(WEBP)
        .toFile(dest);
    } else {
      await sharp(source)
        .rotate()
        .resize({
          width: maxEdge,
          height: maxEdge,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp(WEBP)
        .toFile(dest);
    }

    const [sIn, sOut] = await Promise.all([stat(source), stat(dest)]);
    srcBytes += sIn.size;
    outBytes += sOut.size;
    converted++;

    blur[entry.dest] = await blurPlaceholder(source, trim);

    const meta = await sharp(dest).metadata();
    const trimNote = trim ? `  trimmed ${(trim.gain * 100).toFixed(0)}%` : "";
    console.log(
      `  ${entry.dest}  ${meta.width}x${meta.height}  ` +
        `${fmt(sIn.size)} -> ${fmt(sOut.size)}${trimNote}`,
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
    console.log(
      `${videos.length} video${videos.length === 1 ? "" : "s"} copied as-is, no transcode.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
