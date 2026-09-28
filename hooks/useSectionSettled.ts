"use client";

import { useEffect, useRef, useState } from "react";

// Dense steps so the callback fires often enough (~every 1% of the
// section's height scrolled) to catch the moment its top edge passes
// close to the viewport top, even for a very tall section.
const DENSE_THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

/**
 * Tracks whether a scroll-snap section has settled into its snapped
 * position — its own top edge sitting at the viewport top (`scroll-snap-
 * align: start`) — rather than whether the whole section is visible.
 *
 * A ratio-based "is 98%+ of the element visible" check breaks the moment
 * a section's content is taller than the viewport (e.g. Promises with six
 * items on a short screen): the intersection ratio caps out at
 * viewport-height / section-height, which can never reach a high
 * threshold, so "settled" would never fire and content would stay hidden
 * forever. Checking the top edge instead is correct regardless of how
 * tall the section's content is.
 */
export function useSectionSettled<T extends HTMLElement>(epsilon = 6) {
  const ref = useRef<T>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const top = entry.boundingClientRect.top;
        setSettled(entry.isIntersecting && Math.abs(top) <= epsilon);
      },
      { threshold: DENSE_THRESHOLDS }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [epsilon]);

  return { ref, settled };
}
