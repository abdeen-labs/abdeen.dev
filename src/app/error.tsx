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
      {/* Hazard tape sits beside an actual fault — this is one. */}
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="abd-hazard h-4 w-16" />
        <span className="micro-label">Render fault</span>
      </div>
      <h1 className="text-h2 md:text-h1">Page fault.</h1>
      <p className="max-w-xl text-body text-ink-dim">
        The fault is on this end, not yours. Nothing you entered was sent
        anywhere.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={reset} className="btn btn--primary">
          Retry render
        </button>
        <Link href="/" className="btn btn--quiet">
          Return to index
        </Link>
      </div>
    </div>
  );
}
