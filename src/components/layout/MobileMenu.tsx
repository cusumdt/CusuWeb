"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Small-screen navigation.
 *
 * Opens a full-screen panel, traps Tab inside it, closes on Escape or on a
 * route change, locks background scroll while open, and returns focus to the
 * trigger on close.
 */
export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on navigation, adjusted during render rather than in an effect, so the
  // panel never paints once over the new route. Covers back/forward too, which a
  // click handler on the links would miss.
  const [routeWhenRendered, setRouteWhenRendered] = useState(pathname);
  if (pathname !== routeWhenRendered) {
    setRouteWhenRendered(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const nodes = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

    nodes()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = nodes();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      (trigger ?? previous)?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="font-mono text-label uppercase text-text transition-colors duration-fast ease-out-quint hover:text-accent md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 flex flex-col bg-ink px-gutter pt-24 pb-12 md:hidden"
        >
          <nav className="flex flex-col gap-2">
            {items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "border-b border-line-soft py-5 text-title transition-colors duration-fast ease-out-quint",
                    active ? "text-accent" : "text-text hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-auto self-start font-mono text-label uppercase text-muted transition-colors duration-fast ease-out-quint hover:text-accent"
          >
            Close menu
          </button>
        </div>
      ) : null}
    </>
  );
}
