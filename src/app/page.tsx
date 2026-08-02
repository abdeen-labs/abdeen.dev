import Link from "next/link";
import FadeInWrapper from "@/components/FadeInWrapper";
import FrostVisual from "@/components/FrostVisual";
import SectionHeader from "@/components/SectionHeader";
import { apps, tools, type CatalogEntry } from "@/lib/catalog";
import { identity } from "@/lib/brand";

const privacyPractices = [
  {
    num: "01",
    title: "No account",
    body: "Open a product and start working. There is no Abdeen Labs profile or account to manage.",
  },
  {
    num: "02",
    title: "Local by default",
    body: "Work stays on your device wherever the product allows. Each product says when it needs the network.",
  },
  {
    num: "03",
    title: "Open source",
    body: "The source and license for every release are public on GitHub.",
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** The numbered rail beside each section. The number is a watermark
 *  address — decoration, so it is aria-hidden and sits at the structure
 *  tone, below the text floors. */
function SectionRail({ label, number }: { label: string; number: string }) {
  return (
    <aside className="section-rail">
      <div className="micro-label">{label}</div>
      {/* Only the watermark address is hidden — the label is real. */}
      <span className="section-number" aria-hidden="true">
        {number}
      </span>
    </aside>
  );
}

function IndexRow({
  item,
  index,
  large = false,
}: {
  item: CatalogEntry;
  index: number;
  large?: boolean;
}) {
  const Tag = item.external ? "a" : Link;
  const externalProps = item.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  const arrow = item.external ? "↗" : "→";

  return (
    <Tag
      href={item.href}
      className={`index-row grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 pl-4 pr-2 md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:gap-x-8 md:pl-6 md:pr-3 ${large ? "py-7 md:py-9" : "py-5 md:py-6"
        }`}
      {...externalProps}
    >
      <span aria-hidden="true" className="index-num">
        {pad(index + 1)}
      </span>
      <span className="block">
        <span
          className={
            large
              ? "h3 block text-ink-primary"
              : "block font-mono text-lede font-medium text-ink-primary"
          }
        >
          {item.title}
        </span>
        <span className="mt-2 block max-w-2xl text-body text-ink-dim">
          {item.description}
        </span>
        <span className="mt-3 block md:hidden">
          <span className="micro-label">
            {item.meta}
            <span aria-hidden="true" className="index-arrow">
              {arrow}
            </span>
          </span>
        </span>
      </span>
      <span className="hidden md:block">
        <span className="micro-label gap-3">
          {item.meta}
          <span aria-hidden="true" className="index-arrow">
            {arrow}
          </span>
        </span>
      </span>
    </Tag>
  );
}

export default function HomePage() {
  // No flex gap on the column: the kit's sections sit flush and are
  // separated by their own bottom rules, so a gap would double every
  // boundary. The featured-release plate is not a section shell, so it
  // carries its own margin instead.
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col pb-20 pt-4 md:pb-28 md:pt-10">
      {/* Introduction — the positioning holds the full measure and the
          establishment line sits quietly at the section's foot. */}
      <section
        className="relative overflow-x-clip border-b border-hairline"
        aria-label="Introduction"
      >
        <span
          aria-hidden="true"
          className="hero-mark right-[-2rem] top-1/2 hidden -translate-y-1/2 text-[clamp(13rem,24vw,21rem)] sm:block"
        >
          عابدين
        </span>
        {/* relative lifts the in-flow content above the positioned
            watermark; the strip below carries its own. */}
        <div className="relative py-10 md:py-16">
          <FadeInWrapper direction="up" eager>
            <div className="flex flex-col gap-7">
              <h1 className="max-w-4xl text-h1 md:text-display">
                Private software.
                <br />
                <span className="text-ink-dim">Clear boundaries.</span>
              </h1>
              <p className="max-w-2xl text-lede text-ink-secondary">
                {identity.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#apps" className="btn btn--primary">
                  View apps
                </a>
                <a
                  href="https://github.com/abdeen-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--quiet"
                >
                  View source
                </a>
              </div>
            </div>
          </FadeInWrapper>
        </div>
        {/* Studio line — real content, kept accessible like the rest of the hero. */}
        <FadeInWrapper direction="up" eager>
          <aside className="hero-register relative" aria-label="About Abdeen Labs">
            <span className="micro-label">{identity.establishedLine}</span>
          </aside>
        </FadeInWrapper>
      </section>

      {/* Featured release — product first, with the real Frost interaction
          depicted beside the release copy. */}
      <FadeInWrapper direction="up">
        <section
          aria-labelledby="featured-release-title"
          className="plate my-12 grid md:my-16 md:grid-cols-[1.03fr_0.97fr]"
        >
          <div className="p-6 md:p-12">
            <span className="micro-label">
              <span aria-hidden="true" className="text-signal-identity">
                /
              </span>
              Featured release · macOS
            </span>
            <h2 id="featured-release-title" className="mt-5 max-w-xl text-h3 md:text-h2">
              Lock every input. Keep the screen in view.
            </h2>
            <p className="mt-4 max-w-lg text-body text-ink-secondary">
              Frost freezes the keyboard, mouse, and trackpad while a build,
              render, or agent keeps running visibly. The session unlocks
              with Touch ID or a paired Apple Watch.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/frost" className="btn btn--primary">
                See Frost
              </Link>
              <span className="micro-label">Free · Open source</span>
            </div>
          </div>
          <div className="border-t border-hairline p-4 md:border-l md:border-t-0 md:p-6">
            <FrostVisual compact />
          </div>
        </section>
      </FadeInWrapper>

      {/* Apps */}
      <section id="apps" className="section-shell" aria-label="Apps">
        <SectionRail label="Apps" number="01" />
        <div className="section-body">
          <FadeInWrapper direction="up">
            <SectionHeader label="Apps" count={apps.length} inset />
          </FadeInWrapper>
          <div className="index-list">
            {apps.map((item, index) => (
              <FadeInWrapper key={item.href} direction="up" delay={0.04 + index * 0.04}>
                <IndexRow item={item} index={index} large />
              </FadeInWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="section-shell" aria-label="Tools">
        <SectionRail label="Tools" number="02" />
        <div className="section-body">
          <FadeInWrapper direction="up">
            <SectionHeader label="Tools" count={tools.length} inset />
          </FadeInWrapper>
          <div className="index-list">
            {tools.map((item, index) => (
              <FadeInWrapper key={item.href} direction="up" delay={0.04 + index * 0.03}>
                <IndexRow item={item} index={index} />
              </FadeInWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section
        id="principles"
        className="section-shell"
        aria-label="Privacy"
      >
        <SectionRail label="All tools" number="03" />
        <div className="section-body">
          <FadeInWrapper direction="up">
            <SectionHeader label="Privacy" count={privacyPractices.length} />
          </FadeInWrapper>
          <FadeInWrapper direction="up" delay={0.04}>
            <div className="grid gap-8 border-t border-hairline pt-8 md:grid-cols-3 md:gap-6 md:pt-10">
              {privacyPractices.map((b) => (
                <div
                  key={b.num}
                  className="flex flex-col gap-3 md:border-l md:border-hairline md:pl-6 md:first:border-l-0 md:first:pl-0"
                >
                  <span aria-hidden="true" className="index-num">
                    {b.num}
                  </span>
                  <h3 className="font-mono text-control font-medium uppercase tracking-micro text-ink-primary">
                    {b.title}
                  </h3>
                  <p className="text-body text-ink-dim">{b.body}</p>
                </div>
              ))}
            </div>
          </FadeInWrapper>
        </div>
      </section>
    </div>
  );
}
