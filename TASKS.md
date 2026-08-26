# CusuWeb, backlog

Working list. Each task names the agent that should own it. Check items off as they land.

**Legend:** `[ ]` open · `[x]` done · `[!]` blocked on Cusu (needs a file, an account, or a decision)

---

## Phase 0, Foundation ✅

- [x] Recover the lost site: 48 pages crawled, 89 media assets (214 MB) archived in `_legacy-scrape/`
- [x] Scaffold Next.js 16 + React 19 + TypeScript strict + Tailwind v4
- [x] Install R3F, drei, motion, sharp, lucide-react
- [x] Define the 8 specialist agents in `.claude/agents/`
- [x] Type the content model (`src/lib/types.ts`)
- [x] Port the 2026 résumé into `src/content/experience.ts` and `skills.ts`
- [x] Build `src/content/projects.ts`: 12 projects from the recovered inventory
- [x] Write `docs/DESIGN.md`, `docs/CONTENT.md`, `AGENTS.md`
- [x] Media conversion script (`scripts/optimize-media.mjs`)

---

## Phase 1, Design system  · `design-system` ✅

- [x] **1.1** Space Grotesk (display and body) + JetBrains Mono (data), via `next/font/google`. Latin subset, `display: swap`, self-hosted by Next.
- [x] **1.2** `@theme` block written in `globals.css`: 9 colors, 8 fluid type steps, spacing, measure, radii, easings.
- [x] **1.3** Accent is `#FC7816`, the CusuTools brand orange, sampled from the product logo. 8 contrast pairs verified by `scripts/check-contrast.mjs`, all passing. Accent on ink is 7.35:1.
- [x] **1.4** Base layer: selection, designed focus ring, scrollbar, `::marker`, `:target` scroll offset, global reduced-motion floor.
- [x] **1.5** `/styleguide` renders color, contrast, type scale, mono data, interaction, surfaces and motion. `robots: noindex`. Primitives get added in Phase 2.

**Done when:** a headline, body paragraph, mono label, rule and button rendered together read as one coherent system, and no component contains a literal hex or px. **Met.**

Verified in the browser at 1280 and 375: no horizontal overflow, hero clamps 48px to 115px, reading measure lands at 60 to 69 characters per line, fonts and tokens resolve, heading order is clean, skip link present.

---

## Phase 2, Shell & primitives  · `frontend-builder` ✅

- [x] **2.1** `layout.tsx`: fonts, `metadataBase`, title template, skip link, `<main>` landmark, `themeColor` and `colorScheme` via the viewport export.
- [x] **2.2** Sticky header on a solid ground with a hairline rule, no blur panel. `DesktopNav` and `MobileMenu` split so only the nav is client-side. Verified: focus enters the panel, Tab and Shift+Tab wrap, Escape closes, focus returns to the trigger, background scroll locks and unlocks.
- [x] **2.3** Footer: availability, five contact links, location and languages, all from `site.ts`. External links carry `rel="noopener noreferrer"`.
- [x] **2.4** `Button`, `Tag`, `MonoLabel`, `Rule`, `Reveal`, `Figure`. All rendered on `/styleguide`. `Figure` reserves the aspect ratio and pulls its blur placeholder from the generated map via `src/lib/media.ts`.
- [x] **2.5** `not-found.tsx` and `error.tsx`, both `noindex`, both using the real primitives.

**Done when:** every route can be reached and operated with the keyboard alone, and the tab order matches the visual order. **Met for the shell.**

Two things found and fixed while verifying:

- `Reveal` left every element at `opacity: 0` when IntersectionObserver never fired. It only had fallbacks for reduced motion and for a missing observer, not for an observer that exists but never reports. Content must never be permanently hidden by a progressive enhancement, so it now renders shown on the server, hides only after mount when it can actually animate, and has a 1200ms failsafe. Confirmed the server HTML contains no `opacity-0`, so no-JS readers see everything.
- `MobileMenu` closed the panel from an effect on pathname change. Reworked to adjust state during render, which also covers browser back and forward.

---

## Phase 3, Media pipeline  · `media-pipeline` ✅

