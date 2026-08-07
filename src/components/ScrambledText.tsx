"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";

interface ScrambledTextProps {
  /** Radius in px around the pointer inside which characters scramble. */
  radius?: number;
  /** Seconds a character at the pointer's center stays scrambled. */
  duration?: number;
  /** Scramble tick rate multiplier; higher flickers faster. */
  speed?: number;
  /** Glyphs a scrambling character cycles through. */
  scrambleChars?: string;
  className?: string;
  style?: CSSProperties;
  children: string;
}

/**
 * Characters near the pointer flicker through scramble glyphs, then settle
 * back to themselves — nearest the pointer holds longest, so the text heals
 * outward. Same contract as React Bits' gsap-based <ScrambledText />
 * (radius/duration/speed/scrambleChars), implemented on plain DOM timers so
 * the effect costs no dependency; swapping the gsap version back in later is
 * a drop-in.
 *
 * Works in proportional type too: a scrambling character's box is locked to
 * its measured width first, so narrower scramble glyphs cycle inside a fixed
 * cell instead of reflowing the line. The real text stays in the DOM for
 * readers and copy/paste; the animated spans are decoration.
 */
export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".scramble-ch"));
    const tickMs = Math.max(24, Math.round(40 / speed));
    const timers = new Map<HTMLElement, { interval: number; timeout: number }>();

    const restore = (el: HTMLElement) => {
      const timer = timers.get(el);
      if (timer) {
        window.clearInterval(timer.interval);
        window.clearTimeout(timer.timeout);
        timers.delete(el);
      }
      el.textContent = el.dataset.ch ?? "";
      el.style.width = "";
      el.classList.remove("is-scrambling");
    };

    const scramble = (el: HTMLElement, holdMs: number) => {
      const running = timers.get(el);
      if (running) {
        // Already flickering — just push its settle time out.
        window.clearTimeout(running.timeout);
        running.timeout = window.setTimeout(() => restore(el), holdMs);
        return;
      }
      // Freeze the cell at the real glyph's width so the swaps can't
      // reflow the line — matters in proportional type, harmless in mono.
      el.style.width = `${el.getBoundingClientRect().width}px`;
      el.classList.add("is-scrambling");
      timers.set(el, {
        interval: window.setInterval(() => {
          el.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }, tickMs),
        timeout: window.setTimeout(() => restore(el), holdMs),
      });
    };

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (reduced.matches || frame) return;
      const { clientX, clientY } = event;
      // Window-level listener gated by the text's bounds inflated by the
      // radius: characters begin scrambling as the pointer approaches, not
      // only once it is exactly over a glyph.
      const bounds = root.getBoundingClientRect();
      if (
        clientX < bounds.left - radius ||
        clientX > bounds.right + radius ||
        clientY < bounds.top - radius ||
        clientY > bounds.bottom + radius
      ) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = 0;
        for (const el of chars) {
          const box = el.getBoundingClientRect();
          const dx = clientX - (box.left + box.width / 2);
          const dy = clientY - (box.top + box.height / 2);
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            scramble(el, Math.max(120, duration * 1000 * (1 - dist / radius)));
          }
        }
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      chars.forEach(restore);
    };
  }, [radius, duration, speed, scrambleChars]);

  const words = children.split(" ");

  return (
    <span ref={rootRef} className={`scramble ${className}`} style={style}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 && " "}
            <span className="scramble-word">
              {[...word].map((ch, ci) => (
                <span key={ci} className="scramble-ch" data-ch={ch}>
                  {ch}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
