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

    // On iOS Safari (and other mobile browsers), the address-bar/toolbar
    // showing or hiding as the page scrolls fires a *rapid burst* of
    // `resize` events while it animates — not one clean event at the end.
    // `check()` forces a synchronous layout read (`getBoundingClientRect`)
    // and a `setSettled` state update, so wiring it directly to `resize`
    // means dozens of forced reflows + React re-renders stack up during
    // that toolbar animation, competing with it for the main thread — the
    // stutter reported as "jank every time the toolbar shows/hides while
    // scrolling". Debouncing collapses that burst into a single check once
    // the toolbar (or any other resize) has actually finished moving.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(check, 200);
    };

    // Checked into a separate boolean first, not used directly as the `if`
    // condition on `window` — newer DOM lib types declare `onscrollend` as
    // always present, so `"onscrollend" in window` used inline narrows
    // `window` to `never` in the branch below (TS treats it as provably
    // unreachable), which fails the build even though real browsers still
    // vary in actual runtime support.
    const supportsScrollend = typeof window.onscrollend !== "undefined";
    if (supportsScrollend) {
      document.addEventListener("scrollend", check);
      window.addEventListener("resize", onResize);
      return () => {
        clearTimeout(resizeTimer);
        document.removeEventListener("scrollend", check);
        window.removeEventListener("resize", onResize);
      };
    }

    // Fallback for browsers without `scrollend` (older Safari): debounce a
    // scroll listener so the layout read only happens once scrolling has
    // paused for a beat, not on every frame while it's still moving.
    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(check, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [epsilon]);

  return { ref, settled };
}
