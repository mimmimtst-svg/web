"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  distance?: number;
};

/**
 * Fades + slides an element in the first time it enters the viewport.
 * Fires once (the observer disconnects after the first intersection) and
 * never re-toggles on subsequent scrolls past it. Purely visual — it
 * never reads or changes scroll position, so it can't interact with the
 * page's CSS scroll-snap.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  distance = 24,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${className} ${visible ? "revealVisible" : "revealHidden"}`}
      style={{
        transitionDelay: `${delay}ms`,
        ["--reveal-distance" as string]: `${distance}px`,
      }}
    >
      {children}
    </Tag>
  );
}
