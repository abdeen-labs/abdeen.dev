/**
 * Canonical brand strings mirrored from abdeen-brand/brand-content.js.
 *
 * Mirroring them here gives the site one file to update when the brand repo
 * moves, instead of repeating the same positioning and identity copy across
 * chrome, hero, metadata, and footer.
 *
 * Keep in sync with `brand-content.js` → `release`, `identity`, and
 * `artifacts.marketing`. The brand repo remains the source.
 */

const releaseVersion = "3.11";
const releaseIssued = "2026-08";

/**
 * Release details are kept for tooling and internal synchronization. Public
 * site chrome does not show a brand version or document code.
 */
export const release = {
  version: releaseVersion,
  label: "Nightfield",
  issued: releaseIssued,
} as const;

export const identity = {
  studio: "Abdeen Labs",
  /** The studio dates from a single year; there is no founding→present range. */
  established: "2027",
  establishedLine: "Abdeen Labs / 2027",
  positioning: "Private software. Clear boundaries.",
  description:
    "Abdeen Labs makes private software. Our products work without accounts, collect as little as possible, and make it clear what stays on your device and what leaves it. The source is public.",
  founder:
    "Jaafar Abdeen, a Jordanian Palestinian engineer from al-Khalil",
} as const;

const marketingControlMark = `${release.label.toUpperCase()}//OPEN`;

export const marketing = {
  controlMark: marketingControlMark,
  /** Continuous public sites may carry the Nightfield name once. */
  topChrome: marketingControlMark,
  footer: `${identity.studio} · Private software`,
} as const;
