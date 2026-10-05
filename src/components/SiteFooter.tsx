"use client";

import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { SealRoundel } from "@/components/Seal";
import { identity } from "@/lib/brand";

export default function SiteFooter() {
  const pathname = usePathname();
  const full = pathname === "/" || pathname === "/about";

  return (
    <footer className={`site-footer${full ? " site-footer--full" : ""}`}>
      <div className="site-footer__identity">
        {full && (
          <span className="site-footer__roundel">
            <SealRoundel size={72} decorative />
          </span>
        )}
        <div>
          <span className="wordmark">Abdeen Labs</span>
          <span className="site-footer__meta">{identity.studio} — EST {identity.established}</span>
          <span className="site-footer__meta">{identity.endorsement}</span>
        </div>
      </div>
      <nav className="site-footer__links" aria-label="Elsewhere">
        <a
          href="https://github.com/abdeen-labs"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          data-umami-event="github"
          data-umami-event-location="footer"
        >
          github.com/abdeen-labs <Icon name="arrow-up-right" size={16} />
        </a>
        <a
          href="https://jaafar.cv"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          aria-label="Jaafar Abdeen's CV"
          data-umami-event="jaafar-cv"
          data-umami-event-location="footer"
        >
          CV <Icon name="arrow-up-right" size={16} />
        </a>
      </nav>
    </footer>
  );
}
