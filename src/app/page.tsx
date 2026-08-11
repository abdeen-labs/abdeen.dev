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
  const spotlight = apps.find((item) => item.spotlight) ?? apps[0];
  const spotlightIndex = apps.indexOf(spotlight);

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

      <section className="project-showcase" aria-label="Projects">
        <article
          className="project-spotlight motion-row"
          style={{ animationDelay: "calc(var(--route-hold) + 80ms)" }}
        >
          <div className="project-spotlight__header">
            <span className="page-kicker">Latest release</span>
            <span className="registry-meta">Live · {spotlight.meta}</span>
          </div>
          <span className="project-spotlight__number" aria-hidden="true">
            {String(spotlightIndex + 1).padStart(2, "0")}
          </span>
          <div className="project-spotlight__copy">
            <h2>{spotlight.title}</h2>
            <p>{spotlight.description}</p>
            <EntryLink item={spotlight} className="text-link project-spotlight__link">
              Explore {spotlight.title}
              <Icon name={spotlight.external ? "arrow-up-right" : "arrow-right"} size={16} />
            </EntryLink>
          </div>
        </article>

        <div className="project-ledger motion-block" style={{ animationDelay: "calc(var(--route-hold) + 140ms)" }}>
          <div className="project-ledger__header">
            <div>
              <span className="page-kicker">Studio index</span>
              <h2>Project register</h2>
            </div>
            <span className="registry-meta">{String(apps.length).padStart(2, "0")} active</span>
          </div>
          <div className="project-ledger__list">
            {apps.map((item, index) => (
              <EntryLink
                item={item}
                className="project-ledger__row motion-row"
                key={item.href}
              >
                <span className="registry-meta">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-ledger__name">
                  <strong>{item.title}</strong>
                </span>
                <span className="registry-meta">{item.meta}</span>
                <Icon name={item.external ? "arrow-up-right" : "arrow-right"} size={16} />
              </EntryLink>
            ))}
          </div>
        </div>
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
