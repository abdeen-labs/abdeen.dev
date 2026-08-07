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

/** Shared Nightfield chrome. The route owns the approved dark/light ground. */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" role="banner">
      <div className="identity-rail">
        <span>[ {identity.studio.toUpperCase()} ] <span aria-hidden="true">{"///"}</span> {routeLabel(pathname)}</span>
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
            href="https://github.com/abdeen-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="site-navigation__link"
            onClick={() => setOpen(false)}
          >
            Source <Icon name="arrow-up-right" size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
