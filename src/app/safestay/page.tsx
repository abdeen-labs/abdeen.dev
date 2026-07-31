import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageShell from "@/components/ToolPageShell";
import { entryEnabled } from "@/lib/catalog";
import SafeStay from "./SafeStay";

// Toggled via `enabled` on the /safestay entry in src/lib/catalog.ts, which
// also drives the homepage index, footer, sitemap, and JSON-LD at once.
// (The layout keywords list keeps two SafeStay terms commented separately.)
const ENABLED = entryEnabled("/safestay");

export const metadata: Metadata = ENABLED
  ? {
      title: "SafeStay Scanner",
      description:
        "Network inspection CLI for rentals. One command installs it; the scan maps the local WiFi by ARP, resolves MAC vendors against a curated camera OUI table, and probes camera-class ports. A built-in guide covers the physical sweep no scan replaces.",
      alternates: { canonical: "https://abdeen.dev/safestay" },
      openGraph: {
        title: "SafeStay Scanner · Abdeen Labs",
        description:
          "CLI that inspects rental WiFi for camera-class devices: ARP scan, MAC vendor lookup, port detection, and a physical-sweep guide. Runs on your machine.",
        url: "https://abdeen.dev/safestay",
      },
    }
  : { robots: { index: false, follow: false } };

export default function SafeStayPage() {
  if (!ENABLED) notFound();

  return (
    <ToolPageShell
      eyebrow="REF / SAFESTAY"
      currentPath="/safestay"
      title="SafeStay Scanner"
      description="Network inspection CLI for rentals. Scans the local WiFi, resolves MAC vendors, and flags camera-class devices. Pairs with a physical sweep for what a scan cannot see."
    >
      <SafeStay />
    </ToolPageShell>
  );
}
