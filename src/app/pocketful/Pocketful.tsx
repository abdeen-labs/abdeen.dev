import FadeInWrapper from "@/components/FadeInWrapper";
import FeatureGrid from "@/components/FeatureGrid";
import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import styles from "./pocketful.module.css";

const REPO_URL = "https://github.com/abdeen-labs/pocketful";
const SETUP_URL = `${REPO_URL}/blob/main/INSTRUCTIONS.md`;

const features = [
  {
    label: "Visual pass editor",
    detail:
      "Build generic passes, store cards, coupons, event tickets, and boarding passes directly on iPhone.",
  },
  {
    label: "Eleven templates",
    detail:
      "Start from a curated design or a blank pass, then change colors, artwork, fields, and barcode formats.",
  },
  {
    label: "Full Wallet surface",
    detail:
      "Add relevance, localization, personalization, NFC metadata, semantics, and modern ticket layouts.",
  },
  {
    label: "Your signing server",
    detail:
      "An Express service validates and signs each pass while Apple certificates stay off the phone.",
  },
  {
    label: "Over-the-air updates",
    detail:
      "Opt-in passes can be re-signed and pushed to devices through Apple's Wallet web service protocol.",
  },
  {
    label: "Agent-ready MCP",
    detail:
      "Create, inspect, update, download, and delete passes from an AI agent through six focused tools.",
  },
];

const workflow = [
  {
    label: "Design on iPhone",
    detail:
      "Pocketful turns the pass layout and on-device artwork into a portable JSON specification.",
  },
  {
    label: "Sign on your server",
    detail:
      "The self-hosted service validates the specification and builds the signed .pkpass in memory.",
  },
  {
    label: "Add to Wallet",
    detail:
      "The app downloads the short-lived pass and opens Apple's native add-to-Wallet sheet.",
  },
];

function PocketfulVisual() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.editor}>
        <div className={styles.editorBar}>
          <span>POCKETFUL / DESIGN</span>
          <span>01 / 11</span>
        </div>
        <div className={styles.canvas}>
          <div className={styles.pass}>
            <div className={styles.passHeader}>
              <span className={styles.passMark} />
              <span>POCKETFUL</span>
              <span>•••</span>
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
            <div className={styles.barcode} />
          </div>
        </div>
        <div className={styles.editorTabs}>
          <span data-active="true">DESIGN</span>
          <span>CONTENT</span>
          <span>SMART</span>
          <span>ADVANCED</span>
        </div>
      </div>

      <div className={styles.serverCard}>
        <span>SIGNING SERVER</span>
        <code>POST /api/passes</code>
        <span className={styles.serverStatus}>
          <span /> SIGNED · 15 MIN
        </span>
      </div>

      <div className={styles.mcpCard}>
        <span>MCP</span>
        <strong>06</strong>
        <span>TOOLS</span>
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
              Design Apple Wallet passes on your phone, sign them with your
              own server, and open Wallet&apos;s native add-pass sheet. No
              account and no third-party signing service.
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

      <section>
        <FadeInWrapper direction="up">
          <SectionHeader label="How it works" count={workflow.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <FeatureGrid items={workflow} />
        </FadeInWrapper>
      </section>

      <section>
        <FadeInWrapper direction="up">
          <SectionHeader label="Capabilities" count={features.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <FeatureGrid items={features} />
        </FadeInWrapper>
      </section>

      <FadeInWrapper direction="up">
        <section aria-labelledby="pocketful-boundary-title">
          <SectionHeader label="Data boundary" />
          <div className={styles.boundaryGrid}>
            <div>
              <span className="index-num" aria-hidden="true">01</span>
              <h3 id="pocketful-boundary-title">On your phone</h3>
              <p>
                Designs and artwork stay on the device while you edit. The app
                sends them only when you choose to create or update a pass.
              </p>
            </div>
            <div>
              <span className="index-num" aria-hidden="true">02</span>
              <h3>On your server</h3>
              <p>
                One-shot passes are signed in memory and expire after 15
                minutes. Updatable passes persist only when you opt in, so the
                server can sign and push later versions.
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
                The SwiftUI app has no third-party dependencies. Bring an
                Apple Developer account, deploy the signing service, and run
                Pocketful on your iPhone from Xcode.
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
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chrome-link font-mono text-control"
              >
                GitHub <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
