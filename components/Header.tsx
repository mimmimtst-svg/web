"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { MenuIcon } from "./icons";
import { goToSection } from "@/lib/pageNav";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
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
        <button className={styles.menuToggle} type="button" aria-label="메뉴 열기">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
