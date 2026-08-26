# Design direction — Dark Editorial

The brief: **new, modern, and it has to look like it belongs to this developer.**

Cusu is a hybrid — he writes engine-level C++ and he art-directs. A site that only looks technical undersells the art; a site that only looks arty undersells nine years of shipped engineering. The design holds both.

## The idea

A near-black, precisely-built ground — hairline rules, monospace data, exact alignment, the restraint of a good tool — carrying **large editorial typography** and full-bleed renders. The interface recedes. The work is the only saturated color on the page.

**Reference register:** an engine's editor UI crossed with a design annual. Not a dev-portfolio template, not a SaaS landing page.

## Tokens

All values live in the `@theme` block of `src/app/globals.css`. Nothing below should ever appear as a literal in a component.

### Color

| Token | Role |
|---|---|
| `--color-ink` | page ground, near-black, not pure `#000` |
| `--color-surface` | raised panels, cards, code blocks |
| `--color-line` | hairline rules and borders |
| `--color-text` | primary body text |
| `--color-muted` | secondary text, metadata |
| `--color-accent` | single accent — used sparingly, never decoratively |
| `--color-accent-dim` | accent at low emphasis, for rules and hover states |

One accent. It marks interaction and current state — nothing else. If the accent appears three times in a viewport, two of them are wrong.

### Type

- **Display**: a tight-tracking grotesque for headlines, set large. Fluid via `clamp()`.
- **Body**: the same family at reading weight, generous line-height (1.6–1.7), measure capped around 68 characters.
- **Mono**: for dates, roles, engine versions, poly counts, stack tags. Anything that is *data* is set in mono. This is what makes the page read as engineered.

Scale is fluid, not stepped at breakpoints. Headline sizes should feel slightly too large — that is the editorial half doing its job.

### Space & motion

- Spacing follows a 4px base. Section rhythm is generous: whitespace is the luxury signal here, not effects.
- Entrance easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Durations 200–400ms. Nothing bounces.
- Reveal on scroll is a short fade + small translate. Never a slide across half the screen.

## Rules

- **Every animation respects `prefers-reduced-motion: reduce`** — including the WebGL loop, which stops rather than slows.
- **Contrast is measured, not eyeballed.** Body text ≥ 7:1, UI text ≥ 4.5:1. Text over an image gets a scrim.
- **Focus rings are designed.** Visible, accent-colored, never `outline: none`.
- Images sit on the ground with no border, no shadow, no rounded corner larger than the token allows. Let the render be the render.
- **Banned:** glassmorphism, neon glow, gradient blobs, animated gradient text, marquee skill tickers, "hero with floating 3D shape for no reason".

## The 3D layer

WebGL earns its place only where it says something. Candidates, in order of merit:

1. **Home hero** — a restrained real-time element that demonstrates the WebGL skill claimed in the copy. It must be quiet enough to read text over.
2. **A live model viewer** on one or two project pages, where seeing the asset rotate genuinely beats a still.

Everything else stays a still image. The canvas is always progressive enhancement: the page is complete and navigable without it.
