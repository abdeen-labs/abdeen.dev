import Link from "next/link";
import FadeInWrapper from "@/components/FadeInWrapper";
import SectionHeader from "@/components/SectionHeader";
import { apps, tools, type CatalogEntry } from "@/lib/catalog";

const boundaries = [
  {
    num: "01",
    title: "No account",
    body: "Every unit executes without sign-in, subscription, or paywall. Open the page and run the task.",
  },
  {
    num: "02",
    title: "Local execution",
    body: "Browser tools process input on the device wherever the task permits. What leaves the device is stated on the unit.",
  },
  {
    num: "03",
    title: "Source public",
    body: "Every release retains its code and license on GitHub. Inspect the work, report a fault, or reproduce the build.",
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
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
      className={`index-row grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 pl-4 pr-2 md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:gap-x-8 md:pl-6 md:pr-3 ${
        large ? "py-7 md:py-9" : "py-5 md:py-6"
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
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 pb-20 pt-4 md:gap-24 md:pb-28 md:pt-10">
      {/* Hero — the positioning line as macro display */}
      <section className="relative overflow-x-clip" aria-label="Introduction">
        <span
          aria-hidden="true"
          className="hero-mark right-[-2rem] top-1/2 hidden -translate-y-1/2 text-[clamp(13rem,24vw,21rem)] sm:block"
        >
          عابدين
        </span>
        <FadeInWrapper direction="up" eager>
          <div className="relative flex min-h-[28rem] flex-col justify-center gap-7 py-8 md:min-h-[34rem] md:py-14">
            <span className="micro-label">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-signal-identity"
              />
              Abdeen Labs · Est 2027
            </span>
            <h1 className="max-w-4xl text-h1 md:text-display">
              Defined tasks.
              <br />
              <span className="text-ink-dim">Verified output.</span>
            </h1>
            <p className="max-w-2xl text-lede text-ink-secondary">
              Abdeen Labs develops bounded software for Apple platforms and
              the browser. Each tool is assigned one defined task, runs
              without an account, and states what it stores, sends, and
              reports.
            </p>
            <p className="micro-label flex-wrap gap-x-3 gap-y-1 pt-1">
              <a href="#apps" className="chrome-link">
                {pad(apps.length)} apps
              </a>
              <span aria-hidden="true" className="text-ink-structure">
                ·
              </span>
              <a href="#tools" className="chrome-link">
                {pad(tools.length)} web tools
              </a>
              <span aria-hidden="true" className="text-ink-structure">
                ·
              </span>
              <span>Source / Public</span>
            </p>
          </div>
        </FadeInWrapper>
      </section>

      {/* Featured release — Frost, documented as an instrument readout */}
      <FadeInWrapper direction="up">
        <section
          aria-labelledby="featured-release-title"
          className="plate grid md:grid-cols-[1.03fr_0.97fr]"
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
                Inspect Frost
              </Link>
              <span className="micro-label">License / Free · Source / Public</span>
            </div>
          </div>
          <div className="border-t border-hairline p-6 md:border-l md:border-t-0 md:p-12">
            <div className="console h-full">
              <div>
                <span className="prompt" aria-hidden="true">
                  ›
                </span>
                frost --engage
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="flex justify-between gap-4">
                  <span className="muted">input.keyboard</span>
                  <span className="ok">Isolated</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="muted">input.pointer</span>
                  <span className="ok">Isolated</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="muted">display.screen</span>
                  <span>Visible</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="muted">unlock.method</span>
                  <span>Touch ID</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="muted">session.log</span>
                  <span>Retained / Local</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInWrapper>

      {/* Apps */}
      <section id="apps" aria-label="Apps">
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
      </section>

      {/* Tools */}
      <section id="tools" aria-label="Tools">
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
      </section>

      {/* Operating boundaries */}
      <section aria-label="Operating boundaries">
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
      </section>
    </div>
  );
}
