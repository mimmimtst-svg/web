"use client";

import { useEffect, useState } from "react";
import styles from "./DetailNav.module.css";

export type DetailNavItem = { id: string; label: string };

/** A part counts as current once its top passes this share of the screen. */
const ACTIVE_LINE = 0.4;

/**
 * In-page navigation for a detail page's parts. Landscape: a column of
 * dots on the right edge, the current part's name beside its dot (all
 * names on hover). Portrait: a small pill of the names at the bottom
 * centre. Hidden over the page's intro and, on phones, over the footer.
 */
export default function DetailNav({ items }: { items: DetailNavItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVE_LINE;
      let current: string | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
      const footer = document.querySelector("footer");
      setAtEnd(!!footer && footer.getBoundingClientRect().top < window.innerHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // Keep the address shareable: it now points at this part.
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      className={`${styles.nav} ${active ? styles.shown : ""} ${atEnd ? styles.atEnd : ""}`}
      aria-label="이 페이지의 목차"
    >
      <ul className={styles.list}>
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                className={`${styles.link} ${current ? styles.current : ""}`}
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item.id);
                }}
              >
                <span className={styles.label}>{item.label}</span>
                <span className={styles.dot} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
