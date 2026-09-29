/**
 * Groups wheel events into gestures. A trackpad flick (or a fast spin of
 * a mouse wheel) fires a stream of wheel events — including a momentum
 * tail that can last a second — and every handler that means "one step
 * per scroll" has to treat that whole stream as a single step.
 *
 * One window listener, installed when this module first loads (before
 * any component effect registers its own), tags each event that starts a
 * new gesture; handlers ask `isNewWheelGesture(e)` for the same event.
 * Sharing it matters: SectionPager and Promises' step-through reveal
 * hand the same flick back and forth, and each keeping its own timer let
 * the tail of a page-turning flick count as extra reveal steps.
 */
const GESTURE_GAP_MS = 180;

let lastWheelAt = 0;
const gestureStarts = new WeakSet<Event>();

if (typeof window !== "undefined") {
  window.addEventListener(
    "wheel",
    (e) => {
      const now = performance.now();
      if (now - lastWheelAt > GESTURE_GAP_MS) gestureStarts.add(e);
      lastWheelAt = now;
    },
    { capture: true, passive: true }
  );
}

export const isNewWheelGesture = (e: WheelEvent) => gestureStarts.has(e);
