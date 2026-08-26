# CusuWeb

Portfolio for **Cristian "Cusu" Cusumano**. Senior Game Engineer, Technical Artist, Full Stack Developer.

**Live:** https://cusu-dev.vercel.app

Next.js 16 · React 19 · TypeScript · Tailwind v4 · React Three Fiber · deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build, check the route size table |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck |
| `node scripts/optimize-media.mjs` | Convert archived source images to AVIF + WebP in `public/work/`, trimming transparent margins |
| `node scripts/sync-dimensions.mjs` | Report width/height drift between `projects.ts` and the shipped files; `--write` to fix |
| `node scripts/check-contrast.mjs` | Verify the palette against the contrast floors in `docs/DESIGN.md` |

## Where things are

- `src/content/`: all copy and project data, typed against `src/lib/types.ts`. Nothing is hardcoded in components.
- `docs/DESIGN.md`: the visual direction and design tokens.
- `docs/CONTENT.md`: the factual source of truth. Nothing on the site may claim something that is not in here.
- `docs/ARCHITECTURE.md`: rendering model, content and media flow, performance budgets.
- `TASKS.md`: the working backlog.
- `.claude/agents/`: specialist agents for design, 3D, copy, media, performance, SEO and deploys.

## Publication restrictions

The **Mercedes-Benz Actros VR** and **Chevrolet configurator** projects may be named and described in full but **never shown**. The first is unreleased, the second is under contract. They are modelled as `visuals: { status: "withheld" }` in `src/content/projects.ts`. Read `docs/CONTENT.md` before adding any image.

## A note on assets

The previous portfolio's repository was lost. Its 89 media assets were recovered from the deployed site and are archived in `_legacy-scrape/`: **gitignored, and the only copies that exist.** Back that folder up somewhere off this machine.

`scripts/media-manifest.json` maps each archived original to its destination in `public/work/`, so the conversion is reproducible even though the sources are not committed.
