"use client";

import styles from "./Promises.module.css";
import { PlusIcon } from "./icons";
import { promises } from "@/lib/policyData";
import { withBasePath } from "@/lib/basePath";
import { useSectionSettled } from "@/hooks/useSectionSettled";
import { PORTRAIT, useMediaQuery } from "@/hooks/useMediaQuery";
import Reveal from "./Reveal";
import ScrollDownIndicator from "./ScrollDownIndicator";

export default function Promises() {
  const { ref, settled } = useSectionSettled<HTMLElement>();
  // Each promise rises in on its own as it scrolls into view — on the
  // phone (Figma 672:2228 motion: 152.4px up + fade, easeInOut) and, now
  // that the desktop section is a long page too (2026-10-18), there.
  const mobile = useMediaQuery(PORTRAIT);

  return (
    <section className={styles.section} id="promises" ref={ref}>
      {/* The photo and its tint: on a wide screen pinned to the screen
          while the promises scroll over it (2026-10-19). */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.backdropPin}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.bgImage} src={withBasePath("/images/promises-bg.png")} alt="" />
          <div className={styles.overlay} />
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>유병현의 여섯 가지 약속</h2>
        </div>
        <ol className={styles.list} data-pager-stops="">
          {promises.map((item) => (
            <Reveal
              as="li"
              key={item.index}
              className={styles.item}
              distance={mobile ? "calc(152.4 * var(--mu))" : "calc(90 * var(--u))"}
              duration={mobile ? 1000 : 900}
            >
              <span className={styles.itemNumber}>{item.index}</span>
              <div className={styles.itemBody}>
                <p className={styles.itemTitle}>{item.title}</p>
                <ul className={`${styles.itemPoints} ${item.tight ? styles.itemPointsTight : ""}`}>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
      {/* Wide screens: the heading stays put at the top while the promises
          scroll by (2026-10-19). A second copy of the pinned photo, cut
          off just under the heading and fading out, covers the text as it
          passes beneath, so the photo looks untouched. The marker tells
          SectionPager how much of the screen top this covers. */}
      <div className={styles.cap} aria-hidden="true">
        <div className={styles.capPin}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.bgImage} src={withBasePath("/images/promises-bg.png")} alt="" />
          <div className={styles.overlay} />
          <div className={`${styles.heading} ${styles.capHeading}`}>
            <PlusIcon />
            <span className={styles.headingTitle}>유병현의 여섯 가지 약속</span>
          </div>
          <span className={styles.capEdge} data-pager-cover="" />
        </div>
      </div>
      <ScrollDownIndicator active={settled} />
    </section>
  );
}
