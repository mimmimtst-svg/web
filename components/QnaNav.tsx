"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CandidatePage.module.css";
import { ChevronDownIcon } from "./icons";

const PHONE = "(orientation: portrait)";

/**
 * 후보자 소개 Q&A's way between questions, the one being read marked.
 * Wide screens: a column of dots fixed at the right edge, one per
 * question, the current one in key red; a dot jumps to its question and,
 * with a mouse, hovering shows the question beside it; shown only while
 * the questions run behind the dots (never over the footer).
 * Phones (2026-10-23: the dots meant nothing there): a bar stuck under
 * the tab bar naming the current question; it drops down the seven
 * questions to pick from, and closes on a pick, a press outside or once
 * the page scrolls.
 */
export default function QnaNav({
  items,
}: {
  items: { id: string; question: string }[];
}) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const dotsRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const els = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);
      if (!els.length) return;
      // The current question: the last whose top has passed this line
      // (a little under the bar on a phone — a jump leaves room for the
      // header, which may have slid away).
      const line = window.matchMedia(PHONE).matches
        ? (barRef.current?.getBoundingClientRect().bottom ?? 0) + 120
        : window.innerHeight * 0.35;
      let current = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) current = i;
      });
      const first = els[0].getBoundingClientRect();
      const last = els[els.length - 1].getBoundingClientRect();
      setActive(current);
      // Off once the last answer has ended above the dots (the footer).
      const dots = dotsRef.current?.getBoundingClientRect();
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
    const panel = dotsRef.current?.parentElement;
    const observer = new ResizeObserver(onScroll);
    if (panel) observer.observe(panel);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // The open list closes on Escape, a press outside the bar, or a scroll.
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 24) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <>
      <nav
        className={`${styles.qDots} ${shown ? styles.qDotsShown : ""}`}
        ref={dotsRef}
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

      <div className={styles.qBar} ref={barRef}>
        <button
          type="button"
          className={styles.qBarButton}
          aria-expanded={open}
          aria-controls="qna-list"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.qNum}>Q{active + 1}</span>
          <span className={styles.qBarText}>{items[active]?.question}</span>
          <ChevronDownIcon
            className={`${styles.qBarChevron} ${open ? styles.qBarChevronOpen : ""}`}
          />
        </button>
        {open && (
          <ol className={styles.qBarList} id="qna-list" aria-label="질문 목록">
            {items.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={i === active ? styles.qBarItemActive : undefined}
                  aria-current={i === active ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.qNum}>Q{i + 1}</span>
                  {item.question}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
