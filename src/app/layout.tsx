import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { schibsted, geist, geistMono, arefRuqaa } from "./fonts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RouteTransition from "@/components/RouteTransition";
import { identity } from "@/lib/brand";
import { buildJsonLd } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s · Abdeen Labs",
    default: `${identity.studio} · ${identity.positioning}`,
  },
  description: identity.description,
  metadataBase: new URL("https://abdeen.dev"),
  applicationName: "abdeen.dev",
  authors: [{ name: "Jaafar Abdeen", url: "https://jaafar.cv" }],
  creator: "Jaafar Abdeen",
  publisher: "Abdeen Labs",
  keywords: [
    "Jaafar Abdeen",
    "Abdeen Labs",
    "abdeen.dev",
    "free browser tools",
    "password generator",
    "QR code generator",
    "regex tester",
    "pomodoro timer",
    "2FA QR generator",
    "album art collage",
    "open source tools",
    "developer tools",
    "online utilities",
    "Hush",
    "focus sounds",
    "iOS app",
    // Disabled while SafeStay is off (enabled: false in src/lib/catalog.ts)
    // "SafeStay",
    // "hidden camera detector",
  ],
  alternates: {
    canonical: "https://abdeen.dev",
  },
  openGraph: {
    siteName: "abdeen.dev",
    type: "website",
    url: "https://abdeen.dev",
    title: `${identity.studio} · ${identity.positioning}`,
    description: identity.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.studio} · ${identity.positioning}`,
    description:
      "Private software. No account. Open source.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000704",
};

// Application entries derive from src/lib/catalog.ts, so a catalog toggle
// updates the structured data automatically.
const jsonLd = buildJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    schibsted.variable,
    geist.variable,
    geistMono.variable,
    arefRuqaa.variable,
  ].join(" ");

  return (
    <html
      lang="en"
      className={fontVars}
      data-theme="dark"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main-content"
          className="btn btn--primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <RouteTransition />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="relative flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
