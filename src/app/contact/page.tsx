import type { Metadata } from "next";
import { site, links } from "@/content/site";
import { PageHeader } from "@/components/sections/PageHeader";
import { MonoLabel } from "@/components/ui/MonoLabel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cristian Cusumano, Senior Game Engineer and Technical Artist, based in Santos, Brazil and working with studios and teams internationally.",
  alternates: { canonical: "/contact" },
};

/** No contact form. There is no backend to receive one, and a mailto works. */
const CHANNELS = [
  { label: "Email", value: site.email, href: links.email },
  { label: "WhatsApp", value: site.phone, href: links.whatsapp },
  { label: "LinkedIn", value: "cristian-cusumano", href: links.linkedin },
  { label: "ArtStation", value: "cusumdt", href: links.artstation },
  { label: "GitHub", value: "cusumdt", href: links.github },
];

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-page flex-1 px-gutter">
      <PageHeader
        eyebrow="Get in touch"
        title="Contact"
        lead={site.availability}
      />

      <section className="border-t border-line py-section">
        <ul>
          {CHANNELS.map((c) => (
            <li key={c.label} className="border-b border-line-soft">
              <a
                href={c.href}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6"
              >
                <MonoLabel>{c.label}</MonoLabel>
                <span className="text-heading transition-colors duration-fast ease-out-quint group-hover:text-accent">
                  {c.value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <MonoLabel as="h2" tone="accent">
              Based in
            </MonoLabel>
            <p className="mt-4 text-body text-muted">{site.location}</p>
            <p className="mt-2 text-small text-muted">
              Working with teams across Australia, Spain, Argentina and Brazil.
            </p>
          </div>

          <div>
            <MonoLabel as="h2" tone="accent">
              Languages
            </MonoLabel>
            <ul className="mt-4 space-y-1">
              {site.languages.map((lang) => (
                <li key={lang.name} className="font-mono text-meta text-muted">
                  {lang.name}, {lang.level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
