# CusuWeb

Portfolio for **Cristian "Cusu" Cusumano**. Senior Game Engineer, Technical Artist, Full Stack Developer.

**Live:** https://cusu-dev.vercel.app

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · deployed on Vercel.

Everything is static. No database, no CMS, no API route. Project pages are
generated at build time from typed content modules, so the whole site ships as
HTML and immutable assets. The only client-side JavaScript is the mobile nav,
the gallery lightbox, scroll reveals and a click-to-load video facade, each an
isolated leaf; the page shells are Server Components.

## The parts worth reading

**A media pipeline that had to be built, not installed.** The previous
portfolio's repository was lost, so its 89 assets were recovered by crawling the
deployed site. `scripts/optimize-media.mjs` turns those originals into what
ships: it crops each cut-out to its subject, pads the results back onto one
shared canvas per project so a gallery stays even and props keep their true
relative scale, resizes without ever enlarging past the pixels an asset actually
has, and emits a blur placeholder generated from the same crop that ships.
221 MB of source becomes 9 MB.

**Four gates that fail rather than warn.** Each exits non-zero, so any of them
can block a deploy.

| Gate | What it refuses to let through |
|---|---|
| `check-aspect.mjs` | an opaque asset shipping at a different aspect ratio than its source |
| `sync-dimensions.mjs` | declared width, height or transparency drifting from the shipped file |
| `check-contrast.mjs` | a palette pair under its WCAG floor |
| `bundle-report.mjs` | a route over the 250 KB gzipped first-load budget |

Three of the four exist because a real defect got through first. `check-aspect`
was written after a per-axis normalization squashed a 1877x789 render into a
square and nothing in the build noticed.

**Content that cannot drift from the files.** Copy, projects and metadata live
in typed modules under `src/content/`, validated against `src/lib/types.ts`.
Components never hold a string. Image dimensions are written back from the files
that actually ship, because a stale pair is a layout shift.

**Decisions are written down.** `docs/ARCHITECTURE.md` carries the rendering
model, the media flow and the budgets, including the traps: sharp applies
extract, then resize, then extend regardless of call order, and `next/image`
caches optimized variants by source path, so regenerating `public/` without
clearing that cache serves the previous sizes.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck |
| `node scripts/optimize-media.mjs` | Source images to WebP in `public/`, trimming and padding cut-outs |
| `node scripts/sync-dimensions.mjs` | Report dimension and transparency drift; `--write` to fix |
| `node scripts/check-aspect.mjs` | Fail if any opaque asset ships at a distorted aspect ratio |
| `node scripts/check-contrast.mjs` | Verify the palette against the floors in `docs/DESIGN.md` |
| `node scripts/bundle-report.mjs` | First-load JS per route against the budget, needs `next start` |

## Where things are

- `src/content/`: all copy and project data, typed against `src/lib/types.ts`. Nothing is hardcoded in components.
- `docs/ARCHITECTURE.md`: rendering model, content and media flow, performance budgets.
- `docs/DESIGN.md`: the visual direction and the design tokens.
- `docs/CONTENT.md`: the factual source of truth. Nothing on the site may claim something that is not in here.
- `TASKS.md`: the working backlog, including what was measured and what is still open.

## Publication restrictions

The **Mercedes-Benz Actros VR** and **Chevrolet configurator** projects may be
named and described in full but their imagery is restricted: the first is
unreleased, the second is under contract. They are modelled as
`visuals: { status: "withheld" }`, so they are listed and written up in full and
rendered without media, with the reason shown to the reader rather than left as
a gap. Read `docs/CONTENT.md` before adding any image.

## A note on assets

The recovered originals live in `_legacy-scrape/`, gitignored, and are the only
copies that exist. `scripts/media-manifest.json` maps each one to its
destination, so the conversion is reproducible even though the sources are not
committed.
