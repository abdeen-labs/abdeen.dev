import { permanentRedirect } from "next/navigation";

/** Hush's policy is folded into the unified studio policy. The URL stays
 *  live because it is the privacy-policy link registered with the App Store. */
export default function HushPrivacyPage() {
  permanentRedirect("/privacy");
}
