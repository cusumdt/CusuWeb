import Link from "next/link";
import { nav, site } from "@/content/site";
import { MobileMenu } from "./MobileMenu";
import { DesktopNav } from "./DesktopNav";

/**
 * Sticky, solid, hairline-ruled. No blur panel: docs/DESIGN.md bans
 * glassmorphism, and a solid ground keeps text over it legible.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink">
      <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-gutter">
        <Link
          href="/"
          className="font-mono text-label uppercase text-text transition-colors duration-fast ease-out-quint hover:text-accent"
        >
          {site.name}
        </Link>

        <DesktopNav items={nav} />
        <MobileMenu items={nav} />
      </div>
    </header>
  );
}
