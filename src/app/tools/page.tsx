import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { tools } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Tools",
  description: "Small, focused browser tools from Abdeen Labs.",
  alternates: { canonical: "https://abdeen.dev/tools" },
};

export default function ToolsPage() {
  return (
    <div className="site-frame site-frame--wide">
      <header className="registry-intro motion-block">
        <div>
          <span className="page-kicker">Tools</span>
          <h1>Every tool, on the record</h1>
          <p>A collection of small, focused utilities. Pick one and get to work.</p>
        </div>
      </header>

      <section className="tool-gallery" aria-label="Available tools">
        {tools.map((tool, index) => (
          <Link
            href={tool.href}
            className="tool-gallery__card motion-row"
            key={tool.href}
            style={{ animationDelay: `calc(var(--route-hold) + ${80 + index * 45}ms)` }}
          >
            <span className="tool-gallery__topline">
              <span className="registry-meta">{String(index + 1).padStart(2, "0")}</span>
              <Icon name="arrow-right" size={20} />
            </span>
            <span className="tool-gallery__copy">
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
