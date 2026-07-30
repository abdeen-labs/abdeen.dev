import type { Metadata } from "next";
import Hush from "./Hush";

export const metadata: Metadata = {
  title: "Hush",
  description:
    "Sound studio for iOS. Hush generates noise and binaural beats in real time and layers 80+ recorded ambiences into one mix, all on the device. No account, no tracking.",
  alternates: { canonical: "https://abdeen.dev/hush" },
  openGraph: {
    title: "Hush · Abdeen Labs",
    description:
      "Sound studio for iOS. Real-time noise generators, binaural beats, and 80+ recorded ambiences, layered on the device.",
    url: "https://abdeen.dev/hush",
  },
};

export default function HushPage() {
  return <Hush />;
}
