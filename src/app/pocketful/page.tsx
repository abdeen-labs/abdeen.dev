import type { Metadata } from "next";
import Pocketful from "./Pocketful";

export const metadata: Metadata = {
  title: "Pocketful — self-hosted Apple Wallet pass signing",
  description:
    "Create Apple Wallet passes through MCP or REST. Pocketful renders artwork, signs passes on your server, and supports Hark delivery and over-the-air updates.",
  alternates: { canonical: "https://abdeen.dev/pocketful" },
  openGraph: {
    title: "Pocketful · Abdeen Labs",
    description:
      "Describe a Wallet pass to an AI agent. Your server renders the artwork and signs it, with optional Hark delivery to your iPhone.",
    url: "https://abdeen.dev/pocketful",
  },
};

export default function PocketfulPage() {
  return <Pocketful />;
}
