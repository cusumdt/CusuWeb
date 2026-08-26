import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { getBlur } from "@/lib/media";
import { DISCIPLINE_LABELS } from "@/lib/disciplines";
import { MonoLabel } from "@/components/ui/MonoLabel";

/**
 * Stands in for the cover when a project's visuals cannot be published.
 *
 * It has to read as deliberate rather than as a failed image load, so it is a
 * composed block with the reason stated plainly, not a placeholder graphic.
 */
function WithheldCover({ reason }: { reason: string }) {
  return (
    <div className="flex aspect-[16/10] w-full flex-col justify-between border border-line bg-surface p-6">
      <MonoLabel tone="accent">Visuals withheld</MonoLabel>
      <p className="max-w-[32ch] text-small text-muted">{reason}</p>
    </div>
  );
}

function PendingCover() {
  return (
    <div className="flex aspect-[16/10] w-full items-end border border-line-soft bg-surface p-6">
      <MonoLabel>Captures pending</MonoLabel>
    </div>
  );
}

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { visuals, cover } = project;

  return (
    <article className="group">
      <Link href={`/work/${project.slug}`} className="block">
        {visuals.status === "withheld" ? (
          <WithheldCover reason={visuals.reason} />
        ) : cover ? (
          <div
            className="relative w-full overflow-hidden bg-surface"
            style={{ aspectRatio: "16 / 10" }}
          >
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              // Measured, not guessed. The page caps at 88rem with a fluid
              // gutter, so a card is 40rem once the page stops growing, and
              // tracks 45vw below that. Declaring 40rem everywhere made
              // Lighthouse fetch 750px files for 576px boxes.
              sizes="(min-width: 1408px) 40rem, (min-width: 768px) 45vw, calc(100vw - 2.5rem)"
              priority={priority}
              className="object-cover transition-transform duration-slow ease-out-quint group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              {...(() => {
                const blur = getBlur(cover.src);
                return blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};
              })()}
            />
          </div>
        ) : (
          <PendingCover />
        )}

        <div className="mt-5">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <MonoLabel>{project.client}</MonoLabel>
            <span className="font-mono text-meta text-muted">{project.year}</span>
          </div>

          <h3 className="mt-3 text-heading transition-colors duration-fast ease-out-quint group-hover:text-accent">
            {project.title}
          </h3>

          <p className="mt-2 max-w-measure text-small text-muted">{project.tagline}</p>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {project.disciplines.map((d) => (
              <li key={d} className="font-mono text-meta text-muted">
                {DISCIPLINE_LABELS[d]}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
