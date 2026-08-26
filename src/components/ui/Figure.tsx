import Image from "next/image";
import type { Media } from "@/lib/types";
import { getBlur } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * A portfolio image with its caption.
 *
 * Dimensions come from the content module and the aspect ratio is reserved in
 * CSS, so nothing shifts while the image decodes. The blur placeholder is
 * looked up from the generated map rather than stored per entry.
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
  const blur = getBlur(media.src);

  return (
    <figure className={cn("w-full", className)}>
      <div
        className="relative w-full overflow-hidden bg-surface"
        style={{ aspectRatio: `${media.width} / ${media.height}` }}
      >
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
      </div>
      {media.caption ? (
        <figcaption className="mt-3 font-mono text-meta text-muted">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}
