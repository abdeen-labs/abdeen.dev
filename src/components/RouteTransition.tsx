"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef } from "react";

/** How long the frozen frame may wait for the next route to commit. Anything
 *  prefetched lands within a frame or two; a cold route that misses this
 *  window is better off swapping plainly than holding a stale page on screen. */
const COMMIT_DEADLINE_MS = 400;

type ViewTransition = {
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  finished: Promise<void>;
};

type TransitionDocument = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
};

/**
 * The browser skips a transition it cannot capture — a backgrounded tab, or a
 * second navigation landing on top of this one. The route still commits, so
 * nothing needs handling; but `ready` rejects on a skip, and a promise the
 * browser created and nobody awaited surfaces as an uncaught error in the
 * console. Claim all three so a skip stays silent.
 */
function ignoreSkipped(transition: ViewTransition) {
  transition.ready.catch(() => {});
  transition.updateCallbackDone.catch(() => {});
  transition.finished.catch(() => {});
}

/** The route a click is asking for, or null if the browser should keep it. */
function routeTargetFor(event: MouseEvent): URL | null {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.defaultPrevented
  ) {
    return null;
  }

  const anchor = (event.target as Element | null)?.closest?.("a");
  if (!anchor || !anchor.getAttribute("href") || anchor.hasAttribute("download")) {
    return null;
  }
  if (anchor.target && anchor.target !== "_self") return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;

  // A file under /public is a document load, not a route change.
  if (/\.[a-z0-9]+$/i.test(url.pathname)) return null;

  // Same page: an in-document hash jump is already smooth on its own.
  if (url.pathname === window.location.pathname) return null;

  return url;
}

/**
 * Cross-dissolves the outgoing page over the incoming one.
 *
 * App Router replaces route content within a single frame, so the page being
 * left has no opportunity to animate — it is on screen, then it is not. The
 * View Transitions API is the only way to keep that last frame alive past the
 * swap: the browser snapshots it, this holds the snapshot until React commits
 * the new route, and the paired CSS then clears the snapshot while the new
 * page's own entrance is already running underneath it.
 *
 * Progressive enhancement. Where `startViewTransition` is missing, or motion is
 * reduced, clicks fall through to `next/link` untouched and the entrance
 * animations carry the change on their own.
 */
export default function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const releaseFrame = useRef<(() => void) | null>(null);

  // The commit React has just painted is the state the transition captures as
  // "new", so releasing here is what ends the freeze at the earliest correct
  // moment rather than on a guessed timer.
  useEffect(() => {
    releaseFrame.current?.();
  }, [pathname]);

  useEffect(() => {
    const doc = document as TransitionDocument;
    const startViewTransition = doc.startViewTransition?.bind(doc);
    if (!startViewTransition) return;

    const onClick = (event: MouseEvent) => {
      // A transition already in flight owns the frame; let this click be plain
      // rather than stack a second one on top of it.
      if (releaseFrame.current) return;
      // A hidden tab cannot be snapshotted, so the browser would only start
      // this to abort it a frame later.
      if (document.visibilityState !== "visible") return;
      // Read per click rather than once on mount, so switching the system
      // setting mid-session takes effect on the next navigation.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const url = routeTargetFor(event);
      if (!url) return;

      // next/link bails once the default is prevented, so this claims the
      // navigation outright instead of racing Link's own handler.
      event.preventDefault();

      ignoreSkipped(
        startViewTransition(() => {
          startTransition(() => {
            router.push(`${url.pathname}${url.search}${url.hash}`);
          });

          return new Promise<void>((resolve) => {
            const release = () => {
              window.clearTimeout(deadline);
              releaseFrame.current = null;
              resolve();
            };
            const deadline = window.setTimeout(release, COMMIT_DEADLINE_MS);
            releaseFrame.current = release;
          });
        }),
      );
    };

    // Capture phase, so the decision is made before React dispatches to Link.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
