import { MonoLabel } from "@/components/ui/MonoLabel";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="py-section">
      <MonoLabel tone="accent">{eyebrow}</MonoLabel>
      <h1 className="mt-6 text-display">{title}</h1>
      {lead ? <p className="mt-8 max-w-measure text-lead text-muted">{lead}</p> : null}
      {children}
    </header>
  );
}
