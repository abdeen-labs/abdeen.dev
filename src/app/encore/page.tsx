import type { Metadata } from "next";
import Encore from "./Encore";

export const metadata: Metadata = {
  title: "Encore — local voice AI for the Mac",
  description:
    "Encore is local voice AI for the Mac: text to speech, voice cloning, voice design, voice changing, multi-speaker scripts, and transcription. Nothing you type, record, or generate leaves your computer.",
  alternates: { canonical: "https://abdeen.dev/encore" },
  openGraph: {
    title: "Encore · Abdeen Labs",
    description:
      "Local voice AI for the Mac. Text to speech, voice cloning, voice design, voice changing, multi-speaker scripts, and transcription, with no account and no cloud.",
    url: "https://abdeen.dev/encore",
  },
};

export default function EncorePage() {
  return <Encore />;
}
