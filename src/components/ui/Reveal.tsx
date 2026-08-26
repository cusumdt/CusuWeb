"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** useLayoutEffect warns during SSR; on the server there is nothing to lay out. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Reveal even if the observer never fires. Content is never hidden for good. */
const FAILSAFE_MS = 1200;

type State = "initial" | "hidden" | "shown";

/**
 * Scroll-in reveal: a short fade plus a small translate, nothing more.
 *
 * The content is visible unless this component is actively able to animate it.
 * The server renders it shown, so no-JS readers see everything. On mount, and
 * only when the reader has not asked for reduced motion and
 * IntersectionObserver exists, it hides the content before paint and reveals it
 * on intersection. A failsafe timer reveals it anyway if the observer never
 * fires, which is what happens in a background or non-compositing tab.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("initial");

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }
    // Hide before the browser paints, so there is no flash of visible content.
    setState("hidden");
  }, []);

  useEffect(() => {
    if (state !== "hidden") return;

    const el = ref.current;
    if (!el) {
      setState("shown");
      return;
    }

    const reveal = () => setState("shown");
    const failsafe = window.setTimeout(reveal, FAILSAFE_MS);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [state]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: state === "shown" && delay ? `${delay}ms` : undefined }}
      className={cn(
        "transition-[opacity,transform] duration-slow ease-out-quint motion-reduce:transition-none",
        state === "hidden" ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
