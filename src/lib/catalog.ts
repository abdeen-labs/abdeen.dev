/**
 * Single source of truth for everything the site indexes: native apps and
 * browser tools. The homepage index, the /projects index, the ToolPageShell
 * "Related tools" strip, the sitemap, and the layout JSON-LD all render from
 * these arrays, so an entry added here appears everywhere at once. Set
 * `status: "retired"` to pull an entry from every live surface; it keeps its
 * row on /projects, and the route's page.tsx reads the same flag via
 * entryEnabled() to 404 itself.
 *
 * Copy stays specific: what the product does, where it runs when useful,
 * and what happens to the user's data.
 */
export interface CatalogEntry {
  title: string;
  description: string;
  href: string;
  /** Mono metadata shown next to the entry (platform or route). */
  meta: string;
  external?: boolean;
  /** Promotes one enabled app into the homepage release spotlight. */
  spotlight?: boolean;
  /** Defaults to "live". Retired entries leave every live surface and their
   *  page 404s, but apps keep their row on the /projects index. */
  status?: "live" | "retired";
  /** schema.org application entry for the layout JSON-LD graph. Entries
   *  without one (external apps) stay out of the graph. */
  schema?: {
    type: "WebApplication" | "SoftwareApplication" | "MobileApplication";
    /** Override when the schema.org name differs from the catalog title. */
    name?: string;
    applicationCategory: string;
    operatingSystem: string;
    description?: string;
  };
  /** Sitemap priority; entries without one (external apps) are omitted. */
  sitemapPriority?: number;
  /** Plain-language boundary shown on the /tools registry. */
  boundary?: string;
  /** Only exceptions and useful clarifications appear on /privacy. Products
   *  without an entry are covered by the page's opening privacy promise. */
  privacy?: {
    kind: "exception" | "clarification";
    summary: string;
  };
}

// Newest first. The homepage index shows the newest few; /projects renders
// the full list, retired entries included.
const allApps: CatalogEntry[] = [
  {
    title: "Pocketful",
    description:
      "Self-hosted Apple Wallet pass designer for iPhone. Builds passes visually, signs them with your server, and opens Wallet's native add-pass sheet.",
    href: "/pocketful",
    meta: "iOS",
    spotlight: true,
    privacy: {
      kind: "exception",
      summary:
        "Creating or updating a pass sends its design to the signing server you choose and host. Abdeen Labs does not receive it. One-time passes expire after 15 minutes; updatable passes remain on that server.",
    },
    sitemapPriority: 0.9,
    schema: {
      type: "MobileApplication",
      applicationCategory: "DesignApplication",
      operatingSystem: "iOS",
      description:
        "Self-hosted Apple Wallet pass designer for iPhone with visual editing, server-side signing, over-the-air updates, and an MCP companion.",
    },
  },
  {
    title: "Hark",
    description:
      "Send it a webhook or API call and it appears on your iPhone as a notification, Live Activity, or quick approval.",
    href: "/hark",
    meta: "iOS",
    privacy: {
      kind: "clarification",
      summary:
        "Hark runs on your server. Webhooks, deliveries, and approvals stay there, and pushes travel through Apple's push service to your devices. Abdeen Labs operates no hosted instance and receives nothing.",
    },
    sitemapPriority: 0.9,
    schema: {
      type: "SoftwareApplication",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "iOS, macOS, Linux",
      description:
        "Self-hosted server that sends webhooks and API calls to an iPhone as notifications, Live Activities, and approval prompts.",
    },
  },
  {
    title: "Frost",
    description:
      "Input locker for macOS. Freezes the keyboard, mouse, and trackpad while the screen stays visible. Unlocks with Touch ID.",
    href: "/frost",
    meta: "macOS",
    sitemapPriority: 0.9,
    schema: {
      type: "SoftwareApplication",
      applicationCategory: "UtilityApplication",
      operatingSystem: "macOS",
      description:
        "Input locker for macOS. Freezes keyboard, mouse, and trackpad while the screen stays visible. Unlocks with Touch ID.",
    },
  },
  {
    title: "Hush",
    description:
      "Sound studio for iOS. Generates real-time noise and binaural beats, and layers 80+ recorded ambiences into one mix.",
    href: "/hush",
    meta: "iOS",
    sitemapPriority: 0.9,
    schema: {
      type: "MobileApplication",
      applicationCategory: "UtilityApplication",
      operatingSystem: "iOS",
      description:
        "Focus sounds for iOS. Noise generators, binaural beats, and 80+ recorded ambiences, layered on the device.",
    },
  },
  {
    title: "SafeStay Scanner",
    description:
      "Network inspection CLI for rentals. Scans the local network, resolves MAC vendors, and flags camera-class devices.",
    href: "/safestay",
    meta: "macOS · Linux",
    status: "retired",
    sitemapPriority: 0.8,
    schema: {
      type: "SoftwareApplication",
      applicationCategory: "SecurityApplication",
      operatingSystem: "macOS, Linux",
      description:
        "CLI that inspects WiFi networks for hidden cameras: ARP scanning, MAC vendor lookup, and port detection.",
    },
  },
  {
    title: "Strobe",
    description:
      "Rapid serial visual reader for iPhone, iPad, and Mac. Converts PDFs, EPUBs, and plain text into a timed reading stream.",
    href: "https://strobefast.app",
    meta: "strobefast.app",
    external: true,
  },
];

