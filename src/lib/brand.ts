/**
 * Canonical brand strings mirrored from abdeen-brand/brand-content.js.
 *
 * These are the values the brand repo treats as canonical-in-one-place
 * precisely because a literal would otherwise have to be re-cut in a dozen
 * surfaces: the release marking, the document code, the establishment
 * line. Mirroring them here gives the site one file to update when the
 * brand repo moves, instead of a grep across chrome, hero, and footer.
 *
 * Keep in sync with `brand-content.js` → `release` and
 * `artifacts.marketing`. Nothing here is derived at runtime: the brand
 * repo is the source, this is the copy.
 */

export const release = {
  version: "3.2",
  label: "Axis",
  short: "v3.2",
  revision: "Rev 3.2",
  /** Calibration stamp — the release's issue month. */
  calibrationShort: "07 / 26",
} as const;

export const marketing = {
  code: "ABD-AXS-02",
  controlId: "A0",
  control: "AXIS//OPEN · A0",
  /** The complete public marking. Chrome carries this verbatim. */
  banner: "AXIS//OPEN · A0 · Doc ABD-AXS-02 · Rev 3.2",
  heroEyebrow: "Software unit // AXIS//OPEN · A0",
} as const;

export const identity = {
  studio: "Abdeen Labs",
  /** The studio dates from a single year; there is no founding→present range. */
  established: "2027",
  establishedLine: "Abdeen Labs / 2027",
} as const;
