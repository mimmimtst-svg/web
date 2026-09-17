"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { ArrowUpRightIcon, MenuIcon } from "./icons";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const headerEl = headerRef.current;
    const heroEl = document.getElementById("hero");
    if (!headerEl || !heroEl) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerEl.offsetHeight}px`
      );
    };

    const onScroll = () => {
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      setScrolled(heroBottom <= headerEl.offsetHeight);
    };

    syncHeaderHeight();
    onScroll();

    const resizeObserver = new ResizeObserver(syncHeaderHeight);
    resizeObserver.observe(headerEl);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
