"use client";

import { useEffect, useState } from "react";
import AppleBadgeLink from "@/components/AppleBadgeLink";
import FadeInWrapper from "@/components/FadeInWrapper";
import FeatureGrid from "@/components/FeatureGrid";
import SectionHeader from "@/components/SectionHeader";

const REPO_URL = "https://github.com/Cuzeth/frost";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

const features = [
  {
    label: "Locks every input",
    detail:
      "Keyboard, mouse, and trackpad are suppressed at the system level.",
  },
  {
    label: "Screen stays visible",
    detail:
      "A translucent overlay dims the desktop but never hides it, so you can watch a long task run while input is frozen.",
  },
  {
    label: "Every display",
    detail:
      "The overlay covers every connected display. The unlock prompt follows the display the lock started from.",
  },
  {
    label: "Touch ID unlock",
    detail:
      "Authenticate inside the overlay. Optionally arm Touch ID the moment a lock begins.",
  },
  {
    label: "Apple Watch unlock",
    detail:
      "Opt in to approve unlocks with a double-press on a paired Apple Watch. It works even on desktop Macs without Touch ID.",
  },
  {
    label: "Lock from Shortcuts",
    detail:
      "A Lock Input action for Shortcuts and scripts starts the same lock as the menu item. Lock-only by design. Nothing can unlock Frost programmatically.",
  },
  {
    label: "Overlay message",
    detail:
      "Show an optional message on the locked screen, so anyone at the desk can see what is running.",
  },
  {
    label: "Auto-lock",
    detail:
      "Lock automatically after the Mac sits idle, anywhere from 30 seconds to two hours.",
  },
  {
    label: "Stays awake",
    detail:
      "Optionally hold the display on and keep the Mac from sleeping while it's locked.",
  },
];

const requirements = [
  "macOS 14.6+",
  "Apple Silicon & Intel",
  "Touch ID (or Apple Watch)",
];

type Release = {
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
};

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

/** The engaged lock session, documented as a console record: a sunken
 *  instrument field with one lacquer prompt and jade state words
 *  (BRAND.md → Console). Structure, not a control — it takes the plate
 *  step while the controls beside it stay one step tighter. No glass. */
const sessionRows: { field: string; value: string; isolated?: boolean }[] = [
  { field: "lock.state", value: "Engaged" },
  { field: "input.keyboard", value: "Isolated", isolated: true },
  { field: "input.pointer", value: "Isolated", isolated: true },
  { field: "input.trackpad", value: "Isolated", isolated: true },
  { field: "display.screen", value: "Visible" },
  { field: "displays.covered", value: "2 / 2" },
  { field: "overlay.message", value: "“Build running”" },
  { field: "unlock.touchid", value: "Armed" },
  { field: "unlock.watch", value: "Paired" },
];

function LockConsole() {
  return (
    <div className="console">
      <div>
        <span className="prompt" aria-hidden="true">
          ›
        </span>
        frost --engage --message &ldquo;Build running&rdquo;
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {sessionRows.map((row) => (
          <div key={row.field} className="flex justify-between gap-4">
            <span className="muted">{row.field}</span>
            <span className={row.isolated ? "ok" : undefined}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
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
              A menu-bar input locker for macOS. Frost freezes the keyboard,
              mouse, and trackpad while the screen stays visible. Touch ID or a
              paired Apple Watch releases the lock. Lock the desk while a
              build, render, or agent runs unattended.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-3">
              <AppleBadgeLink href={release.href} label={release.label} />
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
              License / Free · Source / Public · Account / None
            </p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper direction="up" delay={0.08} eager>
          <LockConsole />
        </FadeInWrapper>
      </section>

      {/* Features */}
      <section>
        <FadeInWrapper direction="up">
          <SectionHeader label="Features" count={features.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <FeatureGrid items={features} />
        </FadeInWrapper>
      </section>

      {/* Requirements */}
      <FadeInWrapper direction="up">
        <section>
          <SectionHeader label="Requirements" />
          <div className="flex flex-wrap gap-2">
            {requirements.map((r) => (
              <span key={r} className="chip">
                {r}
              </span>
            ))}
          </div>
        </section>
      </FadeInWrapper>

      {/* Fail-safes */}
      <FadeInWrapper direction="up">
        <section aria-label="Fail-safes">
          <SectionHeader label="Fail-safes" />
          <p className="max-w-2xl text-body text-ink-dim">
            Frost is built to never trap you. The unlock shortcut stays
            configurable, and a clean teardown on SIGTERM means a remote{" "}
            <code>kill</code> over SSH always restores input. Frost is not a
            screen lock and does not replace the macOS login window.
          </p>
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
                One DMG. No installer, no account. Drag Frost to Applications
                and lock the desk from the menu bar.
              </p>
              <p className="micro-label">macOS 14.6+ · Telemetry / None</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <AppleBadgeLink href={release.href} label={release.label} />
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-control">
                <a
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chrome-link"
                >
                  All releases{" "}
                  <span aria-hidden="true" className="index-arrow">
                    &rarr;
                  </span>
                </a>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chrome-link"
                >
                  GitHub{" "}
                  <span aria-hidden="true" className="index-arrow">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
