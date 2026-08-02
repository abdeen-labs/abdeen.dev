import Link from "next/link";
import FadeInWrapper from "@/components/FadeInWrapper";
import FrostVisual from "@/components/FrostVisual";
import SectionHeader from "@/components/SectionHeader";
import { apps, tools, type CatalogEntry } from "@/lib/catalog";
import { identity } from "@/lib/brand";

const boundaries = [
  {
    num: "01",
    title: "No account",
    body: "No sign-in, subscription, or paywall. Open the page and run the task.",
  },
  {
    num: "02",
    title: "Local execution",
    body: "Browser tools process input on your device wherever possible. Each tool's page says what leaves it.",
  },
  {
    num: "03",
    title: "Open source",
    body: "The code and license for every release are on GitHub. Read it, file an issue, or reproduce the build.",
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
      {/* Mission — the kit's hero: the message holds the full measure,
          and the establishment line runs in a registration strip along
          the section's foot, so the plate identity survives without a
          rail competing with the message. */}
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
                Defined tasks.
                <br />
                <span className="text-ink-dim">Verified output.</span>
              </h1>
              <p className="max-w-2xl text-lede text-ink-secondary">
                Abdeen Labs develops bounded software for Apple platforms
                and the browser. Each tool does one job, runs without an
                account, and says what it stores and sends.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#apps" className="btn btn--primary">
                  Inspect inventory
                </a>
                <a
                  href="https://github.com/abdeen-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--quiet"
                >
                  Audit source
                </a>
              </div>
            </div>
          </FadeInWrapper>
        </div>
        {/* Registration strip — just the establishment line. Real content,
            so the aside keeps an accessible name; eager like the rest of
            the hero. */}
        <FadeInWrapper direction="up" eager>
          <aside className="hero-register relative" aria-label="Registration">
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
        <SectionRail label="Apple platforms" number="01" />
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
        <SectionRail label="In the browser" number="02" />
        <div className="section-body">
          <FadeInWrapper direction="up">
            <SectionHeader label="Web tools" count={tools.length} inset />
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

      {/* Operating boundaries */}
      <section
        id="principles"
        className="section-shell"
        aria-label="Operating boundaries"
      >
        <SectionRail label="All tools" number="03" />
        <div className="section-body">
          <FadeInWrapper direction="up">
            <SectionHeader label="Operating boundaries" count={boundaries.length} />
          </FadeInWrapper>
          <FadeInWrapper direction="up" delay={0.04}>
            <div className="grid gap-8 border-t border-hairline pt-8 md:grid-cols-3 md:gap-6 md:pt-10">
              {boundaries.map((b) => (
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
