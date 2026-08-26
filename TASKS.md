# CusuWeb — backlog

Working list. Each task names the agent that should own it. Check items off as they land.

**Legend:** `[ ]` open · `[x]` done · `[!]` blocked on Cusu (needs a file, an account, or a decision)

---

## Phase 0 — Foundation ✅

- [x] Recover the lost site: 48 pages crawled, 89 media assets (214 MB) archived in `_legacy-scrape/`
- [x] Scaffold Next.js 16 + React 19 + TypeScript strict + Tailwind v4
- [x] Install R3F, drei, motion, sharp, lucide-react
- [x] Define the 8 specialist agents in `.claude/agents/`
- [x] Type the content model (`src/lib/types.ts`)
- [x] Port the 2026 résumé into `src/content/experience.ts` and `skills.ts`
- [x] Build `src/content/projects.ts` — 12 projects from the recovered inventory
- [x] Write `docs/DESIGN.md`, `docs/CONTENT.md`, `AGENTS.md`
- [x] Media conversion script (`scripts/optimize-media.mjs`)

---

## Phase 1 — Design system  · `design-system`

- [ ] **1.1** Choose and wire the typefaces via `next/font` — one grotesque for display/body, one mono for data. Subset, `display: swap`, self-hosted.
- [ ] **1.2** Write the `@theme` block in `globals.css`: color, fluid type scale, spacing, radii, easing. Every token from `docs/DESIGN.md`.
- [ ] **1.3** Pick the single accent color and verify contrast numerically against `--color-ink` at every size it will be used.
- [ ] **1.4** Base layer: selection color, focus ring, scrollbar, `::marker`, reduced-motion global.
- [ ] **1.5** Build a `/styleguide` route rendering every token and primitive on one page. Dev-only — excluded from the sitemap.

**Done when:** a headline, body paragraph, mono label, rule and button rendered together read as one coherent system, and no component contains a literal hex or px.

---

## Phase 2 — Shell & primitives  · `frontend-builder`

- [ ] **2.1** `layout.tsx` — fonts, metadata base, skip link, `<main>` landmark, theme color.
- [ ] **2.2** Header + nav. Sticky, hairline rule, current-route state, keyboard operable, mobile menu that traps focus and closes on Escape.
- [ ] **2.3** Footer — contact, LinkedIn / ArtStation / GitHub, location, availability line.
- [ ] **2.4** UI primitives in `components/ui/`: `Button`, `Tag`, `MonoLabel`, `Rule`, `Reveal` (scroll fade-in, reduced-motion aware), `Figure` (next/image + caption + aspect box).
- [ ] **2.5** 404 and `error.tsx`, both in the site's voice.

**Done when:** every route can be reached and operated with the keyboard alone, and the tab order matches the visual order.

---

## Phase 3 — Media pipeline  · `media-pipeline`

- [x] **3.1** Run `node scripts/optimize-media.mjs` — 88 images, **213.8 MB → 4.2 MB AVIF** (98.0% smaller). `public/work/` totals 10 MB including WebP fallbacks.
- [ ] **3.2** Full visual review of the output. Spot-checked 2 of 88 at 100% crop (marble material for banding, character for smearing) — both clean at AVIF q62. Still needs a pass over the remaining 86.
- [ ] **3.3** Wire `src/content/blur-placeholders.json` (88 entries, generated) into `projects.ts` so every image has a `blurDataURL`.
- [ ] **3.4** Transcode `Peakmines/enanos.mp4` to MP4 + WebM, extract a poster frame.
- [ ] **3.5** Confirm no project page exceeds 1.5 MB on first view.

**Done when:** total `public/work/` is under 25 MB (currently 10 MB ✅) and every image in `projects.ts` resolves.

---

## Phase 4 — Copy  · `content-copy`

- [ ] **4.1** Replace all 89 `"TODO:"` alt strings in `projects.ts` with real descriptions of what each asset shows.
- [ ] **4.2** Home hero copy — the one sentence that has to land. Engineer *and* artist, no adjective padding.
- [ ] **4.3** About page — long-form, first person, built from `docs/CONTENT.md`.
- [ ] **4.4** Review the 12 project case studies against the required five-beat structure; sharpen anything vague.
- [ ] **4.5** Meta descriptions for every route, 150–160 characters each.

**Done when:** no string in the repo starts with `TODO:` and nothing on the page could have been written about a different developer.

---

## Phase 5 — Pages  · `frontend-builder`

- [ ] **5.1** `/` — hero, selected work, capability summary, current role, contact CTA.
- [ ] **5.2** `/work` — full index, filterable by discipline (`engine`, `technical-art`, `3d-art`, `web-3d`, `tooling`, `art-direction`). Filter must work without JS or degrade honestly. Handle `visuals: withheld` cards — see B.1c.
- [ ] **5.3** `/work/[slug]` — `generateStaticParams`, editorial case-study layout, full-bleed hero, mono metadata block, gallery, prev/next.
- [ ] **5.4** `/about` — narrative, experience timeline from `experience.ts`, skills, education, languages.
- [ ] **5.5** `/tools` — TexelPack and PreflightKit as products, not portfolio pieces. This page sells software. Full TexelPack feature set is in `docs/CONTENT.md`.
- [ ] **5.6** `/contact` — email, WhatsApp, LinkedIn, availability. No contact form unless there is a real backend for it.
- [ ] **5.7** Lightbox for gallery images — keyboard navigable, Escape closes, focus restored on close.

