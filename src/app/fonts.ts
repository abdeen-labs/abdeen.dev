import localFont from "next/font/local";

// Axis type stack (BRAND.md v3.2). Variable files are cut to 400–900 at
// the file level — no thin weights exist in any format (Hard Rule #12).
// Static TTF instances for ImageResponse live in public/fonts/axis/static.

// Schibsted Grotesk — uppercase display only, 700–900, never below 24px.
export const schibsted = localFont({
  variable: "--font-schibsted",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/axis/SchibstedGrotesk[wght].woff2",
      weight: "400 900",
      style: "normal",
    },
  ],
});

// Geist — long-form prose. Paragraphs only.
export const geist = localFont({
  variable: "--font-geist",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/axis/Geist[wght].woff2",
      weight: "400 900",
      style: "normal",
    },
  ],
});

// Geist Mono — chrome, data, labels, and the wordmark (500).
// `swap` because it carries the wordmark: a fallback glyph beats
// invisible text.
export const geistMono = localFont({
  variable: "--font-geist-mono",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/axis/GeistMono[wght].woff2",
      weight: "400 900",
      style: "normal",
    },
  ],
});

// Aref Ruqaa — the mark عابدين and nothing else (Hard Rule #1).
// `block` because FOUT on the mark reads worse than a brief blank.
export const arefRuqaa = localFont({
  variable: "--font-aref",
  display: "block",
  src: [
    {
      path: "../../public/fonts/axis/ArefRuqaa-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
