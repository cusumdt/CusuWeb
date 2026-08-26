import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Holding hero. Phase 5.1 replaces this with the real home page:
 * selected work, capability summary, current role, contact CTA.
 */
export default function Home() {
  const current = experience.filter((r) => r.current);

  return (
    <main id="main" className="mx-auto flex w-full max-w-page flex-1 flex-col px-gutter">
      <div className="flex flex-1 flex-col justify-center py-section">
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
          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
            {current.map((role) => (
              <li key={role.company} className="font-mono text-meta text-muted">
                <span className="text-text">{role.company}</span> {role.title}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-14 flex flex-wrap gap-4">
            <Button href="/work">See the work</Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
