import { cn } from "@/lib/utils";

/**
 * A stack or discipline chip. Data, so it is set in mono.
 */
export function Tag({
  children,
  active = false,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border px-3 py-1.5 font-mono text-meta",
        active ? "border-accent text-accent" : "border-line text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
