import type { Metadata } from "next";
import { tools } from "@/content/experience";
import { getProject } from "@/content/projects";
import { PageHeader } from "@/components/sections/PageHeader";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Figure } from "@/components/ui/Figure";
import { VideoFacade } from "@/components/sections/VideoFacade";
import { TexelPackJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "TexelPack and PreflightKit: commercial Blender addons for UV packing, texel density and game-ready asset validation. Built and supported by Cristian Cusumano.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Tools, Cristian Cusumano",
    url: "/tools",
  },
  twitter: { title: "Tools, Cristian Cusumano" },
};

/** Facts from the TexelPack product site, recorded in docs/CONTENT.md. */
const TEXELPACK_SPECS = [
  ["4 algorithms", "MAXRECTS, Guillotine, Shelf, and shape-aware Max Quality"],
  ["100k polys", "Vectorized island extraction in under a second"],
  ["±1 px", "Pixel-exact padding for clean bakes"],
  ["0 deps", "Runs on Blender's bundled Python"],
];

const TEXELPACK_FEATURES = [
  "Texel density normalized against each object's real 3D surface area, object scale included.",
  "Color-coded viewport overlay grading every face against the target, plus a distortion overlay for stretching and compression.",
  "Stacking of identical and mirrored islands, so repeated parts share one UV slot and its texels.",
  "UDIM and group packing, per tile, object, material or collection.",
  "Reserved atlas regions and exclusions, for logos and trim sheets the packer must avoid.",
  "Efficiency measured on real island geometry rather than bounding boxes, with geometric overlap detection.",
  "Preview in the UV editor before anything is applied. Confirm with Enter, discard with Escape.",
  "Presets, per-island JSON and CSV export, and a color-coded SVG layout for Substance or Photoshop.",
];

export default function ToolsPage() {
  const project = getProject("cusutools");
  const panels = project?.media.filter((m) => m.src.includes("panel-")) ?? [];
  const hero = project?.cover;

  return (
    <main id="main" className="mx-auto w-full max-w-page flex-1 px-gutter">
      <TexelPackJsonLd />
      <PageHeader
        eyebrow="CusuTools"
        title="Tools I sell"
        lead="Blender addons for 3D artists and game developers, built as products rather than side projects. TexelPack is out on Superhive Market with customers, support and an update cycle of its own. PreflightKit is in development."
      />

      <section className="border-t border-line py-section">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <h2 className="text-title">TexelPack</h2>
            <p className="mt-3 max-w-measure text-lead text-muted">
              One-click UV packing, with the texel density toolkit built in.
            </p>
          </div>
          <Button href="https://superhivemarket.com/products/texelpack">
            Buy on Superhive
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {["Blender 3.6 LTS", "4.x", "5.x", "GPL-3.0-or-later"].map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        {hero ? <Figure media={hero} className="mt-12" priority /> : null}

        <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {TEXELPACK_SPECS.map(([value, label]) => (
            <div key={value} className="bg-ink p-6">
              <dt className="font-mono text-heading text-accent">{value}</dt>
              <dd className="mt-3 text-small text-muted">{label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <MonoLabel as="h3" tone="accent">
              What it does
            </MonoLabel>
            <ul className="mt-6 space-y-4">
              {TEXELPACK_FEATURES.map((f) => (
                <li key={f} className="border-l border-accent-dim pl-5 text-body text-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <MonoLabel as="h3" tone="accent">
              In Blender
            </MonoLabel>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {panels.map((panel) => (
                <Figure key={panel.src} media={panel} sizes="(min-width: 640px) 18rem, 100vw" />
              ))}
            </div>
          </div>
        </div>

        {project?.video ? (
          <div className="mt-16">
            <MonoLabel as="h3" tone="accent" className="mb-6">
              Demo
            </MonoLabel>
            <VideoFacade video={project.video} />
          </div>
        ) : null}

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="https://texelpack.vercel.app/" variant="secondary">
            Product site
          </Button>
          <Button href="https://texelpack.vercel.app/docs/index.html" variant="secondary">
            Documentation
          </Button>
        </div>
      </section>

      {tools
        .filter((t) => t.name !== "TexelPack")
        .map((tool) => (
          <section key={tool.name} className="border-t border-line py-section">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
              <h2 className="text-title">{tool.name}</h2>
              {tool.status === "in-development" ? (
                <MonoLabel tone="accent">In development</MonoLabel>
              ) : null}
            </div>
            <p className="mt-3 max-w-measure text-lead text-muted">{tool.tagline}</p>
            <p className="mt-8 max-w-measure text-body text-muted">{tool.description}</p>
            <p className="mt-8 font-mono text-meta text-muted">
              {tool.status === "in-development"
                ? `Not released yet. It will go up on ${tool.marketplace} when it ships.`
                : `Available on ${tool.marketplace}.`}
            </p>
          </section>
        ))}
    </main>
  );
}
