# Architecture

## Rendering model

Everything is static. There is no database, no CMS and no API route. Project pages are generated at build time from `src/content/projects.ts` via `generateStaticParams`, so the whole site ships as HTML and immutable assets on Vercel's edge.

The only client-side JavaScript is: the mobile nav, the gallery lightbox, scroll reveals, and the WebGL canvas. Each is an isolated `"use client"` leaf — the page shells stay Server Components.

## Content flow

```
docs/CONTENT.md          the facts, human-readable, the thing to argue with
        │
        ▼
src/content/*.ts         typed modules — projects, experience, skills, site
        │
        ├──► pages (Server Components read them directly, no fetching)
        ├──► sitemap.ts / robots.ts
        └──► opengraph-image.tsx
```

Nothing reads content from anywhere else. Adding a project means adding an object to `projects.ts` and running the media script — no route, no config, no sitemap edit.

## Media flow

```
_legacy-scrape/assets/image/   89 recovered originals, 214 MB, gitignored
        │
        │  scripts/media-manifest.json  (source → destination map)
        ▼
scripts/optimize-media.mjs     sharp: resize, AVIF + WebP, blur placeholder
        ▼
public/work/<slug>/            what actually ships
```

The manifest is committed so the conversion is reproducible. The originals are not committed — they are an archive of a lost repository and live only on disk. **Back them up somewhere off this machine.**

`scripts/bootstrap-projects.py` was the one-shot generator that produced `projects.ts` from the recovered site. It is kept for reference. Re-running it overwrites hand-written copy — don't, unless you mean it.

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
