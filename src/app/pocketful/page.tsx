import type { Metadata } from "next";
import Pocketful from "./Pocketful";

export const metadata: Metadata = {
  title: "Pocketful — Apple Wallet pass designer",
  description:
    "Pocketful is a self-hosted Apple Wallet pass designer for iPhone with visual editing, server-side signing, over-the-air updates, and an MCP companion.",
  alternates: { canonical: "https://abdeen.dev/pocketful" },
  openGraph: {
    title: "Pocketful · Abdeen Labs",
    description:
      "Design Apple Wallet passes on iPhone, sign them with your own server, and add them through Wallet's native sheet.",
    url: "https://abdeen.dev/pocketful",
  },
};

export default function PocketfulPage() {
  return <Pocketful />;
}
