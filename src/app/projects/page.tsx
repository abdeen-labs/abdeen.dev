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

  return (
    <div className={`${styles.mark} ${styles.markStrobe}`} aria-hidden="true">
      <span>READ</span>
      <span>READ</span>
      <span>READ</span>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="site-frame site-frame--wide">
      <header className={`${styles.intro} motion-block`}>
        <span className="page-kicker">Abdeen Labs</span>
        <h1>Projects<span>.</span></h1>
        <p>Apps, utilities, and experiments I wanted to exist.</p>
      </header>

      <section className={styles.wall} aria-label="Projects">
        {projectIndex.map((item, index) => {
          const retired = item.status === "retired";
          const wide = index === 0 || index === 3;
          const className = [
            styles.card,
            wide ? styles.cardWide : "",
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
