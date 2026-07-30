import Link from "next/link";
import { SealKey } from "@/components/Seal";
import ThemeToggle from "@/components/ThemeToggle";
import { identity, marketing, release } from "@/lib/brand";

/** Dossier chrome, in the marketing kit's order: the lockup (Key seal ·
 *  divider · wordmark) with mono navigation and the mode control, then the
 *  canonical public identification band, then the 8px lacquer rule that
 *  closes the chrome. The one surface sanctioned to use backdrop blur. */
export default function SiteHeader() {
  return (
    <header className="site-nav sticky top-0 z-40 w-full" role="banner">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16 md:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="lockup chrome-link min-h-10 shrink-0"
          aria-label="Abdeen Labs · Home"
        >
          <SealKey size={28} decorative />
          <span className="lockup-divider" aria-hidden="true" />
          <span className="wordmark site-wordmark">Abdeen Labs</span>
        </Link>

        <div className="flex items-center gap-0 md:gap-1">
          <Link href="/#apps" className="nav-link nav-link--section">
            Apps
          </Link>
          <Link href="/#tools" className="nav-link nav-link--section">
            Tools
          </Link>
          <a
            href="https://github.com/Cuzeth"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-link--external"
          >
            GitHub<span aria-hidden="true">&nbsp;↗</span>
          </a>
          <a
            href="https://jaafar.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-link--external"
          >
            jaafar.cv<span aria-hidden="true">&nbsp;↗</span>
          </a>
          <ThemeToggle />
        </div>
      </nav>

      {/* The identification band carries the complete public marking. It is
          a proprietary handling label, not a classification. */}
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="dossier-band">
          <span className="hidden items-center gap-2 sm:flex">
            <span>[ {identity.studio} ]</span>
            <span className="sep" aria-hidden="true">
              {"///"}
            </span>
            <span>Software unit</span>
          </span>
          <span className="band-doc band-doc--full">{marketing.banner}</span>
          <span className="band-doc band-doc--compact">
            {marketing.control} · {release.revision}
          </span>
        </div>
      </div>

      <div className="lacquer-rule" aria-hidden="true" />
    </header>
  );
}
