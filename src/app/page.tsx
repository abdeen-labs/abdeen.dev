import Link from "next/link";
import Icon from "@/components/Icon";
import { SealKey } from "@/components/Seal";
import { apps, tools, type CatalogEntry } from "@/lib/catalog";
import { identity } from "@/lib/brand";

function EntryLink({ item, children, className }: { item: CatalogEntry; children: React.ReactNode; className?: string }) {
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link href={item.href} className={className}>{children}</Link>;
}

export default function HomePage() {
  const featured = apps.slice(0, 3);

  return (
    <div className="site-frame site-frame--wide">
      <section className="home-hero motion-block" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <span className="page-kicker">An independent studio</span>
          <h1 id="home-title">Software that stays yours.</h1>
          <p>{identity.description}</p>
        </div>
        <div className="home-hero__seal" aria-hidden="true">
          <SealKey size={176} decorative />
        </div>
      </section>

      <section className="featured-grid" aria-label="Featured products">
        {featured.map((item, index) => (
          <article
            key={item.href}
            className="featured-card motion-row"
            style={{ animationDelay: `calc(var(--route-hold) + ${80 + index * 60}ms)` }}
          >
            <span className="featured-card__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span className="registry-meta">{item.meta}</span>
            <EntryLink item={item} className="text-link">
              Open {item.title} <Icon name={item.external ? "arrow-up-right" : "arrow-right"} size={16} />
            </EntryLink>
          </article>
        ))}
      </section>

      <section className="home-tools motion-block" aria-labelledby="home-tools-title" style={{ animationDelay: "calc(var(--route-hold) + 190ms)" }}>
        <div>
          <span className="page-kicker">Browser tools</span>
          <h2 id="home-tools-title">Small utilities that do one thing well.</h2>
        </div>
        <div className="home-tools__list">
          {tools.slice(0, 4).map((tool, index) => (
            <Link
              href={tool.href}
              className="home-tool-row motion-row"
              key={tool.href}
              style={{ animationDelay: `calc(var(--route-hold) + ${230 + index * 45}ms)` }}
            >
              <span className="registry-meta">{String(index + 1).padStart(2, "0")}</span>
              <span>{tool.title}</span>
              <Icon name="arrow-right" size={16} />
            </Link>
          ))}
          <Link href="/tools" className="home-tool-row home-tool-row--all motion-row" style={{ animationDelay: "calc(var(--route-hold) + 410ms)" }}>
            <span className="registry-meta">{String(tools.length).padStart(2, "0")}</span>
            <span>View every tool</span>
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
