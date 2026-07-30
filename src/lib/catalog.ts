/**
 * Single source of truth for everything the site indexes: native apps and
 * browser tools. The homepage index, the footer navigation, the ToolPageShell
 * "Related tools" strip, the sitemap, and the layout JSON-LD all render from
 * these arrays, so an entry added (or re-enabled) here appears everywhere at
 * once. Set `enabled: false` to pull an entry from all of those surfaces;
 * the route's page.tsx reads the same flag via entryEnabled() to 404 itself.
 *
 * Copy follows the Axis voice (BRAND.md → Voice): lead with the unit and
 * its assigned task, then boundary and evidence. No launch language.
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
      "Executes a regular expression against sample text with live match highlighting. Runs in the browser.",
    href: "/regex",
    meta: "/regex",
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
      "Interval timer for focused work. Configurable work and break durations, with session counts kept on the device.",
    href: "/pomodoro",
    meta: "/pomodoro",
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
      "Generates random passwords and diceware passphrases with stated entropy. Generation runs on the device.",
    href: "/pwgen",
    meta: "/pwgen",
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
      "Converts TOTP and HOTP secrets or otpauth links into authenticator-ready QR codes. The secret stays on the device.",
    href: "/2fa",
    meta: "/2fa",
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
      "Renders QR codes for links, WiFi, email, and phone. Styled on the device and exported as an image.",
    href: "/qr",
    meta: "/qr",
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
