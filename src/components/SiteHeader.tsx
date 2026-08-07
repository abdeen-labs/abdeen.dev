"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import { SealKey } from "@/components/Seal";
import { identity, marketing } from "@/lib/brand";

const navItems = [
  { label: "Tools", href: "/tools" },
  { label: "Privacy", href: "/privacy" },
  { label: "About", href: "/about" },
] as const;

const productRoutes = new Set([
  "2fa",
  "coverquad",
  "frost",
  "hush",
  "icon",
  "lofi-atc",
  "pomodoro",
  "pwgen",
  "qr",
  "regex",
  "safestay",
]);

function routeLabel(pathname: string) {
  if (pathname === "/") return "STUDIO SITE";
  if (pathname === "/tools") return "TOOLS";
  if (pathname === "/privacy") return "PRIVACY";
  if (pathname === "/about") return "THE STUDIO";
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && productRoutes.has(segment)
    ? `TOOLS / ${segment.toUpperCase()}`
    : "NOT FOUND";
}

/* The wave sweeps right to left, so a character's delay counts from the end
   of its line. The label is mono, so column x of the outgoing and incoming
   lines sit at the same spot and each column reads as one flap turning. */
const FLAP_STEP_MS = 20;
/* How long a column stays empty between its old flap leaving and its new
   one arriving. Shorter than the page's --route-hold: the breadcrumb is
   the announcement, so it may run ahead of the content. */
const FLAP_LAG_MS = 110;

function flapChars(text: string, extraDelay: number) {
  const chars = [...text];
  return chars.map((ch, i) => (
    <span
      key={i}
      className="route-label__ch"
      style={{ animationDelay: `${(chars.length - 1 - i) * FLAP_STEP_MS + extraDelay}ms` }}
    >
      {ch === " " ? " " : ch}
    </span>
  ));
}

/** Split-flap roll: on a route change each column flips up and away, right
 *  to left, with the new character rolling up beneath it. Per-character
 *  animation needs the live DOM, so the label's view-transition group only
 *  pins the region (globals.css) and the flip itself runs here. */
function RouteLabel({ label }: { label: string }) {
  const [pair, setPair] = useState<{ from: string | null; to: string }>({ from: null, to: label });
  // Adjusting state during render (not in an effect) so the outgoing label
  // is already flipping on the very frame the new route commits.
  if (pair.to !== label) {
    setPair({ from: pair.to, to: label });
  }

  if (pair.from === null || pair.from === pair.to) {
    return <span className="route-label">{label}</span>;
  }

  return (
    <span className="route-label">
      <span className="sr-only">{pair.to}</span>
      <span key={`${pair.from}->${pair.to}`} className="route-label__flip" aria-hidden="true">
        <span className="route-label__line route-label__line--out">{flapChars(pair.from, 0)}</span>
        <span className="route-label__line route-label__line--in">{flapChars(pair.to, FLAP_LAG_MS)}</span>
      </span>
    </span>
  );
}

/** Shared Nightfield chrome. The route owns the approved dark/light ground. */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" role="banner">
      <div className="identity-rail">
        <span>[ {identity.studio.toUpperCase()} ] <span aria-hidden="true">{"///"}</span> <RouteLabel label={routeLabel(pathname)} /></span>
        <span>{marketing.topChrome}</span>
      </div>

      <div className="site-header__main">
        <Link href="/" className="lockup site-lockup" aria-label="Abdeen Labs · Home">
          <SealKey size={30} decorative />
          <span className="lockup-divider" aria-hidden="true" />
          <span className="wordmark">Abdeen Labs</span>
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "xmark" : "menu"} size={20} />
        </button>

        <nav
          id="site-navigation"
          aria-label="Main"
          className={`site-navigation${open ? " site-navigation--open" : ""}`}
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="site-navigation__link"
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://jaafar.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="site-navigation__link"
            onClick={() => setOpen(false)}
          >
            Jaafar <Icon name="arrow-up-right" size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
