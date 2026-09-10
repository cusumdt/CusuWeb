import { clients, metrics } from "@/content/proof";
import { MonoLabel } from "@/components/ui/MonoLabel";

/**
 * Clients and hard numbers, directly under the hero.
 *
 * The profile was legible only to someone who read several paragraphs of muted
 * body copy. This states it at a glance: who he has shipped for, and four
 * figures that show the range from engine work to mobile art to tooling.
 *
 * The numbers are set large in mono and in the accent, which is the one place
 * on the site where data is allowed to be the loudest thing on screen.
 */
export function ProofBand() {
  return (
    <section aria-label="Clients and track record" className="border-t border-line">
      <div className="mx-auto w-full max-w-page px-gutter py-14">
        <MonoLabel as="h2">Shipped for</MonoLabel>
        <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          {clients.map((client) => (
            <li key={client} className="text-heading text-text">
              {client}
            </li>
          ))}
        </ul>

        <dl className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.value} className="border-t border-line-soft pt-5">
              <dt className="font-mono text-title text-accent">{metric.value}</dt>
              <dd className="mt-3 max-w-measure text-small text-muted">{metric.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
