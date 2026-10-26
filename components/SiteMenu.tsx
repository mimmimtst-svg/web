"use client";

import { useEffect, useRef } from "react";
import styles from "./SiteMenu.module.css";
import { CloseIcon } from "./icons";
import SnsLinks from "./SnsLinks";
import { goToSection } from "@/lib/pageNav";
import { MENU_OPEN_ATTR } from "@/lib/menuState";

/** `target`: a section of the main page. `page`: another page, as a path
    relative to the main page (e.g. "direction/"). */
type MenuItem = { label: string; target?: string; page?: string };

// Figma hamburger (697:6208). Labels renamed 2026-10-23 (same pages):
// 후보자 소개 opens the profile page, 3대 발전 방향 (여섯 가지 약속
// until 2026-10-26) the P2-1 page
// (direction/), 주요 공약 the P4-1 overview (which leads on to P4-2),
// 단과대별 발전계획 the colleges page, 공약집 다운로드 the download page.
// 언론 보도 자료 is off the menu for now; its page (press/) stays.
const MENU_ITEMS: MenuItem[] = [
  { label: "후보자 소개", page: "profile/" },
  { label: "3대 발전 방향", page: "direction/" },
  { label: "주요 공약", page: "pledges/" },
  { label: "단과대별 발전계획", page: "colleges/" },
  { label: "공약집 다운로드", page: "development-plan/" },
];

// Keys that would scroll the page behind the open menu.
const SCROLL_KEYS = new Set([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"]);

type SiteMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  /** On a detail page: the main page's address. The links then go there
      (and to its sections by hash) instead of gliding within this page. */
  homeHref?: string;
};

/**
 * Slide-in panel from the right edge over a 50% black backdrop. Always
 * mounted so it can animate both ways; `inert` + `visibility` take it out
 * of the tab order and hit-testing while closed.
 */
export default function SiteMenu({ id, open, onClose, homeHref }: SiteMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.setAttribute(MENU_OPEN_ATTR, "");
    // Focus the dialog itself, not the X: iOS Safari draws a focus ring
    // on a programmatically focused button even after a tap. Tab then
    // moves on to the X as usual.
    panelRef.current?.focus({ preventScroll: true });

    // The page behind must not move (or page-turn) while the menu is up.
    // Capture phase on window, so this runs before SectionPager's
    // listeners, which then see the event as already handled.
    const blockScroll = (e: Event) => {
      if (e.cancelable) e.preventDefault();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const onEdge = document.activeElement === first || document.activeElement === panelRef.current;
        if (e.shiftKey && onEdge) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      const onButton = e.target instanceof HTMLElement && /^(BUTTON|A)$/.test(e.target.tagName);
      if (SCROLL_KEYS.has(e.key) && !(e.key === " " && onButton)) e.preventDefault();
    };

    const active = { passive: false, capture: true } as const;
    window.addEventListener("wheel", blockScroll, active);
    window.addEventListener("touchmove", blockScroll, active);
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      root.removeAttribute(MENU_OPEN_ATTR);
      window.removeEventListener("wheel", blockScroll, { capture: true });
      window.removeEventListener("touchmove", blockScroll, { capture: true });
      window.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, [open, onClose]);

  const go = (target?: string) => {
    onClose();
    if (target) goToSection(target);
  };

  const hrefFor = ({ target, page }: MenuItem) => {
    if (page) return `${homeHref ?? ""}${page}`;
    if (!target) return "#";
    if (homeHref === undefined) return `#${target}`;
    return target === "hero" ? homeHref : `${homeHref}#${target}`;
  };

  return (
    <div className={`${styles.root} ${open ? styles.open : ""}`} inert={!open}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div
        className={styles.panel}
        id={id}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="사이트 메뉴"
      >
        <div className={styles.top}>
          <div className={styles.head}>
            <p className={styles.brand}>
              <span className={styles.brandLabel}>고려대학교 제22대 총장 후보</span>
              <span className={styles.brandName}>유병현</span>
            </p>
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="메뉴 닫기"
            >
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="주요 메뉴">
            <ul className={styles.list}>
              {MENU_ITEMS.map((item, index) => (
                <li
                  key={item.label}
                  className={styles.item}
                  style={{ ["--i" as string]: index }}
                >
                  <a
                    className={styles.link}
                    href={hrefFor(item)}
                    onClick={(e) => {
                      // Another page, or (from a detail page) a main-page
                      // section: a real page load the browser follows.
                      if (item.page || (homeHref !== undefined && item.target)) return;
                      e.preventDefault();
                      go(item.target);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerDetail}>
            <span className={styles.footerLabel}>E-Mail</span>
            <a className={styles.footerEmail} href="mailto:bhyoo@korea.ac.kr">
              bhyoo@korea.ac.kr
            </a>
          </div>
          <SnsLinks className={styles.sns} linkClassName={styles.snsLink} />
        </div>
      </div>
    </div>
  );
}
