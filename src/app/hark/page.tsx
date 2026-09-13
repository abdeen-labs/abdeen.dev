import type { Metadata } from "next";
import Hark from "./Hark";

export const metadata: Metadata = {
  title: "Hark — iPhone notifications",
  description:
    "Send notifications, Live Activities, questions, and Wallet passes to your iPhone through webhooks, REST, or MCP.",
  alternates: { canonical: "https://abdeen.dev/hark" },
  openGraph: {
    title: "Hark · Abdeen Labs",
    description:
      "Send notifications, Live Activities, questions, and Wallet passes to your iPhone through webhooks, REST, or MCP.",
    url: "https://abdeen.dev/hark",
  },
};

export default function HarkPage() {
  return <Hark />;
}
