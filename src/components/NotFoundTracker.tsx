"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export default function NotFoundTracker() {
  useEffect(() => {
    const { referrer } = document;
    const data = { path: window.location.pathname, ...(referrer ? { referrer } : {}) };
    let attempts = 0;
    // next/script injects script.js after hydration, so it can load after this effect runs.
    const timer = setInterval(() => {
      if (window.umami) window.umami.track("404", data);
      if (window.umami || ++attempts === 40) clearInterval(timer);
    }, 250);
    return () => clearInterval(timer);
  }, []);

  return null;
}
