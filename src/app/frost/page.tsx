import type { Metadata } from "next";
import Frost from "./Frost";

export const metadata: Metadata = {
  title: "Frost — macOS input locker",
  description:
    "Frost locks the keyboard, mouse, and trackpad on macOS while the screen stays visible. Touch ID or a paired Apple Watch releases the lock.",
  alternates: { canonical: "https://abdeen.dev/frost" },
  openGraph: {
    title: "Frost · Abdeen Labs",
    description:
      "A menu-bar input locker for macOS. Input frozen, screen visible. Touch ID or a paired Apple Watch releases the lock.",
    url: "https://abdeen.dev/frost",
  },
};

export default function FrostPage() {
  return <Frost />;
}
