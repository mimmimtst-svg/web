"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  distance?: number;
  scale?: number;
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
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className} ${visible ? "revealVisible" : "revealHidden"}`}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        ["--reveal-distance" as string]: `${distance}px`,
        ["--reveal-scale" as string]: scale,
      }}
    >
      {children}
    </Tag>
  );
}
