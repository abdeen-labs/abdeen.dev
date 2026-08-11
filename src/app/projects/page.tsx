import type { Metadata } from "next";
import EntryLink from "@/components/EntryLink";
import Icon from "@/components/Icon";
import { projectIndex } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Projects",
  description: "Every project Abdeen Labs has shipped, newest first.",
  alternates: { canonical: "https://abdeen.dev/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="site-frame site-frame--wide">
      <header className="registry-intro motion-block">
        <div>
          <span className="page-kicker">Studio index</span>
          <h1>Every project</h1>
          <p>Everything the studio has shipped, newest first.</p>
        </div>
        <span className="registry-meta">
          {String(projectIndex.length).padStart(2, "0")} projects
        </span>
      </header>

      <section className="project-index" aria-label="Studio index">
        {projectIndex.map((item, index) => {
          const number = String(index + 1).padStart(2, "0");
          const retired = item.status === "retired";
          const delay = { animationDelay: `calc(var(--route-hold) + ${80 + index * 60}ms)` };
          const body = (
            <>
              <span className="project-index__no" aria-hidden="true">{number}</span>
              <div className="project-index__copy">
                <span className="project-index__meta registry-meta">
                  <span>{item.meta}</span>
                  {retired && <span className="project-index__tag">Retired</span>}
                </span>
                <h2>
                  {item.title}
                  {item.external && <Icon name="arrow-up-right" size={20} />}
                </h2>
                <p>{item.description}</p>
              </div>
            </>
          );
          if (retired) {
            return (
              <div
                className="project-index__plate project-index__plate--retired motion-row"
                key={item.href}
                style={delay}
              >
                {body}
              </div>
            );
          }
          return (
            <EntryLink
              item={item}
              className="project-index__plate motion-row"
              key={item.href}
              style={delay}
            >
              {body}
            </EntryLink>
          );
        })}
      </section>
    </div>
  );
}
