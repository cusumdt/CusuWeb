import Link from "next/link";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { strengths } from "@/content/skills";
import { publishedProjects, homeProjects } from "@/content/projects";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { PersonJsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  const current = experience.filter((r) => r.current);


  return (
    <main id="main" className="mx-auto w-full max-w-page flex-1 px-gutter">
      <PersonJsonLd />
      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col justify-center py-section">
        <Reveal>
          <MonoLabel tone="accent">{site.role}</MonoLabel>
        </Reveal>

        {/* The space before the break keeps the accessible name "Cristian Cusumano". */}
        <Reveal delay={60}>
          <h1 className="mt-8 text-hero">
            Cristian{" "}
            <br />
            Cusumano
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 max-w-measure text-lead text-muted">
            Nine years bridging code and art. Unreal Engine 5 VR, real-time web 3D, and shipped
            Blender tooling, for Mercedes-Benz, Disney, Chevrolet and licensed IPs.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-14 flex flex-wrap gap-4">
            <Button href="/work">See the work</Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Current roles */}
      <section className="border-t border-line py-section">
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
      </section>

      {/* Selected work */}
      <section className="border-t border-line py-section">
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

        {/* No priority here. Selected work sits far below the fold, and marking
            these eager emitted two image preloads that competed with the fonts
            for the hero text, which is the LCP element. */}
        <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {homeProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Capability */}
      <section className="border-t border-line py-section">
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
      </section>

      {/* Contact */}
      <section className="border-t border-line py-section">
        <MonoLabel as="h2" tone="accent">
          Next
        </MonoLabel>
        <p className="mt-8 max-w-measure text-title">{site.availability}</p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href={site.email ? `mailto:${site.email}` : "/contact"}>
            {site.email}
          </Button>
          <Button href="/contact" variant="secondary">
            Other ways to reach me
          </Button>
        </div>
      </section>
    </main>
  );
}
