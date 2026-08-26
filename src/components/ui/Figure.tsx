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
 * Two rules the gallery learned the hard way:
 *
 * Nothing is ever rendered wider than the file actually is. A trimmed prop has
 * the pixels it has, and stretching it to fill a slot is what made the tiles
 * soft.
 *
 * A transparent asset gets no panel behind it. `bg-surface` is a placeholder
 * for an opaque image; behind a cut-out prop it reads as a visible box in a
 * lighter grey than the page.
 *
 * Video plays only when the reader presses play. No autoplay, which keeps it
 * clear of `prefers-reduced-motion` without needing client JS, and
 * `preload="metadata"` means the browser paints the real first frame rather
 * than us shipping a fabricated poster.
 */
export function Figure({
  media,
  priority = false,
  sizes = "(min-width: 1024px) 60rem, 100vw",
  maxHeight,
  className,
}: {
  media: Media;
  priority?: boolean;
  sizes?: string;
  /** CSS length. Caps a tall asset so a portrait hero cannot exceed the screen. */
  maxHeight?: string;
  className?: string;
}) {
  const blur = media.kind === "image" ? getBlur(media.src) : undefined;

  return (
    <figure className={cn("w-full", className)} style={{ maxWidth: `${media.width}px` }}>
      <div
        className={cn(
          "relative w-full overflow-hidden",
          media.transparent ? "bg-transparent" : "bg-surface",
        )}
        style={{
          aspectRatio: `${media.width} / ${media.height}`,
          ...(maxHeight ? { maxHeight, width: "auto" } : {}),
        }}
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
            className={media.transparent ? "object-contain" : "object-cover"}
            {...(blur && !media.transparent
              ? { placeholder: "blur" as const, blurDataURL: blur }
              : {})}
          />
        )}
      </div>
      {media.caption ? (
        <figcaption className="mt-3 font-mono text-meta text-muted">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}
