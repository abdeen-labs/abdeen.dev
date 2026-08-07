import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { SealKey } from "@/components/Seal";
import { identity } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: "About Abdeen Labs, an independent software studio run by Jaafar Abdeen.",
  alternates: { canonical: "https://abdeen.dev/about" },
};

export default function AboutPage() {
  return (
    <div className="site-frame site-frame--wide">
      <section className="about-hero motion-block" aria-labelledby="about-title">
        <div>
          <span className="page-kicker">The studio</span>
          <h1 id="about-title">A small studio, run in the open</h1>
          <div className="about-copy">
            <p>Abdeen Labs is an independent software studio. It makes tools for people who want to know where their data is—and for everything here, the answer begins with: on your device.</p>
            <p>The studio is run by {identity.founder}. Everything it ships is built and published in the open, and every privacy claim is meant to be inspectable.</p>
          </div>
        </div>
        <div className="about-hero__seal" aria-hidden="true"><SealKey size={140} decorative /></div>
      </section>

      <section className="about-details">
        <div className="motion-row" style={{ animationDelay: "calc(var(--route-hold) + 140ms)" }}>
          <span className="page-kicker">Record</span>
          <dl className="record-list">
            <div><dt>2027</dt><dd>Abdeen Labs established.</dd></div>
            <div><dt>2026</dt><dd>Public tools and product work published in the open.</dd></div>
          </dl>
        </div>
        <div className="motion-row" style={{ animationDelay: "calc(var(--route-hold) + 200ms)" }}>
          <span className="page-kicker">Contact</span>
          <div className="contact-list">
            <a href="mailto:help@abdeen.dev" className="text-link">help@abdeen.dev <Icon name="mail" size={16} /></a>
            <a href="https://github.com/abdeen-labs" target="_blank" rel="noopener noreferrer" className="text-link">Issues, on any repository <Icon name="arrow-up-right" size={16} /></a>
            <p>No forms. No newsletter. Mail gets read.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
