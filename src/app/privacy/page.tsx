import type { Metadata } from "next";
import { apps, tools, type CatalogEntry } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Abdeen Labs apps and tools do not collect or sell personal data. This policy explains the few exceptions and clarifications.",
  alternates: { canonical: "https://abdeen.dev/privacy" },
};

const LAST_UPDATED = "August 8, 2026";

type PrivacyEntry = Pick<CatalogEntry, "title" | "meta" | "href"> & {
  privacy: NonNullable<CatalogEntry["privacy"]>;
};

const siteEntry: PrivacyEntry = {
  title: "abdeen.dev",
  meta: "Website",
  href: "/privacy",
  privacy: {
    kind: "exception",
    summary:
      "This site uses Vercel Analytics and Speed Insights for anonymous, aggregate page views and performance data. They do not use cookies or track you across sites. The Frost page also asks GitHub for the latest release information.",
  },
};

const privacyEntries = [siteEntry, ...apps, ...tools].filter(
  (entry): entry is PrivacyEntry => Boolean(entry.privacy),
);

const slugOf = (entry: PrivacyEntry) =>
  entry.href === "/privacy" ? "site" : entry.href.replace(/^\//, "");

export default function PrivacyPage() {
  return (
    <div className="site-frame site-frame--reading privacy-page">
      <header className="privacy-intro motion-block">
        <h1>Privacy policy</h1>
        <p>Abdeen Labs apps and tools do not collect or sell personal data.</p>
        <p className="privacy-updated">Last updated {LAST_UPDATED}</p>
      </header>

      <section className="privacy-details" aria-labelledby="privacy-details-title">
        <h2 id="privacy-details-title">Exceptions and clarifications</h2>
        <div className="privacy-details__list">
          {privacyEntries.map((entry, index) => (
            <article
              id={slugOf(entry)}
              className="privacy-detail motion-row"
              key={entry.href}
              style={{
                animationDelay: `calc(var(--route-hold) + ${80 + index * 45}ms)`,
              }}
            >
              <div className="privacy-detail__heading">
                <h3>{entry.title}</h3>
                <span className="registry-meta">{entry.meta}</span>
              </div>
              <p>{entry.privacy.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-contact motion-block" aria-labelledby="privacy-contact-title">
        <h2 id="privacy-contact-title">Questions?</h2>
        <p>
          Email us at <a href="mailto:help@abdeen.dev">help@abdeen.dev</a>.
        </p>
      </section>
    </div>
  );
}
