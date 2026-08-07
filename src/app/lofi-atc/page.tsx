import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageShell from "@/components/ToolPageShell";
import { entryEnabled } from "@/lib/catalog";
import LofiAtcRadio from "./LofiAtcRadio";

// Toggled via `enabled` on the /lofi-atc entry in src/lib/catalog.ts, which
// also drives the homepage index, footer, sitemap, and JSON-LD at once.
const ENABLED = entryEnabled("/lofi-atc");

export const metadata: Metadata = ENABLED
  ? {
      title: "Lo-fi ATC Radio",
      description:
        "Lo-fi beats mixed with the live JFK Tower air-traffic feed. Two streams, one mix, independent volume per channel.",
      alternates: { canonical: "https://abdeen.dev/lofi-atc" },
      openGraph: {
        title: "Lo-fi ATC Radio · Abdeen Labs",
        description:
          "Lo-fi beats mixed with the live JFK Tower air-traffic feed. Two streams, one mix.",
        url: "https://abdeen.dev/lofi-atc",
        type: "website",
      },
    }
  : { robots: { index: false, follow: false } };

export default function LofiAtcPage() {
  if (!ENABLED) notFound();

  return (
    <ToolPageShell
      currentPath="/lofi-atc"
      eyebrow="REF / ATC"
      title="Lo-fi ATC Radio"
      description="Lo-fi beats over the live JFK Tower feed. Two streams, one mix, independent volume per channel."
    >
      <LofiAtcRadio />
    </ToolPageShell>
  );
}
