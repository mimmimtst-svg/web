"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PledgeDetail.module.css";
import { PORTRAIT } from "@/hooks/useMediaQuery";
import { isMenuOpen } from "@/lib/menuState";
import { isNewWheelGesture } from "@/lib/wheelGesture";

export type PledgeNavItem = { id: string; number: string; label: string };

/** How long a pledge stays highlighted after a jump to it. */
const FLASH_MS = 1800;


let flashTimer: ReturnType<typeof setTimeout> | undefined;

/** Briefly highlights a pledge that a link has just jumped to. */
function flash(target: Element) {
  if (!target.hasAttribute("data-pledge")) return;
  document.querySelectorAll("[data-flash]").forEach((el) => el.removeAttribute("data-flash"));
  target.setAttribute("data-flash", "");
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => target.removeAttribute("data-flash"), FLASH_MS);
}

/**
 * The 주요 공약 page's tab bar: the five parts, sticky under the header,
 * the current one marked as you scroll. It also handles every in-page
 * link on the page (tabs and the infographic's box lines): a smooth
 * scroll instead of a jump, the address updated to the target, and a
 * pledge briefly highlighted where it lands — also when the page opens
 * on a pledge's address (the main page's P4 cards link to them). No
 * rule under the bar: a soft shadow once the page scrolls beneath it.
 */
export default function PledgeNav({ items }: { items: PledgeNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? null);
  const [stuck, setStuck] = useState(false);
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
      setStuck(window.scrollY > 4);
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

  // A stop at each part (landscape). The page scrolls normally, but a
  // scroll going down that would carry the next part's top past the tab
  // bar stops exactly there — headline and infographic filling the
  // screen, never running past and coming back — and the rest of that
  // flick is dropped. The next scroll goes on normally through the
  // pledges. Scrolling up is never stopped. (2026-10-18, after a magnet
  // that overshot and pulled back, and main-page page turns, both "got in
  // the way scrolling up".)
  useEffect(() => {
    const portrait = window.matchMedia(PORTRAIT);
    let lastY = window.scrollY;
    let blocked = false;
    let downUntil = 0;

    const off = () => portrait.matches || isMenuOpen();
    /** Scroll positions at which each part's top sits under the tab bar. */
    const stops = () => {
      const line = navRef.current?.getBoundingClientRect().bottom ?? 0;
      return items
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
        .map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY - line));
    };
    /** The stop a move from `from` down to `to` would run past. */
    const crossed = (from: number, to: number) => stops().find((p) => from < p - 1 && to > p + 1);

    const stopAt = (p: number, smooth: boolean) => {
      blocked = true;
      window.scrollTo({ top: p, behavior: smooth ? "smooth" : "auto" });
    };

    const onWheel = (e: WheelEvent) => {
      if (off() || e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (isNewWheelGesture(e)) blocked = false;
      if (blocked) {
        e.preventDefault();
        return;
      }
      if (e.deltaY <= 0) {
        downUntil = 0;
        return;
      }
      downUntil = performance.now() + 700;
      const px = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
      const p = crossed(window.scrollY, window.scrollY + px);
      if (p !== undefined) {
        e.preventDefault();
        stopAt(p, true);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (off() || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(t.tagName))) return;
      const vh = window.innerHeight;
      const step =
        e.key === "ArrowDown" ? 40 : e.key === "PageDown" || (e.key === " " && !e.shiftKey) ? vh * 0.85 : 0;
      if (!step) return;
      downUntil = performance.now() + 900;
      const p = crossed(window.scrollY, window.scrollY + step);
      if (p !== undefined) {
        e.preventDefault();
        stopAt(p, true);
      }
    };

    // A fast flick's earlier wheel steps can still be gliding when the
    // one that would cross arrives: if the page slips past a stop while
    // scrolling down, it is put back on it at once (no glide back).
    const onScroll = () => {
      const y = window.scrollY;
      if (!off() && y > lastY && performance.now() < downUntil && !blocked) {
        const p = crossed(lastY, y);
        if (p !== undefined) {
          lastY = p;
          stopAt(p, false);
          return;
        }
      }
      lastY = y;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  // Arriving on a pledge's address: Header has already scrolled to it.
  useEffect(() => {
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) flash(target);
  }, []);

  // In-page links anywhere in <main>.
  useEffect(() => {
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
      flash(target);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <nav className={`${styles.tabs} ${stuck ? styles.tabsStuck : ""}`} ref={navRef} aria-label="주요 공약 분야">
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
