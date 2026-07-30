import Link from "next/link";
import { SealKey } from "@/components/Seal";
import ThemeToggle from "@/components/ThemeToggle";

/** Sticky band: the lockup (Key seal · divider · wordmark), section
 *  anchors, external references, and the mode control. The one surface
 *  sanctioned to use backdrop blur. */
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
          <span className="wordmark">Abdeen Labs</span>
        </Link>

        <div className="flex items-center gap-0 md:gap-1">
          <Link href="/#apps" className="nav-link hidden md:inline-flex">
            Apps
          </Link>
          <Link href="/#tools" className="nav-link hidden md:inline-flex">
            Tools
          </Link>
          <a
            href="https://github.com/Cuzeth"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hidden sm:inline-flex"
          >
            GitHub<span aria-hidden="true">&nbsp;↗</span>
          </a>
          <a
            href="https://jaafar.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hidden sm:inline-flex"
          >
            jaafar.cv<span aria-hidden="true">&nbsp;↗</span>
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
