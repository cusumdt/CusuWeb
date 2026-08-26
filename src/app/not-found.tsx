import type { Metadata } from "next";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Not found",
  description: "That page does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-page flex-1 items-center px-gutter">
      <div className="py-section">
        <MonoLabel tone="accent">404</MonoLabel>
        <h1 className="mt-8 text-display">Nothing here</h1>
        <p className="mt-8 max-w-measure text-lead text-muted">
          That page does not exist. It may have been renamed when this site was rebuilt.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/">Back home</Button>
          <Button href="/work" variant="secondary">
            See the work
          </Button>
        </div>
      </div>
    </main>
  );
}
