"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { PORTRAIT } from "@/hooks/useMediaQuery";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  /** A number is px; a string is any CSS length (e.g. a calc() in --u). */
  distance?: number | string;
  scale?: number;
  duration?: number;
  /** 'y' (default) slides up from `distance`px below; 'x' slides in
      horizontally from `distance`px away (negative = from the left,
      positive = from the right). */
  axis?: "x" | "y";
  /**
   * Externally controlled visibility. When provided, Reveal renders
   * purely off this prop instead of running its own IntersectionObserver
   * — for cases where a parent needs several Reveal children to share one
   * trigger (e.g. "the whole section has fully settled into view") rather
   * than each one reacting to its own individual visibility.
   */
  visible?: boolean;
  /** Phone only: start this far (a CSS length, e.g. "12%") before the
      element reaches the bottom of the screen, at the first pixel, instead
      of once 8% of it shows. The main page's promises use it (2026-10-29):
      during a phone's momentum glide the "in view" signals come late and
      bunched, and starting off screen hides that. Other uses unchanged. */
  lead?: string;
  /** Start in turn with the other `queue` reveals rather than all at once
      when several come into view together (the main page, 2026-10-29:
      "순차적으로 주르르륵"). Other uses unchanged. */
  queue?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;

/**
 * Fades + slides an element in when it scrolls into view from below, and
 * resets once it drops back out below the viewport (the user scrolled
 * back up past it) — so the entrance replays each time the user comes
 * down to it, but not when they return to it from further down the page
 * (same rule as hooks/useEnterView.ts). Purely visual — it never reads or
 * changes scroll position.
 */
/** 0, 1%, 2% … 15%. */
const THRESHOLDS = Array.from({ length: 16 }, (_, i) => i / 100);

/** `queue` reveals start one after another, top to bottom, however many
    are signalled at once (a fast scroll): the ones signalled in the same
    frame are sorted by where they sit and given rising delays, QUEUE_STEP
    apart — closer together when a big jump brings many at once, so the
    run still takes no more than QUEUE_SPAN — and the next batch follows
    on from the last. */
const QUEUE_STEP = 110;
const QUEUE_SPAN = 1100;
let queueTail = 0;
let pending: { el: HTMLElement; start: (delay: number) => void }[] = [];
let flushFrame = 0;
const enqueue = (el: HTMLElement, start: (delay: number) => void) => {
  pending.push({ el, start });
  if (flushFrame) return;
  flushFrame = requestAnimationFrame(() => {
    flushFrame = 0;
    const batch = pending;
    pending = [];
    const pos = (e: HTMLElement) => {
      const r = e.getBoundingClientRect();
      return r.top * 10000 + r.left;
    };
    batch.sort((a, b) => pos(a.el) - pos(b.el));
    const now = performance.now();
    const step = Math.min(QUEUE_STEP, QUEUE_SPAN / batch.length);
    let at = Math.max(now, Math.min(queueTail, now + QUEUE_STEP));
    for (const item of batch) {
      item.start(Math.round(at - now));
      at += step;
    }
    queueTail = at;
  });
};

export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  distance = 24,
  scale = 1,
  duration = 700,
  axis = "y",
  visible: controlledVisible,
  lead,
  queue = false,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [observedVisible, setObservedVisible] = useState(false);
  const [queuedDelay, setQueuedDelay] = useState(0);
  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : observedVisible;
  const length = typeof distance === "number" ? `${distance}px` : distance;

  useEffect(() => {
    if (isControlled) return;
    const el = ref.current;
    if (!el) return;

    // In view once 15% of it shows — or, for a block taller than the
    // screen can ever show 15% of (단과대별 발전계획's 의료원 runs to
    // several screens on a phone), once it fills a fifth of the screen.
    // Hence the thresholds every 1%: each is a chance to check. On a phone
    // it starts sooner — 8%, an eighth of the screen, measured nearly to
    // the bottom edge (2026-10-21: the next block came in "a little
    // late" while scrolling).
    const phone = window.matchMedia(PORTRAIT).matches;
    const early = phone && lead !== undefined;
    const share = early ? 0 : phone ? 0.08 : 0.15;
    const screenShare = phone ? 0.12 : 0.2;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
        const enough =
          entry.intersectionRatio >= share || entry.intersectionRect.height >= rootHeight * screenShare;
        if (entry.isIntersecting && enough) {
          if (queue) {
            enqueue(el, (d) => {
              setQueuedDelay(d);
              setObservedVisible(true);
            });
          } else setObservedVisible(true);
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) setObservedVisible(false);
      },
      {
        threshold: early ? 0 : THRESHOLDS,
        rootMargin: early ? `0px 0px ${lead} 0px` : phone ? "0px 0px -3% 0px" : "0px 0px -10% 0px",
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isControlled, lead, queue]);

  return (
    <Tag
      {...rest}
      ref={ref}
      className={`reveal ${className} ${visible ? "revealVisible" : "revealHidden"}`}
      style={{
        transitionDelay: visible ? `${delay + (isControlled ? 0 : queuedDelay)}ms` : "0ms",
        transitionDuration: `${duration}ms`,
        ["--reveal-distance-y" as string]: axis === "y" ? length : "0px",
        ["--reveal-distance-x" as string]: axis === "x" ? length : "0px",
        ["--reveal-scale" as string]: scale,
      }}
    >
      {children}
    </Tag>
  );
}
