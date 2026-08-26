import type { Metadata } from "next";
import { site } from "@/content/site";
import { experience, education } from "@/content/experience";
import { skills, strengths } from "@/content/skills";
import { PageHeader } from "@/components/sections/PageHeader";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Tag } from "@/components/ui/Tag";
import { formatRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Game Engineer and Technical Artist in Santos, Brazil. Nine years across Unreal Engine 5 VR, Unity mobile, web 3D and Blender tooling, for Mercedes-Benz, Disney and Chevrolet.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-page flex-1 px-gutter">
      <PageHeader
        eyebrow={site.role}
        title="About"
        lead="I write engine code and I art-direct. Most people do one. Working across both is what lets me fix a pipeline problem at its root instead of working around it downstream."
      />

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
