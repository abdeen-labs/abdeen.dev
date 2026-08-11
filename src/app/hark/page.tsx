import type { Metadata } from "next";
import Hark from "./Hark";

export const metadata: Metadata = {
  title: "Hark — self-hosted iOS notification server",
  description:
    "Hark turns webhooks and agent API calls into iOS push notifications, Live Activities, and approval prompts answered from the Lock Screen. One Go binary over PostgreSQL, self-hosted and single-user.",
  alternates: { canonical: "https://abdeen.dev/hark" },
  openGraph: {
    title: "Hark · Abdeen Labs",
    description:
      "Self-hosted server that turns webhooks and agent API calls into iOS pushes, Live Activities, and Lock Screen approval prompts.",
    url: "https://abdeen.dev/hark",
  },
};

export default function HarkPage() {
  return <Hark />;
}
