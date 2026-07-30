"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppleBadgeLink, { APPLE_PATH } from "@/components/AppleBadgeLink";
import FadeInWrapper from "@/components/FadeInWrapper";
import FeatureGrid from "@/components/FeatureGrid";
import SectionHeader from "@/components/SectionHeader";

const features = [
  {
    label: "Noise generators",
    detail: "White, pink, brown, and gray noise, synthesized in real time.",
  },
  {
    label: "Binaural beats",
    detail:
      "Alpha, SMR, Beta, and Gamma ranges with a configurable carrier frequency.",
  },
  {
    label: "Isochronic tones",
    detail: "Brainwave entrainment with isochronic and monaural beats.",
  },
  {
    label: "Recorded ambiences",
    detail:
      "80+ recordings: rain, fire, ocean, birds, cafe, train, forest, and more. Bundled with the app and played offline.",
  },
  {
    label: "Layer and mix",
    detail: "Combine up to 6 sounds with independent volume controls.",
  },
  {
    label: "Focus timer",
    detail: "Built-in timer with fade-out for focused work sessions.",
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

const screenshots = [
  {
    src: "/hush/screen-1.png",
    alt: "Hush scene picker playing the Calm mix with pink noise and morning birdsong",
  },
  {
    src: "/hush/screen-2.png",
    alt: "Hush sound picker with imported audio and real-time noise generators",
  },
  {
    src: "/hush/screen-3.png",
    alt: "Hush ambient sound library organized into rain, ocean, fire, nature, and city categories",
  },
];

/** Primary conversion action, shared by the hero and closing CTA. Falls back
 *  to a non-interactive status chip while APP_STORE_URL is unset. */
function AppStoreButton() {
  if (!APP_STORE_URL) {
    return (
      <span className="chip">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={APPLE_PATH} />
        </svg>
        App Store / Pending
      </span>
    );
  }
  return <AppleBadgeLink href={APP_STORE_URL} label="Download on the App Store" />;
}

function ScreenshotImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-[480px] w-[222px] flex-shrink-0 overflow-hidden rounded-plate border border-hairline bg-surface-sunken">
      <Image
        src={src}
        alt={alt}
        width={222}
        height={480}
        sizes="222px"
        className={`h-full w-full object-cover transition-opacity duration-[var(--duration-reveal)] ease-[var(--ease-flat)] ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        ref={(img) => {
          // Cached images can finish before hydration attaches onLoad
          if (img?.complete) setLoaded(true);
        }}
      />
    </div>
  );
}

/** Hero device: the first screenshot mounted on a plate. The screenshot
 *  itself is content; the mount is structure — the plate step, with the
 *  10px inset landing the inner frame's corner at 0, no glow, no shadow. */
function HeroPhone() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-[280px] lg:ml-auto lg:mr-0">
      <div className="plate p-2.5">
        <div className="overflow-hidden border border-hairline">
          <Image
            src="/hush/screen-1.png"
            alt="Hush app interface"
            width={244}
            height={528}
            preload
            sizes="(min-width: 1024px) 244px, 280px"
            className={`block h-auto w-full transition-opacity duration-[var(--duration-reveal)] ease-[var(--ease-flat)] ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            ref={(img) => {
              if (img?.complete) setLoaded(true);
            }}
          />
        </div>
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
              Sound studio for iOS. Hush generates noise and binaural beats in
              real time and layers 80+ recorded ambiences into one mix. Up to
              6 sources run together, all on the device.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
              <AppStoreButton />
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chrome-link font-mono text-control"
              >
                View source &rarr;
              </a>
            </div>
            <p className="micro-label">
              Storage / LOCAL &middot; Egress / 0 &middot; Source / PUBLIC
            </p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper direction="up" delay={0.08} eager>
          <HeroPhone />
        </FadeInWrapper>
      </section>

      {/* Screenshots */}
      <FadeInWrapper direction="up">
        <section>
          <SectionHeader label="Screenshots" count={screenshots.length} />
          <div
            className="flex gap-4 overflow-x-auto pb-4"
            tabIndex={0}
            role="region"
            aria-label="App screenshots, scrollable"
          >
            {screenshots.map((screenshot) => (
              <ScreenshotImage key={screenshot.src} {...screenshot} />
            ))}
          </div>
        </section>
      </FadeInWrapper>

      {/* Features Grid */}
      <section>
        <FadeInWrapper direction="up">
          <SectionHeader label="Features" count={features.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <FeatureGrid items={features} />
        </FadeInWrapper>
      </section>

      {/* Presets */}
      <FadeInWrapper direction="up">
        <section>
          <SectionHeader label="Built-in presets" count={presets.length} />
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <span key={p} className="chip">
                {p}
              </span>
            ))}
          </div>
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
              <p className="text-body text-ink-secondary">
                Free on the App Store. No account, no analytics, no tracking.
                Source is public under GPL-3.0.
              </p>
              <p className="micro-label">
                iOS &middot; License / GPL-3.0
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <AppStoreButton />
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chrome-link font-mono text-control"
                >
                  GitHub &rarr;
                </a>
                <Link
                  href="/hush/privacy"
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
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
