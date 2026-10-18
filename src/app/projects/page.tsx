import type { Metadata } from "next";
import EntryLink from "@/components/EntryLink";
import Icon from "@/components/Icon";
import { projectIndex } from "@/lib/catalog";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Apps, utilities, and experiments from Abdeen Labs.",
  alternates: { canonical: "https://abdeen.dev/projects" },
};

function ProjectMark({ href }: { href: string }) {
  if (href === "/pocketful") {
    return (
      <div className={`${styles.mark} ${styles.markPocketful}`} aria-hidden="true">
        <span />
        <span />
        <i />
      </div>
    );
  }

  if (href === "/hark") {
    return (
      <div className={`${styles.mark} ${styles.markHark}`} aria-hidden="true">
        <span />
        <span />
        <i />
      </div>
    );
  }

  if (href === "/frost") {
    return (
      <div className={`${styles.mark} ${styles.markFrost}`} aria-hidden="true">
        <span />
        <Icon name="lock" size={32} />
      </div>
    );
  }

  if (href === "/hush") {
    return (
      <div className={`${styles.mark} ${styles.markHush}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (href === "/safestay") {
    return (
      <div className={`${styles.mark} ${styles.markSafeStay}`} aria-hidden="true">
        <span />
        <i />
      </div>
    );
  }

  if (href === "https://espalier.abdeen.dev") {
    return (
      <div className={`${styles.mark} ${styles.markEspalier}`} aria-hidden="true">
        <svg viewBox="0 0 218 130">
          <path className={styles.graphMain} d="M28 24V130" />
          <path className={styles.graphBranch} d="M28 104C28 89 54 91 54 76V52C54 37 28 39 28 24" />
          <circle className={styles.graphHead} cx="28" cy="24" r="5" />
          <circle className={styles.graphBranchNode} cx="54" cy="52" r="5" />
          <circle className={styles.graphBranchNode} cx="54" cy="76" r="5" />
          <circle className={styles.graphNode} cx="28" cy="104" r="5" />
          <rect className={styles.graphHeadMessage} x="80" y="21.5" width="104" height="5" />
          <rect x="80" y="49.5" width="82" height="5" />
          <rect x="80" y="73.5" width="112" height="5" />
          <rect x="80" y="101.5" width="70" height="5" />
        </svg>
      </div>
    );
  }

  if (href === "https://strobefast.app") {
    return (
      <div className={`${styles.mark} ${styles.markStrobe}`} aria-hidden="true">
        <span>READ</span>
        <span>READ</span>
        <span>READ</span>
      </div>
    );
  }

  return null;
}

/** Which cards span both columns: the first and fourth, and a card that
 *  would otherwise sit alone at the end, so the wall never shows a hole. */
function wideCards(count: number): boolean[] {
  let column = 0;
  return Array.from({ length: count }, (_, index) => {
    if (index === 0 || index === 3 || (column === 0 && index === count - 1)) {
      column = 0;
      return true;
    }
    column = 1 - column;
    return false;
  });
}

export default function ProjectsPage() {
  const wide = wideCards(projectIndex.length);
  return (
    <div className="site-frame site-frame--wide">
      <header className={`${styles.intro} motion-block`}>
        <span className="page-kicker">Abdeen Labs</span>
        <h1>Projects<span>.</span></h1>
        <p>Apps, utilities, and experiments we wanted to exist.</p>
      </header>

      <section className={styles.wall} aria-label="Projects">
        {projectIndex.map((item, index) => {
          const retired = item.status === "retired";
          const className = [
            styles.card,
            wide[index] ? styles.cardWide : "",
            retired ? styles.cardRetired : "",
            "motion-row",
          ].filter(Boolean).join(" ");
          const style = {
            animationDelay: `calc(var(--route-hold) + ${80 + index * 55}ms)`,
          };
          const body = (
            <>
              <div className={styles.cardTop}>
                <span>{String(index + 1).padStart(2, "0")} · {item.meta}</span>
                {retired && <span>Retired</span>}
              </div>
              <ProjectMark href={item.href} />
              <div className={styles.cardCopy}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className={styles.cardAction}>
                  {retired ? "Retired" : item.external ? "Visit project" : "View project"}
                  {!retired && (
                    <Icon name={item.external ? "arrow-up-right" : "arrow-right"} size={16} />
                  )}
                </span>
              </div>
            </>
          );

          if (retired) {
            return (
              <article className={className} key={item.href} style={style}>
                {body}
              </article>
            );
          }

          return (
            <EntryLink item={item} className={className} key={item.href} style={style}>
              {body}
            </EntryLink>
          );
        })}
      </section>
    </div>
  );
}
