"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const LENIS_OPTIONS = {
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  syncTouch: false,
  anchors: { offset: -100 },
  stopInertiaOnNavigate: true,
  autoRaf: true,
};

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const syncPreference = () => {
      lenis?.destroy();
      lenis = reducedMotion.matches ? null : new Lenis(LENIS_OPTIONS);
    };

    syncPreference();
    reducedMotion.addEventListener("change", syncPreference);

    return () => {
      reducedMotion.removeEventListener("change", syncPreference);
      lenis?.destroy();
    };
  }, []);

  return null;
}
