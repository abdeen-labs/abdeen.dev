import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * The two approved Seal forms (BRAND.md → The Seal). Both are supplied
 * components and are never redrawn (Hard Rule #3). The mark is set live
 * in Aref Ruqaa 700 — no logo file exists.
 */

interface SealKeyProps {
  /** Plate size in px. 16 minimum; the mark reads as a motif below 24. */
  size?: number;
  /** flush: transparent field for foreign grounds. mono: currentColor. */
  variant?: "flush" | "mono";
  /** Hide from assistive tech when a labelled parent already names it. */
  decorative?: boolean;
  className?: string;
}

/** B · Key — standard. Chamfered plate with the canonical Accent hairline. */
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

/** A · Roundel — the exact generated 04A asset from abdeen-brand.
 * Never reconstruct its mark, ring type, or baseline in consumer code. */
export function SealRoundel({
  size = 96,
  decorative = false,
  className,
}: SealRoundelProps) {
  return (
    <Image
      className={["seal-roundel", className].filter(Boolean).join(" ")}
      src="/brand/seal-roundel-chalk.svg"
      width={size}
      height={size}
      alt={decorative ? "" : "Abdeen Labs engraved roundel seal"}
      aria-hidden={decorative || undefined}
      unoptimized
    />
  );
}
