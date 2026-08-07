import localFont from "next/font/local";

// Canonical Nightfield faces are vendored with the site. This avoids a build-
// time network dependency and keeps the browser on the exact brand cuts.
export const schibsted = localFont({
  src: "./font-files/SchibstedGrotesk.woff2",
  variable: "--font-schibsted",
  display: "swap",
  weight: "400 900",
});

export const geist = localFont({
  src: "./font-files/Geist.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "400 900",
});

export const geistMono = localFont({
  src: "./font-files/GeistMono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400 900",
});

export const arefRuqaa = localFont({
  src: "./font-files/ArefRuqaa-Bold.woff2",
  variable: "--font-aref",
  display: "block",
  weight: "700",
});
