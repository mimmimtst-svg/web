/**
 * Groups wheel events into gestures. A trackpad flick (or a fast spin of
 * a mouse wheel) fires a stream of wheel events — including a momentum
 * tail that can last a second or two — and every handler that means "one
 * step per scroll" has to treat that whole stream as a single step.
 *
 * One window listener, installed when this module first loads (before
 * any component effect registers its own), tags each event that starts a
 * new gesture; handlers ask `isNewWheelGesture(e)` for the same event.
 * Sharing it matters: SectionPager and Promises' step-through reveal
 * hand the same flick back and forth, and each keeping its own timer let
 * the tail of a page-turning flick count as extra reveal steps.
 *
 * A gesture starts on any of:
 * - a pause in the stream (GESTURE_GAP_MS),
 * - a change of direction,
 * - a fresh push while the previous gesture's momentum is still coasting.
 *   macOS trackpads / Magic Mouse keep streaming momentum events for 1–2s,
 *   and a new swipe made before they die out arrives with no pause at all
 *   — so a pause-only rule swallowed it, and a click (which kills the
 *   momentum) was needed before the next scroll registered. A momentum
 *   tail only ever decays; once it has fallen well below the gesture's
 *   peak, deltas climbing clearly back up mean a new swipe.
 */
const GESTURE_GAP_MS = 180;
/** Two gesture starts are never closer than this (noise guard). */
const MIN_GESTURE_MS = 300;
/** The tail must decay below this share of the gesture's peak... */
const DECAYED = 0.4;
/** ...before deltas this many times the recent average count as a new push. */
const RISE = 2;
/** ...and at least this many px above it (a dying tail jitters 1px↔3px). */
const RISE_MIN_PX = 4;

let lastAt = 0;
let lastSign = 0;
let startedAt = 0;
let peak = 0;
let decayed = false;
let recent: number[] = [];
const gestureStarts = new WeakSet<Event>();

const pixels = (e: WheelEvent) =>
  Math.abs(e.deltaY) * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);

function track(e: WheelEvent) {
  const size = pixels(e);
  if (size === 0) return;
  const now = performance.now();
  const sign = Math.sign(e.deltaY);
  const average = recent.length ? recent.reduce((a, b) => a + b, 0) / recent.length : 0;

  const isStart =
    now - lastAt > GESTURE_GAP_MS ||
    sign !== lastSign ||
    (decayed &&
      now - startedAt > MIN_GESTURE_MS &&
      recent.length >= 3 &&
      size > average * RISE &&
      size - average >= RISE_MIN_PX);

  if (isStart) {
    gestureStarts.add(e);
    startedAt = now;
    peak = size;
    decayed = false;
    recent = [];
  } else {
    peak = Math.max(peak, size);
    if (size < peak * DECAYED) decayed = true;
  }
  recent.push(size);
  if (recent.length > 3) recent.shift();
  lastAt = now;
  lastSign = sign;
}

if (typeof window !== "undefined") {
  window.addEventListener("wheel", track, { capture: true, passive: true });
}

export const isNewWheelGesture = (e: WheelEvent) => gestureStarts.has(e);
