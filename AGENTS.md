# CusuWeb — project instructions

Portfolio for **Cristian "Cusu" Cusumano** — Senior Game Engineer, Technical Artist, Full Stack Developer. The site is a hiring surface: the readers are technical art leads, studio recruiters, and customers of his Blender addons.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · React Three Fiber + drei · `motion` for DOM animation · deployed on Vercel.

## Language

**All site content is in English.** Conversation with the repo owner is in Spanish; the product is not. Do not mix.

## Layout

```
src/
  app/            routes — App Router, Server Components by default
  components/
    layout/       header, footer, nav
    sections/     page-level composed sections
    ui/           reusable primitives
    three/        React Three Fiber canvases (all dynamically imported, ssr: false)
  content/        typed content modules — the only source of copy and data
  lib/            types.ts, utils.ts
public/work/      optimized portfolio media, per project slug
scripts/          media pipeline + one-shot bootstrap scripts
docs/             DESIGN.md, CONTENT.md, ARCHITECTURE.md
_legacy-scrape/   archive recovered from the lost repo — gitignored, never delete
TASKS.md          the working backlog
```

## Rules

- **Content never lives in components.** It lives in `src/content/*.ts`, typed against `src/lib/types.ts`.
- **Server Components by default.** `"use client"` only where state, effects or browser APIs are genuinely needed, pushed as low in the tree as possible.
- **Design tokens only.** Colors, spacing, radii and easings come from the `@theme` block in `src/app/globals.css`. No raw hex or magic px in a component.
- **No `any`.** `npx tsc --noEmit` must be clean before anything is called done.
- **`_legacy-scrape/` is read-only.** It holds the only copies of assets recovered from a repository that no longer exists. Read from it, write to `public/work/`, never modify or delete it.
- **Never invent a fact.** Dates, clients, metrics and credentials come from `docs/CONTENT.md`. If something is not there, ask.
- **Respect the publication restrictions.** Mercedes-Benz Actros VR and the Chevrolet configurator may be named and described in full but **never shown** — unreleased and under contract respectively. Check the table in `docs/CONTENT.md` before adding any image, and never flip a `withheld` project to `public`.
- **Do not push or deploy without being asked** in the current session.

## Specialist agents

Defined in `.claude/agents/`. Use them when the work matches:

| Agent | Owns |
|---|---|
| `design-system` | tokens, type scale, color, motion, the visual language |
| `frontend-builder` | pages, components, routing, responsive behavior |
| `three-scene` | R3F canvases, shaders, GPU/bundle budgets |
| `content-copy` | all English copy, case studies, alt text |
| `media-pipeline` | image/video conversion, compression, placeholders |
| `perf-a11y` | Core Web Vitals, WCAG 2.2 AA, the pre-deploy gate |
| `seo-schema` | metadata, OG images, JSON-LD, sitemap |
| `deploy-ops` | git, GitHub, Vercel, build failures |

## Commands

```bash
npm run dev                      # local dev server
npm run build                    # production build — read the route size table
npx tsc --noEmit                 # typecheck
npm run lint                     # eslint
node scripts/optimize-media.mjs  # legacy assets -> public/work (AVIF + WebP)
```
