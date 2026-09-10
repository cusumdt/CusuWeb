import Image from "next/image";
import Link from "next/link";
import { site, heroImage } from "@/content/site";
import { getMedia } from "@/content/projects";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";

/**
 * Full-bleed hero.
 *
 * The site used to open with two screens of text before any work appeared,
 * which for a 3D artist's portfolio buried the only thing a reader came for.
 * The first screen is now his own environment art.
 *
 * The image is credited and links to its project. It is a portfolio piece doing
 * a job, not wallpaper, and a reader who likes it can go straight to the case
 * study.
 *
 * Text sits on a scrim, not on the render. `docs/DESIGN.md` requires contrast
 * to be measured rather than eyeballed, and the underlying art is bright pink
 * and violet in places.
 */
export function HomeHero() {
  const media = getMedia(heroImage.src);

  return (
    <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden">
      {media ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
      ) : null}

      {/* Scrim. Measured, not guessed: at the first pass the accent eyebrow
          came out at 2.69:1 against a bright yellow patch of the art. The
          gradient now reaches near-opacity by the time it meets the type, and
          the art keeps the top third of the frame. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-45% via-ink/92 via-70% to-ink/30"
      />

      <div className="mx-auto w-full max-w-page px-gutter pt-24 pb-20">
        {/* The role sits under the name rather than above it. The h1 runs to
            127px, which pushed an eyebrow into the top of the frame where the
            scrim is thin: measured at 2.87:1 against the bright art, under the
            4.5 floor. Below the name it lands in the opaque zone, and the name
            leads, which is the better hierarchy anyway. */}
        {/* The space before the break keeps the accessible name "Cristian Cusumano". */}
        <h1 className="text-hero">
          Cristian <br />
          Cusumano
        </h1>

        <MonoLabel tone="accent" className="mt-6">
          {site.role}
        </MonoLabel>

        <p className="mt-8 max-w-measure text-lead text-text">
          Nine years bridging code and art. Unreal Engine 5 VR, real-time web 3D, and shipped
          Blender tooling, for Mercedes-Benz, Disney, Chevrolet and licensed IPs.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/work">See the work</Button>
          <Button href="/contact" variant="secondary">
            Get in touch
          </Button>
        </div>

        <Link
          href={`/work/${heroImage.projectSlug}`}
          className="mt-14 inline-block font-mono text-meta text-muted transition-colors duration-fast ease-out-quint hover:text-accent"
        >
          Above: {heroImage.credit}
        </Link>
      </div>
    </section>
  );
}
