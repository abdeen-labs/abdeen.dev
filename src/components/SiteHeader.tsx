import Link from "next/link";
import { SealKey } from "@/components/Seal";
import ThemeToggle from "@/components/ThemeToggle";
import { identity, marketing } from "@/lib/brand";

/** Site chrome: the lockup (Key seal · divider · wordmark), navigation,
 *  mode control, public identity band, and lacquer rule. */
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
            href="https://github.com/abdeen-labs"
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

      {/* This continuous public surface carries AXIS//OPEN once in its
          identity band, without record metadata. */}
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="dossier-band">
          <span className="hidden items-center gap-2 sm:flex">
            <span>[ {identity.studio} ]</span>
            <span className="sep" aria-hidden="true">
              {"///"}
            </span>
            <span>Studio site</span>
          </span>
          <span className="band-doc band-doc--full">
            {marketing.topChrome}
          </span>
          <span className="band-doc band-doc--compact">
            {marketing.controlMark}
          </span>
        </div>
      </div>

      <div className="lacquer-rule" aria-hidden="true" />
    </header>
  );
}
