"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CandidatePage.module.css";

/**
 * 후보자 소개 Q&A's question dots: a column of dots fixed at the right
 * edge, one per question, the one being read in key red. A dot jumps to
 * its question; with a mouse, hovering shows the question beside it. Shown
 * only while the questions run behind the dots (never over the footer).
 */
export default function QnaDots({
  items,
}: {
  items: { id: string; question: string }[];
}) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const els = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);
      if (!els.length) return;
      const line = window.innerHeight * 0.35;
      let current = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) current = i;
      });
      const first = els[0].getBoundingClientRect();
      const last = els[els.length - 1].getBoundingClientRect();
      setActive(current);
      // Off once the last answer has ended above the dots (the footer).
      const dots = ref.current?.getBoundingClientRect();
      setShown(
        first.height > 0 &&
          first.top < window.innerHeight * 0.8 &&
          last.bottom > (dots?.bottom ?? window.innerHeight / 2),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // The Q&A tab going from hidden to shown changes the panel's size.
    const panel = ref.current?.parentElement;
    const observer = new ResizeObserver(onScroll);
    if (panel) observer.observe(panel);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav
      className={`${styles.qDots} ${shown ? styles.qDotsShown : ""}`}
      ref={ref}
      aria-label="질문 바로가기"
    >
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${styles.qDot} ${i === active ? styles.qDotActive : ""}`}
              aria-current={i === active ? "location" : undefined}
              tabIndex={shown ? undefined : -1}
            >
              <span className={styles.qDotLabel}>
                <b>Q{i + 1}</b> {item.question}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
