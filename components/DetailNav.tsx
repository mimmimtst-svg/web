"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./DetailNav.module.css";

export type DetailNavItem = { id: string; label: string };

/** A part counts as current once its top passes this share of the screen. */
const ACTIVE_LINE = 0.4;

/**
 * In-page navigation for a detail page's parts. Landscape: a column of
 * dots on the right edge, the current part's name beside its dot (all
 * names on hover). Portrait: a key-red pill of the names at the bottom
 * centre, a white pill sliding to the current one — the press page's
 * switch (2026-10-25). Hidden over the page's intro and, on phones,
 * over the footer.
 */
export default function DetailNav({ items }: { items: DetailNavItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [atEnd, setAtEnd] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [thumb, setThumb] = useState<{ left: number; width: number } | null>(
    null,
  );

  // Portrait: the white pill under the current part's name, sliding
  // between them like the press page's switch (PressTabs). Measured, so
  // it fits each name — again when the bar's size changes.
  useLayoutEffect(() => {
    const list = listRef.current;
    const measure = () => {
      const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (link && link.offsetWidth > 0)
        setThumb({ left: link.offsetLeft, width: link.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (list) observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

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
    // On a phone the header slides away going down and comes back going
    // up, so a part above lands under it unless it stops a header lower
    // (2026-10-25: 나답게's title was cut off).
    const rect = el.getBoundingClientRect();
    const header = document.querySelector("header");
    const lift =
      rect.top < 0 && header && window.matchMedia("(orientation: portrait)").matches
        ? header.offsetHeight
        : 0;
    window.scrollTo({
      top: window.scrollY + rect.top - lift,
      behavior: reduce ? "auto" : "smooth",
    });
    // Keep the address shareable: it now points at this part.
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      className={`${styles.nav} ${active ? styles.shown : ""} ${atEnd ? styles.atEnd : ""}`}
      aria-label="이 페이지의 목차"
    >
      {thumb && (
        <span
          className={styles.thumb}
          style={{ transform: `translateX(${thumb.left}px)`, width: thumb.width }}
          aria-hidden="true"
        />
      )}
      <ul className={styles.list} ref={listRef}>
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                className={`${styles.link} ${current ? styles.current : ""} ${
                  current && !thumb ? styles.currentSolid : ""
                }`}
                data-id={item.id}
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
