/**
 * Fails if text on a withheld panel loses contrast against the mesh behind it.
 *
 * check-contrast.mjs verifies palette pairs, a text color against a flat ground.
 * It cannot see a background image, so when the wireframe was added behind the
 * withheld panels it passed while the card was actually shipping muted text at
 * 3.19:1 against a mesh line, well under the 4.5:1 floor. This gate exists
 * because of that.
 *
 * It composites each mesh over the panel ground at the size the browser paints
 * it, takes the BRIGHTEST pixel anywhere text can land, and scores the weakest
 * text color in the panel against that worst case. Brightest rather than
 * average, because a single bright wireframe line crossing a letter is exactly
 * the failure being looked for.
 *
 * Run: node scripts/check-mesh-contrast.mjs
 */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** From the @theme block in src/app/globals.css. */
const SURFACE = { r: 0x12, g: 0x13, b: 0x17 };
const COLORS = {
  muted: "#9b9da6",
  text: "#ededf0",
  accent: "#fc7816",
};

/**
 * Panel sizes and text regions measured in the browser at a desktop width.
 *
 * `box` is [x0, y0, x1, y1] in panel pixels, covering everywhere a glyph can
 * land: for a card that is the whole left column, since the label sits at the
 * top of it and the reason at the bottom.
 */
const PANELS = [
  {
    label: "card",
    file: "mesh-withheld.svg",
    w: 576,
    h: 360,
    box: [24, 24, 300, 336],
    colors: ["muted", "text", "accent"],
  },
  {
    label: "project page",
    file: "mesh-withheld-wide.svg",
    w: 1360,
    h: 220,
    box: [40, 30, 800, 190],
    colors: ["muted", "text", "accent"],
  },
];

const FLOOR = 4.5; // WCAG 2.2 AA for normal text. text-small here is 14px.

const channel = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminance = ({ r, g, b }) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const parse = (h) => ({
  r: parseInt(h.slice(1, 3), 16),
  g: parseInt(h.slice(3, 5), 16),
  b: parseInt(h.slice(5, 7), 16),
});
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const toHex = ({ r, g, b }) =>
  `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;

let failed = 0;
console.log("");

for (const panel of PANELS) {
  const mesh = await sharp(join(ROOT, "public", panel.file), { density: 300 })
    .resize(panel.w, panel.h, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  const { data, info } = await sharp({
    create: { width: panel.w, height: panel.h, channels: 4, background: SURFACE },
  })
    .composite([{ input: mesh }])
    .raw()
    .toBuffer({ resolveWithObject: true });

  const [x0, y0, x1, y1] = panel.box;
  let brightest = { r: 0, g: 0, b: 0 };
  let peak = -1;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * info.width + x) * info.channels;
      const px = { r: data[i], g: data[i + 1], b: data[i + 2] };
      const l = luminance(px);
      if (l > peak) {
        peak = l;
        brightest = px;
      }
    }
  }

  console.log(`  ${panel.label}  ${panel.file}  brightest under text ${toHex(brightest)}`);
  for (const name of panel.colors) {
    const ratio = contrast(parse(COLORS[name]), brightest);
    const ok = ratio >= FLOOR;
    if (!ok) failed++;
    console.log(
      `  ${ok ? "PASS" : "FAIL"}  ${ratio.toFixed(2)}:1  (needs ${FLOOR}:1)  ${name} ${COLORS[name]}`,
    );
  }
  console.log("");
}

if (failed > 0) {
  console.error(`${failed} contrast check${failed === 1 ? "" : "s"} failed over the mesh.`);
  console.error("Push the fade further right or lower the opacity in scripts/make-mesh.mjs.");
  process.exit(1);
}

console.log("All mesh contrast checks passed.");
