"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PledgeDetail.module.css";
import { PORTRAIT } from "@/hooks/useMediaQuery";
import { isMenuOpen } from "@/lib/menuState";
import { isNewWheelGesture } from "@/lib/wheelGesture";

export type PledgeNavItem = { id: string; number: string; label: string };

/** How long a pledge stays highlighted after a jump to it. */
const FLASH_MS = 1800;

/** One page turn — the main page's SectionPager duration. */
const PAGE_MS = 850;

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

  // Page turns, like the main page (SectionPager), in landscape: one
  // scroll gesture (a wheel flick, a swipe, an arrow / Page key) turns one
  // page, gliding with the same easing. The pages: each part's headline +
  // infographic, then its pledges a screenful at a time — a page down
  // starts at the first pledge that didn't fit, so none is cut in half;
  // a page up shows what was above, ending where this page began. Same
  // either way, nothing catches or blocks (2026-10-18: a "magnet" that
  // caught parts mid-scroll got in the way scrolling back up).
  useEffect(() => {
    const portrait = window.matchMedia(PORTRAIT);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animating = false;
    let frame = 0;
    let gestureUsed = false;
    let touch: { x: number; y: number; scrollY: number; axis: "x" | "y" | null } | null = null;

    const off = () => portrait.matches || isMenuOpen();
    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
    const lineAt = () => navRef.current?.getBoundingClientRect().bottom ?? 0;

    /** Scroll positions where a page may begin: each part's top, its
        "세부 공약" heading and each pledge, sitting just under the tab bar. */
    const stops = () => {
      const line = lineAt();
      const y = window.scrollY;
      const max = maxScroll();
      const at = (el: Element, gap: number) =>
        Math.round(el.getBoundingClientRect().top + y - line - gap);
      const list: number[] = [];
      for (const { id } of items) {
        const part = document.getElementById(id);
        if (!part) continue;
        list.push(at(part, 0));
        // The "+ 세부 공약" heading starts the pledges' first page. It is
        // measured from the list under it: the heading itself is offset
        // while it waits to rise in (Reveal).
        const pledges = part.querySelector("ol");
        const heading = pledges?.previousElementSibling as HTMLElement | null;
        if (pledges && heading) {
          const above = heading.offsetHeight + parseFloat(getComputedStyle(pledges).marginTop);
          list.push(at(pledges, above + 24));
        }
        part.querySelectorAll("[data-pledge]").forEach((el) => list.push(at(el, 16)));
      }
      list.push(max);
      return [...new Set(list.map((v) => Math.max(0, Math.min(v, max))))].sort((a, b) => a - b);
    };

    const pageTarget = (dir: 1 | -1, y = window.scrollY) => {
      const list = stops();
      const max = maxScroll();
      const screen = window.innerHeight - lineAt();
      const overlap = 48;
      if (dir > 0) {
        if (y >= max - 1) return null;
        // The first block that runs past the bottom of the screen.
        for (let i = 0; i < list.length; i++) {
          const bottom = list[i + 1] ?? max + screen;
          if (bottom > y + screen + 2) {
            return list[i] > y + 2 ? list[i] : Math.min(y + screen - overlap, max);
          }
        }
        return max;
      }
      if (y <= 1) return null;
      // The highest page start from which everything up to here fits.
      const fits = list.find((v) => v < y - 2 && v >= y - screen);
      return fits ?? Math.max(0, y - (screen - overlap));
    };

    const animateTo = (target: number) => {
      const start = window.scrollY;
      const distance = target - start;
      if (Math.abs(distance) < 1) return;
      if (reduceMotion.matches) {
        window.scrollTo(0, target);
        return;
      }
      animating = true;
      const startedAt = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startedAt) / PAGE_MS);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, start + distance * eased);
        if (t < 1) frame = requestAnimationFrame(step);
        else {
          frame = 0;
          animating = false;
        }
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (off()) return;
      const newGesture = isNewWheelGesture(e);
      if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (animating || (gestureUsed && !newGesture)) {
        e.preventDefault();
        return;
      }
      const target = pageTarget(e.deltaY > 0 ? 1 : -1);
      if (target === null) {
        gestureUsed = false;
        return;
      }
      e.preventDefault();
      gestureUsed = true;
      animateTo(target);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (off() || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const onButton = t instanceof HTMLElement && /^(BUTTON|A)$/.test(t.tagName);
      let dir: 1 | -1 | 0 = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey && !onButton)) dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey && !onButton)) dir = -1;
      if (!dir) return;
      e.preventDefault();
      if (animating) return;
      const target = pageTarget(dir);
      if (target !== null) animateTo(target);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touch = !off() && t && e.touches.length === 1
        ? { x: t.clientX, y: t.clientY, scrollY: window.scrollY, axis: null }
        : null;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!touch || !t) return;
      const dx = t.clientX - touch.x;
      const dy = t.clientY - touch.y;
      if (!touch.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) {
        touch.axis = Math.abs(dy) > Math.abs(dx) ? "y" : "x";
      }
      if (touch.axis === "y") e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const started = touch;
      touch = null;
      if (!started || !t || started.axis !== "y" || animating) return;
      const dy = started.y - t.clientY;
      if (Math.abs(dy) < 40) return;
      const target = pageTarget(dy > 0 ? 1 : -1, started.scrollY);
      if (target !== null) animateTo(target);
    };

    // Native vertical panning off while the page turns by itself (the
    // main page's html[data-paged], globals.css).
    const updatePaged = () => document.documentElement.toggleAttribute("data-paged", !portrait.matches);
    updatePaged();
    portrait.addEventListener("change", updatePaged);
    const active = { passive: false } as const;
    window.addEventListener("wheel", onWheel, active);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, active);
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-paged");
      portrait.removeEventListener("change", updatePaged);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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
