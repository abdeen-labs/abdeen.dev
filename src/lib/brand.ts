/**
 * Canonical brand strings.
 *
 * Keeping them here gives the site one file to update instead of repeating
 * the same positioning and identity copy across chrome, hero, metadata, and
 * footer.
 */

const releaseVersion = "5.6";
const releaseIssued = "2026-10";

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
    "Abdeen Labs is the open-source and experimental division of Abdeen Industries.",
} as const;

export const industries = {
  name: "Abdeen Industries",
  url: "https://abdeen.industries",
  github: "https://github.com/abdeen-industries",
  description:
    "Abdeen Industries is a software engineering company that builds and runs software products for other organizations.",
} as const;
