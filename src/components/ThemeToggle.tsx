"use client";

import { useEffect, useRef } from "react";

const STORAGE_KEY = "abdeen-theme";

function resolveMode(): "dark" | "light" {
  const pinned = document.documentElement.dataset.theme;
  if (pinned === "dark" || pinned === "light") return pinned;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

/**
 * The mode control. Interfaces ship in two first-class modes from one
 * role-token set; this pins `data-theme` on <html> and persists it. The
 * visible label is CSS-resolved (`.theme-when-*`), so the server renders
 * both actions and the cascade shows the correct one before hydration.
 * The action is named, never the colour (BRAND.md → Voice).
 */
export default function ThemeToggle() {
  const ref = useRef<HTMLButtonElement>(null);

  // The accessible name mirrors the CSS-chosen visible label once JS is up.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      el.setAttribute(
        "aria-label",
        resolveMode() === "light" ? "Switch to dark" : "Switch to light",
      );
    };
    sync();
    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function switchMode() {
    const next = resolveMode() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage denied — the mode still applies for this page view.
    }
    ref.current?.setAttribute(
      "aria-label",
      next === "light" ? "Switch to dark" : "Switch to light",
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={switchMode}
      aria-label="Switch color mode"
      className="nav-link cursor-pointer border-0 bg-transparent"
    >
      <span className="theme-when-dark" aria-hidden="true">
        Switch to light
      </span>
      <span className="theme-when-light" aria-hidden="true">
        Switch to dark
      </span>
    </button>
  );
}
