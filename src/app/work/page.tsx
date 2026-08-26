import type { Metadata } from "next";
import Link from "next/link";
import { publishedProjects } from "@/content/projects";
import { DISCIPLINES, DISCIPLINE_LABELS, isDiscipline } from "@/lib/disciplines";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Unreal Engine 5 VR, real-time web 3D, mobile game art and Blender tooling, for Mercedes-Benz, Disney, Chevrolet and IPs like SpongeBob and Tower of God.",
};

/**
 * The discipline filter is a set of links driving a search param, not client
 * state. It works with JavaScript disabled, it is linkable, and it survives a
 * page reload. No "use client" anywhere on this route.
 */
export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ discipline?: string }>;
}) {
  const { discipline } = await searchParams;
  const active = isDiscipline(discipline) ? discipline : null;

  const projects = active
    ? publishedProjects.filter((p) => p.disciplines.includes(active))
    : publishedProjects;

  return (
    <main id="main" className="mx-auto w-full max-w-page flex-1 px-gutter">
      <PageHeader
        eyebrow="Selected work"
        title="Work"
        lead="Nine years of shipped projects, across engine code, technical art, 3D production and web 3D. Two of them can be described but not shown."
      >
        <nav aria-label="Filter by discipline" className="mt-12 flex flex-wrap gap-2">
          <Link
            href="/work"
            aria-current={active === null ? "true" : undefined}
            className={cn(
              "border px-3 py-1.5 font-mono text-meta transition-colors duration-fast ease-out-quint",
              active === null
                ? "border-accent text-accent"
                : "border-line text-muted hover:border-accent hover:text-accent",
            )}
          >
            All ({publishedProjects.length})
          </Link>
          {DISCIPLINES.map((d) => {
            const count = publishedProjects.filter((p) => p.disciplines.includes(d)).length;
            if (count === 0) return null;
            return (
              <Link
                key={d}
                href={`/work?discipline=${d}`}
                aria-current={active === d ? "true" : undefined}
                className={cn(
                  "border px-3 py-1.5 font-mono text-meta transition-colors duration-fast ease-out-quint",
                  active === d
                    ? "border-accent text-accent"
                    : "border-line text-muted hover:border-accent hover:text-accent",
                )}
              >
                {DISCIPLINE_LABELS[d]} ({count})
              </Link>
            );
          })}
        </nav>
      </PageHeader>

      <section aria-label="Projects" className="border-t border-line pt-16 pb-section">
        <p className="sr-only" role="status">
          {projects.length} project{projects.length === 1 ? "" : "s"}
          {active ? ` in ${DISCIPLINE_LABELS[active]}` : ""}
        </p>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 2} />
          ))}
        </div>
      </section>
    </main>
  );
}
