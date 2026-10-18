"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PledgeDetail.module.css";

export type PledgeNavItem = { id: string; number: string; label: string };

/** How long a pledge stays highlighted after a jump to it. */
const FLASH_MS = 1800;

/**
 * The 주요 공약 page's tab bar: the five parts, sticky under the header,
 * the current one marked as you scroll. It also handles every in-page
 * link on the page (tabs and the infographic's box lines): a smooth
 * scroll instead of a jump, the address updated to the target, and a
 * pledge briefly highlighted where it lands.
 */
export default function PledgeNav({ items }: { items: PledgeNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? null);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // The current part: the last one whose top has passed a little below
  // the tab bar (room for the jump offset, which on a phone still counts
  // the header that has slid away).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = (navRef.current?.getBoundingClientRect().bottom ?? 0) + 140;
      let current = items[0]?.id ?? null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
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

  // On a phone the tabs scroll sideways: keep the current one in view.
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !tab) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  // In-page links anywhere in <main>.
  useEffect(() => {
    let flashTimer: ReturnType<typeof setTimeout> | undefined;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element).closest?.("main a[href^='#']");
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      if (target.hasAttribute("data-pledge")) {
        document.querySelectorAll("[data-flash]").forEach((el) => el.removeAttribute("data-flash"));
        target.setAttribute("data-flash", "");
        clearTimeout(flashTimer);
        flashTimer = setTimeout(() => target.removeAttribute("data-flash"), FLASH_MS);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(flashTimer);
    };
  }, []);

  return (
    <nav className={styles.tabs} ref={navRef} aria-label="주요 공약 분야">
      <ul className={styles.tabList} ref={listRef}>
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                className={`${styles.tab} ${current ? styles.tabActive : ""}`}
                href={`#${item.id}`}
                data-id={item.id}
                aria-current={current ? "location" : undefined}
              >
                <span className={styles.tabNumber}>{item.number}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
