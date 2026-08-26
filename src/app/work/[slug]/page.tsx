import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedProjects, getProject } from "@/content/projects";
import { DISCIPLINE_LABELS } from "@/lib/disciplines";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Tag } from "@/components/ui/Tag";
import { Figure } from "@/components/ui/Figure";
import { Gallery } from "@/components/sections/Lightbox";
import { VideoFacade } from "@/components/sections/VideoFacade";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

/** The metadata block. Everything in it is data, so all of it is mono. */
function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line-soft py-4">
      <MonoLabel>{label}</MonoLabel>
      <p className="mt-2 font-mono text-meta text-text">{value}</p>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.draft) notFound();

  const index = publishedProjects.findIndex((p) => p.slug === project.slug);
  const previous = index > 0 ? publishedProjects[index - 1] : null;
  const next = index < publishedProjects.length - 1 ? publishedProjects[index + 1] : null;

  return (
    <main id="main" className="flex-1">
      <div className="mx-auto w-full max-w-page px-gutter">
        <header className="py-section">
          <MonoLabel tone="accent">{project.client}</MonoLabel>
          <h1 className="mt-6 text-title">{project.title}</h1>
          <p className="mt-8 max-w-measure text-lead text-muted">{project.tagline}</p>
        </header>
      </div>

      {/* Hero. A withheld project states why instead of showing a broken frame. */}
      {project.visuals.status === "withheld" ? (
        <div className="mx-auto w-full max-w-page px-gutter">
          <div className="border border-line bg-surface p-gutter py-16">
            <MonoLabel tone="accent">Visuals withheld</MonoLabel>
            <p className="mt-6 max-w-measure text-lead">{project.visuals.reason}</p>
            <p className="mt-4 max-w-measure text-small text-muted">
              The work is described in full below.
            </p>
          </div>
        </div>
      ) : project.cover ? (
        <div className="mx-auto w-full max-w-page px-gutter">
          <Figure media={project.cover} priority sizes="(min-width: 1440px) 88rem, 100vw" />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-page px-gutter">
        <div className="grid gap-x-16 gap-y-12 py-section lg:grid-cols-[1fr_18rem]">
          {/* Narrative */}
          <div className="order-2 lg:order-1">
            <section>
              <MonoLabel as="h2" tone="accent">
                What it was
              </MonoLabel>
              <p className="mt-6 max-w-measure text-lead">{project.summary}</p>
            </section>

            {project.constraint ? (
              <section className="mt-16">
                <MonoLabel as="h2" tone="accent">
                  The constraint
                </MonoLabel>
                <p className="mt-6 max-w-measure text-lead">{project.constraint}</p>
              </section>
            ) : null}

            {project.contribution?.length ? (
              <section className="mt-16">
                <MonoLabel as="h2" tone="accent">
                  What I did
                </MonoLabel>
                <ul className="mt-6 max-w-measure space-y-4">
                  {project.contribution.map((item) => (
                    <li key={item} className="border-l border-accent-dim pl-5 text-body">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.outcome ? (
              <section className="mt-16">
                <MonoLabel as="h2" tone="accent">
                  Outcome
                </MonoLabel>
                <p className="mt-6 max-w-measure text-lead">{project.outcome}</p>
              </section>
            ) : null}

            {project.links?.length ? (
              <section className="mt-16">
                <MonoLabel as="h2" tone="accent">
                  Links
                </MonoLabel>
                <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-meta text-accent underline decoration-accent-dim underline-offset-4 hover:decoration-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {/* Metadata */}
          <aside className="order-1 lg:order-2">
            <Meta label="Role" value={project.role} />
            <Meta label="Client" value={project.client} />
            {project.studio ? <Meta label="Studio" value={project.studio} /> : null}
            <Meta label="Year" value={project.year} />
            <Meta label="Platform" value={project.platform} />
            <div className="border-t border-line-soft py-4">
              <MonoLabel>Discipline</MonoLabel>
              <p className="mt-2 font-mono text-meta text-text">
                {project.disciplines.map((d) => DISCIPLINE_LABELS[d]).join(", ")}
              </p>
            </div>
            <div className="border-t border-line-soft py-4">
              <MonoLabel>Stack</MonoLabel>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {project.video ? (
          <section className="pb-section">
            <MonoLabel as="h2" tone="accent" className="mb-8">
              Demo
            </MonoLabel>
            <VideoFacade video={project.video} />
          </section>
        ) : null}

        {project.media.length > 0 ? (
          <section className="pb-section">
            <MonoLabel as="h2" tone="accent" className="mb-8">
              Gallery
            </MonoLabel>
            <Gallery media={project.media} />
          </section>
        ) : null}

        <nav
          aria-label="More projects"
          className="grid gap-8 border-t border-line py-16 sm:grid-cols-2"
        >
          {previous ? (
            <Link href={`/work/${previous.slug}`} className="group">
              <MonoLabel>Previous</MonoLabel>
              <p className="mt-2 text-heading transition-colors duration-fast ease-out-quint group-hover:text-accent">
                {previous.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/work/${next.slug}`} className="group sm:text-right">
              <MonoLabel>Next</MonoLabel>
              <p className="mt-2 text-heading transition-colors duration-fast ease-out-quint group-hover:text-accent">
                {next.title}
              </p>
            </Link>
          ) : null}
        </nav>
      </div>
    </main>
  );
}
