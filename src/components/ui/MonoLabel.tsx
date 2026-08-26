import { cn } from "@/lib/utils";

type Tone = "muted" | "accent" | "text";

const TONES: Record<Tone, string> = {
  muted: "text-muted",
  accent: "text-accent",
  text: "text-text",
};

/**
 * The small uppercase mono label used for eyebrows and section headers.
 * Anything that is a category or a piece of metadata is set in mono; that is
 * what makes the page read as engineered. See docs/DESIGN.md.
 */
export function MonoLabel({
  children,
  tone = "muted",
  as: Tag = "p",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  as?: "p" | "span" | "h2" | "h3" | "div";
  className?: string;
}) {
  return (
    <Tag className={cn("font-mono text-label uppercase", TONES[tone], className)}>{children}</Tag>
  );
}
