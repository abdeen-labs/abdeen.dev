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

/**
 * The brand release. Display forms (`v3.4`, `Rev 3.4`) are deliberately
 * absent: the revision appears only inside the brand guide PDF (hard
 * rule 17) — public chrome carries the document code unversioned.
 */
export const release = {
  version: releaseVersion,
  label: "Axis",
  issued: releaseIssued,
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
  /** The public mark plus the document code, carried once in top chrome. */
  topChrome: `${marketingControlMark} · Doc ${marketingCode}`,
  /** Footer identification; the A0 mark is not repeated here. */
  footer: `${identity.studio} · Doc ${marketingCode}`,
} as const;
