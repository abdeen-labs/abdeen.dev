import FadeInWrapper from "@/components/FadeInWrapper";
import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import styles from "./hark.module.css";

const REPO_URL = "https://github.com/abdeen-labs/hark";
const CONTRACT_URL = `${REPO_URL}/blob/main/docs/api.md`;

const deliverySteps = [
  {
    number: "01",
    mode: "Receive",
    label: "A call lands on your server",
    detail:
      "Any service posts a webhook; any agent calls the API with a scoped token.",
    signal: "HTTP / in",
  },
  {
    number: "02",
    mode: "Deliver",
    label: "It reaches the Lock Screen",
    detail:
      "The event becomes a push notification, a Live Activity, or an approval prompt.",
    signal: "APNs / out",
  },
  {
    number: "03",
    mode: "Answer",
    label: "Approve without unlocking",
    detail:
      "The answer flows back to whatever asked, through the outbound callback.",
    signal: "Callback / back",
  },
];

const systems = [
  {
    number: "01",
    label: "Ingest",
    items: ["Webhook services", "Agent API", "Scoped tokens"],
  },
  {
    number: "02",
    label: "Deliver",
    items: ["Push notifications", "Live Activities", "Approval prompts"],
  },
  {
    number: "03",
    label: "Operate",
    items: ["Admin dashboard", "Delivery history", "Published contract"],
  },
];

const requirements = [
  { label: "Server", value: "Go 1.26 · PostgreSQL 17" },
  { label: "Client", value: "iOS 27+" },
  { label: "License", value: "MIT · Open source" },
];

/** A compact depiction of Hark's whole loop: the API call arriving at the
 *  server, and the approval prompt it becomes on the iPhone Lock Screen.
 *  Inherits the page theme so Hark remains the subject. */
function HarkVisual() {
  return (
    <figure
      className={styles.visual}
      role="img"
      aria-label="An API call arriving at a Hark server and appearing on an iPhone Lock Screen as an approval prompt with Approve and Deny actions."
    >
      <div className={styles.request} aria-hidden="true">
        <span>POST /v1/interactions</span>
        <span className={styles.requestMeta}>accepted → APNs</span>
      </div>
      <div className={styles.phone} aria-hidden="true">
        <span className={styles.clock}>09:41</span>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.appDot} />
            <span>Hark</span>
            <span className={styles.cardTime}>now</span>
          </div>
          <strong>
            Deploy to production<span className={styles.period}>?</span>
          </strong>
          <span className={styles.cardBody}>release v2.4.1 · asked by ci-agent</span>
          <div className={styles.cardActions}>
            <span className={styles.approve}>Approve</span>
            <span className={styles.deny}>Deny</span>
          </div>
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
              Self-hosted · Abdeen Labs
            </span>
            <h1 className="text-h1 md:text-display">
              Hark<span className="text-signal-identity">.</span>
            </h1>
            <p className="max-w-xl text-body text-ink-secondary md:text-lede">
              Webhooks and agent API calls become iOS pushes, Live Activities,
              and approval prompts you answer from the Lock Screen.
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
                Read the API contract
              </a>
            </div>
            <p className="micro-label">Free · Open source · Run your own</p>
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
          <SectionHeader label="Delivery sequence" count={deliverySteps.length} />
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
                <p className={styles.sequenceSignal}>{step.signal}</p>
              </li>
            ))}
          </ol>
        </FadeInWrapper>
      </section>

      {/* Product systems */}
      <section aria-label="Hark systems">
        <FadeInWrapper direction="up">
          <SectionHeader label="System" count={9} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <div className={styles.systems}>
            {systems.map((system) => (
              <section key={system.number}>
                <span className={styles.systemNumber} aria-hidden="true">
                  {system.number}
                </span>
                <h3>{system.label}</h3>
                <ul>
                  {system.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </FadeInWrapper>
      </section>

      {/* Single-user by design */}
      <FadeInWrapper direction="up">
        <section className={styles.statement} aria-labelledby="hark-statement-title">
          <SectionHeader label="Single-user" />
          <div className={styles.statementBody}>
            <h2 id="hark-statement-title">One account. No sign-up surface.</h2>
            <div className={styles.statementFacts}>
              <span>No analytics</span>
              <span>No billing</span>
              <span>Seeded at boot</span>
            </div>
          </div>
        </section>
      </FadeInWrapper>

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
                Run your own
              </h2>
              <p className="text-body text-ink-secondary">
                One compose file and the whole stack is live: PostgreSQL and a
                single Go binary serving the API, the dashboard, and the
                published contract.
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
                View source
              </a>
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
