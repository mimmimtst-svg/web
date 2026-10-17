"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollTopButton.module.css";
import { LineArrowUpIcon } from "./icons";

/** Shows once the page has scrolled this share of a screen. */
const SHOW_AFTER = 0.6;

/**
 * Back-to-top button, bottom-right. Every detail page carries one (user
 * request, 2026-10-17); it fades in once the reader is past the intro.
 */
export default function ScrollTopButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShown(window.scrollY > window.innerHeight * SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${shown ? styles.shown : ""}`}
      onClick={toTop}
      aria-label="맨 위로"
      tabIndex={shown ? 0 : -1}
    >
      <LineArrowUpIcon />
    </button>
  );
}
