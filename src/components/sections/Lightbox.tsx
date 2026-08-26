"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Media } from "@/lib/types";
import { getBlur } from "@/lib/media";
import { Figure } from "@/components/ui/Figure";

/**
 * Gallery with a keyboard-operable lightbox.
 *
 * The figures render as plain content first, so the gallery is complete
 * whether or not the overlay ever opens. Arrow keys move between images,
 * Escape closes, focus stays inside the overlay while it is open.
 *
 * On close, focus lands on the thumbnail of the image last viewed rather than
 * the one originally clicked. After arrowing through a gallery, that is where
 * the reader actually is.
 */
export function Gallery({ media }: { media: Media[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);

  const isOpen = index !== null;

  // Tracked in a ref so stepping through images does not re-run the effect
  // below, which would tear down the scroll lock and steal focus on every
  // arrow press.
  const lastIndexRef = useRef(0);
  useEffect(() => {
    if (index !== null) lastIndexRef.current = index;
  }, [index]);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + media.length) % media.length)),
    [media.length],
  );

  // Open and close: scroll lock, initial focus, focus restore.
  useEffect(() => {
    if (!isOpen) return;

    // The array itself is stable for the life of the component; only its
    // entries change, so holding it across the cleanup is safe.
    const triggers = triggersRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      triggers[lastIndexRef.current]?.focus();
    };
  }, [isOpen]);

  // Keyboard handling, kept separate so it can depend on the handlers.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Tab") {
        // Close is the only focusable control in the overlay, so Tab holds it.
        e.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, step]);

  const current = index === null ? null : media[index];
  const blur = current ? getBlur(current.src) : undefined;

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        {media.map((item, i) => (
          <button
            key={item.src}
            ref={(el) => {
              triggersRef.current[i] = el;
            }}
            type="button"
            onClick={() => setIndex(i)}
            aria-haspopup="dialog"
            className="group block cursor-zoom-in text-left"
          >
            <Figure
              media={item}
              sizes="(min-width: 768px) 40rem, 100vw"
              className="transition-opacity duration-fast ease-out-quint group-hover:opacity-90 motion-reduce:transition-none"
            />
            <span className="sr-only">Open larger view</span>
          </button>
        ))}
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-50 flex flex-col bg-ink"
        >
          <div className="flex items-center justify-between border-b border-line px-gutter py-4">
            <p className="font-mono text-meta text-muted">
              {(index ?? 0) + 1} / {media.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="font-mono text-label uppercase text-text transition-colors duration-fast ease-out-quint hover:text-accent"
            >
              Close
            </button>
          </div>

          {/* Click-to-dismiss is supplementary; Escape and the Close button are
              the keyboard path, so this carries no interactive semantics. */}
          <div className="relative flex-1" onClick={close}>
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain p-gutter"
              {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
            />
          </div>

          {current.caption ? (
            <p className="border-t border-line px-gutter py-4 font-mono text-meta text-muted">
              {current.caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
