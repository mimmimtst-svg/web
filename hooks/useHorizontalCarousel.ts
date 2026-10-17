"use client";

import { useRef, useState, useEffect, useCallback, type PointerEvent } from "react";

/**
 * Shared drag/scroll/keyboard-free logic for a horizontally scrolling,
 * scroll-snapping card track (used by both the plan-card mobile carousel
 * and the policy-card carousel). Purely reads/writes the track's own
 * scrollLeft — never touches page scroll.
 */
/** Mouse travel before a press on the track turns into a drag. */
const DRAG_SLOP_PX = 6;

export function useHorizontalCarousel<T extends HTMLElement>() {
  const trackRef = useRef<T>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startScrollLeft: 0 });

  const step = useCallback((el: T) => {
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    return card ? card.getBoundingClientRect().width + gap : el.clientWidth;
  }, []);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    const s = step(el);
    setActiveIndex(s > 0 ? Math.round(el.scrollLeft / s) : 0);
  }, [step]);

  useEffect(() => {
    updateState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: step(el) * direction, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: step(el) * index, behavior: "smooth" });
  };

  // A mouse press only becomes a drag once it has moved DRAG_SLOP_PX:
  // capturing the pointer straight away retargeted the click to the
  // track, so a plain click on a card's link (section 2 → its detail
  // page) did nothing.
  const onPointerDown = (e: PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    // No native image drag / text selection fighting the swipe.
    e.preventDefault();
    drag.current = { active: true, moved: false, startX: e.clientX, startScrollLeft: el.scrollLeft };
  };

  const onPointerMove = (e: PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved) {
      if (Math.abs(dx) < DRAG_SLOP_PX) return;
      drag.current.moved = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = drag.current.startScrollLeft - dx;
  };

  const endDrag = (e: PointerEvent) => {
    const el = trackRef.current;
    drag.current.active = false;
    drag.current.moved = false;
    setDragging(false);
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return {
    trackRef,
    atStart,
    atEnd,
    activeIndex,
    dragging,
    scrollByCard,
    scrollToIndex,
    onPointerDown,
    onPointerMove,
    endDrag,
  };
}
