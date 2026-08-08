import FadeInWrapper from "@/components/FadeInWrapper";
import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import styles from "./pocketful.module.css";

const REPO_URL = "https://github.com/abdeen-labs/pocketful";
const SETUP_URL = "https://pass.abdeen.dev/";

const features = [
  {
    number: "01",
    label: "Visual pass editor",
    detail:
      "Build store cards, coupons, tickets, and boarding passes on iPhone.",
  },
  {
    number: "02",
    label: "Eleven templates",
    detail:
      "Start from a template or blank pass, then tune colors, artwork, fields, and barcodes.",
  },
  {
    number: "03",
    label: "Full Wallet surface",
    detail:
      "Add relevance, localization, NFC, semantics, and modern ticket layouts.",
  },
  {
    number: "04",
    label: "Your signing server",
    detail:
      "An Express service signs each pass while Apple certificates stay off the phone.",
  },
  {
    number: "05",
    label: "Over-the-air updates",
    detail:
      "Re-sign and push changes through Apple's Wallet web service.",
  },
  {
    number: "06",
    label: "Agent-ready MCP",
    detail:
      "Create, inspect, update, download, and delete passes through six MCP tools.",
  },
];

const workflow = [
  {
    number: "01",
    location: "iPhone",
    label: "Design on iPhone",
    output: "JSON + artwork",
  },
  {
    number: "02",
    location: "Your server",
    label: "Sign on your server",
    output: "Signed .pkpass",
  },
  {
    number: "03",
    location: "Apple Wallet",
    label: "Add to Wallet",
    output: "Native Wallet sheet",
  },
];

function PocketfulVisual() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <span className={styles.visualCode}>PKPASS</span>
      <span className={styles.visualAxisX} />
      <span className={styles.visualAxisY} />
      <div className={styles.passStack}>
        <div className={styles.pass}>
          <div className={styles.passHeader}>
            <span className={styles.passMark} />
            <span>POCKETFUL</span>
          </div>
          <div className={styles.passFields}>
            <div>
              <span>MEMBER</span>
              <strong>Nightfield</strong>
            </div>
            <div>
              <span>STATUS</span>
              <strong>OPEN</strong>
            </div>
          </div>
          <div className={styles.passFooter}>
            <span>Member pass</span>
            <span>PF · 0003</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pocketful() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 pb-20 pt-4 md:gap-20 md:pb-28 md:pt-10">
      <section className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <FadeInWrapper direction="up" eager>
          <div className="flex flex-col gap-5">
            <span className="micro-label">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-signal-identity"
              />
              iPhone App · Self-hosted
            </span>
            <h1 className="text-h1 md:text-display">
              Pocketful<span className="text-signal-identity">.</span>
            </h1>
            <p className="max-w-xl text-lede text-ink-secondary">
              Design Apple Wallet passes on iPhone, sign them on your server,
              and add them to Wallet. No account. No third-party signing service.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Get the source <Icon name="arrow-up-right" />
              </a>
              <a
                href={SETUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--quiet"
              >
                Read the setup guide
              </a>
            </div>
            <p className="micro-label">iOS 27+ · Free · Open source</p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper direction="up" delay={0.08} eager>
          <PocketfulVisual />
        </FadeInWrapper>
      </section>

      <section className={styles.processSection} aria-label="How Pocketful works">
        <FadeInWrapper direction="up">
          <div className={styles.processHeading}>
            <SectionHeader label="How it works" count={workflow.length} />
          </div>
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <ol className={styles.processRail}>
            {workflow.map((step) => (
              <li key={step.number} className={styles.processStep}>
                <div className={styles.processMarker} aria-hidden="true">
                  <span>{step.number}</span>
                </div>
                <p className={styles.processLocation}>{step.location}</p>
                <h3>{step.label}</h3>
                <p className={styles.processOutput}>{step.output}</p>
              </li>
            ))}
          </ol>
        </FadeInWrapper>
      </section>

      <section className={styles.capabilityStory} aria-label="Pocketful capabilities">
        <FadeInWrapper direction="up">
          <div className={styles.capabilityIntro}>
            <SectionHeader label="Capabilities" count={features.length} />
          </div>
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <ol className={styles.capabilityLedger}>
            {features.map((feature) => (
              <li key={feature.number}>
                <span className={styles.capabilityNumber} aria-hidden="true">
                  {feature.number}
                </span>
                <h3>{feature.label}</h3>
                <p>{feature.detail}</p>
              </li>
            ))}
          </ol>
        </FadeInWrapper>
      </section>

      <FadeInWrapper direction="up">
        <section className={styles.boundarySection} aria-labelledby="pocketful-boundary-title">
          <div className={styles.boundaryHeading}>
            <SectionHeader label="Data boundary" />
            <h2 id="pocketful-boundary-title">
              Your phone holds the design. Your server holds the keys.
            </h2>
          </div>
          <div className={styles.boundaryGrid}>
            <div className={styles.boundarySide}>
              <span className={styles.boundaryLocation}>01 · Device</span>
              <h3>On your phone</h3>
              <p>
                Designs and artwork stay on-device until you create or update a pass.
              </p>
            </div>
            <div className={styles.boundaryLane} aria-hidden="true">
              <b>→</b>
            </div>
            <div className={styles.boundarySide}>
              <span className={styles.boundaryLocation}>02 · Infrastructure</span>
              <h3>On your server</h3>
              <p>
                One-shot passes expire after 15 minutes. Only updatable passes persist.
              </p>
            </div>
          </div>
        </section>
      </FadeInWrapper>

      <FadeInWrapper direction="up">
        <section
          aria-label="Get Pocketful"
          className="border-t border-hairline pt-8 md:pt-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
            <div className="flex max-w-lg flex-col gap-3">
              <h2 className="micro-label">
                <span aria-hidden="true" className="text-signal-identity">/</span>
                Build it yourself
              </h2>
              <p className="text-body text-ink-secondary">
                Deploy the signing service, then run Pocketful from Xcode.
              </p>
              <p className="micro-label">Xcode 27+ · Paid Apple Developer account</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <a
                href={SETUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Follow the setup guide <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