---

## Phase 6 — The 3D layer  · `three-scene`

- [ ] **6.1** Decide what the home hero canvas actually says. Write it down in `docs/DESIGN.md` before building. No decorative geometry.
- [ ] **6.2** Build the DOM fallback first — the hero must be complete with WebGL disabled.
- [ ] **6.3** Implement the canvas. Dynamic import, `ssr: false`, `frameloop="demand"` where possible, paused off-screen and on hidden tab.
- [ ] **6.4** `prefers-reduced-motion` stops the loop entirely.
- [ ] **6.5** Measure: bundle delta, draw calls, frame time on integrated graphics. Report real numbers.
- [ ] **6.6** *Optional, only if it earns it* — a glTF model viewer on one project page.

**Done when:** first-load JS on `/` stays under 250 KB gzipped with the canvas included.

---

## Phase 7 — SEO & sharing  · `seo-schema`

- [ ] **7.1** `metadataBase`, canonicals, per-route titles and descriptions.
- [ ] **7.2** `opengraph-image.tsx` generated with `next/og`, including per-project variants.
- [ ] **7.3** JSON-LD: `Person` on home, `CreativeWork` on each project.
- [ ] **7.4** `sitemap.ts` and `robots.ts`, generated from `src/content/`, never hand-listed.
- [ ] **7.5** Verify the rendered `<head>` on three routes and preview the OG card.

---

## Phase 8 — Quality gate  · `perf-a11y`

- [ ] **8.1** `npm run build` — record the route size table in this file as the baseline.
- [ ] **8.2** Lighthouse on `/`, `/work`, and one project page. Target ≥ 95 performance, 100 accessibility.
- [ ] **8.3** Full keyboard pass on every interactive element.
- [ ] **8.4** Reduced-motion pass — confirm the canvas stops and reveals disable.
- [ ] **8.5** Responsive pass at 375 / 768 / 1280 / 1920. No horizontal scroll anywhere.
- [ ] **8.6** Contrast audit, including text over images.

---

## Phase 9 — Ship  · `deploy-ops`

- [x] **9.1** `.gitignore` excludes `_legacy-scrape/`, `node_modules/`, `.next/`, `.env*` — verified against `git status`.
- [x] **9.2** Pushed to `github.com/cusumdt/CusuWeb` (`main`). Ask before every subsequent push.
- [x] **9.3** Deployed on Vercel — **https://cusu-dev.vercel.app**
- [ ] **9.4** Verify the live site once real pages exist — not just a green build.
- [ ] **9.5** Custom domain (see B.3).
- [ ] **9.7** Set the repo's About → Website field on GitHub to `https://cusu-dev.vercel.app`. Needs Cusu's account — no `gh` CLI authenticated here.
- [ ] **9.6** Redirect or retire `cristiancusu.netlify.app` so there is one canonical portfolio.

---

## Blocked on Cusu  `[!]`

- [x] ~~**B.1** Media for the flagship work~~ — **resolved 2026-08-26.** Mercedes-Benz Actros VR and Chevrolet may be **named and described but never shown** (unreleased / under contract). Both are now listed with `visuals: withheld` instead of hidden. See the restrictions table in `docs/CONTENT.md`.
- [!] **B.1b** **CusuTools captures.** The one flagship project with no imagery that *isn't* restricted. Addon UI panel, the color-coded density overlay in the viewport, an SVG layout export, or a short screen recording of a pack. Marked `visuals: pending`.
- [ ] **B.1c** Design how a `withheld` project renders. It must read as deliberate and confidential — not as a broken image. This is a `design-system` decision before `frontend-builder` implements it.
- [!] **B.2** **PreflightKit URL.** TexelPack is confirmed: https://superhivemarket.com/products/texelpack (plus the product site at texelpack.vercel.app). PreflightKit has no confirmed public link — the `/tools` page needs one, and it will not be guessed.
- [!] **B.3** **Domain.** `cusumano.dev`, `cusu.dev`, something else? Vercel gives a `.vercel.app` in the meantime.
- [!] **B.4** **A photo of you.** The recovered `cusu.jpg` is a 1024×1024 avatar. A real portrait would carry the About page better.
- [!] **B.5** **Résumé PDF** — decide whether to offer a download on the site.
- [!] **B.6** **Analytics** — Vercel Analytics or nothing. Your call.

---

## Deliberately out of scope

- Blog / CMS — the old site was a blog theme and the content never justified it
- Contact form — a `mailto:` and WhatsApp do the job without a backend
- Dark/light toggle — the site is dark by design, not by preference
- i18n — English only, decided at kickoff
