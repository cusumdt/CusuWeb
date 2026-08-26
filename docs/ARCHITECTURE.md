# Architecture

## Rendering model

Everything is static. There is no database, no CMS and no API route. Project pages are generated at build time from `src/content/projects.ts` via `generateStaticParams`, so the whole site ships as HTML and immutable assets on Vercel's edge.

The only client-side JavaScript is: the mobile nav, the gallery lightbox, scroll reveals, and the WebGL canvas. Each is an isolated `"use client"` leaf. The page shells stay Server Components.

## Content flow

```
docs/CONTENT.md          the facts, human-readable, the thing to argue with
        │
        ▼
src/content/*.ts         typed modules, projects, experience, skills, site
        │
        ├──► pages (Server Components read them directly, no fetching)
        ├──► sitemap.ts / robots.ts
        └──► opengraph-image.tsx
```

Nothing reads content from anywhere else. Adding a project means adding an object to `projects.ts` and running the media script. No route, no config, no sitemap edit.

## Media flow

```
_legacy-scrape/assets/image/   89 recovered originals, 214 MB, gitignored
        │
        │  scripts/media-manifest.json  (source → destination map)
        ▼
scripts/optimize-media.mjs     sharp: alpha trim, resize, AVIF + WebP, blur
        ▼
public/work/<slug>/            what actually ships
```

Images with an alpha channel are cropped to their subject, then padded back out
to one shared canvas per project. Cropping alone made every tile a different
shape and left small subjects stretched to fill their slot; the shared canvas
keeps a gallery even and preserves the real relative scale between props, so a
tier-one tower still reads smaller than a tier-three one.

The canvas is computed in normalized units, not raw source pixels, because a
project can mix a 3840 render with a 1920 one. It is also capped so no subject
is ever enlarged past the resolution it actually has.

Two things that bite here. sharp applies extract, then resize, then extend, in
that order regardless of how you chain them, so trimming and padding have to be
two passes or the padding lands in source-sized amounts on an already-resized
image. And `next/image` caches optimized variants under `.next/cache/images`
keyed by source path: after regenerating the files in `public/`, clear it, or
the dev server keeps serving the previous sizes.

Because all of this changes aspect ratios, `scripts/sync-dimensions.mjs` has to
run after it. It writes back the width, height and transparency flag from the
files that actually ship: the dimensions reserve the box before an image
decodes, and the flag tells the components to drop the panel behind a cut-out
and contain it rather than crop it.

The manifest is committed so the conversion is reproducible. The originals are not committed. They are an archive of a lost repository and live only on disk. **Back them up somewhere off this machine.**

`scripts/bootstrap-projects.py` was the one-shot generator that produced `projects.ts` from the recovered site. It is kept for reference. Re-running it overwrites hand-written copy. Don't, unless you mean it.

## Route map

| Route | Rendering | Source |
|---|---|---|
| `/` | static | `projects.ts` (featured), `experience.ts` (current role) |
| `/work` | static | `publishedProjects` |
| `/work/[slug]` | static, `generateStaticParams` | `projects.ts` |
| `/about` | static | `experience.ts`, `skills.ts` |
| `/tools` | static | `experience.ts` → `tools` |
| `/contact` | static | `site.ts` |
| `/sitemap.xml`, `/robots.txt` | generated | `src/content/` |

Projects marked `draft: true` are excluded from listings, the sitemap and `generateStaticParams`. That is how the four asset-less flagship projects stay out of sight without being deleted.

## Budgets

Enforced by the `perf-a11y` agent before any deploy.

| Metric | Limit |
|---|---|
| First-load JS, any route | < 250 KB gzipped |
| Project page weight, first view | < 1.5 MB |
| LCP (Fast 3G, 4× CPU) | < 2.0s |
| CLS | < 0.05 |
| `public/work/` total | < 25 MB |
