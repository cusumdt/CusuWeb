import Image from "next/image";
import Link from "next/link";
import { site, heroImage } from "@/content/site";
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
 * The scrim runs left to right, not bottom to top. A bottom-up gradient dark
 * enough to carry the type buried the art, which was the first thing Cusu said
 * about it. Sideways, the copy sits on near-solid ink and the right half of the
 * frame stays legible as a night street. Contrast is measured against the
 * brightest pixel under each text node, not estimated.
 */
export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink from-25% via-ink/80 via-60% to-ink/25"
      />
      {/* A light veil along the bottom edge so the credit line and the buttons
          keep their footing wherever the art happens to be bright. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="mx-auto w-full max-w-page px-gutter pt-24 pb-20">
        {/* The role sits under the name rather than above it. The h1 runs to
            127px, which pushed an eyebrow into the thin part of the scrim:
            measured at 2.87:1 against the bright art, under the 4.5 floor. */}
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
