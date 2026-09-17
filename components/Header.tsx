"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { ArrowUpRightIcon, MenuIcon } from "./icons";

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
        <p className={styles.brand}>
          <span className={styles.brandLabel}>고려대학교 제22대 총장 후보</span>
          <span className={styles.brandName}>유병현</span>
        </p>
        <div className={styles.actions}>
          <a className={styles.contactButton} href="#contact">
            <span>Contact Us</span>
            <ArrowUpRightIcon />
          </a>
          <button className={styles.menuToggle} type="button" aria-label="메뉴 열기">
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
