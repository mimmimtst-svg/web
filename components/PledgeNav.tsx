"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PledgeDetail.module.css";
import { PORTRAIT } from "@/hooks/useMediaQuery";
import { isMenuOpen } from "@/lib/menuState";

export type PledgeNavItem = { id: string; number: string; label: string };

/** How long a pledge stays highlighted after a jump to it. */
const FLASH_MS = 1800;

/** How long the magnet takes to glide a part into place. */
const GLIDE_MS = 650;

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

  // A magnet at each part's top (landscape), like the main page's page
  // turns: the moment the user's own scroll (wheel, touch, keys) carries
  // a part's top across the tab bar — down into a new part, or up back to
  // a part's head — the page stops there and glides the part into place,
  // headline and infographic filling the screen, and the rest of that
  // flick is swallowed. A scroll that comes to rest just short of a part
  // is pulled the rest of the way. In between, through the pledges, it
  // scrolls freely, so a slow, notch-by-notch scroll is never pulled
  // back. Links and the tabs scroll on their own and are left alone.
  // (CSS proximity snapping barely caught at all in Chrome; waiting for
  // the scroll to stop let a flick fly far past the part, 2026-10-18.)
  useEffect(() => {
    const portrait = window.matchMedia(PORTRAIT);
    let armed = false;
    let lastY = window.scrollY;
    let direction = 0;
    let animating = false;
    let lockUntil = 0;
    let frame = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const active = () => !portrait.matches && !isMenuOpen();
    /** Scroll positions at which each part's top sits under the tab bar. */
    const snapPoints = () => {
      const line = navRef.current?.getBoundingClientRect().bottom ?? 0;
      return items
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
        .map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY - line));
    };

    const glide = (target: number) => {
      armed = false;
      lockUntil = performance.now() + GLIDE_MS + 350;
      const start = window.scrollY;
      const distance = target - start;
      if (Math.abs(distance) < 1) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo(0, target);
        return;
      }
      animating = true;
      const startedAt = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startedAt) / GLIDE_MS);
        window.scrollTo(0, start + distance * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(step);
        else {
          frame = 0;
          animating = false;
          lastY = window.scrollY;
        }
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    };

    // A part coming to rest just short of its place.
    const settle = () => {
      if (!armed || animating || !direction || !active()) return;
      armed = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const near = snapPoints().find((p) =>
        direction > 0 ? p > y + 2 && p - y < vh * 0.25 : p < y - 2 && y - p < vh * 0.25
      );
      if (near !== undefined) glide(near);
    };

    const onScroll = () => {
      if (animating) return;
      const y = window.scrollY;
      if (y !== lastY) direction = Math.sign(y - lastY);
      if (armed && active() && performance.now() > lockUntil) {
        const crossed = snapPoints().find((p) =>
          direction > 0 ? lastY < p - 1 && y >= p - 1 : lastY > p + 1 && y <= p + 1
        );
        if (crossed !== undefined) {
          lastY = y;
          glide(crossed);
          return;
        }
      }
      lastY = y;
      clearTimeout(idle);
      idle = setTimeout(settle, 160);
    };

    const onWheel = (e: WheelEvent) => {
      armed = true;
      // The flick that ran into a part: its momentum is swallowed.
      if (animating || performance.now() < lockUntil) e.preventDefault();
    };
    const arm = () => {
      armed = true;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", arm, { passive: true });
    window.addEventListener("keydown", arm);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(idle);
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", arm);
      window.removeEventListener("keydown", arm);
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
