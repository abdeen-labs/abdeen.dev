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
        </div>
      </div>
      <a
        href="https://github.com/abdeen-labs"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        github.com/abdeen-labs <Icon name="arrow-up-right" size={16} />
      </a>
    </footer>
  );
}
