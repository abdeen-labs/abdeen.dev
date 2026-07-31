import {
  Schibsted_Grotesk,
  Geist,
  Geist_Mono,
  Aref_Ruqaa,
} from "next/font/google";

// Axis type stack (BRAND.md v3.4), served via next/font/google: the
// families are downloaded at build time and self-hosted from this
// origin — no runtime request goes to Google. Google's variable axes
// are not cut at the file level, so the 400 weight floor (Hard Rule
// #12) is enforced by usage: nothing in this app sets a weight below
// 400. Static TTF instances for ImageResponse live in
// public/fonts/axis/static.

// Schibsted Grotesk — uppercase display only, 700–900, never below 24px.
export const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  display: "swap",
  subsets: ["latin"],
});

// Geist — long-form prose. Paragraphs only.
export const geist = Geist({
  variable: "--font-geist",
  display: "swap",
  subsets: ["latin"],
});

// Geist Mono — chrome, data, labels, and the wordmark (500).
// `swap` because it carries the wordmark: a fallback glyph beats
// invisible text.
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  display: "swap",
  subsets: ["latin"],
});

// Aref Ruqaa — the mark عابدين and nothing else (Hard Rule #1).
// `block` because FOUT on the mark reads worse than a brief blank.
export const arefRuqaa = Aref_Ruqaa({
  variable: "--font-aref",
  display: "block",
  weight: "700",
  subsets: ["arabic"],
});
