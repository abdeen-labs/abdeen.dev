/**
 * Canonical brand strings mirrored from abdeen-brand/brand-content.js.
 *
 * These are the values the brand repo treats as canonical-in-one-place
 * precisely because a literal would otherwise have to be re-cut in a dozen
 * surfaces: the release marking, the document code, the establishment
 * line. Mirroring them here gives the site one file to update when the
 * brand repo moves, instead of a grep across chrome, hero, and footer.
 *
 * Keep in sync with `brand-content.js` → `release`, `identity`, and
 * `artifacts.marketing`. The brand repo remains the source; display forms
 * here derive from the same local primitives so one update cannot leave
 * internally contradictory chrome.
 */

const releaseVersion = "3.4";
const releaseIssued = "2026-07";
const [issuedYear, issuedMonth] = releaseIssued.split("-");

export const release = {
  version: releaseVersion,
  label: "Axis",
  issued: releaseIssued,
  short: `v${releaseVersion}`,
  revision: `Rev ${releaseVersion}`,
  /** Calibration stamp — the release's issue month. */
  calibrationShort: `${issuedMonth} / ${issuedYear.slice(2, 4)}`,
} as const;

export const identity = {
  studio: "Abdeen Labs",
  /** The studio dates from a single year; there is no founding→present range. */
  established: "2027",
  establishedLine: "Abdeen Labs / 2027",
} as const;

const marketingCode = "ABD-AXS-02";
const marketingControlId = "A0";
const marketingControlMark =
  `${release.label.toUpperCase()}//OPEN · ${marketingControlId}`;

export const marketing = {
  code: marketingCode,
  controlId: marketingControlId,
  controlMark: marketingControlMark,
  /** The public mark plus document metadata, carried once in top chrome. */
  topChrome:
    `${marketingControlMark} · Doc ${marketingCode} · ${release.revision}`,
  /** Release metadata for the footer; the A0 mark is not repeated here. */
  footer: `${identity.studio} · ${release.short} · Doc ${marketingCode}`,
} as const;
