# Content — source of truth

Everything the site claims must trace back to this file. Facts come from the 2026 résumé (`Cristian_Cusumano_Resume_2026.pdf`) and the recovered portfolio. **If a fact is not here, do not write it.**

## Identity

- **Cristian Ariel Cusumano**, known as **Cusu**
- Senior Game Engineer · Technical Artist · Full Stack Developer
- Santos, São Paulo, Brazil
- cusumdt@gmail.com · +55 13 9 8192 3786
- LinkedIn `/in/cristian-cusumano-524ab1195` · ArtStation `/cusumdt` · GitHub `cusumdt`
- Live site: https://cusu-dev.vercel.app
- Languages: Spanish (native), Portuguese (fluent), English (professional working)

**Positioning:** 9+ years bridging code and art. Currently leads the technical architecture of Unreal Engine 5 VR/XR projects. Track record across mobile games, real-time web 3D, and educational software for Mercedes-Benz, Disney, Chevrolet and Oh Baby Games. Also ships and supports commercial Blender tooling independently.

## Clients and IPs that may be named

Mercedes-Benz · Disney · Chevrolet · Toyota · SpongeBob SquarePants · Invader Zim · Tower of God · Oh Baby Games · Inflextion Studios · DIGI Learnnials · Image Campus · Agência DADS · Bird

## Roles

Full data in `src/content/experience.ts`. Summary:

| Period | Role | Where |
|---|---|---|
| Apr 2026 – present | Senior Game Engineer | Agência DADS, Santos |
| Jun 2026 – present | Founder & Developer | CusuTools (independent) |
| Aug 2025 – present | Co-Founder | Bird, Santos |
| Jul 2022 – Feb 2025 | Developer / 3D Artist | Oh Baby Games (Australia, remote) |
| Sep 2023 – Apr 2024 | Freelance Web 3D Developer | Chevrolet project (Argentina, remote) |
| Oct 2021 – Jun 2022 | Project Manager & Unity Developer | Inflextion Studios (Spain, remote) |
| Feb 2020 – Dec 2021 | Lead Artist, Art Director & Unity Developer | DIGI Learnnials (Disney partnership) |
| Mar 2021 – Feb 2023 | Professor, 3D Art & Database Programming | Image Campus, Buenos Aires |
| Feb 2017 – Oct 2019 | Database Programmer | Toyota Argentina |

## Education

- Unreal Engine Certification — Blueprints and C++
- Higher Technician in Video Game Development — Image Campus, 2018–2020
- Technical Degree in Computer Programming — Escuela Técnica N.º 1 Raúl Scalabrini Ortiz, 2011–2017

## Metrics that may be quoted

These are the only numbers with a source. Do not round them up or invent others.

- 9+ years of experience
- 14–15M triangle raw CAD meshes, decimated and retopologized
- 60fps target on mid-range mobile devices
- UE 5.5 → 5.7 engine migration
- Team of 6 artists directed at DIGI Learnnials
- Children aged 8–11 as the Disney platform's audience

## Publication restrictions — read before adding any image

Confirmed by Cusu on 2026-08-26. These are contractual and pre-release limits, not preferences. **Violating one is a real problem for him, not a style error.**

| Project | May be named | May be shown |
|---|---|---|
| **Mercedes-Benz Actros VR** (Agência DADS) | ✅ yes — role, stack and technical detail in full | ❌ **no imagery until the project ships.** Still in development. |
| **Chevrolet configurator** | ✅ yes — role, stack and technical detail in full | ❌ **no imagery, by contract.** No expiry given. |
| Everything else | ✅ | ✅ |

Both are modelled as `visuals: { status: "withheld", reason }` in `src/content/projects.ts` — listed and described in full, rendered without media, with the reason shown to the reader. A withheld project is **never** promoted to `public` without Cusu confirming the restriction has lifted.

## Portfolio media

89 assets recovered from the lost Netlify repo, archived in `_legacy-scrape/assets/image/`, mapped to projects in `scripts/media-manifest.json` and converted into `public/work/`.

**Known gap:** CusuTools has no imagery yet — but unlike the two above, nothing prevents it. Addon UI captures, an overlay screenshot or a short screen recording can be made at any time. Marked `visuals: { status: "pending" }`.

## Products

**TexelPack** — https://texelpack.vercel.app · Superhive Market: https://superhivemarket.com/products/texelpack · GPL-3.0-or-later · Blender 3.6 LTS, 4.x, 5.x

Facts taken from Cusu's own product site, so all of it is publishable:

- One-click UV packing plus a texel density toolkit, in one addon
- Four packing algorithms: MAXRECTS, Guillotine, Shelf, and Max Quality (shape-aware, packs by real island geometry)
- Vectorized island extraction — 100k polygons in under a second
- Pixel-exact ±1px padding for clean bake bleeding; per-island margins; pixel-grid alignment
- Zero external dependencies — runs on Blender's bundled Python. Undo-safe.
- Texel density scaled to each object's real 3D surface area, object scale included
- Viewport overlays: density grading against a target, and stretch/compression visualization
- Stacking of identical and mirrored islands; rotation steps of 90°/45°/30°/15°; auto-straighten
- UDIM and group packing, per tile / object / material / collection; reserved atlas regions and exclusions
- Efficiency measured on real island geometry, not bounding boxes; geometric overlap detection
- Preview before apply — confirm with Enter, discard with ESC
- Presets (3 built-in), export per-island data as JSON / CSV, and a color-coded SVG layout for Substance or Photoshop
- Product site is localized in English, Spanish, Portuguese and Chinese

**PreflightKit** — pre-flight asset validator that checks and exports game-ready assets. **No public URL confirmed yet** — do not guess one. See TASKS B.2.

## Copy rules

Voice is direct and technical. Specifics over adjectives, numbers wherever they exist, clients named. Banned: "passionate", "creative professional", "innovative solutions", "cutting-edge", "turning coffee into code".

Every project page answers, in order: what it was → his role → the constraint → what he did → the outcome.
