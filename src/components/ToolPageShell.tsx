import type { ReactNode } from "react";
import Link from "next/link";
import FadeInWrapper from "@/components/FadeInWrapper";
import { relatedTools } from "@/lib/catalog";

interface ToolPageShellProps {
  title: string;
  description: string;
  /** Mono identification code shown top-right (e.g. "REF / QR"). */
  eyebrow?: string;
  /** Catalog href of this tool — keys the related-tools rotation. */
  currentPath?: string;
  /** Widen the shell for tools that lay out two panes internally. */
  wide?: boolean;
  children: ReactNode;
}

/** The instrument panel every browser tool mounts into: one square plate
 *  with an identification bar, the unit title, and the working surface,
 *  then cross-navigation to related units. */
export default function ToolPageShell({
  title,
  description,
  eyebrow,
  currentPath,
  wide = false,
  children,
}: ToolPageShellProps) {
  return (
    <div
      className={`mx-auto flex w-full flex-col gap-6 pb-16 pt-4 md:gap-8 md:pb-24 md:pt-8 ${
        wide ? "max-w-5xl" : "max-w-3xl"
      }`}
    >
      <FadeInWrapper direction="up" eager>
        <section className="plate">
          {/* Identification bar — ties the unit back to the index */}
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3 md:px-8">
            <Link href="/#tools" className="micro-label chrome-link">
              <span aria-hidden="true" className="text-signal-identity">
                &larr;
              </span>
              All tools
            </Link>
            {eyebrow && <span className="micro-label">{eyebrow}</span>}
          </div>

          {/* Unit title */}
          <div className="px-5 py-6 md:px-8 md:py-8">
            <h1 className="text-h3 md:text-h2">{title}</h1>
            <p className="mt-3 max-w-2xl text-body text-ink-secondary">
              {description}
            </p>
          </div>

          {/* Working surface */}
          <div className="border-t border-hairline px-5 py-7 md:px-8 md:py-9">
            {children}
          </div>
        </section>
      </FadeInWrapper>

      {/* Cross-navigation — every unit is one action from the next */}
      <FadeInWrapper direction="up" delay={0.06}>
        <nav aria-label="Related tools" className="px-1">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="micro-label">
              <span aria-hidden="true" className="text-signal-identity">
                /
              </span>
              Related tools
            </span>
            <Link href="/#tools" className="micro-label chrome-link">
              View all{" "}
              <span aria-hidden="true" className="index-arrow">
                &rarr;
              </span>
            </Link>
          </div>
          <div className="related-index">
            {relatedTools(currentPath ?? "").map((tool, index) => (
              <Link key={tool.href} href={tool.href} className="related-link">
                <span aria-hidden="true" className="index-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-control font-medium text-ink-primary">
                  {tool.title}
                </span>
                <span aria-hidden="true" className="index-arrow ml-auto">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </FadeInWrapper>
    </div>
  );
}
