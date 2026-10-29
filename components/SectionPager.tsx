"use client";

import { useEffect } from "react";
import { isNewWheelGesture } from "@/lib/wheelGesture";
import { GOTO_EVENT } from "@/lib/pageNav";
import { PORTRAIT } from "@/hooks/useMediaQuery";
import { isMenuOpen } from "@/lib/menuState";

/** One page turn: the next section slides up into place over this long. */
const DURATION_MS = 850;
/** Minimum vertical swipe distance that turns a page on touch. */
const SWIPE_PX = 40;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

/**
 * Full-page section paging: one scroll gesture (wheel flick, swipe, or
 * key press) turns exactly one page, and the next section slides up into
 * place with an eased animation. Replaces free scrolling + snapping,
 * which read as the page pushing back against the user.
 *
 * A section taller than the screen (the last one, whose footer sits
 * below the fold) is paged through too: a turn first shows the rest of
 * it, then moves on. Anything another handler has
 * already claimed (`preventDefault`, e.g. Promises' step-through reveal,
 * which listens in the capture phase so it runs first) is left alone.
 */
export default function SectionPager() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Portrait screens get the mobile layout (Figma 629:7979): the page
    // scrolls freely and nothing here intercepts it.
    const mobile = window.matchMedia(PORTRAIT);
    let animating = false;
    let frame = 0;
    let gestureUsed = false;
    let touch: {
      x: number;
      y: number;
      scrollY: number;
      axis: "x" | "y" | null;
      claimed: boolean;
    } | null = null;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const sections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("main > section")).map((el) => {
        const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
        return { el, top, bottom: top + el.offsetHeight };
      });
    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    // The page only ever moves by page turns, so native vertical panning
    // is switched off in CSS (html[data-paged], globals.css). On iOS a pan
    // that has started can't be cancelled from JS any more, and its
    // momentum carried the page past the next section before the page
    // turn pulled it back.
    const updatePaged = () => {
      document.documentElement.toggleAttribute("data-paged", !mobile.matches);
    };

    const animateTo = (rawTarget: number, duration = DURATION_MS) => {
      const target = Math.max(0, Math.min(rawTarget, maxScroll()));
      const start = window.scrollY;
      const distance = target - start;
      if (Math.abs(distance) < 1) return;
      if (reduceMotion.matches) {
        window.scrollTo(0, target);
        return;
      }
      animating = true;
      const startedAt = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) frame = requestAnimationFrame(step);
        else {
          frame = 0;
          animating = false;
        }
      };
      frame = requestAnimationFrame(step);
    };

    /** How much of the screen top a section's content can't be read
        under: the fixed header, or whatever else the section keeps
        pinned there, marked [data-pager-cover] (the Promises heading). */
    const coverOf = (el: HTMLElement) => {
      const cover = el.querySelector<HTMLElement>("[data-pager-cover]");
      if (cover?.offsetParent) return cover.offsetTop;
      return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
    };

    /** How far down the screen a section's content can be read: the
        bottom, or the top of whatever the section keeps pinned at the
        foot, marked [data-pager-floor] (the Promises cue's cover). */
    const floorOf = (el: HTMLElement) => {
      const floor = el.querySelector<HTMLElement>("[data-pager-floor]");
      if (floor?.offsetParent) return floor.offsetTop;
      return window.innerHeight;
    };

    /** Page top of an element, ignoring transforms (a Reveal still
        waiting to rise in sits lower than its place). */
    const layoutTop = (el: HTMLElement) => {
      let top = 0;
      for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) top += e.offsetTop;
      return top;
    };

    /** Where a tall section with marked blocks (the children of
        [data-pager-stops] — the six promises) comes to rest: its top,
        then each block that wasn't wholly readable on the last screen
        (above the floor) brought up to just under the cover — so a turn
        never leaves a block half under the pinned heading or the cue's
        cover. */
    const restingPoints = (s: { el: HTMLElement; top: number; bottom: number }) => {
      const stops = s.el.querySelectorAll<HTMLElement>("[data-pager-stops] > *");
      if (!stops.length) return null;
      const vh = window.innerHeight;
      const cover = coverOf(s.el);
      const floor = floorOf(s.el);
      const points = [s.top];
      for (const el of stops) {
        const top = layoutTop(el);
        // A few px into the cover's fade don't show.
        if (top + el.offsetHeight > points[points.length - 1] + floor + 4) {
          points.push(Math.min(Math.round(top - cover), s.bottom - vh));
        }
      }
      return points;
    };

    /** Where one page turn in `dir` should go, or null at the very
        first/last page. Inside a section taller than the screen it goes
        to that section's other end first (at most a screen away). */
    const pageTarget = (dir: 1 | -1, y = window.scrollY) => {
      const vh = window.innerHeight;
      const list = sections();
      if (!list.length) return null;
      let i = list.findIndex((s) => y >= s.top - 2 && y < s.bottom - 2);
      if (i === -1) i = y < list[0].top ? 0 : list.length - 1;
      const current = list[i];
      const points = restingPoints(current);
      if (points) {
        if (dir > 0) return points.find((p) => p > y + 2) ?? list[i + 1]?.top ?? null;
        const back = points.filter((p) => p < y - 2);
        if (back.length) return back[back.length - 1];
      } else {
        // Inside a section taller than the screen a turn moves by what
        // is visible under the fixed header, so nothing slides past
        // unseen.
        const step = vh - coverOf(current.el);
        if (dir > 0) {
          if (y + vh < current.bottom - 2) return Math.min(current.bottom - vh, y + step);
          return list[i + 1]?.top ?? null;
        }
        if (y > current.top + 2) return Math.max(current.top, y - step);
      }
      const prev = list[i - 1];
      if (!prev) return null;
      const prevPoints = restingPoints(prev);
      return prevPoints ? prevPoints[prevPoints.length - 1] : Math.max(prev.top, prev.bottom - vh);
    };

    const onWheel = (e: WheelEvent) => {
      if (mobile.matches || isMenuOpen()) return;
      // A trackpad flick's momentum tail belongs to the gesture that
      // already turned the page (lib/wheelGesture.ts).
      const newGesture = isNewWheelGesture(e);
      if (e.defaultPrevented) {
        gestureUsed = true;
        return;
      }
      if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (animating || (gestureUsed && !newGesture)) {
        e.preventDefault();
        return;
      }
      const target = pageTarget(e.deltaY > 0 ? 1 : -1);
      if (target === null) {
        gestureUsed = false;
        return;
      }
      e.preventDefault();
      gestureUsed = true;
      animateTo(target);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (mobile.matches || isMenuOpen()) {
        touch = null;
        return;
      }
      const t = e.touches[0];
      touch =
        t && e.touches.length === 1
          ? { x: t.clientX, y: t.clientY, scrollY: window.scrollY, axis: null, claimed: false }
          : null;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!touch || !t) return;
      if (e.defaultPrevented) {
        touch.claimed = true;
        return;
      }
      const dx = t.clientX - touch.x;
      const dy = t.clientY - touch.y;
      if (!touch.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) {
        touch.axis = Math.abs(dy) > Math.abs(dx) ? "y" : "x";
      }
      // Horizontal swipes belong to the card carousels.
      if (touch.axis !== "y") return;
      if (animating || pageTarget(dy < 0 ? 1 : -1) !== null) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const started = touch;
      touch = null;
      if (!started || !t || started.claimed || started.axis !== "y" || animating) return;
      const dy = started.y - t.clientY;
      if (Math.abs(dy) < SWIPE_PX) return;
      // Paged from where the swipe started, so any native movement during
      // the swipe can't make it skip or fall short of a page.
      const target = pageTarget(dy > 0 ? 1 : -1, started.scrollY);
      if (target !== null) animateTo(target);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (mobile.matches || isMenuOpen()) return;
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isTyping(e.target)) return;
      const onButton = e.target instanceof HTMLElement && /^(BUTTON|A)$/.test(e.target.tagName);
      let dir: 1 | -1 | 0 = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey && !onButton)) dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey && !onButton)) dir = -1;
      if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        if (!animating) animateTo(e.key === "Home" ? 0 : maxScroll());
        return;
      }
      if (!dir) return;
      if (animating) {
        e.preventDefault();
        return;
      }
      const target = pageTarget(dir);
      if (target === null) return;
      e.preventDefault();
      animateTo(target);
    };

    // Anything that leaves the page between sections without going
    // through the handlers above (scrollbar drag, find-in-page, a resize
    // or mobile toolbar changing 100dvh) glides to the nearest section.
    const realign = () => {
      if (animating || touch || mobile.matches) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const points = new Set<number>([0, Math.max(0, maxScroll())]);
      for (const s of sections()) {
        points.add(Math.min(s.top, maxScroll()));
        if (s.bottom - s.top > vh + 2) points.add(Math.min(s.bottom - vh, maxScroll()));
      }
      const sorted = [...points].sort((a, b) => a - b);
      let from = sorted[0];
      let to = sorted[sorted.length - 1];
      for (const p of sorted) {
        if (p <= y) from = p;
        else {
          to = p;
          break;
        }
      }
      if (y - from < 2 || to <= from || to - from > vh * 1.05) return;
      animateTo(y - from < to - y ? from : to);
    };
    // goToSection() (lib/pageNav.ts): a link to a page glides there with
    // the same page-turn animation.
    const onGoto = (e: Event) => {
      const el = document.getElementById((e as CustomEvent<string>).detail);
      if (!el) return;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      animating = false;
      const target = el.getBoundingClientRect().top + window.scrollY;
      // A jump across several pages gets a little longer, not 3x as fast.
      const pages = Math.abs(target - window.scrollY) / window.innerHeight;
      animateTo(target, Math.min(1400, DURATION_MS + Math.max(0, pages - 1) * 250));
    };

    const onResize = () => {
      updatePaged();
      // A phone pages nothing; its browser bar sliding on scroll fires
      // resize after resize (see useHorizontalCarousel).
      if (!mobile.matches) scheduleRealign();
    };
    const scheduleRealign = () => {
      if (animating) return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(realign, 200);
    };

    updatePaged();
    const active = { passive: false } as const;
    window.addEventListener("wheel", onWheel, active);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, active);
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", scheduleRealign, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener(GOTO_EVENT, onGoto);
    return () => {
      document.documentElement.removeAttribute("data-paged");
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", scheduleRealign);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(GOTO_EVENT, onGoto);
    };
  }, []);

  return null;
}
