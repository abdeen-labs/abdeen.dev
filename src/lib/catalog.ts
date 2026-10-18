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

// Newest first. The homepage's Latest release is the newest live app and its
// index shows the newest few; /projects renders the full list, retired
// entries included.
const allApps: CatalogEntry[] = [
  {
    title: "Espalier",
    description:
      "A native Git client for the Mac. Keep track of your branches, stage individual lines, and clean up your commits before you push.",
    href: "https://espalier.abdeen.dev",
    meta: "macOS",
    external: true,
  },
  {
    title: "Pocketful",
    description:
      "Create Apple Wallet passes with an AI agent and send them to your iPhone through Hark.",
    href: "/pocketful",
    meta: "Apple Wallet",
    privacy: {
      kind: "exception",
      summary:
        "Your agent or script sends pass specs and images to your own Pocketful server. One-time download links stay in memory and expire after 15 minutes by default; updatable passes are stored locally in SQLite. If you use Hark for delivery, the download link goes through your Hark server and Apple's push network (APNs). Whatever AI client you use to prompt the pass has its own privacy policy.",
    },
    sitemapPriority: 0.9,
    schema: {
      type: "SoftwareApplication",
      applicationCategory: "DesignApplication",
      operatingSystem: "macOS, Linux",
      description:
        "Apple Wallet pass signing with MCP and REST APIs, artwork rendering, optional Hark delivery, and over-the-air updates.",
    },
  },
  {
    title: "Hark",
    description:
      "Send notifications, Live Activities, questions, and Wallet passes to your iPhone through webhooks, REST, or MCP.",
    href: "/hark",
    meta: "iOS",
    privacy: {
      kind: "clarification",
      summary:
        "Hark is entirely self-hosted—Abdeen Labs doesn't run a central Hark server. Your message history and replies stay in your own Postgres database, and notifications travel directly through Apple's push network (APNs) to your devices; Wallet notifications include a pass download link. Connected API and MCP tokens can only read data within their scope, and webhook callbacks send replies only to the URLs you configure.",
    },
    sitemapPriority: 0.9,
    schema: {
      type: "SoftwareApplication",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "iOS, macOS, Linux",
      description:
        "iPhone notifications through webhooks, REST, or MCP. Delivers notifications, Live Activities, questions, and Wallet passes.",
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
      "Command-line network scanner for short-term rentals. Sweeps the local WiFi, resolves MAC vendors, and flags devices that look like network cameras.",
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
      "Read books and documents one word at a time on iPhone, iPad, and Mac, with adjustable timing, chapter navigation, and searchable full text.",
    href: "https://strobefast.app",
    meta: "strobefast.app",
    external: true,
  },
];

const allTools: CatalogEntry[] = [
  {
    title: "CoverQuad",
    description:
      "Brings back the classic 2×2 album-art playlist cover that Apple killed off. Drop in four covers, get one crisp square PNG.",
    href: "/coverquad",
    meta: "/coverquad",
    boundary: "Covers render locally; archive searches use the site proxy.",
    privacy: {
      kind: "exception",
      summary:
        "Everything renders locally in your browser. If you search for album art, your query goes to MusicBrainz, and the covers are fetched from the Cover Art Archive through our proxy. Images you upload from your own device and the covers you export never touch our servers.",
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
