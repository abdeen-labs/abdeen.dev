"use client";

import { useEffect, useState } from "react";
import AppleLogo from "@/components/AppleLogo";
import FadeInWrapper from "@/components/FadeInWrapper";
import FrostVisual from "@/components/FrostVisual";
import SectionHeader from "@/components/SectionHeader";
import styles from "./frost.module.css";

const REPO_URL = "https://github.com/Cuzeth/frost";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

const lockStates = [
  {
    number: "01",
    mode: "Lock",
    label: "Freeze every input",
    detail: "Keyboard, mouse, and trackpad stop at the system level.",
    signal: "Input / blocked",
  },
  {
    number: "02",
    mode: "Watch",
    label: "Keep the screen visible",
    detail: "Every display stays visible beneath the overlay.",
    signal: "Display / live",
  },
  {
    number: "03",
    mode: "Release",
    label: "Unlock in person",
    detail: "Touch ID, Apple Watch, or the local shortcut releases the lock.",
    signal: "Auth / required",
  },
];

const systems = [
  {
    number: "01",
    label: "Control",
    items: ["Menu bar", "Shortcuts", "Idle auto-lock"],
  },
  {
    number: "02",
    label: "Authenticate",
    items: ["Touch ID", "Apple Watch", "Local shortcut"],
  },
  {
    number: "03",
    label: "Unattended",
    items: ["Every display", "Overlay message", "Prevent sleep"],
  },
];

const requirements = [
  { label: "System", value: "macOS 14.6+" },
  { label: "Architecture", value: "Apple Silicon + Intel" },
  { label: "Unlock", value: "Touch ID or Apple Watch" },
];

type Release = {
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
};

function DownloadButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn--primary"
    >
      <AppleLogo />
      {label}
    </a>
  );
}

/** Latest-release download target, shared by the hero and closing CTA so the
 *  GitHub API is only hit once per page view. */
function useLatestRelease() {
  const [href, setHref] = useState(RELEASES_URL);
  const [label, setLabel] = useState("Download for macOS");

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/repos/Cuzeth/frost/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? (r.json() as Promise<Release>) : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return;
        const dmg = data.assets?.find((a) =>
          a.name.toLowerCase().endsWith(".dmg")
        );
        if (dmg) {
          setHref(dmg.browser_download_url);
          // Same visual width as the fallback label — avoids the button
          // resizing under the cursor when the release info arrives
          setLabel(`Download ${data.tag_name.replace(/^v/, "")} for macOS`);
        }
      })
      .catch(() => {
        // Keep the /releases/latest fallback (e.g. GitHub API rate limit).
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { href, label };
}

export default function Frost() {
  const release = useLatestRelease();

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
              macOS App · Abdeen Labs
            </span>
            <h1 className="text-h1 md:text-display">
              Frost<span className="text-signal-identity">.</span>
            </h1>
            <p className="max-w-xl text-body text-ink-secondary md:text-lede">
              Freeze every input without hiding the screen. Touch ID or Apple
              Watch releases the lock.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-3">
              <DownloadButton href={release.href} label={release.label} />
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--quiet"
              >
                View source
              </a>
            </div>
            <p className="micro-label">
              Free · Open source
            </p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper direction="up" delay={0.08} eager>
          <FrostVisual />
        </FadeInWrapper>
      </section>

      {/* Lock sequence */}
      <section className={styles.sequenceSection} aria-label="How Frost locks and unlocks">
        <FadeInWrapper direction="up">
          <SectionHeader label="Lock sequence" count={lockStates.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <ol className={styles.sequence}>
            {lockStates.map((state) => (
              <li key={state.number}>
                <div className={styles.sequenceMarker} aria-hidden="true">
                  <span>{state.number}</span>
                </div>
                <p className={styles.sequenceMode}>{state.mode}</p>
                <h3>{state.label}</h3>
                <p className={styles.sequenceDetail}>{state.detail}</p>
                <p className={styles.sequenceSignal}>{state.signal}</p>
              </li>
            ))}
          </ol>
        </FadeInWrapper>
      </section>

      {/* Product systems */}
      <section aria-label="Frost systems">
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

      {/* Fail-safes */}
      <FadeInWrapper direction="up">
        <section className={styles.failSafe} aria-labelledby="frost-failsafe-title">
          <SectionHeader label="Fail-safe" />
          <div className={styles.failSafeBody}>
            <h2 id="frost-failsafe-title">If Frost quits, input returns.</h2>
            <div className={styles.failSafeFacts}>
              <span>SIGTERM restores input</span>
              <span>SSH kill works</span>
              <span>Not a screen lock</span>
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

      {/* Download */}
      <FadeInWrapper direction="up">
        <section
          aria-label="Download Frost"
          className="border-t border-hairline pt-8 md:pt-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
            <div className="flex max-w-md flex-col gap-3">
              <h2 className="micro-label">
                <span aria-hidden="true" className="text-signal-identity">
                  /
                </span>
                Download
              </h2>
              <p className="text-body text-ink-secondary">
                One DMG and no installer. Drag Frost to Applications, then lock
                the desk from the menu bar.
              </p>
              <p className="micro-label">macOS 14.6+</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <DownloadButton href={release.href} label={release.label} />
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
