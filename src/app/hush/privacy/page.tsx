import type { Metadata } from "next";
import Link from "next/link";
import FadeInWrapper from "@/components/FadeInWrapper";

export const metadata: Metadata = {
  // Plain string: the root layout's title.template appends "· Abdeen Labs"
  title: "Privacy Policy · Hush",
  description:
    "Hush does not collect, store, or transmit your personal data. Everything stays on your device.",
  alternates: { canonical: "https://abdeen.dev/hush/privacy" },
  openGraph: {
    title: "Privacy Policy · Hush · Abdeen Labs",
    description:
      "Hush does not collect, store, or transmit your personal data.",
    url: "https://abdeen.dev/hush/privacy",
  },
};

/** The policy statements are governing copy and should stay precise. */
const sections = [
  {
    heading: "Data Collection",
    body: (
      <>
        Hush does not collect any personal data. There are no accounts, no
        analytics, and no tracking. We do not transmit any information from
        your device.
      </>
    ),
  },
  {
    heading: "Local Storage Only",
    body: (
      <>
        Your saved presets, sound preferences, and session state all remain
        exclusively on your device. Nothing is uploaded to any server.
      </>
    ),
  },
  {
    heading: "No Analytics",
    body: (
      <>
        We do not use analytics, tracking pixels, or any third-party services
        that could identify or profile you.
      </>
    ),
  },
  {
    heading: "Audio Content",
    body: (
      <>
        All noise generators run locally using real-time DSP. Ambient sound
        files are bundled with the app and play entirely offline. No network
        requests are made during playback.
      </>
    ),
  },
  {
    heading: "Contact",
    body: (
      <>
        If you have any questions about this policy, reach out at{" "}
        <a href="mailto:help@abdeen.dev">help@abdeen.dev</a>.
      </>
    ),
  },
];

export default function HushPrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-16 pt-4 md:gap-8 md:pb-24 md:pt-8">
      <FadeInWrapper direction="up" eager>
        <section className="plate">
          {/* Identification bar */}
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3 md:px-8">
            <Link href="/hush" className="micro-label chrome-link">
              <span aria-hidden="true" className="text-signal-identity">
                &larr;
              </span>
              Hush
            </Link>
            <span className="micro-label">REF / PRIVACY</span>
          </div>

          {/* Document title */}
          <div className="px-5 py-6 md:px-8 md:py-8">
            <h1 className="text-h3 md:text-h2">Privacy Policy</h1>
            <p className="mt-3 micro-label">
              Hush for iOS &middot; Last updated April 10, 2026
            </p>
          </div>

          {/* Policy */}
          <div className="border-t border-hairline px-5 py-7 md:px-8 md:py-9">
            <p className="micro-label">
              Stored on device &middot; Nothing sent &middot; No analytics
            </p>

            <div className="mt-7 flex flex-col gap-7">
              {sections.map((s, i) => (
                <section key={s.heading}>
                  <div className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="index-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-mono text-control font-medium uppercase tracking-micro text-ink-primary">
                      {s.heading}
                    </h2>
                  </div>
                  <p className="mt-2 text-body text-ink-secondary">{s.body}</p>
                </section>
              ))}
            </div>

            {/* Cross-navigation */}
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-5">
              <Link href="/hush" className="micro-label chrome-link">
                <span aria-hidden="true" className="text-signal-identity">
                  &larr;
                </span>
                Hush
              </Link>
              <Link href="/hush/terms" className="micro-label chrome-link">
                Terms of Service
                <span aria-hidden="true" className="index-arrow">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
