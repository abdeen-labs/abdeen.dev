"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppleBadgeLink from "@/components/AppleBadgeLink";
import FadeInWrapper from "@/components/FadeInWrapper";
import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import styles from "./hush.module.css";

const mixSteps = [
  {
    number: "01",
    mode: "Generate",
    label: "Noise + tone",
    detail: "White, pink, brown, gray, binaural, isochronic, and monaural.",
    src: "/hush/screen-2.png",
    alt: "Hush sound picker with imported audio and real-time noise generators",
  },
  {
    number: "02",
    mode: "Layer",
    label: "Build the scene",
    detail: "Up to six sources, independent volume, and a focus timer.",
    src: "/hush/screen-1.png",
    alt: "Hush scene picker playing the Calm mix with pink noise and morning birdsong",
  },
  {
    number: "03",
    mode: "Listen",
    label: "80+ ambiences",
    detail: "Rain, fire, ocean, birds, cafe, train, forest, and more—offline.",
    src: "/hush/screen-3.png",
    alt: "Hush ambient library with rain, ocean, fire, nature, and city categories",
  },
];

const presets = [
  "Focus",
  "Deep Work",
  "Sleep",
  "Calm",
  "Storm",
  "Coffee Shop",
  "Rainy Day",
  "Forest",
  "Cozy",
];

const REPO_URL = "https://github.com/cuzeth/hush";
const APP_STORE_URL: string | null = "https://apps.apple.com/us/app/hush-focus-sounds/id6761935532";

const studioFacts = [
  { value: "6", label: "Simultaneous layers" },
  { value: "80+", label: "Bundled recordings" },
  { value: "Offline", label: "After download" },
];

/** Primary conversion action, shared by the hero and closing CTA. Falls back
 *  to a non-interactive status chip while APP_STORE_URL is unset. */
function AppStoreButton() {
  if (!APP_STORE_URL) {
    return (
      <span className="chip">
        Coming to the App Store
      </span>
    );
  }
  return <AppleBadgeLink href={APP_STORE_URL} label="Download on the App Store" />;
}

const mixerLayers = [
  { label: "Pink noise", level: 72 },
  { label: "Birdsong", level: 46 },
  { label: "Rain", level: 58 },
];

/** A compact depiction of Hush itself: the Calm mix as a stack of sound
 * layers at independent volumes, in the same built-visual language as the
 * Pocketful and Frost heroes. */
function HushVisual() {
  return (
    <figure
      className={styles.visual}
      role="img"
      aria-label="Hush playing the Calm mix: pink noise, birdsong, and rain layered at independent volumes with a focus timer running"
    >
      <span className={styles.visualCode} aria-hidden="true">
        MIX
      </span>
      <div className={styles.mixerStack} aria-hidden="true">
        <div className={styles.mixer}>
          <div className={styles.mixerHeader}>
            <span className={styles.mixerMeter}>
              <span />
              <span />
              <span />
              <span />
            </span>
            <span>CALM · PLAYING</span>
          </div>
          <div className={styles.mixerLayers}>
            {mixerLayers.map((layer) => (
              <div key={layer.label}>
                <span>{layer.label}</span>
                <span>{layer.level}</span>
                <i>
                  <b style={{ width: `${layer.level}%` }} />
                </i>
              </div>
            ))}
          </div>
          <div className={styles.mixerFooter}>
            <span>3 / 6 layers</span>
            <span>Focus · 25:00</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

function MixStudio() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={styles.mixStudio}>
      <div className={styles.studioStage}>
        <div className={styles.studioScreens} aria-live="polite">
          {mixSteps.map((step, index) => (
            <Image
              key={step.number}
              src={step.src}
              alt={activeStep === index ? step.alt : ""}
              aria-hidden={activeStep !== index}
              width={286}
              height={621}
              sizes="(max-width: 700px) 240px, 286px"
              className={`${styles.studioScreen} ${
                activeStep === index ? styles.studioScreenActive : ""
              }`}
            />
          ))}
        </div>
        <span className={styles.studioPosition} aria-hidden="true">
          {mixSteps[activeStep].number} / 03
        </span>
      </div>

      <div className={styles.mixControls} role="tablist" aria-label="Hush mix stages">
        {mixSteps.map((step, index) => (
          <button
            key={step.number}
            type="button"
            role="tab"
            aria-selected={activeStep === index}
            className={activeStep === index ? styles.mixControlActive : ""}
            onClick={() => setActiveStep(index)}
            onFocus={() => setActiveStep(index)}
          >
            <span className={styles.mixNumber}>{step.number}</span>
            <span className={styles.mixCopy}>
              <span>{step.mode}</span>
              <strong>{step.label}</strong>
              <small>{step.detail}</small>
            </span>
            <span className={styles.mixArrow} aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Hush() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 pb-20 pt-4 md:gap-20 md:pb-28 md:pt-10">
      {/* Hero */}
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <FadeInWrapper direction="up" eager>
          <div className="flex flex-col gap-5">
            <span className="micro-label">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-signal-identity"
              />
              iOS App · Abdeen Labs
            </span>
            <h1 className="text-h1 md:text-display">
              Hush<span className="text-signal-identity">.</span>
            </h1>
            <p className="max-w-xl text-lede text-ink-secondary">
              Layer live noise, beats, and 80+ offline ambiences. Up to six
              sounds, all on-device.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
              <AppStoreButton />
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chrome-link font-mono text-control"
              >
                View source <Icon name="arrow-up-right" />
              </a>
            </div>
            <p className="micro-label">
              iOS &middot; Free &middot; Open source
            </p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper direction="up" delay={0.08} eager>
          <HushVisual />
        </FadeInWrapper>
      </section>

      {/* Mix studio */}
      <section>
        <FadeInWrapper direction="up">
          <SectionHeader label="Build a mix" count={mixSteps.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <MixStudio />
        </FadeInWrapper>
      </section>

      {/* Studio facts */}
      <FadeInWrapper direction="up">
        <section className={styles.studioFacts} aria-label="Hush facts">
          {studioFacts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </section>
      </FadeInWrapper>

      {/* Presets */}
      <FadeInWrapper direction="up">
        <section>
          <SectionHeader label="Built-in presets" count={presets.length} />
          <ol className={styles.presetRail} tabIndex={0} aria-label="Built-in presets">
            {presets.map((preset, index) => (
              <li key={preset}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{preset}</strong>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
        </section>
      </FadeInWrapper>

      {/* Download */}
      <FadeInWrapper direction="up">
        <section
          aria-label="Get Hush"
          className="border-t border-hairline pt-8 md:pt-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
            <div className="flex max-w-md flex-col gap-3">
              <h2 className="micro-label">
                <span aria-hidden="true" className="text-signal-identity">
                  /
                </span>
                Get Hush
              </h2>
              <p className="micro-label">iOS · Free · GPL-3.0</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <Link
                  href="/privacy"
                  className="chrome-link font-mono text-control"
                >
                  Privacy
                </Link>
                <Link
                  href="/hush/terms"
                  className="chrome-link font-mono text-control"
                >
                  Terms
                </Link>
              </div>
            </div>
            <div>
              <AppStoreButton />
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
