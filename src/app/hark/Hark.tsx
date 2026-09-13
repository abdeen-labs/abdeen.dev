import FadeInWrapper from "@/components/FadeInWrapper";
import Link from "next/link";
import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import styles from "./hark.module.css";

const REPO_URL = "https://github.com/abdeen-labs/hark";
const CONTRACT_URL = `${REPO_URL}/blob/main/docs/api.md`;

const deliverySteps = [
  {
    number: "01",
    mode: "Send",
    label: "Something needs your attention",
    detail: "A service sends a webhook, a script calls the API, or an agent connects through MCP.",
  },
  {
    number: "02",
    mode: "Notify",
    label: "Hark puts it on your iPhone",
    detail: "It shows up as a notification, a Live Activity, or a question you can answer.",
  },
  {
    number: "03",
    mode: "Reply",
    label: "Your answer goes back",
    detail: "Approve, answer yes or no, or send a text reply. The caller can read your response; webhooks can receive a callback.",
  },
];

const systems = [
  {
    number: "01",
    label: "Server",
    detail: "Receives webhooks, API calls, and MCP requests. Agents connect with scoped tokens or OAuth to send notifications and ask questions.",
  },
  {
    number: "02",
    label: "iPhone app",
    detail: "Shows notifications and Live Activities, accepts replies from the Lock Screen, and opens Wallet passes from a notification.",
  },
  {
    number: "03",
    label: "Dashboard",
    detail: "Tracks delivery history and manages webhook services, devices, API tokens, and access. An admin can provision separate user accounts.",
  },
];

const requirements = [
  { label: "Server", value: "Go 1.26 · PostgreSQL 17" },
  { label: "Client", value: "iOS 27+" },
  { label: "License", value: "MIT · Open source" },
];

/** A single Hark approval prompt, matching the restrained hero objects used
 *  by the other product pages. */
function HarkVisual() {
  return (
    <figure
      className={styles.visual}
      role="img"
      aria-label="A Hark approval prompt for a production deployment, with Approve and Deny actions."
    >
      <div className={styles.card} aria-hidden="true">
        <div className={styles.cardHeader}>
          <span className={styles.appDot} />
          <span>Hark</span>
          <span className={styles.cardTime}>now</span>
        </div>
        <strong>
          Deploy to production<span className={styles.period}>?</span>
        </strong>
        <span className={styles.cardBody}>release v2.4.1 · ci-agent</span>
        <div className={styles.cardActions}>
          <span className={styles.approve}>Approve</span>
          <span className={styles.deny}>Deny</span>
        </div>
      </div>
    </figure>
  );
}

export default function Hark() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 pb-20 pt-4 md:gap-20 md:pb-28 md:pt-10">
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <FadeInWrapper direction="up" eager>
          <div className="flex flex-col gap-5">
            <span className="micro-label">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-signal-identity"
              />
              Self-hosted · iPhone
            </span>
            <h1 className="text-h1 md:text-display">
              Hark<span className="text-signal-identity">.</span>
            </h1>
            <p className="max-w-xl text-body text-ink-secondary md:text-lede">
              Send a webhook, call the API, or connect an AI agent through MCP.
              Hark puts notifications, Live Activities, and questions on your
              iPhone, with replies from the Lock Screen and Wallet passes a tap away.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <Icon name="github" size={16} />
                View source
              </a>
              <a
                href={CONTRACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--quiet"
              >
                API docs
              </a>
            </div>
            <p className="micro-label">Free · MIT licensed</p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper direction="up" delay={0.08} eager>
          <HarkVisual />
        </FadeInWrapper>
      </section>

      {/* Delivery sequence */}
      <section
        className={styles.sequenceSection}
        aria-label="How a call becomes an answered prompt"
      >
        <FadeInWrapper direction="up">
          <SectionHeader label="How it works" count={deliverySteps.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <ol className={styles.sequence}>
            {deliverySteps.map((step) => (
              <li key={step.number}>
                <div className={styles.sequenceMarker} aria-hidden="true">
                  <span>{step.number}</span>
                </div>
                <p className={styles.sequenceMode}>{step.mode}</p>
                <h3>{step.label}</h3>
                <p className={styles.sequenceDetail}>{step.detail}</p>
              </li>
            ))}
          </ol>
        </FadeInWrapper>
      </section>

      {/* Product systems */}
      <section aria-label="Hark systems">
        <FadeInWrapper direction="up">
          <SectionHeader label="What's included" count={systems.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <div className={styles.systems}>
            {systems.map((system) => (
              <section key={system.number}>
                <span className={styles.systemNumber} aria-hidden="true">
                  {system.number}
                </span>
                <h3>{system.label}</h3>
                <p>{system.detail}</p>
              </section>
            ))}
          </div>
        </FadeInWrapper>
      </section>

      {/* Requirements */}
      <FadeInWrapper direction="up">
        <section className={styles.requirements} aria-label="Requirements">
          {requirements.map((requirement) => (
            <div key={requirement.label}>
              <span>{requirement.label}</span>
              <strong>{requirement.value}</strong>
            </div>
          ))}
        </section>
      </FadeInWrapper>

      {/* Run your own */}
      <FadeInWrapper direction="up">
        <section
          aria-label="Run your own Hark"
          className="border-t border-hairline pt-8 md:pt-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
            <div className="flex max-w-md flex-col gap-3">
              <h2 className="micro-label">
                <span aria-hidden="true" className="text-signal-identity">
                  /
                </span>
                Run Hark yourself
              </h2>
              <p className="text-body text-ink-secondary">
                Hark runs as one Go server with PostgreSQL. Docker Compose
                starts both, and the server also hosts the dashboard and API
                docs.
              </p>
              <p className="text-body text-ink-secondary">
                Configure Apple push credentials and install the iPhone app
                to receive notifications. Connect{" "}
                <Link href="/pocketful" className="text-signal-link">Pocketful</Link>{" "}
                to sign Wallet passes on your server and deliver them through Hark.
              </p>
              <p className="micro-label">docker compose up --build</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <Icon name="github" size={16} />
                Open on GitHub
              </a>
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
