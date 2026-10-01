"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { MenuIcon } from "./icons";
import { goToSection } from "@/lib/pageNav";
import SiteMenu from "./SiteMenu";
import { PORTRAIT, useMediaQuery } from "@/hooks/useMediaQuery";

/** Mobile: past this much scroll, scrolling down slides the header away. */
const HIDE_AFTER_PX = 40;
/** Scroll moves smaller than this don't flip the header (finger jitter). */
const DIRECTION_SLOP_PX = 6;

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Mobile layout scrolls freely, so the fixed header would sit over the
  // hero headline and the content below it. There it hides while the
  // user scrolls down and comes back (as the solid white bar) on any
  // scroll up; at the very top it is the transparent hero header.
  const mobile = useMediaQuery(PORTRAIT);
  const [autoHide, setAutoHide] = useState<"top" | "hidden" | "shown">("top");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    // Browsers restore the previous scroll position on refresh by default;
    // force every load/reload back to the hero at the top instead.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // A single scrollTo on mount isn't always enough: self-hosted fonts
    // swapping in, or (on iPad Safari especially) the address-bar chrome
    // animating away and changing 100dvh, can both shift layout above the
    // viewport shortly after mount. With `scroll-snap-type: y mandatory`
    // even a few px of drift is enough to resolve to section 2's snap
    // point instead of back to 0 (`overflow-anchor: none` in globals.css
    // removes one cause of that; these re-asserts cover the rest). Also
    // reasserted on `pageshow` for the bfcache-restore case (Safari
    // back/forward or a reload that revives a cached page — 'load' won't
    // fire again for that, but 'pageshow' does).
    // Guarded by scrollY so this only ever corrects small, unintentional
    // drift from a layout shift — if the user has already deliberately
    // scrolled a real distance by the time 'load'/'pageshow' fires (slow
    // network, big hero image), this must not yank them back to the top.
    const reassert = () => {
      if (window.scrollY < 100) window.scrollTo(0, 0);
    };
    window.addEventListener("load", reassert);
    window.addEventListener("pageshow", reassert);
    return () => {
      window.removeEventListener("load", reassert);
      window.removeEventListener("pageshow", reassert);
    };
  }, []);

  useEffect(() => {
    const headerEl = headerRef.current;
    const heroEl = document.getElementById("hero");
    if (!headerEl || !heroEl) return;

    let intersectionObserver: IntersectionObserver | null = null;

    // Rebuilds the IntersectionObserver so its rootMargin always matches
    // the header's current (fluid) height. Using IntersectionObserver
    // instead of a scroll listener avoids reading layout (getBoundingClientRect/
    // offsetHeight) on every scroll frame, which was competing with the
    // native scroll-snap animation and contributing to jank.
    const rebuildObserver = () => {
      intersectionObserver?.disconnect();
      const headerHeight = headerEl.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerHeight}px`
      );
      intersectionObserver = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting),
        { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 }
      );
      intersectionObserver.observe(heroEl);
    };

    rebuildObserver();

    const resizeObserver = new ResizeObserver(rebuildObserver);
    resizeObserver.observe(headerEl);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mobile) return;
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y <= 4) {
        setAutoHide("top");
        lastY = y;
        return;
      }
      const delta = y - lastY;
      // Small moves accumulate (lastY stays put) until they add up.
      if (Math.abs(delta) < DIRECTION_SLOP_PX) return;
      if (delta > 0 && y > HIDE_AFTER_PX) setAutoHide("hidden");
      else if (delta < 0) setAutoHide("shown");
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mobile]);

  const hidden = mobile && autoHide === "hidden" && !menuOpen;
  const solid = scrolled || (mobile && autoHide === "shown");

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${solid ? styles.scrolled : ""} ${
          hidden ? styles.autoHidden : ""
        }`}
      >
        <div className={styles.wrapper}>
          <a
            className={styles.brand}
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              goToSection("hero");
            }}
          >
            <span className={styles.brandLabel}>고려대학교 제22대 총장 후보</span>
            <span className={styles.brandName}>유병현</span>
          </a>
          <button
            className={styles.menuToggle}
            type="button"
            ref={menuButtonRef}
            aria-label="메뉴 열기"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>
      <SiteMenu id="site-menu" open={menuOpen} onClose={closeMenu} />
    </>
  );
}
