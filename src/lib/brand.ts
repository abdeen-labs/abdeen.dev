/**
 * Canonical brand strings mirrored from abdeen-brand/system/brand-content.js.
 *
 * Mirroring them here gives the site one file to update when the brand repo
 * moves, instead of repeating the same positioning and identity copy across
 * chrome, hero, metadata, and footer.
 *
 * Keep in sync with `brand-content.js` → `release`, `brands`, and `family`.
 * The brand repo remains the source.
 */

const releaseVersion = "5.0";
const releaseIssued = "2026-09";

/**
 * Release details are kept for tooling and internal synchronization. Public
 * site chrome does not show a brand version or document code.
 */
export const release = {
  version: releaseVersion,
  label: "Redline",
  issued: releaseIssued,
} as const;

export const identity = {
  studio: "Abdeen Labs",
  role: "Open-source software and experiments",
  endorsement: "A division of Abdeen Industries",
  established: "2027",
  establishedLine: "Abdeen Labs / 2027",
  positioning: "Private software. Clear boundaries.",
  description:
    "Abdeen Labs is the open-source and experimental division of Abdeen Industries. We make private software that works without accounts, collects as little as possible, and clearly shows what stays on your device and what leaves it. Our source is public.",
  founder:
    "Jaafar Abdeen, a Jordanian Palestinian engineer from al-Khalil",
} as const;

export const industries = {
  name: "Abdeen Industries",
  url: "https://abdeen.industries",
  description:
    "Abdeen Industries builds and operates independent products. Abdeen Labs is our home for open-source software and experiments.",
} as const;

// Control marks have their own namespace; Redline remains the theme name.
const controlNamespace = "ABD33N";
const marketingControlMark = `${controlNamespace}//OPEN`;

export const marketing = {
  controlMark: marketingControlMark,
  /** Continuous public sites may carry the ABD33N public mark once. */
  topChrome: marketingControlMark,
  footer: `${identity.studio} · Private software`,
} as const;
