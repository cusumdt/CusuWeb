import { site, links } from "@/content/site";
import { experience } from "@/content/experience";

/**
 * Holding hero. Phase 5.1 replaces this with the real home page:
 * selected work, capability summary, current role, contact CTA.
 */
export default function Home() {
  const current = experience.filter((r) => r.current);

  return (
    <main id="main" className="mx-auto flex w-full max-w-page flex-1 flex-col px-gutter">
      <div className="flex flex-1 flex-col justify-center py-section">
        <p className="font-mono text-label uppercase text-accent">{site.role}</p>

        {/* The space before the break keeps the accessible name "Cristian Cusumano". */}
        <h1 className="mt-8 text-hero">
          Cristian{" "}
          <br />
          Cusumano
        </h1>

        <p className="mt-10 max-w-measure text-lead text-muted">
          Nine years bridging code and art. Unreal Engine 5 VR, real-time web 3D, and shipped
          Blender tooling, for Mercedes-Benz, Disney, Chevrolet and licensed IPs.
        </p>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
          {current.map((role) => (
            <li key={role.company} className="font-mono text-meta text-muted">
              <span className="text-text">{role.company}</span> {role.title}
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-t border-line py-10">
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            ["Email", links.email],
            ["LinkedIn", links.linkedin],
            ["ArtStation", links.artstation],
            ["GitHub", links.github],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-mono text-label uppercase text-muted transition-colors duration-fast ease-out-quint hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
