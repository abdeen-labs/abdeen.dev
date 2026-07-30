import styles from "./FrostVisual.module.css";

/** Six-spoke asterisk — Frost's glyph. Drawn as one path so it stays crisp
 * at menu-bar size, where stacked divs turned into a blob. */
function FrostMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 2.6v18.8M3.86 7.3l16.28 9.4M20.14 7.3L3.86 16.7" />
    </svg>
  );
}

/** Touch ID — concentric ridges. The one control that releases the lock,
 * so it earns a glyph rather than another line of mono. */
function TouchIdMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4.6 13.4V12a7.4 7.4 0 0 1 14.8 0v1.4" />
      <path d="M7.9 15.4V12a4.1 4.1 0 0 1 8.2 0v3.4" />
      <path d="M11.2 17.2V12a.8.8 0 0 1 1.6 0v5.2" />
    </svg>
  );
}

/* The desktop is what makes the frost read as frost: a blur over an empty
   field is just grey. These are the shapes with enough edge and value to
   survive 16px of it. */
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
        <div className={styles.menuBar}>
          <span className={styles.menuLeft}>
            <FrostMark className={styles.menuMark} />
            <span className={styles.menuApp}>Frost</span>
            <span className={styles.menuItem}>File</span>
            <span className={styles.menuItem}>Edit</span>
            <span className={styles.menuItem}>View</span>
          </span>
          <span className={styles.menuRight}>
            <span className={styles.battery} />
            <span>14:32</span>
          </span>
        </div>

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

        <div className={styles.dock}>
          <span />
          <span />
          <span className={styles.dockMarked} />
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* The blur depicts the app's real output; it is not page chrome. */}
      <div className={styles.frost} aria-hidden="true" />

      <div className={styles.plate} aria-hidden="true">
        <span className={styles.plateHead}>
          <FrostMark className={styles.plateMark} />
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
          <TouchIdMark className={styles.touchMark} />
          <span>Touch ID to unlock</span>
        </span>
      </div>
    </figure>
  );
}
