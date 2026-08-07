/**
 * Single source of truth for everything the site indexes: native apps and
 * browser tools. The homepage index, the footer navigation, the ToolPageShell
 * "Related tools" strip, the sitemap, and the layout JSON-LD all render from
 * these arrays, so an entry added (or re-enabled) here appears everywhere at
 * once. Set `enabled: false` to pull an entry from all of those surfaces;
 * the route's page.tsx reads the same flag via entryEnabled() to 404 itself.
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
  /** Defaults to true. False hides the entry everywhere and 404s its page. */
  enabled?: boolean;
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
  /** Plain-language boundary used by the registry and privacy page. */
  boundary?: string;
  privacy?: {
    stays: string;
    leaves: string;
  };
}

const allApps: CatalogEntry[] = [
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
    enabled: false,
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
      stays: "Uploaded covers, layout choices, and the rendered export.",
      leaves: "Search terms when you choose Cover Art Archive search.",
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
    privacy: {
      stays: "Patterns, sample text, matches, and replacement previews.",
      leaves: "Nothing.",
    },
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
    privacy: {
      stays: "Work and break settings, countdown state, and session count.",
      leaves: "Nothing.",
    },
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
    privacy: {
      stays: "Generated passwords, passphrases, settings, and entropy estimates.",
      leaves: "Nothing.",
    },
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
    privacy: {
      stays: "TOTP or HOTP secrets, otpauth links, and rendered QR codes.",
      leaves: "Nothing.",
    },
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
    privacy: {
      stays: "Encoded content, style settings, and rendered QR codes.",
      leaves: "Nothing.",
    },
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
    enabled: false,
    sitemapPriority: 0.8,
    schema: {
      type: "WebApplication",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
    },
  },
];

const isLive = (entry: CatalogEntry) => entry.enabled !== false;

/** Enabled entries only — what the site actually shows and indexes. */
export const apps: CatalogEntry[] = allApps.filter(isLive);
export const tools: CatalogEntry[] = allTools.filter(isLive);

/** Whether the catalog entry for `href` exists and is enabled. Route pages
 *  for toggleable tools use this to decide between rendering and 404. */
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
