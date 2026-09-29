"use client";

import { useEffect } from "react";

/** How much of the incoming section has to be on screen before it's
    pulled the rest of the way in. Below this, the page returns to the
    section the user came from. */
const COMMIT_RATIO = 0.8;
/** Quiet period after the last scroll event (wheel, momentum, keys)
    before the page is considered at rest. */
const IDLE_MS = 140;

/**
 * Section-to-section "magnet" snapping, replacing CSS
 * `scroll-snap-type: y mandatory` (which commits to the next section
 * after even a tiny scroll). The page scrolls freely under the user's
 * input; once it comes to rest between two sections, it glides the rest
 * of the way to the next one only if that one is already ~80% in view,
 * otherwise back to where it came from. Sections taller than the screen
 * (phones) scroll freely inside and only snap at their edges.
 *
 * The glide is the browser's native smooth scroll: it runs on the
 * compositor, and any new wheel/touch input simply takes over from it.
 */
export default function ScrollMagnet() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastY = window.scrollY;
    let direction = 0;
    let touching = false;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const snapPoints = () => {
      const vh = window.innerHeight;
      const maxY = document.documentElement.scrollHeight - vh;
      const points = new Set<number>([0, Math.max(0, maxY)]);
      document.querySelectorAll<HTMLElement>("main > section").forEach((el) => {
        const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
        points.add(Math.min(top, maxY));
        if (el.offsetHeight > vh + 2) {
          points.add(Math.min(top + el.offsetHeight - vh, maxY));
        }
      });
      return [...points].sort((a, b) => a - b);
    };

    const settle = () => {
      if (touching) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const points = snapPoints();

      let from = points[0];
      let to = points[points.length - 1];
      for (const p of points) {
        if (p <= y) from = p;
        else {
          to = p;
          break;
        }
      }
      if (y - from < 1 || to <= from) return;
      // Inside a section taller than the screen: scroll freely.
      if (to - from > vh * 1.05) return;

      const progress = (y - from) / (to - from);
      let target: number;
      if (direction > 0) target = progress >= COMMIT_RATIO ? to : from;
      else if (direction < 0) target = 1 - progress >= COMMIT_RATIO ? from : to;
      else target = progress >= 0.5 ? to : from;

      window.scrollTo({ top: target, behavior: reduceMotion.matches ? "auto" : "smooth" });
    };

    const scheduleSettle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(settle, IDLE_MS);
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY) direction = Math.sign(y - lastY);
      lastY = y;
      scheduleSettle();
    };
    const onTouchStart = () => {
      touching = true;
      clearTimeout(idleTimer);
    };
    const onTouchEnd = () => {
      touching = false;
      scheduleSettle();
    };
    const onResize = () => {
      // Toolbar show/hide or rotation: re-align to the nearest section.
      direction = 0;
      scheduleSettle();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
