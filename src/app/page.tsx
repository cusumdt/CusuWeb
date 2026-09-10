import Link from "next/link";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { strengths } from "@/content/skills";
import { publishedProjects, homeProjects } from "@/content/projects";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { HomeHero } from "@/components/sections/HomeHero";
import { ProofBand } from "@/components/sections/ProofBand";
import { PersonJsonLd } from "@/components/seo/JsonLd";

/**
 * Order matters here, and it changed.
 *
 * The page used to run hero, current roles, work. The first image appeared
 * 1715px down, nearly two screens, on a portfolio whose whole argument is
 * visual. Work now comes third, right after the hero and the proof band, and
 * the written sections follow it rather than gate it.
 */
export default function Home() {
  const current = experience.filter((r) => r.current);

  return (
    <main id="main" className="flex-1">
      <PersonJsonLd />

      <HomeHero />
      <ProofBand />

      {/* Selected work */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-page px-gutter py-section">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <MonoLabel as="h2" tone="accent">
              Selected work
            </MonoLabel>
            <Link
              href="/work"
              className="font-mono text-label uppercase text-muted transition-colors duration-fast ease-out-quint hover:text-accent"
            >
              All {publishedProjects.length} projects
            </Link>
          </div>

          {/* No priority. These sit below the fold, and marking them eager
              emitted image preloads that competed with the fonts the hero
              needs. */}
          <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {homeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Current roles */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-page px-gutter py-section">
          <MonoLabel as="h2" tone="accent">
            Currently
          </MonoLabel>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {current.map((role) => (
              <li key={role.company} className="border-t border-line-soft pt-6">
                <p className="font-mono text-meta text-accent">{role.start} to present</p>
                <h3 className="mt-3 text-heading">{role.company}</h3>
                <p className="mt-1 font-mono text-meta text-muted">{role.title}</p>
                <p className="mt-4 max-w-measure text-small text-muted">{role.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capability */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-page px-gutter py-section">
          <MonoLabel as="h2" tone="accent">
            What I bring
          </MonoLabel>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {strengths.map((s) => (
              <div key={s.title}>
                <h3 className="text-heading">{s.title}</h3>
                <p className="mt-3 max-w-measure text-body text-muted">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/about" variant="secondary">
              More about me
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-page px-gutter py-section">
          <MonoLabel as="h2" tone="accent">
            Next
          </MonoLabel>
          <p className="mt-8 max-w-measure text-title">{site.availability}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={`mailto:${site.email}`}>{site.email}</Button>
            <Button href="/contact" variant="secondary">
              Other ways to reach me
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
