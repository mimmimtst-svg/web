"use client";

import { useEffect, useState, type RefObject } from "react";

const EXIT_RATIO = 0.01;

/**
 * True once at least `enterRatio` of the element is on screen, and back
 * to false only once it has left the viewport entirely *through the
 * bottom* — i.e. the user scrolled back up past it. The gap between the
 * two thresholds is deliberate hysteresis: an entrance animation that
 * started while the section was sliding in doesn't flicker off again if
 * the page settles slightly below the threshold.
 *
 * Leaving through the top (scrolling on down past it) keeps it true, so
 * coming back up to it finds its content already in place: entrance
 * animations play when a section arrives from below, not when the user
 * returns to it from a later page.
 */
export function useEnterView(ref: RefObject<HTMLElement | null>, enterRatio = 0.25) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // The callback's ratio can land a hair under the threshold it
        // was fired for, hence the small tolerance.
        if (entry.intersectionRatio >= enterRatio - 0.01) setInView(true);
        // Exit at ~1% rather than on isIntersecting: a section parked
        // exactly against the viewport edge (where snapping leaves the
        // neighbouring one) still counts as "intersecting" with zero area,
        // so the observer would never report it as having left.
        else if (entry.intersectionRatio < EXIT_RATIO && entry.boundingClientRect.top > 0) {
          setInView(false);
        }
      },
      { threshold: [0, EXIT_RATIO, enterRatio] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, enterRatio]);

  return inView;
}
