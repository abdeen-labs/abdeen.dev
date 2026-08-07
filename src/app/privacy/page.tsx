import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { tools } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What stays on your device and what leaves it, stated per tool.",
  alternates: { canonical: "https://abdeen.dev/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="site-frame site-frame--reading">
      <header className="document-intro motion-block" style={{ animationDelay: "30ms" }}>
        <span className="page-kicker">Privacy</span>
        <h1>What stays, and what leaves</h1>
        <p>Every browser tool works without an account and states its boundary here in plain language. Where a tool can send something, it happens only when you ask.</p>
      </header>

      <section className="privacy-table" aria-label="Privacy boundaries by tool">
        <div className="privacy-table__header" aria-hidden="true">
          <span>Tool</span><span>Stays on your device</span><span>Leaves your device</span>
        </div>
        {tools.map((tool, index) => (
          <article
            className="privacy-table__row motion-row"
            key={tool.href}
            style={{ animationDelay: `${100 + index * 45}ms` }}
          >
            <h2>{tool.title}</h2>
            <p><span className="mobile-field-label">Stays</span>{tool.privacy?.stays}</p>
            <p><span className="mobile-field-label">Leaves</span>{tool.privacy?.leaves}</p>
          </article>
        ))}
      </section>

      <section className="verify-block motion-block" aria-labelledby="verify-title" style={{ animationDelay: "420ms" }}>
        <span className="page-kicker">Verify it</span>
        <h2 id="verify-title">Don&apos;t take our word for it</h2>
        <p>The source is public. You can inspect what each tool does, build it yourself, and report anything that does not match the boundary stated here.</p>
        <div className="verify-block__links">
          <a href="https://github.com/abdeen-labs" target="_blank" rel="noopener noreferrer" className="text-link">
            Inspect the source <Icon name="arrow-up-right" size={16} />
          </a>
          <a href="mailto:help@abdeen.dev" className="text-link">
            Ask a question <Icon name="mail" size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
