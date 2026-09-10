/**
 * Generates the wireframe that backs a withheld project.
 *
 * A project under NDA used to render as an empty bordered rectangle, which next
 * to real captures reads as a broken image rather than as a decision. A mesh
 * with no surface on it says the true thing instead: there is geometry here,
 * and you are not being shown it.
 *
 * It is deliberately the same heightfield and the same projection as the GitHub
 * profile banner, so the two surfaces belong to one visual family.
 *
 * The wireframe is masked to fade out toward the left, because that is where the
 * label and the reason sit and text has to stay the brightest thing in the box.
 * How far right that fade has to reach is not a matter of taste:
 * scripts/check-mesh-contrast.mjs measures it and fails the build if a mesh line
 * gets bright enough under a glyph to drop the text under its WCAG floor.
 *
 * Output: public/mesh-withheld.svg and public/mesh-withheld-wide.svg
 * Run: node scripts/make-mesh.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Duplicated from the @theme block in src/app/globals.css, which this file cannot import. */
const ACCENT = "#fc7816";

/**
 * Two frames, because one does not stretch to cover both.
 *
 * A card keeps a 16:10 box. The panel on a project page is close to 6:1. Using
 * the card mesh there and letting background-size cover it crops so hard that
 * only a middle slice survives, and the surface stops reading as a surface and
 * turns into graph paper. Each variant gets a grid whose cells stay roughly
 * square at its own aspect, and its own fade.
 *
 * `fade` is where the wireframe goes from invisible to full, as a fraction of
 * width. The wide panel carries a full measure of body text, so its mesh has to
 * stay out of the way for much longer.
 */
const VARIANTS = [
  { file: "mesh-withheld.svg", w: 1000, h: 625, nu: 16, nv: 9, fade: [0.46, 0.96], opacity: 0.3 },
  { file: "mesh-withheld-wide.svg", w: 1400, h: 340, nu: 26, nv: 6, fade: [0.44, 0.95], opacity: 0.24 },
];

const AMP = 0.95;

const height = (u, v) =>
  0.6 * Math.sin(u * 0.4 + v * 0.34) +
  0.32 * Math.cos(v * 0.68 - u * 0.21) +
  0.16 * Math.sin(u * 0.17 - v * 0.48);

const project = (x, y, z) => [x + y * 0.55, y * 0.64 - z * AMP];

function build({ file, w: W, h: H, nu: NU, nv: NV, fade, opacity }) {
  const grid = [];
  for (let u = 0; u <= NU; u++) {
    grid[u] = [];
    for (let v = 0; v <= NV; v++) grid[u][v] = project(u, v, height(u, v));
  }

  const flat = grid.flat();
  const bx0 = Math.min(...flat.map((p) => p[0]));
  const bx1 = Math.max(...flat.map((p) => p[0]));
  const by0 = Math.min(...flat.map((p) => p[1]));
  const by1 = Math.max(...flat.map((p) => p[1]));

  // Fit with a margin, aspect preserved so the surface does not shear.
  const PAD = 32;
  const scale = Math.min((W - PAD * 2) / (bx1 - bx0), (H - PAD * 2) / (by1 - by0));
  const ox = PAD + (W - PAD * 2 - (bx1 - bx0) * scale) / 2 - bx0 * scale;
  const oy = PAD + (H - PAD * 2 - (by1 - by0) * scale) / 2 - by0 * scale;

  const screen = (u, v) => [grid[u][v][0] * scale + ox, grid[u][v][1] * scale + oy];

  // Triangulated the same way the banner is, so the topology matches.
  const edges = new Set();
  for (let u = 0; u < NU; u++) {
    for (let v = 0; v < NV; v++) {
      const q = [
        [u, v],
        [u + 1, v],
        [u + 1, v + 1],
        [u, v + 1],
      ];
      for (const [a, b, c] of [
        [q[0], q[1], q[2]],
        [q[0], q[2], q[3]],
      ]) {
        for (const [p1, p2] of [
          [a, b],
          [b, c],
          [c, a],
        ]) {
          const [f, s] =
            p1[0] < p2[0] || (p1[0] === p2[0] && p1[1] <= p2[1]) ? [p1, p2] : [p2, p1];
          edges.add(`${f[0]},${f[1]},${s[0]},${s[1]}`);
        }
      }
    }
  }

  const d = [...edges]
    .map((k) => k.split(",").map(Number))
    .map(([u1, v1, u2, v2]) => {
      const [x1, y1] = screen(u1, v1);
      const [x2, y2] = screen(u2, v2);
      return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    })
    .join("");

  const dots = [];
  for (let u = 0; u <= NU; u++) {
    for (let v = 0; v <= NV; v++) {
      const [x, y] = screen(u, v);
      dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2"/>`);
    }
  }

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none">`,
    `<defs>`,
    `<linearGradient id="f" gradientUnits="userSpaceOnUse" x1="${(W * fade[0]).toFixed(0)}" y1="0" x2="${(W * fade[1]).toFixed(0)}" y2="0">`,
    `<stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>`,
    `<mask id="m"><rect width="${W}" height="${H}" fill="url(#f)"/></mask>`,
    `</defs>`,
    `<g mask="url(#m)">`,
    `<path d="${d}" stroke="${ACCENT}" stroke-width="1.6" stroke-opacity="${opacity}" stroke-linecap="round"/>`,
    `<g fill="${ACCENT}" fill-opacity="${(opacity * 1.4).toFixed(2)}">${dots.join("")}</g>`,
    `</g>`,
    `</svg>`,
  ].join("");

  const out = join(ROOT, "public", file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg, "utf8");

  const kb = (Buffer.byteLength(svg, "utf8") / 1024).toFixed(1);
  console.log(
    `public/${file}  ${W}x${H}  ${kb} KB  ${edges.size} edges, ${dots.length} vertices, grid ${NU}x${NV}`,
  );
}

for (const v of VARIANTS) build(v);
