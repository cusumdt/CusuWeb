import { site, links } from "@/content/site";
import { MonoLabel } from "@/components/ui/MonoLabel";

const ELSEWHERE = [
  { label: "Email", href: links.email },
  { label: "LinkedIn", href: links.linkedin },
  { label: "ArtStation", href: links.artstation },
  { label: "GitHub", href: links.github },
  { label: "WhatsApp", href: links.whatsapp },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid w-full max-w-page gap-12 px-gutter py-16 md:grid-cols-3">
        <div>
          <MonoLabel tone="accent">Available</MonoLabel>
          <p className="mt-4 max-w-measure text-small text-muted">{site.availability}</p>
        </div>

        <div>
          <MonoLabel as="h2">Elsewhere</MonoLabel>
          <ul className="mt-4 flex flex-col gap-2">
            {ELSEWHERE.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-small text-text transition-colors duration-fast ease-out-quint hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <MonoLabel as="h2">Based in</MonoLabel>
          <p className="mt-4 text-small text-muted">{site.location}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {site.languages.map((lang) => (
              <li key={lang.name} className="font-mono text-meta text-muted">
                {lang.name}, {lang.level}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-page px-gutter pb-10">
        <p className="font-mono text-meta text-muted">
          {site.name}, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
