import type { CSSProperties } from "react";

/**
 * The two approved Seal forms (BRAND.md → The Seal). Both are supplied
 * components and are never redrawn (Hard Rule #3). The mark is set live
 * in Aref Ruqaa 700 — no logo file exists.
 */

interface SealKeyProps {
  /** Plate size in px. 16 minimum; the mark reads as texture below 24. */
  size?: number;
  /** flush: transparent field for foreign grounds. mono: currentColor. */
  variant?: "flush" | "mono";
  /** Hide from assistive tech when a labelled parent already names it. */
  decorative?: boolean;
  className?: string;
}

/** B · Key — standard. Chamfered plate; the field follows the mode while
 *  the hairline and ink stay lacquer in both. */
export function SealKey({
  size = 40,
  variant,
  decorative = false,
  className,
}: SealKeyProps) {
  const classes = [
    "seal-key",
    variant ? `seal-key--${variant}` : null,
    className ?? null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      style={{ "--seal-size": `${size}px` } as CSSProperties}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "Abdeen Labs seal" })}
    >
      <span className="seal-mark" aria-hidden="true">
        عابدين
      </span>
    </span>
  );
}

interface SealRoundelProps {
  /** Diameter in px. Never below 56. One per page. */
  size?: number;
  /** Hide from assistive tech when adjacent text already names the studio. */
  decorative?: boolean;
  className?: string;
}

/** A · Roundel — ceremonial. Engraves in currentColor; its two amber
 *  lozenges are part of the component wherever it renders. Min 56px,
 *  one per page, never paired with the wordmark. */
export function SealRoundel({
  size = 96,
  decorative = false,
  className,
}: SealRoundelProps) {
  return (
    <svg
      className={["seal-roundel", className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "Abdeen Labs engraved roundel seal" })}
    >
      <defs>
        <path id="seal-roundel-rt" d="M 9.5 50 A 40.5 40.5 0 0 1 90.5 50" />
        <path id="seal-roundel-rb" d="M 5 50 A 45 45 0 0 0 95 50" />
      </defs>
      <circle
        cx="50"
        cy="50"
        r="47.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="50"
        cy="50"
        r="31.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        fontFamily="var(--font-mono-stack)"
        fontSize="7.2"
        fontWeight="500"
        letterSpacing="1.584"
        fill="currentColor"
      >
        <textPath href="#seal-roundel-rt" startOffset="50%" textAnchor="middle">
          ABDEEN LABS
        </textPath>
      </text>
      <text
        fontFamily="var(--font-mono-stack)"
        fontSize="7.2"
        fontWeight="500"
        letterSpacing="1.584"
        fill="currentColor"
      >
        <textPath href="#seal-roundel-rb" startOffset="50%" textAnchor="middle">
          EST 2027
        </textPath>
      </text>
      <rect
        x="6.7"
        y="47.2"
        width="5.6"
        height="5.6"
        transform="rotate(45 9.5 50)"
        fill="var(--amber-400)"
      />
      <rect
        x="87.7"
        y="47.2"
        width="5.6"
        height="5.6"
        transform="rotate(45 90.5 50)"
        fill="var(--amber-400)"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        dy="-0.168em"
        fontFamily="var(--font-mark-stack)"
        fontWeight="700"
        fontSize="27"
        direction="rtl"
        fill="currentColor"
      >
        عابدين
      </text>
    </svg>
  );
}
