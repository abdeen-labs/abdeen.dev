import type { Metadata } from "next";
import Hark from "./Hark";

export const metadata: Metadata = {
  title: "Hark — self-hosted iOS notification server",
  description:
    "Send Hark a webhook or API call and it appears on your iPhone as a notification, Live Activity, or approval prompt.",
  alternates: { canonical: "https://abdeen.dev/hark" },
  openGraph: {
    title: "Hark · Abdeen Labs",
    description:
      "Send Hark a webhook or API call and it appears on your iPhone as a notification, Live Activity, or approval prompt.",
    url: "https://abdeen.dev/hark",
  },
};

export default function HarkPage() {
  return <Hark />;
}
