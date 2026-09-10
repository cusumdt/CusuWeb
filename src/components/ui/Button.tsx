import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const BASE =
  "inline-flex items-center gap-2 font-mono text-label uppercase transition-colors duration-fast ease-out-quint disabled:opacity-50 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent px-6 py-3 text-ink hover:bg-accent-dim",
  secondary: "border border-line px-6 py-3 text-text hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-accent",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & (
  | ({ href: string } & Omit<React.ComponentPropsWithoutRef<"a">, "href" | "className">)
  | ({ href?: undefined } & Omit<React.ComponentPropsWithoutRef<"button">, "className">)
);

/**
 * Renders a real `<button>` when it acts, and a link when it navigates.
 * Never a div with an onClick. External hrefs get the usual rel hardening.
 */
export function Button({ children, variant = "primary", className, ...props }: Props) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (typeof props.href === "string") {
    const { href, ...rest } = props;
    const protocol = /^(https?:|mailto:|tel:)/.test(href);
    // A path with a file extension is an asset, not a route. next/link would
    // try to route to it client-side and only fall back to a real navigation
    // after failing to match, so the CV gets a plain anchor.
    const asset = /\.[a-z0-9]{2,4}$/i.test(href.split(/[?#]/)[0]);
    const external = protocol || asset;

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...rest } = props;
  void _href;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
