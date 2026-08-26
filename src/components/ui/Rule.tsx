import { cn } from "@/lib/utils";

/**
 * A hairline. `soft` is for dividers inside a block, the default is for
 * separating sections.
 */
export function Rule({ soft = false, className }: { soft?: boolean; className?: string }) {
  return (
    <hr
      className={cn("border-t", soft ? "border-line-soft" : "border-line", className)}
    />
  );
}
