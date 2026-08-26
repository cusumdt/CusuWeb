import Image from "next/image";
import type { Media } from "@/lib/types";
import { getBlur } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * A portfolio asset with its caption.
 *
 * Dimensions come from the content module and the aspect ratio is reserved in
 * CSS, so nothing shifts while the asset loads.
 *
 * Video plays only when the reader presses play. No autoplay, which keeps it
 * out of the way of `prefers-reduced-motion` without needing client JS, and
 * `preload="metadata"` means the browser paints the first frame as the poster
 * rather than us shipping a fabricated one.
 */
export function Figure({
  media,
  priority = false,
  sizes = "(min-width: 1024px) 60rem, 100vw",
  className,
}: {
  media: Media;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const blur = media.kind === "image" ? getBlur(media.src) : undefined;

  return (
    <figure className={cn("w-full", className)}>
      <div
        className="relative w-full overflow-hidden bg-surface"
        style={{ aspectRatio: `${media.width} / ${media.height}` }}
      >
        {media.kind === "video" ? (
          <video
            controls
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.poster}
            aria-label={media.alt}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={media.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover"
            {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
          />
        )}
      </div>
      {media.caption ? (
        <figcaption className="mt-3 font-mono text-meta text-muted">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}
