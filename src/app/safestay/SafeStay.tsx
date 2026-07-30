"use client";

import { useState, useEffect, useCallback } from "react";

interface OUIData {
  camera: Record<string, string>;
  chipset: Record<string, string>;
}

const PHYSICAL_CHECK = [
  {
    area: "Obvious spots",
    items: [
      "Smoke detectors, especially ones mounted unusually low or aimed at the bed",
      "Air purifiers, alarm clocks, picture frames, mirrors, decorative plants",
      "USB chargers and power adapters placed near the bed or shower",
      "Vents, speakers, and any object with a small dark dot the size of a pencil tip",
    ],
  },
  {
    area: "Flashlight sweep",
    items: [
      "Turn off the lights and close the curtains",
      "Sweep a flashlight — the phone torch works — slowly across surfaces at eye level",
      "A camera lens returns a sharp, repeatable glint, unlike glass or metal",
      "Inspect any glint up close: lift, twist, or unscrew the object if you can",
    ],
  },
  {
    area: "IR check",
    items: [
      "Open your phone's front-facing camera; most rear cameras filter IR",
      "Turn the room lights off and point it at smoke detectors, vents, clocks, and frames",
      "Night-vision cameras emit faint purple-white dots invisible to the eye but visible to the sensor",
      "Steady IR dots from an object that should not have a camera are a finding — document it",
    ],
  },
  {
    area: "Off-network cameras",
    items: [
      "4G/LTE cameras carry their own SIM and bypass the host network entirely — SafeStay cannot see them",
      "Look for an unexplained second power cable or a small antenna nub",
      "SD-card recorders store video locally and need no network at all",
      "Document any device you cannot explain before touching it further",
    ],
  },
];

const LIMITS = [
  "Cameras on a 4G/LTE SIM are invisible to any WiFi scan",
  "AP or client isolation hides every other device on the network from this tool",
  "Cameras that only write to an SD card and never go online cannot be detected",
  "Many hidden cameras run unbranded firmware on commodity chips (Tuya, ESP32, Anyka, Ingenic) and match no known vendor",
  "Treat the scan as a starting point, not a guarantee — pair it with the physical sweep",
];

const DOWNLOAD_LINKS = [
  { label: "macOS (Apple Silicon)", file: "safestay-darwin-arm64" },
  { label: "macOS (Intel)", file: "safestay-darwin-amd64" },
  { label: "Linux (x86_64)", file: "safestay-linux-amd64" },
  { label: "Linux (ARM64)", file: "safestay-linux-arm64" },
];

const RELEASES_BASE =
  "https://github.com/Cuzeth/airbnb-safety-tools/releases/latest/download";
const REPO_URL = "https://github.com/Cuzeth/airbnb-safety-tools";
const OUI_DB_URL =
  "https://github.com/Cuzeth/airbnb-safety-tools/blob/main/internal/oui/oui.go";
const INSTALL_CMD =
  "curl -fsSL https://raw.githubusercontent.com/Cuzeth/airbnb-safety-tools/main/install.sh | bash";

function normalizeMAC(input: string): string {
  const cleaned = input.replace(/[^0-9a-fA-F]/g, "").toUpperCase();
  if (cleaned.length < 6) return "";
  const octets = cleaned.match(/.{2}/g);
  if (!octets || octets.length < 3) return "";
  return `${octets[0]}:${octets[1]}:${octets[2]}`;
}

