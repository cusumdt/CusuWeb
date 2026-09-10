import type { Metadata } from "next";
import { site, portrait, resume } from "@/content/site";
import { experience, education } from "@/content/experience";
import { skills, strengths } from "@/content/skills";
import { aboutLead, aboutNarrative } from "@/content/about";
import { PageHeader } from "@/components/sections/PageHeader";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { formatRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Game Engineer and Technical Artist in Santos, Brazil. Nine years across Unreal Engine 5 VR, Unity mobile, web 3D and commercial Blender tooling.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About, Cristian Cusumano",
    url: "/about",
  },
  twitter: { title: "About, Cristian Cusumano" },
};

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-page flex-1 px-gutter">
      <PageHeader
        eyebrow={site.role}
        title="About"
        lead={aboutLead}
      />

      <section className="border-t border-line py-section">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[16rem_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Figure
              media={{ kind: "image", ...portrait }}
              priority
              sizes="(min-width: 1024px) 16rem, (min-width: 640px) 18rem, 60vw"
              className="max-w-[18rem]"
            />
            <MonoLabel as="h2" tone="accent" className="mt-6">
              In my words
            </MonoLabel>

            {/* A recruiter forwards a file, not a link. */}
            <div className="mt-8">
              <Button href={resume.href} variant="secondary">
                Download the CV
              </Button>
              <p className="mt-3 font-mono text-meta text-muted">
                PDF, {resume.pages} pages, {resume.sizeKb} KB
              </p>
            </div>
          </div>
          <div className="space-y-14">
            {aboutNarrative.map((block) => (
              <div key={block.heading}>
                <h3 className="text-heading">{block.heading}</h3>
                {block.paragraphs.map((para) => (
                  <p key={para} className="mt-5 max-w-measure text-body text-muted">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-section">
        <MonoLabel as="h2" tone="accent">
          How I work
        </MonoLabel>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {strengths.map((s) => (
            <div key={s.title}>
              <h3 className="text-heading">{s.title}</h3>
              <p className="mt-3 max-w-measure text-body text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-section">
        <MonoLabel as="h2" tone="accent">
          Experience
        </MonoLabel>
        <ol className="mt-12">
          {experience.map((role) => (
            <li
              key={`${role.company}-${role.start}`}
              className="grid gap-x-12 gap-y-4 border-t border-line-soft py-10 first:border-t-0 lg:grid-cols-[14rem_1fr]"
            >
              <div>
                <p className="font-mono text-meta text-text">
                  {formatRange(role.start, role.end)}
                </p>
                <p className="mt-2 font-mono text-meta text-muted">{role.location}</p>
                {role.current ? (
                  <p className="mt-2 font-mono text-meta text-accent">Current</p>
                ) : null}
              </div>

              <div>
                <h3 className="text-heading">{role.title}</h3>
                <p className="mt-1 font-mono text-meta text-accent">{role.company}</p>
                <p className="mt-4 max-w-measure text-body text-muted">{role.summary}</p>

                <ul className="mt-5 max-w-measure space-y-2">
                  {role.highlights.map((h) => (
                    <li key={h} className="border-l border-line pl-4 text-small text-muted">
                      {h}
                    </li>
                  ))}
                </ul>

                {role.stack?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {role.stack.map((s) => (
                      <li key={s}>
                        <Tag>{s}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line py-section">
        <MonoLabel as="h2" tone="accent">
          Skills
        </MonoLabel>
        <dl className="mt-12 grid gap-10 md:grid-cols-2">
          {skills.map((group) => (
            <div key={group.label}>
              <dt className="font-mono text-meta text-text">{group.label}</dt>
              <dd className="mt-4">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-line py-section">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <MonoLabel as="h2" tone="accent">
              Education
            </MonoLabel>
            <ul className="mt-10 space-y-8">
              {education.map((item) => (
                <li key={item.title}>
                  <h3 className="text-heading">{item.title}</h3>
                  <p className="mt-2 font-mono text-meta text-muted">
                    {item.org}
                    {item.period ? `, ${item.period}` : ""}
                  </p>
                  {item.detail ? (
                    <p className="mt-2 max-w-measure text-small text-muted">{item.detail}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <MonoLabel as="h2" tone="accent">
              Languages
            </MonoLabel>
            <ul className="mt-10 space-y-4">
              {site.languages.map((lang) => (
                <li key={lang.name} className="border-t border-line-soft pt-4">
                  <p className="text-heading">{lang.name}</p>
                  <p className="mt-1 font-mono text-meta text-muted">{lang.level}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
