import type { ReactNode } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { relatedTools, tools } from "@/lib/catalog";

interface ToolPageShellProps {
  title: string;
  description: string;
  eyebrow?: string;
  currentPath?: string;
  wide?: boolean;
  children: ReactNode;
}

/** Approved tool-page structure wrapped around the real, working tool UI. */
export default function ToolPageShell({
  title,
  description,
  eyebrow,
  currentPath,
  wide = false,
  children,
}: ToolPageShellProps) {
  const entry = tools.find((tool) => tool.href === currentPath);

  return (
    <div className={`site-frame tool-page${wide ? " tool-page--wide" : ""}`}>
      <header className="tool-intro motion-block" style={{ animationDelay: "30ms" }}>
        <span className="page-kicker">Tool {eyebrow ? `· ${eyebrow.replace("REF / ", "")}` : ""}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="tool-intro__meta">
          <span>{entry?.meta ?? currentPath}</span>
          <span>No account</span>
          <span>Runs in the browser</span>
        </div>
        <div className="tool-intro__actions">
          <Link href="/tools" className="text-link">All tools <Icon name="arrow-right" size={16} /></Link>
          <a href="https://github.com/abdeen-labs" target="_blank" rel="noopener noreferrer" className="text-link">
            View source <Icon name="arrow-up-right" size={16} />
          </a>
        </div>
      </header>

      <section className="tool-interface motion-block" aria-label={`${title} interface`} style={{ animationDelay: "120ms" }}>
        {children}
      </section>

      {entry?.privacy && (
        <section className="tool-boundaries motion-block" aria-labelledby="tool-boundaries-title" style={{ animationDelay: "200ms" }}>
          <span className="page-kicker">Boundaries</span>
          <h2 id="tool-boundaries-title">What stays, and what leaves</h2>
          <div className="tool-boundaries__grid">
            <div>
              <h3>Stays on this device</h3>
              <p>{entry.privacy.stays}</p>
            </div>
            <div>
              <h3>Leaves this device</h3>
              <p>{entry.privacy.leaves}</p>
            </div>
          </div>
        </section>
      )}

      <nav className="related-tools" aria-label="Related tools">
        <div className="related-tools__header">
          <span className="page-kicker">Related tools</span>
          <Link href="/tools" className="text-link">View all <Icon name="arrow-right" size={16} /></Link>
        </div>
        {relatedTools(currentPath ?? "").map((tool, index) => (
          <Link
            href={tool.href}
            className="related-tools__row motion-row"
            key={tool.href}
            style={{ animationDelay: `${270 + index * 60}ms` }}
          >
            <span className="registry-meta">{String(index + 1).padStart(2, "0")}</span>
            <span>{tool.title}</span>
            <Icon name="arrow-right" size={16} />
          </Link>
        ))}
      </nav>
    </div>
  );
}
