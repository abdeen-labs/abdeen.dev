/**
 * Canonical brand strings.
 *
 * Keeping them here gives the site one file to update instead of repeating
 * the same positioning and identity copy across chrome, hero, metadata, and
 * footer.
 */

const releaseVersion = "5.5";
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
    "Abdeen Labs is the open-source and experimental division of Abdeen Industries.",
  founder:
    "Jaafar Abdeen, a Jordanian Palestinian engineer from al-Khalil",
} as const;

export const industries = {
  name: "Abdeen Industries",
  url: "https://abdeen.industries",
  github: "https://github.com/abdeen-industries",
  description:
    "Abdeen Industries is a software development and cybersecurity company founded by Jaafar Abdeen. Ideas into industry.",
} as const;
