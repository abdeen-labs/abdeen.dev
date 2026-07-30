import Link from "next/link";
import type { Metadata } from "next";
import FadeInWrapper from "@/components/FadeInWrapper";

export const metadata: Metadata = {
  title: "Not found",
  description: "This address does not resolve to a unit.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-14rem)] w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <FadeInWrapper direction="up" eager>
        <span className="micro-label">
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-signal-identity" />
          404 · Not found
        </span>
      </FadeInWrapper>

      <FadeInWrapper direction="up" delay={0.05} eager>
        <h1 className="text-h1 md:text-display">No such unit.</h1>
      </FadeInWrapper>

      <FadeInWrapper direction="up" delay={0.1} eager>
        <p className="max-w-md text-body text-ink-dim">
          This address does not resolve to a unit. The page moved, retired,
          or never existed. The index lists everything that runs.
        </p>
      </FadeInWrapper>

      <FadeInWrapper direction="up" delay={0.15} eager>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn--primary">
            Return to index
          </Link>
        </div>
      </FadeInWrapper>
    </div>
  );
}