- [x] **3.1** Run `node scripts/optimize-media.mjs`: 88 images, **213.8 MB → 4.2 MB AVIF** (98.0% smaller). `public/work/` totals 10 MB including WebP fallbacks.
- [x] **3.2** Reviewed by risk rather than in filename order: ranked all 100 conversions by output bytes per megapixel against source smoothness, which is where banding shows, then compared the six worst at matched scale and 100% crop. No banding, no smearing, no normal-map damage. AVIF q62 stands. Alpha verified preserved end to end, source RGBA to output RGBA.
- [x] **3.3** Blur placeholders wired through `src/lib/media.ts` and consumed by `Figure`, rather than duplicated into every entry in `projects.ts`. The generated map stays the single source.
- [x] **3.4** The Peakmines clip ships. 1920x1080, 4s, H.264, 430 KB. No transcode and no WebM sibling: it already plays in every current browser and a second encode would save bytes nobody is short of. No fabricated poster either; `preload="metadata"` makes the browser paint the real first frame.
- [x] **3.5** Measured against the production build across 11 routes, counting HTML, CSS, JS and eager images only. Heaviest first view is `/work/ohbb-raid` at **417 KB** against a 1536 KB budget.

**Done when:** total `public/work/` is under 25 MB and every asset in `projects.ts` resolves. **Met**, 11 MB.

Two bugs found while finishing this phase, both of which had been shipping:

- **The Peakmines video was fed to `next/image`.** Neither `Figure` nor `Gallery` branched on `Media.kind`, so an `.mp4` was going through the image optimizer, and the file had never been copied to `public/` either. The gallery had a broken tile. `Figure` now renders a real `<video>` and `Gallery` keeps videos out of the lightbox, since a button wrapper would swallow their controls.
- **`optimize-media.mjs` reported videos instead of copying them**, so the pipeline was not actually the single path from source to `public/`. It copies them now.

- [x] **3.6** Alpha trim, approved by Cusu and applied. Images with an alpha channel are cropped to their subject with a 4% margin before resizing, skipped when it reclaims under 6% of the frame. The isolated props reclaimed 69 to 87%: a tower that filled a quarter of its tile now fills it.
- [x] **3.7** `scripts/sync-dimensions.mjs`. The trim changes aspect ratios, and a stale width/height pair is a layout shift. Run without a flag it reports drift and exits non-zero, so it can gate a deploy; `--write` fixes it.

This also surfaced a defect that predated the trim: **the declared dimensions were the source file's, not the shipped file's.** A 3840x3840 source resized to 1600x1600 was recorded as 3840x3840. Harmless while the aspect matched, and a real shift the moment it did not. 77 of 98 entries were wrong. Now zero, verified in the browser against the decoded files.

---

## Phase 4, Copy  · `content-copy` ✅

> **Hard rule:** no em dash anywhere. See `docs/CONTENT.md`.

- [x] **4.1** All 89 alt strings written from the images themselves, reviewed on contact sheets. Zero `TODO:` left in the repo.
- [x] **4.2** Home hero copy written and in place.
- [x] **4.3** About narrative in `src/content/about.ts`: four blocks, first person, covering the Toyota database years, the hybrid art and code pattern, the current UE5 VR work, and how he works with teams. Every claim traces to `docs/CONTENT.md`.
- [x] **4.4** All 12 audited against the five beats. None were missing one. The four thinnest (original characters, weapons, tower defense props, Tower of God) were rewritten with specifics taken from the assets themselves.
- [x] **4.5** All 17 routes measured in the rendered HTML, every one inside 150 to 160 characters. Project pages got a dedicated `metaDescription` field; they were previously falling back to a 61 to 94 character tagline.

**Done when:** no string in the repo starts with `TODO:` and nothing on the page could have been written about a different developer. **Met.**

Two content corrections came out of reviewing the images rather than the filenames: the Steban Goca modeling credit on SpongeBob and Invader Zim, and the Unity map programming that was missing from three projects entirely. Both are recorded in `docs/CONTENT.md`.

