"use client";

import styles from "./Hero.module.css";
import { withBasePath } from "@/lib/basePath";
import { useSectionSettled } from "@/hooks/useSectionSettled";
import ScrollDownIndicator from "./ScrollDownIndicator";

export default function Hero() {
  const { ref, settled } = useSectionSettled<HTMLElement>();

  return (
    <section className={styles.hero} id="hero" ref={ref}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.bgImage}
        src={withBasePath("/images/hero-bg.png")}
        alt=""
        aria-hidden="true"
      />
      {/* Figma 613:1819 (2026-10-17): the English tagline and
          "FINE - KU" as one group, then the Korean line. */}
      <div className={styles.inner}>
        <div className={styles.headline}>
          <p className={styles.headlineEn}>Free Intelligence, a New Era</p>
          <h1 className={styles.headlineTitle}>
            <span className={styles.headlineBrand}>FINE - KU</span>
            <span className={styles.headlineKr}>
              <span className={styles.headlineLine}>자유로운 지성,</span>{" "}
              <span className={styles.headlineLine}>시대를 여는 고대</span>
            </span>
          </h1>
        </div>
      </div>
      <div className={styles.portraitWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.portrait}
          src={withBasePath("/images/hero-portrait.webp")}
          alt="유병현 교수"
          width={1241}
          height={1835}
        />
      </div>
      <ScrollDownIndicator active={settled} />
    </section>
  );
}
