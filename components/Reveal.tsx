"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  distance?: number;
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
};

/**
 * Fades + slides an element in every time it scrolls into view, and
 * resets when it scrolls back out — so the transition replays each time
 * the page passes over it, not just the first time. Purely visual — it
 * never reads or changes scroll position, so it can't interact with the
 * page's CSS scroll-snap.
 */
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
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [observedVisible, setObservedVisible] = useState(false);
  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : observedVisible;

  useEffect(() => {
    if (isControlled) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setObservedVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isControlled]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className} ${visible ? "revealVisible" : "revealHidden"}`}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        transitionDuration: `${duration}ms`,
        ["--reveal-distance-y" as string]: axis === "y" ? `${distance}px` : "0px",
        ["--reveal-distance-x" as string]: axis === "x" ? `${distance}px` : "0px",
        ["--reveal-scale" as string]: scale,
      }}
    >
      {children}
    </Tag>
  );
}
