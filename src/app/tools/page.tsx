import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Tools",
  description: "Every Abdeen Labs browser tool, with its privacy boundary stated in plain language.",
  alternates: { canonical: "https://abdeen.dev/tools" },
};

export default function ToolsPage() {
  return (
    <div className="site-frame site-frame--wide">
      <header className="registry-intro motion-block">
        <div>
          <span className="page-kicker">Tools</span>
          <h1>Every tool, on the record</h1>
          <p>Each one works without an account and publishes its boundary: what stays on this device, what leaves it, and when.</p>
        </div>
      </header>

      <section className="tool-registry" aria-label="Tool registry">
        <div className="tool-registry__header" aria-hidden="true">
          <span>No</span><span>Tool</span><span>What it does</span><span>Boundary</span><span>Status</span>
        </div>
        {tools.map((tool, index) => (
          <Link
            href={tool.href}
            className="tool-registry__row motion-row"
            key={tool.href}
            style={{ animationDelay: `calc(var(--route-hold) + ${80 + index * 45}ms)` }}
          >
            <span className="registry-meta">{String(index + 1).padStart(2, "0")}</span>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
            <span className="registry-boundary">{tool.boundary}</span>
            <span className="registry-meta">Live · {tool.meta.replace("/", "") || "Web"}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
