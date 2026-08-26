import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Rule } from "@/components/ui/Rule";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Internal reference for the CusuWeb design tokens.",
  robots: { index: false, follow: false },
};

const COLORS = [
  ["--color-ink", "#0A0B0D", "page ground"],
  ["--color-surface", "#121317", "raised panels, cards"],
  ["--color-surface-2", "#1A1B20", "nested surfaces"],
  ["--color-line", "#2A2C33", "hairline rules"],
  ["--color-line-soft", "#1E1F25", "quiet dividers"],
  ["--color-text", "#EDEDF0", "body text"],
  ["--color-muted", "#9B9DA6", "secondary text, metadata"],
  ["--color-accent", "#FC7816", "interaction, current state"],
  ["--color-accent-dim", "#B75510", "rules, hover, non-text"],
];

const CONTRAST = [
  ["text on ink", "16.85", "7"],
  ["text on surface", "15.89", "7"],
  ["muted on ink", "7.28", "4.5"],
  ["muted on surface", "6.87", "4.5"],
  ["accent on ink", "7.35", "4.5"],
  ["accent on surface", "6.93", "4.5"],
  ["ink on accent", "7.35", "4.5"],
  ["accent-dim on ink", "4.05", "3"],
];

const SCALE = [
  ["text-hero", "Real-time"],
  ["text-display", "Engine and art"],
  ["text-title", "Technical direction"],
  ["text-heading", "Asset pipelines"],
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-section">
      <h2 className="mb-10 font-mono text-label uppercase text-accent">{label}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-page px-gutter">
      <header className="py-section">
        <p className="font-mono text-label uppercase text-muted">Internal reference</p>
        <h1 className="mt-6 text-display">Dark Editorial</h1>
        <p className="mt-8 max-w-measure text-lead text-muted">
          Every token the site is allowed to use. If a value is not on this page, it does not
          belong in a component. Contrast figures are produced by{" "}
          <code className="font-mono text-meta text-text">scripts/check-contrast.mjs</code>.
        </p>
      </header>

      <Section label="Color">
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map(([token, hex, role]) => (
            <div key={token} className="bg-ink p-5">
              <div
                className="mb-4 h-20 w-full border border-line"
                style={{ backgroundColor: hex }}
              />
              <p className="font-mono text-meta text-text">{token}</p>
              <p className="font-mono text-meta text-muted">{hex}</p>
              <p className="mt-2 text-small text-muted">{role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Contrast">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 pr-6 font-mono text-label uppercase text-muted">Pair</th>
                <th className="py-3 pr-6 font-mono text-label uppercase text-muted">Measured</th>
                <th className="py-3 pr-6 font-mono text-label uppercase text-muted">Floor</th>
              </tr>
            </thead>
            <tbody>
              {CONTRAST.map(([pair, got, min]) => (
                <tr key={pair} className="border-b border-line-soft">
                  <td className="py-3 pr-6 text-small">{pair}</td>
                  <td className="py-3 pr-6 font-mono text-meta text-accent">{got}:1</td>
                  <td className="py-3 pr-6 font-mono text-meta text-muted">{min}:1</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section label="Type scale">
        <div className="space-y-10">
          {SCALE.map(([cls, sample]) => (
            <div key={cls}>
              <p className="mb-3 font-mono text-meta text-muted">{cls}</p>
              <p className={cls}>{sample}</p>
            </div>
          ))}
          <div>
            <p className="mb-3 font-mono text-meta text-muted">text-lead</p>
            <p className="max-w-measure text-lead">
              Rebuilt the CAD-to-engine pipeline: decimation and retopology of raw 14-15M triangle
              meshes, material consolidation, and texture streaming budgets that eliminated memory
              overruns.
            </p>
          </div>
          <div>
            <p className="mb-3 font-mono text-meta text-muted">text-body, capped at 68ch</p>
            <p className="max-w-measure">
              Modified the Unreal shader and mesh importer to remove the UE5 normal recast, making
              Blender and UE5 shading match exactly and ending recurring normal artifacts across
              all assets. Owns engine migrations and revalidates lighting, materials and
              performance after each upgrade.
            </p>
          </div>
        </div>
      </Section>

      <Section label="Mono, for data">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <span className="font-mono text-label uppercase text-muted">Senior Game Engineer</span>
          <span className="font-mono text-meta text-text">Apr 2026 - Present</span>
          <span className="font-mono text-meta text-text">UE 5.5 to 5.7</span>
          <span className="font-mono text-meta text-text">14-15M tris</span>
          <span className="font-mono text-meta text-accent">60 fps</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {["Unreal Engine 5", "C++", "Blueprints", "VR", "Lumen", "Nanite", "Blender"].map((s) => (
            <span
              key={s}
              className="border border-line px-3 py-1.5 font-mono text-meta text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      <Section label="Primitives">
        <div className="space-y-10">
          <div>
            <p className="mb-4 font-mono text-meta text-muted">Button</p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/">Primary</Button>
              <Button href="/" variant="secondary">
                Secondary
              </Button>
              <Button href="/" variant="ghost">
                Ghost
              </Button>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-meta text-muted">Tag</p>
            <div className="flex flex-wrap gap-2">
              <Tag active>Technical art</Tag>
              {["Unreal Engine 5", "C++", "Lumen", "Nanite"].map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-meta text-muted">MonoLabel</p>
            <div className="flex flex-wrap gap-8">
              <MonoLabel tone="accent">Accent</MonoLabel>
              <MonoLabel>Muted</MonoLabel>
              <MonoLabel tone="text">Text</MonoLabel>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-meta text-muted">Rule</p>
            <Rule />
            <Rule soft className="mt-4" />
          </div>

          <div>
            <p className="mb-4 font-mono text-meta text-muted">
              Figure, with generated blur placeholder
            </p>
            <Figure
              media={{
                kind: "image",
                src: "/work/cusutools/08-panel-export.avif",
                alt: "TexelPack statistics and export panel reporting 61.5 percent efficiency, 230 of 230 islands packed across 9 objects in 1643 milliseconds with zero overlaps.",
                width: 538,
                height: 720,
                caption: "Aspect ratio is reserved before decode, so nothing shifts.",
              }}
              sizes="(min-width: 768px) 22rem, 100vw"
              className="max-w-[22rem]"
            />
          </div>

          <div>
            <p className="mb-4 font-mono text-meta text-muted">Reveal</p>
            <Reveal className="border border-line p-6">
              <p className="text-small text-muted">
                Faded and translated in on scroll. Renders visible immediately under{" "}
                <code className="font-mono text-meta text-text">prefers-reduced-motion</code>, or
                if IntersectionObserver is unavailable.
              </p>
            </Reveal>
          </div>
        </div>

        <p className="mt-12 max-w-measure text-small text-muted">
          Tab through the controls above. Every focus ring is a 2px accent outline at 3px offset,
          declared once in the base layer. Nothing on this site sets{" "}
          <code className="font-mono text-meta text-text">outline: none</code>.
        </p>
      </Section>

      <Section label="Surfaces and rules">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-surface p-6">
            <p className="font-mono text-label uppercase text-muted">surface</p>
            <p className="mt-3 text-small">A raised panel sitting on the page ground.</p>
          </div>
          <div className="bg-surface-2 p-6">
            <p className="font-mono text-label uppercase text-muted">surface-2</p>
            <p className="mt-3 text-small">A nested surface, one step further up.</p>
          </div>
          <div className="border border-line p-6">
            <p className="font-mono text-label uppercase text-muted">hairline</p>
            <p className="mt-3 text-small">A bordered block. No shadow, no large radius.</p>
          </div>
        </div>
      </Section>

      <Section label="Motion">
        <ul className="max-w-measure space-y-3 text-small text-muted">
          <li>
            <code className="font-mono text-meta text-text">--ease-out-quint</code> for entrances,{" "}
            <code className="font-mono text-meta text-text">160 / 260 / 400ms</code> durations.
          </li>
          <li>
            Reveals are a short fade plus a small translate. Nothing bounces, nothing slides across
            the viewport.
          </li>
          <li>
            <code className="font-mono text-meta text-text">prefers-reduced-motion: reduce</code>{" "}
            collapses every animation and transition globally in the base layer, and stops the
            WebGL loop rather than slowing it.
          </li>
        </ul>
      </Section>

      <footer className="border-t border-line py-12">
        <p className="font-mono text-meta text-muted">
          Phase 1 tokens and Phase 2 primitives. Section components get added as they are built.
        </p>
      </footer>
    </main>
  );
}
