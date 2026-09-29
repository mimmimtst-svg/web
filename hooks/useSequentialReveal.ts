"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives a "reveal one more item per discrete scroll" sequence, for a
 * section that has been fixed to exactly one screen (no internal scroll
 * distance of its own) but still needs to step through several items one
 * at a time as the user scrolls.
 *
 * Reacting to scroll *position* doesn't work here — the section never
 * moves, so there's no distance for a position-based observer to react
 * to. Instead, once the section has settled into view, this intercepts
 * wheel/touch/key scroll intents itself (preventDefault, so the page's
 * own snapping can't advance yet), and each discrete gesture reveals
 * one more item. Once every item is revealed, it stops intercepting and
 * scrolling continues normally to the next section.
 *
 * `active` (section snapped into place) gates the interception; `present`
 * (section at least partly on screen) gates the reset. They're separate
 * on purpose: a short scroll that ScrollMagnet pulls back briefly
 * un-settles the section without it ever leaving, and resetting on that
 * would throw away the reveal the user just stepped through. Only
 * scrolling the section fully off screen replays it from the start.
 */
export function useSequentialReveal(total: number, active: boolean, present: boolean) {
  const [revealedCount, setRevealedCount] = useState(0);
  const cooldownRef = useRef(false);
  const touchYRef = useRef<number | null>(null);

  useEffect(() => {
    const reset = () => setRevealedCount(0);
    const showFirst = () => setRevealedCount(1);

    if (!present) {
      if (revealedCount !== 0) reset();
      return;
    }
    if (!active) return;
    // First item shows the moment the section settles; this setState
    // triggers one more run of this same effect (revealedCount is a
    // dependency below), and that next run is the one that actually
    // attaches the listeners below.
    if (revealedCount === 0) {
      showFirst();
      return;
    }
    if (revealedCount >= total) return;

    const advance = () => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      setRevealedCount((count) => Math.min(count + 1, total));
      window.setTimeout(() => {
        cooldownRef.current = false;
      }, 700);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;
      e.preventDefault();
      advance();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        advance();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      const startY = touchYRef.current;
      const currentY = e.touches[0]?.clientY;
      if (startY == null || currentY == null) return;
      if (startY - currentY > 24) {
        e.preventDefault();
        advance();
        touchYRef.current = currentY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active, present, revealedCount, total]);

  return revealedCount;
}
