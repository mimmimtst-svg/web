"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether a scroll-snap section has settled into its snapped
 * position — its own top edge sitting at the viewport top (`scroll-snap-
 * align: start`) — so entrance animations only start once scrolling has
 * truly finished, not while the browser's native snap-settle deceleration
 * is still playing out.
 *
 * An earlier version polled via IntersectionObserver and flipped "settled"
 * on as soon as the section's top passed within a few px of 0. That still
 * fires a few frames before the native snap animation has fully come to
 * rest, so Reveal's own CSS transform transition would start while the
 * page was still micro-adjusting underneath it — the same class of
 * "double motion" jank documented in 4.8 for `scroll-behavior: smooth`
 * combined with scroll-snap, just from a different source. Waiting for
 * the `scrollend` event (fired only once scrolling, including snap
 * settling, has completely stopped) removes that overlap entirely.
 */
export function useSectionSettled<T extends HTMLElement>(epsilon = 6) {
  const ref = useRef<T>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const top = el.getBoundingClientRect().top;
      setSettled(Math.abs(top) <= epsilon);
    };

    check();

    // Checked into a separate boolean first, not used directly as the `if`
    // condition on `window` — newer DOM lib types declare `onscrollend` as
    // always present, so `"onscrollend" in window` used inline narrows
    // `window` to `never` in the branch below (TS treats it as provably
    // unreachable), which fails the build even though real browsers still
    // vary in actual runtime support.
    const supportsScrollend = typeof window.onscrollend !== "undefined";
    if (supportsScrollend) {
      document.addEventListener("scrollend", check);
      window.addEventListener("resize", check);
      return () => {
        document.removeEventListener("scrollend", check);
        window.removeEventListener("resize", check);
      };
    }

    // Fallback for browsers without `scrollend` (older Safari): debounce a
    // scroll listener so the layout read only happens once scrolling has
    // paused for a beat, not on every frame while it's still moving.
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(check, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", check);
    };
  }, [epsilon]);

  return { ref, settled };
}
