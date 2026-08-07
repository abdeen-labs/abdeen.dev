import type { Metadata } from "next";
import Link from "next/link";
import FadeInWrapper from "@/components/FadeInWrapper";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  // Plain string: the root layout's title.template appends "· Abdeen Labs"
  title: "Terms of Service · Hush",
  description:
    "Terms of service for Hush, the Abdeen Labs sound studio for iOS.",
  alternates: { canonical: "https://abdeen.dev/hush/terms" },
  openGraph: {
    title: "Terms of Service · Hush · Abdeen Labs",
    description:
      "Terms of service for Hush, the Abdeen Labs sound studio for iOS.",
    url: "https://abdeen.dev/hush/terms",
  },
};

/** The terms are governing copy and should stay precise. */
const sections = [
  {
    heading: "Use of the App",
    body: (
      <>
        Hush is a focus sounds app. By using it, you agree to use the app
        responsibly and in accordance with these terms and all applicable
        laws.
      </>
    ),
  },
  {
    heading: "Audio Content",
    body: (
      <>
        Ambient sound recordings included in Hush are sourced under
        permissive licenses (Pixabay Content License, CC0, and MIT). Noise
        generators and brainwave entrainment tones are synthesized locally on
        your device.
      </>
    ),
  },
  {
    heading: "No Warranties",
    body: (
      <>
        Hush is provided &quot;as is&quot; without warranties of any kind. We
        do not guarantee that the app will be uninterrupted or error-free.
        Hush is not a medical device and does not provide medical advice.
      </>
    ),
  },
  {
    heading: "Limitation of Liability",
    body: (
      <>
        We will not be liable for any indirect, incidental, or consequential
        damages arising from your use of Hush.
      </>
    ),
  },
  {
    heading: "Changes to Terms",
    body: (
      <>
        We may update these terms from time to time. Continued use of Hush
        after changes constitutes acceptance of the new terms.
      </>
    ),
  },
  {
    heading: "Contact",
    body: (
      <>
        Questions? Reach out at{" "}
        <a href="mailto:help@abdeen.dev">help@abdeen.dev</a>.
      </>
    ),
  },
];

export default function HushTermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-16 pt-4 md:gap-8 md:pb-24 md:pt-8">
      <FadeInWrapper direction="up" eager>
        <section className="plate">
          {/* Identification bar */}
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3 md:px-8">
            <Link href="/hush" className="micro-label chrome-link">
              <Icon name="arrow-left" />
              Hush
            </Link>
            <span className="micro-label">REF / TERMS</span>
          </div>

          {/* Document title */}
          <div className="px-5 py-6 md:px-8 md:py-8">
            <h1 className="text-h3 md:text-h2">Terms of Service</h1>
            <p className="mt-3 micro-label">
              Hush for iOS &middot; Last updated April 10, 2026
            </p>
          </div>

          {/* Terms */}
          <div className="border-t border-hairline px-5 py-7 md:px-8 md:py-9">
            <div className="flex flex-col gap-7">
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
                <Icon name="arrow-left" />
                Hush
              </Link>
              <Link href="/hush/privacy" className="micro-label chrome-link">
                Privacy Policy
                <Icon name="arrow-right" />
              </Link>
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
