import { clients, licensedIps, metrics } from "@/content/proof";
import { MonoLabel } from "@/components/ui/MonoLabel";

/**
 * Clients, licensed IPs and hard numbers, directly under the hero.
 *
 * The profile used to be legible only to someone who read several paragraphs of
 * muted body copy. This states it at a glance.
 *
 * The two lists are kept apart deliberately. See `src/content/proof.ts`: the
 * companies commissioned the work, the properties are what he built games on,
 * and merging them would claim a relationship with Nickelodeon that does not
 * exist.
 *
 * The numbers are set large in mono and in the accent. This is the one place on
 * the site where data is allowed to be the loudest thing on screen.
 */
export function ProofBand() {
  return (
    <section aria-label="Clients and track record" className="border-t border-line">
      <div className="mx-auto w-full max-w-page px-gutter py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <MonoLabel as="h2">Clients</MonoLabel>
            <ul className="mt-5 flex flex-wrap items-baseline gap-x-7 gap-y-2">
              {clients.map((client) => (
                <li key={client} className="text-title text-text">
                  {client}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <MonoLabel as="h2">Licensed IPs shipped</MonoLabel>
            <ul className="mt-5 flex flex-wrap items-baseline gap-x-7 gap-y-2">
              {licensedIps.map((ip) => (
                <li key={ip} className="text-heading text-muted">
                  {ip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
