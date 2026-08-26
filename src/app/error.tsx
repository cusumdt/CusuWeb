"use client";

import { useEffect } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="mx-auto flex w-full max-w-page flex-1 items-center px-gutter">
      <div className="py-section">
        <MonoLabel tone="accent">Error</MonoLabel>
        <h1 className="mt-8 text-display">Something broke</h1>
        <p className="mt-8 max-w-measure text-lead text-muted">
          This page failed to render. Trying again may be enough; if it is not, the fault is on
          this end.
        </p>
        {error.digest ? (
          <p className="mt-6 font-mono text-meta text-muted">Digest: {error.digest}</p>
        ) : null}
        <div className="mt-12 flex flex-wrap gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Back home
          </Button>
        </div>
      </div>
    </main>
  );
}
