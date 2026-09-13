import type { Metadata } from "next";
import Hark from "./Hark";

export const metadata: Metadata = {
  title: "Hark — self-hosted iOS notification server",
  description:
    "Send notifications, Live Activities, questions, and Wallet passes to your iPhone through webhooks, REST, or MCP. Self-hosted, with scoped tokens and OAuth.",
  alternates: { canonical: "https://abdeen.dev/hark" },
  openGraph: {
    title: "Hark · Abdeen Labs",
    description:
      "Send notifications, Live Activities, questions, and Wallet passes to your iPhone through webhooks, REST, or MCP. Self-hosted, with scoped tokens and OAuth.",
    url: "https://abdeen.dev/hark",
  },
};

export default function HarkPage() {
  return <Hark />;
}
