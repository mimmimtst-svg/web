"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./CollegePlans.module.css";
import { ChevronDownIcon } from "./icons";
import type { CollegeCampus } from "@/lib/collegePlans";

/** How long a college stays highlighted after a jump to it. */
const FLASH_MS = 1800;

let flashTimer: ReturnType<typeof setTimeout> | undefined;

function flash(target: Element) {
  if (!target.hasAttribute("data-unit")) return;
  document
    .querySelectorAll("[data-flash]")
    .forEach((el) => el.removeAttribute("data-flash"));
  target.setAttribute("data-flash", "");
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => target.removeAttribute("data-flash"), FLASH_MS);
}

const canHover = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
  history.replaceState(null, "", `#${id}`);
  flash(target);
}

/**
 * The 단과대별 발전계획 page's tab bar: the three parts, each a dropdown
 * chevron and its name (no numbers, no icons), sticky under the header,
 * the current one marked as you scroll. The chevron drops down the list of
 * the part's colleges, schools or hospitals (the booklet's "1.1 경영대학" …
 * without the numbers); a pick glides to it and briefly highlights it. The
 * name only goes to the part's top (2026-10-21: on a phone, a name that
 * also opened the list covered the very text it had just scrolled to);
 * with a mouse the list also opens on hover. On a phone an open list
 * closes once the page scrolls, and a long list (서울's twenty) scrolls
 * inside a panel no taller than 세종's, with a scrollbar of its own that
 * stays in view. The look is P4-2's.
 */
export default function CollegeNav({
  campuses,
}: {
  campuses: CollegeCampus[];
}) {
  const [active, setActive] = useState(campuses[0]?.id ?? null);
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const [open, setOpen] = useState<CollegeCampus["id"] | null>(null);
  const [menuLeft, setMenuLeft] = useState(0);
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ top: number; height: number } | null>(
    null,
  );

  // The open list's own scrollbar: a thumb sized and placed from the
  // list's scroll position, shown only when there is more than fits.
  const measureThumb = () => {
    const el = scrollRef.current;
    if (!el || el.scrollHeight <= el.clientHeight + 1) {
      setThumb(null);
      return;
    }
    const track = el.clientHeight - 20;
    const height = Math.max(28, (track * el.clientHeight) / el.scrollHeight);
    const top =
      ((track - height) * el.scrollTop) / (el.scrollHeight - el.clientHeight);
    setThumb({ top, height });
  };
  useLayoutEffect(() => {
    if (!open) return;
    measureThumb();
    window.addEventListener("resize", measureThumb);
    return () => window.removeEventListener("resize", measureThumb);
  }, [open]);

  // The current part and college: the last whose top has passed a little
  // below the tab bar.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = (navRef.current?.getBoundingClientRect().bottom ?? 0) + 140;
      let current = campuses[0]?.id ?? null;
      let unit: string | null = null;
      for (const campus of campuses) {
        const el = document.getElementById(campus.id);
        if (el && el.getBoundingClientRect().top <= line) {
          current = campus.id;
          unit = null;
        }
        for (const u of campus.units) {
          const uel = document.getElementById(u.id);
          if (uel && uel.getBoundingClientRect().top <= line) unit = u.id;
        }
      }
      setActive(current);
      setActiveUnit(unit);
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
  }, [campuses]);

  // On a phone the tabs scroll sideways: keep the current one in view.
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !tab) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  // An open list closes on Escape and on a press anywhere outside the bar.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    // On a touch screen it also closes once the page scrolls, so it never
    // sits over the text being read.
    const startY = window.scrollY;
    const onScroll = () => {
      if (!canHover() && Math.abs(window.scrollY - startY) > 24) setOpen(null);
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

  // Arriving on a college's address: Header has already scrolled to it.
  useEffect(() => {
    const target =
      location.hash &&
      document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) flash(target);
  }, []);

  /** Opens a tab's list, lined up under the tab (kept on screen). */
  const openFor = (id: CollegeCampus["id"], tab: HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;
    const navBox = nav.getBoundingClientRect();
    setMenuLeft(tab.getBoundingClientRect().left - navBox.left);
    setOpen(id);
  };

  const campus = campuses.find((c) => c.id === open);

  return (
    <nav
      className={`${styles.tabs} ${stuck ? styles.tabsStuck : ""}`}
      ref={navRef}
      aria-label="단과대별 발전계획 캠퍼스"
      onMouseLeave={() => {
        if (canHover()) setOpen(null);
      }}
    >
      <ul className={styles.tabList} ref={listRef}>
        {campuses.map((c) => {
          const current = c.id === active;
          return (
            <li key={c.id}>
              <div
                className={`${styles.tab} ${current ? styles.tabActive : ""} ${
                  open === c.id ? styles.tabOpen : ""
                }`}
                data-id={c.id}
                onMouseEnter={(e) => {
                  if (canHover()) openFor(c.id, e.currentTarget);
                }}
              >
                <button
                  type="button"
                  className={styles.tabToggle}
                  aria-label={`${c.label} 목록`}
                  aria-expanded={open === c.id}
                  aria-controls={`${c.id}-menu`}
                  onClick={(e) => {
                    const tab = e.currentTarget.parentElement as HTMLElement;
                    if (open === c.id && !canHover()) setOpen(null);
                    else openFor(c.id, tab);
                  }}
                >
                  <ChevronDownIcon className={styles.tabChevron} />
                </button>
                <a
                  className={styles.tabLabel}
                  href={`#${c.id}`}
                  aria-current={current ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!canHover()) setOpen(null);
                    scrollToId(c.id);
                  }}
                >
                  {c.label}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      {campus && (
        <div
          className={`${styles.menu} ${campus.units.length > 8 ? styles.menuWide : ""}`}
          id={`${campus.id}-menu`}
          style={{ ["--menu-left" as string]: `${menuLeft}px` }}
        >
          <div
            className={styles.menuScroll}
            ref={scrollRef}
            onScroll={measureThumb}
          >
            <ul className={styles.menuList}>
              {campus.units.map((u) => (
                <li
                  key={u.id}
                  className={u.short ? styles.menuSpan : undefined}
                >
                  <a
                    className={`${styles.menuItem} ${u.id === activeUnit ? styles.menuItemActive : ""}`}
                    href={`#${u.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(null);
                      scrollToId(u.id);
                    }}
                  >
                    {u.short ? (
                      <>
                        {u.short.name}
                        <span className={styles.menuNote}>{u.short.note}</span>
                      </>
                    ) : (
                      u.name
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {thumb && (
            <div className={styles.menuTrack} aria-hidden="true">
              <div
                className={styles.menuThumb}
                style={{ top: thumb.top, height: thumb.height }}
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
