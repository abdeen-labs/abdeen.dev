'use client';

import Link from 'next/link';
import { useEffect } from 'react';

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
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 pb-20 pt-16 md:pt-24">
      {/* Hazard tape is reserved for a real error state. */}
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="abd-hazard h-4 w-16" />
        <span className="micro-label">Error</span>
      </div>
      <h1 className="text-h2 md:text-h1">Something went wrong.</h1>
      <p className="max-w-xl text-body text-ink-dim">
        Try the page again. If the problem continues, return home and start over.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={reset} className="btn btn--primary">
          Try again
        </button>
        <Link href="/" className="btn btn--quiet">
          Back to home
        </Link>
      </div>
    </div>
  );
}