const allTools: CatalogEntry[] = [
  {
    title: "CoverQuad",
    description:
      "Rebuilds the 2×2 playlist cover Apple retired. Four covers in, one square export out.",
    href: "/coverquad",
    meta: "/coverquad",
    boundary: "Covers render locally; archive searches use the site proxy.",
    privacy: {
      kind: "exception",
      summary:
        "If you search for artwork, your search goes to MusicBrainz. When you choose artwork, the image is fetched from Cover Art Archive through the site proxy. Uploaded images and finished covers are not sent to us.",
    },
    sitemapPriority: 0.8,
    schema: {
      type: "WebApplication",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
    },
  },
  {
    title: "Regex Tester",
    description:
      "Tests a regular expression against sample text with live match highlighting, capture groups, and replacement previews.",
    href: "/regex",
    meta: "/regex",
    boundary: "Patterns and sample text stay in this browser.",
    sitemapPriority: 0.9,
    schema: {
      type: "WebApplication",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
    },
  },
  {
    title: "Pomodoro Timer",
    description:
      "Interval timer for focused work with configurable work and break durations and a running session count.",
    href: "/pomodoro",
    meta: "/pomodoro",
    boundary: "Timing and session counts stay in this browser.",
    sitemapPriority: 0.8,
    schema: {
      type: "WebApplication",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
    },
  },
  {
    title: "Password Generator",
    description:
      "Generates random passwords and diceware passphrases with an entropy estimate for every result.",
    href: "/pwgen",
    meta: "/pwgen",
    boundary: "Generation and word lists stay on this device.",
    sitemapPriority: 0.9,
    schema: {
      type: "WebApplication",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
    },
  },
  {
    title: "2FA QR Generator",
    description:
      "Converts TOTP and HOTP secrets or otpauth links into authenticator-ready QR codes.",
    href: "/2fa",
    meta: "/2fa",
    boundary: "Secrets and QR rendering stay on this device.",
    sitemapPriority: 0.8,
    schema: {
      type: "WebApplication",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
    },
  },
  {
    title: "QR Generator",
    description:
      "Renders customizable QR codes for links, WiFi, email, and phone, then exports them as images.",
    href: "/qr",
    meta: "/qr",
    boundary: "Content and QR rendering stay on this device.",
    sitemapPriority: 0.9,
    schema: {
      type: "WebApplication",
      name: "QR Code Generator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
    },
  },
  {
    title: "Lo-fi ATC Radio",
    description:
      "Streams lo-fi beats mixed with live JFK Tower air-traffic control radio.",
    href: "/lofi-atc",
    meta: "/lofi-atc",
    status: "retired",
    sitemapPriority: 0.8,
    schema: {
      type: "WebApplication",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
    },
  },
];

const isLive = (entry: CatalogEntry) => entry.status !== "retired";

/** Live entries only — what the site actually shows and indexes. */
export const apps: CatalogEntry[] = allApps.filter(isLive);
export const tools: CatalogEntry[] = allTools.filter(isLive);

/** The full studio index for /projects: every app, retired ones included. */
export const projectIndex: CatalogEntry[] = allApps;

/** Whether the catalog entry for `href` exists and is live. Route pages
 *  for retirable entries use this to decide between rendering and 404. */
export function entryEnabled(href: string): boolean {
  const entry = [...allApps, ...allTools].find((e) => e.href === href);
  return !!entry && isLive(entry);
}

/**
 * Tools related to `currentHref`, in catalog order starting just after the
 * current tool (wrapping around), so every page cross-links a different trio.
 */
export function relatedTools(currentHref: string, limit = 3): CatalogEntry[] {
  const others = tools.filter((t) => t.href !== currentHref);
  const index = tools.findIndex((t) => t.href === currentHref);
  if (index === -1) return others.slice(0, limit);
  const start = index % others.length;
  return [...others.slice(start), ...others.slice(0, start)].slice(0, limit);
}