Also cleaned up the hyphens left behind by the em dash purge, in the seven places where the sentence needed rewriting rather than repunctuating.

---

## Phase 5, Pages  · `frontend-builder` ✅

- [x] **5.1** `/`: hero, current roles, four selected projects, capability summary, contact CTA.
- [x] **5.0** Every header link now resolves. No 404s in the nav.
- [x] **5.2** `/work`: 12 projects, filtered by a search param through plain links, with live counts per discipline. No `"use client"` on the route at all. Verified with `curl`: `?discipline=3d-art` returns 8 cards, `engine` 1, an unknown value falls back to all 12.
- [x] **5.3** `/work/[slug]`: 12 pages via `generateStaticParams`, case-study layout on the five-beat structure, mono metadata sidebar, gallery, prev/next, per-project canonical.
- [x] **5.4** `/about`: how I work, the 9-role timeline, skills by group, education and languages.
- [x] **5.5** `/tools`: TexelPack as a product with a spec strip, the feature list, the Blender panels, the demo video and a buy link. PreflightKit is listed but still has no URL, see B.2.
- [x] **5.6** `/contact`: five channels, location, languages. No form, since there is no backend to receive one.
- [x] **5.7** Lightbox: arrow keys step and wrap, Escape closes, Tab holds inside, scroll locks, and focus returns to the thumbnail of the image last viewed rather than the one first clicked.
- [x] **5.8** YouTube facade on `/work/cusutools` and `/tools`. Verified zero requests to youtube.com, ytimg.com or google.com before the click. Uses `youtube-nocookie.com` and carries a `<noscript>` link.

**Done when:** every route exists, is keyboard operable and renders without JavaScript. **Met.**

Verified: unique title, description and `h1` on all 7 routes, no horizontal overflow at 375 on any of them, and zero em dashes in the rendered HTML.

One bug found: the lightbox re-ran its open effect on every arrow press, tearing down the scroll lock and stealing focus back from the Close button each time. Split into an open/close effect and a keyboard effect.

**Trade-off taken:** `/work` is server-rendered on demand rather than static, because the filter reads a search param. Making it static would mean either client-side filtering, which breaks without JavaScript, or a second route namespace for disciplines. A single dynamic route is the cheaper price.

---

## Phase 6, The 3D layer  · `three-scene`

- [ ] **6.1** Decide what the home hero canvas actually says. Write it down in `docs/DESIGN.md` before building. No decorative geometry.
- [ ] **6.2** Build the DOM fallback first, the hero must be complete with WebGL disabled.
- [ ] **6.3** Implement the canvas. Dynamic import, `ssr: false`, `frameloop="demand"` where possible, paused off-screen and on hidden tab.
- [ ] **6.4** `prefers-reduced-motion` stops the loop entirely.
- [ ] **6.5** Measure: bundle delta, draw calls, frame time on integrated graphics. Report real numbers.
- [ ] **6.6** *Optional, only if it earns it*, a glTF model viewer on one project page.

**Done when:** first-load JS on `/` stays under 250 KB gzipped with the canvas included.

---

## Phase 7, SEO & sharing  · `seo-schema` ✅

- [x] **7.1** `metadataBase`, canonical on every route, unique title and description everywhere, plus site-wide Open Graph and Twitter defaults, author, creator and keywords.
- [x] **7.2** 18 OG cards generated with `next/og`: 5 static routes plus one per project. One shared layout so a shared link always reads as this site. Space Grotesk and JetBrains Mono instanced from their variable sources to static weights and subset to full Latin, 103 KB total.
- [x] **7.3** `Person` on home, `CreativeWork` on each project, and a `SoftwareApplication` for TexelPack on `/tools`. No price and no rating, since neither is a fact this repo holds. PreflightKit gets no schema because it is unreleased.
- [x] **7.4** `sitemap.ts` and `robots.ts` generated from the content modules. 17 URLs, `/styleguide` excluded from both.
- [x] **7.5** Verified in the rendered HTML, not assumed. Two OG cards rendered and inspected as images. Found and fixed two defects, see below.

