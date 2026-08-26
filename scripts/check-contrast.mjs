/**
 * Verifies the palette against the contrast floors in docs/DESIGN.md.
 *
 *   node scripts/check-contrast.mjs
 *
 * Body text must clear 7:1 (WCAG AAA for normal text), UI and secondary text
 * 4.5:1 (AA). Exits non-zero if any pair fails, so it can gate a deploy.
 */

const PALETTE = {
  ink: "#0A0B0D",
  surface: "#121317",
  surface2: "#1A1B20",
  line: "#2A2C33",
  text: "#EDEDF0",
  muted: "#9B9DA6",
  accent: "#FC7816",
  accentDim: "#B75510",
};

/** Pairs that must hold, with their required ratio. */
const CHECKS = [
  ["text", "ink", 7, "body text on page ground"],
  ["text", "surface", 7, "body text on raised panel"],
  ["muted", "ink", 4.5, "secondary text on page ground"],
  ["muted", "surface", 4.5, "secondary text on raised panel"],
  ["accent", "ink", 4.5, "accent as UI text/link on page ground"],
  ["accent", "surface", 4.5, "accent as UI text on raised panel"],
  ["ink", "accent", 4.5, "ink text on a solid accent button"],
  ["accentDim", "ink", 3, "accent-dim rules and hover states (non-text)"],
];

const srgb = (hex) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};

const luminance = (hex) => {
  const [r, g, b] = srgb(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

let failed = 0;
console.log("");
for (const [fg, bg, min, label] of CHECKS) {
  const ratio = contrast(PALETTE[fg], PALETTE[bg]);
  const ok = ratio >= min;
  if (!ok) failed++;
  console.log(
    `  ${ok ? "PASS" : "FAIL"}  ${ratio.toFixed(2)}:1  (needs ${min}:1)  ` +
      `${fg} on ${bg}  ${PALETTE[fg]}/${PALETTE[bg]}  ${label}`,
  );
}
console.log("");
if (failed) {
  console.error(`${failed} contrast check${failed === 1 ? "" : "s"} failed.`);
  process.exit(1);
}
console.log("All contrast checks passed.");
