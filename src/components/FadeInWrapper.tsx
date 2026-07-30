'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInWrapperProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Render immediately for above-the-fold content instead of waiting for an
   * IntersectionObserver to initialize after hydration. */
  eager?: boolean;
}

/** Entrance confirmation for content arriving into view. Axis motion:
 *  panel-large duration, the flat easing, a short travel, no blur. */
export default function FadeInWrapper({ children, delay = 0, direction = 'up', eager = false }: FadeInWrapperProps) {
  // Framer Motion drives these styles from JS, so the global CSS
  // prefers-reduced-motion rules never apply — gate here instead.
  const reduceMotion = useReducedMotion();
  const distance = 10;

  const variants = reduceMotion
    ? {
        hidden: { opacity: 0, y: 0, x: 0 },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0 },
        },
      }
    : {
        hidden: {
          opacity: 0,
          y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
          x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            // --duration-panel-lg and --ease-flat, expressed for Motion.
            duration: 0.26,
            delay,
            ease: [0.3, 0, 0.2, 1] as [number, number, number, number],
          },
        },
      };

  // `eager` is known at render time, so a plain wrapper keeps server and
  // client markup identical and guarantees that primary content is usable
  // before motion code hydrates.
  if (eager) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate={reduceMotion ? 'visible' : undefined}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.08 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