**Done when:** every route has a unique title, description, canonical and OG card, and the structured data describes what is actually on the page. **Met.**

Two defects caught by checking the rendered output rather than trusting the config:

- **Every page shared the same `og:title`.** Next does not derive `openGraph.title` from `title`, so the root value was inheriting down and every LinkedIn preview would have read "Cristian Cusumano, Game Engineer & Technical Artist" whatever page it pointed at. Each route now sets its own. Verified: 8 of 8 unique.
- **The first font subset was missing 5 glyphs**, including uppercase E-circumflex, which "AGÊNCIA DADS" needs on the Mercedes OG card. It happened to render, but by luck rather than coverage. Re-subset to full Latin, 0 missing.

---

## Phase 8, Quality gate  · `perf-a11y` ✅

- [x] **8.1** Baseline recorded below. Next 16 with Turbopack no longer prints a size column or writes `app-build-manifest.json`, so `scripts/bundle-report.mjs` measures the real thing against a running production server and exits non-zero over budget.
- [x] **8.2** Lighthouse on four routes. **Target met on all of them.**
- [ ] **8.7** Screenshot pass. The browser pane could not composite frames during Phase 1, so every visual check so far is computed-style based, not seen. Confirm the design visually before Phase 5 sign-off.
- [x] **8.3** Walked the real tab order on the densest page: 24 focusable elements, every one with an accessible name, no positive `tabindex`, no place where DOM order contradicts visual order, skip link first. The mobile menu and lightbox focus traps were verified in phases 2 and 5.
- [x] **8.4** The global `prefers-reduced-motion` block is present in the compiled production CSS, `Reveal` returns shown without hiding, and nothing on the site autoplays: the Peakmines video waits for a press and the YouTube demo is behind a click-to-load facade. **Live emulation was not available in this environment**, so the behaviour is verified from the shipped CSS and the code path, not observed.
- [x] **8.5** 9 routes at 4 widths, 36 checks, **zero horizontal overflow**.
- [x] **8.6** Token pairs verified by `scripts/check-contrast.mjs`. On top of that, every rendered text node on a project page was measured against its composited background, translucent layers included: **zero failures across 80 elements**. No text on this site sits over an image; the only candidate, the Play label, sits on a solid accent chip that clears 7.35:1.

### Baseline, 2026-08-26

| Route | Lighthouse P / A / BP / SEO | LCP | CLS | First-load JS |
|---|---|---|---|---|
| `/` | **100 / 100 / 100 / 100** | 1.3s | 0 | 189.7 KB |
| `/work` | 95 / 100 / 100 / 100 | 3.0s | 0 | 189.3 KB |
| `/work/cusutools` | 96 / 100 / 100 / 100 | 2.7s | 0 | 203.2 KB |
| `/about` | 97 / 100 / 100 / 100 | 2.6s | 0 | 189.3 KB |

Budgets: first-load JS under 250 KB gzipped (heaviest 203.2 KB), first-view page weight under 1.5 MB (heaviest 446 KB), `public/work` under 25 MB (9.7 MB).

### Four defects found and fixed

1. **`next/image` cannot resize an AVIF source.** It streamed the original back at every requested width, so a 384px card slot on a phone downloaded the 86 KB file built for a 1877px hero, and the whole `sizes` and `srcset` machinery was inert. The content modules now point at WebP masters and `next.config.ts` declares AVIF output, so Next downsamples and re-encodes per device: that same slot now gets **4.1 KB of AVIF, twenty times smaller**. The pipeline stopped emitting AVIF entirely, since it silently defeated responsive images.
2. **`Reveal` was delaying the largest contentful paint on the home page.** It hid the hero, which is the LCP element, then faded it back in after hydrating and observing, adding 1.8s for an animation nobody asked for. Content already on screen at mount is no longer hidden. Home LCP went 2.3s to 1.3s and performance 98 to 100.
3. **`heading-order` violation on `/work`**, h1 straight to h3, because the project cards had no section heading above them. Added a screen-reader-only h2. Accessibility 98 to 100.
4. **`ProjectCard` declared a `sizes` it did not honour**, 40rem for a box that measures 576px at 1280.

