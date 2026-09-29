"use client";

import { useEffect, useRef, useState } from "react";
import { isNewWheelGesture } from "@/lib/wheelGesture";

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
 * on purpose: anything that briefly nudges the page (a resize realign,
 * a partial swipe) un-settles the section without it leaving, and
 * resetting on that would throw away the reveal the user just stepped
 * through. Only
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

    const step = () => setRevealedCount((count) => Math.min(count + 1, total));
    // Touch and key input have no gesture boundaries to go by, so they're
    // rate-limited instead.
    const advance = () => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      step();
      window.setTimeout(() => {
        cooldownRef.current = false;
      }, 700);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;
      e.preventDefault();
      // One flick = one step: its momentum tail (including the tail of the
      // flick that paged into this section) is swallowed, not counted.
      if (isNewWheelGesture(e)) step();
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

    // Capture phase, so these run before SectionPager's (bubble-phase)
    // listeners on the same window and can claim the gesture first —
    // SectionPager leaves anything already `preventDefault`ed alone.
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
    };
  }, [active, present, revealedCount, total]);

  return revealedCount;
}
