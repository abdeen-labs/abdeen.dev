import { FingerprintRecognition } from "@carbon/icons-react";
import styles from "./FrostVisual.module.css";

/* The desktop is what makes the frost read as frost: a blur over an empty
   field is just grey. These are the shapes with enough edge and value to
   survive it. */
const paragraph = [94, 71, 88, 62, 81, 44];
const sidebar = [70, 52, 84, 61];

/** A compact depiction of Frost itself: the visible Mac desktop beneath
 * the product's overlay, with the single unlock prompt that matters.
 *
 * It deliberately inherits the page theme. Frost is the subject of the
 * visual, not a permanently dark specimen embedded in the page.
 */
export default function FrostVisual({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`${styles.visual} ${compact ? styles.compact : ""}`}
      role="img"
      aria-label="Frost covering a visible Mac desktop while input is locked. Touch ID can release the lock."
    >
      <div className={styles.desktop} aria-hidden="true">
        <div className={`${styles.window} ${styles.windowBack}`}>
          <div className={styles.titleBar}>
            <span className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className={styles.windowBody}>
            <div className={styles.sidebar}>
              {sidebar.map((w) => (
                <span key={w} className={styles.row} style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className={styles.content}>
              {paragraph.map((w, i) => (
                <span
                  key={w}
                  className={i === 2 ? `${styles.row} ${styles.rowMarked}` : styles.row}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.window} ${styles.windowFront}`}>
          <div className={styles.titleBar}>
            <span className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className={styles.tiles}>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* The blur depicts the app's real output; it is not page chrome. */}
      <div className={styles.frost} aria-hidden="true" />
      <div className={styles.wall} aria-hidden="true" />

      <div className={styles.plate} aria-hidden="true">
        <span className={styles.plateHead}>
          <span>Frost</span>
          <span className={styles.plateState}>Active</span>
        </span>

        <strong className={styles.plateTitle}>
          <span>Input</span>
          <span>
            Locked<span className={styles.period}>.</span>
          </span>
        </strong>

        <span className={styles.plateHint}>
          <FingerprintRecognition className={styles.fingerprint} />
          <span>Touch ID to unlock</span>
        </span>
      </div>
    </figure>
  );
}