### Open, not fixed

`/work`, `/about` and the project pages report LCP between 2.6s and 3.0s under Lighthouse's throttled mobile simulation, above the 2.0s figure in `docs/ARCHITECTURE.md`. On all three the LCP element is a text block with a large render delay. The fonts are two preloaded woff2 files totalling 53 KB, CLS is 0, and images are no longer the bottleneck, so the cause is **not isolated**. Recorded rather than guessed at.

### Needs a human

The focus ring still has no visual confirmation. The compiled production CSS carries exactly the intended rule, `:focus-visible{outline-width:2px;outline-style:solid;outline-color:var(--color-accent);outline-offset:3px}`, the token resolves to `#fc7816`, and the only `outline:none` in the stylesheet is the correct `:focus:not(:focus-visible)`. But the browser pane in this environment never takes keyboard focus, so **nobody has actually seen the ring**. Tab through the site and look.

---

## Phase 9, Ship  · `deploy-ops`

- [x] **9.1** `.gitignore` excludes `_legacy-scrape/`, `node_modules/`, `.next/`, `.env*`: verified against `git status`.
- [x] **9.2** Pushed to `github.com/cusumdt/CusuWeb` (`main`). Ask before every subsequent push.
- [x] **9.3** Deployed on Vercel, **https://cusu-dev.vercel.app**
- [ ] **9.4** Verify the live site once real pages exist, not just a green build.
- [x] **9.5** No custom domain. `cusu-dev.vercel.app` is canonical, see B.3.
- [ ] **9.7** Set the repo's About → Website field on GitHub to `https://cusu-dev.vercel.app`. Needs Cusu's account, no `gh` CLI authenticated here.
- [ ] **9.6** Redirect or retire `cristiancusu.netlify.app` so there is one canonical portfolio.

---

## Blocked on Cusu  `[!]`

- [x] ~~**B.8** Save the two approved Mercedes renders~~, **done 2026-08-26.** Both converted, wired in, and live on `/work/mercedes-actros-vr`. Only these two are cleared.

- [x] ~~**B.1** Media for the flagship work~~, **resolved 2026-08-26.** Mercedes-Benz Actros VR and Chevrolet may be **named and described but never shown** (unreleased / under contract). Both are now listed with `visuals: withheld` instead of hidden. See the restrictions table in `docs/CONTENT.md`.
- [x] ~~**B.1b** CusuTools captures~~, **resolved 2026-08-26.** 8 images sourced from the UVPackerPro repo plus the YouTube demo. Now `visuals: public`.
- [ ] **B.1c** Design how a `withheld` project renders. It must read as deliberate and confidential, not as a broken image. This is a `design-system` decision before `frontend-builder` implements it.
- [x] ~~**B.2** PreflightKit URL~~, **resolved 2026-08-26.** There is no URL because PreflightKit has not been released. It is marked `in-development` and `/tools` presents it as such, with no buy link.
- [x] ~~**B.7** Résumé claims PreflightKit is released~~, **fixed 2026-08-26.** The PDF now reads "Currently developing PreflightKit". Verified by re-extracting the text.

- [x] ~~**B.3** Domain~~, **decided 2026-08-26.** Staying on `cusu-dev.vercel.app`. A custom domain is a purchase Cusu is not making right now; the Vercel subdomain is the canonical URL and `site.url` points at it.

- [x] ~~**B.4** A photo of you~~, **done 2026-08-26.** Shot fresh and now on `/about`, in the left column beside the narrative. 896x1200, 40 KB AVIF. It is the first photograph of Cusu the site has ever published: the 1024px avatar recovered from the old site was never wired in anywhere.

- [!] **B.5** **Résumé PDF.** Decide whether to offer a download on the site.
- [!] **B.6** **Analytics** Vercel Analytics or nothing. Your call.

---

## Deliberately out of scope

- Blog / CMS, the old site was a blog theme and the content never justified it
- Contact form, a `mailto:` and WhatsApp do the job without a backend
- Dark/light toggle, the site is dark by design, not by preference
- i18n, English only, decided at kickoff
