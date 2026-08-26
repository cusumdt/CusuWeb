/**
 * First-load JavaScript per route, as actually transferred.
 *
 *   npx next build && npx next start -p 3100
 *   node scripts/bundle-report.mjs [baseUrl]
 *
 * Next 16 with Turbopack no longer prints a size column and no longer writes
 * app-build-manifest.json, so this measures the real thing: it fetches each
 * route from a running production server, reads the script tags the document
 * actually references, and sums their gzipped transfer size.
 *
 * Budget is 250 KB gzipped per route, from docs/ARCHITECTURE.md. Exits non-zero
 * if any route breaks it, so it can gate a deploy.
 */
const BASE = process.argv[2] ?? "http://localhost:3100";
const BUDGET_KB = 250;

const ROUTES = [
  "/",
  "/work",
  "/about",
  "/tools",
  "/contact",
  "/work/mercedes-actros-vr",
  "/work/cusutools",
  "/work/ohbb-raid",
  "/work/peakmines",
];

const sizeCache = new Map();

async function transferSize(url) {
  if (sizeCache.has(url)) return sizeCache.get(url);
  const res = await fetch(url, { headers: { "Accept-Encoding": "gzip, br" } });
  if (!res.ok) return 0;
  const buf = await res.arrayBuffer();
  // fetch decompresses transparently, so re-compress to get the wire size.
  const stream = new Blob([buf]).stream().pipeThrough(new CompressionStream("gzip"));
  const packed = await new Response(stream).arrayBuffer();
  sizeCache.set(url, packed.byteLength);
  return packed.byteLength;
}

async function main() {
  try {
    const probe = await fetch(BASE, { method: "HEAD" });
    if (!probe.ok) throw new Error(String(probe.status));
  } catch {
    console.error(`No production server at ${BASE}.`);
    console.error("Run `npx next build && npx next start -p 3100` first.");
    process.exit(1);
  }

  console.log(`${"route".padEnd(30)} ${"scripts".padStart(7)} ${"js gzip".padStart(9)} ${"css".padStart(8)}  budget`);

  const rows = [];
  for (const route of ROUTES) {
    const html = await (await fetch(BASE + route)).text();

    const scripts = [...new Set(html.match(/\/_next\/static\/[^"']+?\.js/g) ?? [])];
    const styles = [...new Set(html.match(/\/_next\/static\/[^"']+?\.css/g) ?? [])];

    let js = 0;
    for (const s of scripts) js += await transferSize(BASE + s);
    let css = 0;
    for (const s of styles) css += await transferSize(BASE + s);

    const kb = js / 1024;
    const ok = kb <= BUDGET_KB;
    rows.push({ route, kb, ok });
    console.log(
      `${route.padEnd(30)} ${String(scripts.length).padStart(7)} ` +
        `${(kb.toFixed(1) + " KB").padStart(9)} ${((css / 1024).toFixed(1) + "K").padStart(8)}  ${ok ? "ok" : "OVER"}`,
    );
  }

  rows.sort((a, b) => b.kb - a.kb);
  console.log("");
  console.log(`heaviest: ${rows[0].route} at ${rows[0].kb.toFixed(1)} KB gzipped, budget ${BUDGET_KB} KB`);

  if (rows.some((r) => !r.ok)) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