export default function SafeStay() {
  const [ouiData, setOuiData] = useState<OUIData | null>(null);
  const [macInput, setMacInput] = useState("");
  const [lookupResult, setLookupResult] = useState<{
    vendor: string;
    risk: "high" | "medium" | "none";
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/data/safestay/oui-camera.json")
      .then((r) => r.json())
      .then((data: OUIData) => setOuiData(data))
      .catch(() => {});
  }, []);

  const lookupMAC = useCallback(
    (value: string) => {
      setMacInput(value);
      if (!ouiData) return;

      const prefix = normalizeMAC(value);
      if (!prefix) {
        setLookupResult(null);
        return;
      }

      const cameraVendor = ouiData.camera[prefix];
      if (cameraVendor) {
        setLookupResult({ vendor: cameraVendor, risk: "high" });
        return;
      }

      const chipsetVendor = ouiData.chipset[prefix];
      if (chipsetVendor) {
        setLookupResult({ vendor: chipsetVendor, risk: "medium" });
        return;
      }

      setLookupResult({ vendor: "", risk: "none" });
    },
    [ouiData],
  );

  const copyInstall = useCallback(() => {
    navigator.clipboard?.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
      {/* ── Section 1: Install ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h3">Install</h2>
        <p className="text-body text-ink-secondary">
          SafeStay inspects the WiFi network you are on. It maps devices with
          an ARP scan, resolves each MAC against a curated table of camera
          manufacturers, probes camera-class ports (RTSP, ONVIF, Tuya P2P,
          MQTT-TLS, known debug backdoors), and assigns each device a risk
          level. A built-in guide covers the physical sweep for the cameras no
          network scan can see.
        </p>
        <p className="micro-label">
          Runtime / Local · Probes / LAN only · Telemetry / None
        </p>
        <p className="text-body text-ink-dim">
          Hobby project. MIT-licensed, provided AS IS — no warranty, no
          liability, not legal advice. Network scanning may be illegal where
          you are; confirm you are authorized before running it.
        </p>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="micro-label">Install / macOS · Linux</p>
            <button
              type="button"
              onClick={copyInstall}
              aria-live="polite"
              className="btn btn--quiet"
            >
              {copied ? "Copied" : "Copy command"}
            </button>
          </div>
          <div className="console">
            <pre className="overflow-x-auto">
              <code>
                <span className="prompt" aria-hidden="true">
                  ›
                </span>
                {INSTALL_CMD}
              </code>
            </pre>
          </div>
          <p className="text-body text-ink-dim">
            The script installs to <code>~/.local/bin</code>, verifies the
            binary against the release&apos;s SHA-256 checksums before
            installing, and never asks for sudo. Inspect it before you run it.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="micro-label">Prebuilt binaries</p>
          <div className="hairline-grid sm:grid-cols-2">
            {DOWNLOAD_LINKS.map((dl) => (
              <a
                key={dl.file}
                href={`${RELEASES_BASE}/${dl.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="chrome-link flex min-h-12 items-center justify-between gap-3 px-4 py-3 font-mono text-control font-medium"
              >
                <span>{dl.label}</span>
                <span aria-hidden="true" className="index-arrow">
                  &darr;
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="micro-label">After install</p>
          <div className="console">
            <pre className="overflow-x-auto">
              <code>
                <span className="prompt" aria-hidden="true">
                  ›
                </span>
                {"sudo safestay"}
                <span className="muted">
                  {"   # full scan — raw ICMP fills the ARP cache"}
                </span>
                {"\n"}
                <span className="prompt" aria-hidden="true">
                  ›
                </span>
                {"safestay"}
                <span className="muted">
                  {"        # unprivileged — TCP and UDP probes only"}
                </span>
              </code>
            </pre>
          </div>
          <p className="text-body text-ink-dim">
            Press <kbd className="kbd">?</kbd> inside the app for the
            physical-check guide and the limits of a network scan.
          </p>
        </div>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="chrome-link self-start font-mono text-control"
        >
          View source on GitHub{" "}
          <span aria-hidden="true" className="index-arrow">
            &rarr;
          </span>
        </a>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-hairline" />

      {/* ── Section 2: MAC vendor lookup ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h3">MAC vendor lookup</h2>
        <p className="text-body text-ink-secondary">
          Checks the first three octets of a MAC address against 150+
          camera-manufacturer OUI prefixes from the{" "}
          <a href={OUI_DB_URL} target="_blank" rel="noopener noreferrer">
            SafeStay OUI table
          </a>
          , derived from the IEEE MA-L registry. A vendor label is a technical
          reference, not an identification: MACs can be spoofed and OUI blocks
          are reused. The installed scanner adds port probes and per-device
          risk assessment.
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label className="field-label" htmlFor="safestay-mac">
              Device MAC
            </label>
            <input
              id="safestay-mac"
              type="text"
              value={macInput}
              onChange={(e) => lookupMAC(e.target.value)}
              placeholder="00:BC:99:1A:2B:3C"
              spellCheck={false}
              autoComplete="off"
              className="input input-mono"
            />
          </div>

          {lookupResult && (
            <div className="plate--sunken px-4 py-3">
              {lookupResult.risk === "high" && (
                <>
                  <p className="font-mono text-control font-medium text-signal-warning">
                    Match / camera vendor — {lookupResult.vendor}
                  </p>
                  <p className="mt-2 text-body text-ink-dim">
                    This prefix is registered to a surveillance or camera
                    company. On its own that is not proof of what the device
                    is: MACs can be spoofed and OUI blocks are reused. An
                    unexpected major-brand camera may be a disclosed device —
                    check the listing.
                  </p>
                </>
              )}
              {lookupResult.risk === "medium" && (
                <>
                  <p className="font-mono text-control font-medium text-ink-primary">
                    Match / chipset vendor — {lookupResult.vendor}
                  </p>
                  <p className="mt-2 text-body text-ink-dim">
                    This chipset ships inside many hidden cameras — and inside
                    many ordinary IoT devices. Treat it as a lead, not a
                    finding: it matters when the same device also exposes
                    camera-class ports.
                  </p>
                </>
              )}
              {lookupResult.risk === "none" && (
                <>
                  <p className="font-mono text-control font-medium text-ink-primary">
                    No match
                  </p>
                  <p className="mt-2 text-body text-ink-dim">
                    No camera-manufacturer match for this prefix. That is not
                    a clearance: hidden cameras often ship with unregistered
                    or randomized MACs precisely to stay out of vendor tables.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-hairline" />

      {/* ── Section 3: Physical sweep ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h3">Physical sweep</h2>
        <p className="text-body text-ink-secondary">
          A network scan misses a whole class of devices: cameras on a
          separate VLAN, cameras with their own 4G SIM, SD-card recorders that
          never touch the network, and everything an AP-isolated network
          hides. Run this sweep in every rental — it takes about 60 seconds
          and needs only your phone.
        </p>

        <div className="flex flex-col gap-6">
          {PHYSICAL_CHECK.map((group, groupIndex) => (
            <div key={group.area} className="flex flex-col gap-2">
              <h3 className="flex items-baseline gap-3 font-mono text-control font-medium uppercase tracking-micro text-ink-primary">
                <span aria-hidden="true" className="index-num">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                {group.area}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body text-ink-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-round bg-ink-structure"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-hairline" />

      {/* ── Section 4: Coverage limits ── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-h3">Coverage limits</h2>
        <p className="text-body text-ink-secondary">
          A clean scan is not a guarantee. SafeStay covers one slice of the
          threat surface; these sit outside it.
        </p>
        <ul className="flex flex-col gap-1.5">
          {LIMITS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-body text-ink-secondary"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-1 w-1 shrink-0 rounded-round bg-ink-structure"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-hairline" />

      {/* ── Disposition ── */}
      <section className="flex flex-col gap-4">
        <p className="text-body text-ink-dim">
          Hobby project. MIT-licensed, provided AS IS — no warranty, no
          liability, not legal advice. Detection is heuristic: false positives
          and false negatives are expected. Network scanning may be illegal
          where you are; confirming you are authorized is on you.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <a
            href={`${REPO_URL}/blob/main/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
            className="chrome-link inline-flex min-h-6 items-center font-mono text-control"
          >
            License
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="chrome-link inline-flex min-h-6 items-center font-mono text-control"
          >
            Source
          </a>
        </div>
      </section>
    </div>
  );
}
