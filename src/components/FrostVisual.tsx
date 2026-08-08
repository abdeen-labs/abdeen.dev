import Icon from "@/components/Icon";
import styles from "./FrostVisual.module.css";

const documentRows = [88, 64, 76, 91, 58];

/** A compact depiction of Frost itself: the visible Mac desktop beneath
 * the product's overlay, with the single unlock prompt that matters.
 *
 * It deliberately inherits the page theme so Frost remains the subject.
 */
export default function FrostVisual({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`${styles.visual} ${compact ? styles.compact : ""}`}
      role="img"
      aria-label="Frost covering a visible Mac desktop while input is locked. Touch ID can release the lock."
    >
      <div className={styles.screen} aria-hidden="true">
        <div className={styles.window}>
          <div className={styles.titleBar}>
            <span className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className={styles.document}>
            {documentRows.map((width, index) => (
              <span
                key={width}
                className={index === 2 ? styles.rowAccent : undefined}
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        </div>

        <div className={styles.frost} />

        <div className={styles.plate}>
          <Icon
            name="fingerprint"
            size={24}
            emphasized
            className={styles.fingerprint}
          />
          <div className={styles.plateCopy}>
            <strong>
              Input locked<span className={styles.period}>.</span>
            </strong>
            <span>Touch ID to unlock</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
