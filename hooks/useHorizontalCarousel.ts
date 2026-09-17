"use client";

import { useRef, useState, useEffect, useCallback, type PointerEvent } from "react";

/**
 * Shared drag/scroll/keyboard-free logic for a horizontally scrolling,
 * scroll-snapping card track (used by both the plan-card mobile carousel
 * and the policy-card carousel). Purely reads/writes the track's own
 * scrollLeft — never touches page scroll.
 */
export function useHorizontalCarousel<T extends HTMLElement>() {
  const trackRef = useRef<T>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, startX: 0, startScrollLeft: 0 });

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

  const onPointerDown = (e: PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { active: true, startX: e.clientX, startScrollLeft: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScrollLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: PointerEvent) => {
    const el = trackRef.current;
    drag.current.active = false;
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
