"use client";

import { useEffect } from "react";
import styles from "./Promises.module.css";
import { MicIcon, PlusIcon } from "./icons";
import { promises } from "@/lib/policyData";
import { withBasePath } from "@/lib/basePath";
import { useSectionSettled } from "@/hooks/useSectionSettled";
import { PORTRAIT, useMediaQuery } from "@/hooks/useMediaQuery";
import Reveal from "./Reveal";
import ScrollDownIndicator from "./ScrollDownIndicator";

// Relative: the main page sits at the site root or under the unlisted
// preview address.
const PROMISES_PAGE = "promises/";
const QNA_PAGE = "qna/";

export default function Promises() {
  const { ref, settled } = useSectionSettled<HTMLElement>();
  // Each promise rises in on its own as it scrolls into view — on the
  // phone and, now that the desktop section is a long page too
  // (2026-10-18), there. On the phone it is the 후보자 소개 page's rise
  // (32px over 700ms, Reveal's ease-out; 2026-10-29) — Figma's 152.4px
  // easeInOut came and went abruptly on a fast flick.
  const mobile = useMediaQuery(PORTRAIT);

  // Wide screens: the gap between promises (--promise-gap), from the
  // screen (2026-10-29). As many promises as fit between the pinned
  // heading's edge and the floor (the top of the cue's cover) make a
  // page, and the gap is as wide as it can be while they still do, up to
  // where the next promise starts under the cover's solid part — so a
  // page never shows its last lines faded, nor the next promise peeking
  // in, on any window. SectionPager then pages them that many at a time.
  useEffect(() => {
    const section = ref.current;
    if (!section || mobile) {
      section?.style.removeProperty("--promise-gap");
      return;
    }
    const MIN_GAP = 40;
    const fit = () => {
      const items = section.querySelectorAll<HTMLElement>("[data-pager-stops] > *");
      const cap = section.querySelector<HTMLElement>("[data-pager-cover]");
      const floor = section.querySelector<HTMLElement>("[data-pager-floor]");
      const solid = section.querySelector<HTMLElement>("[data-cover-solid]");
      if (!items.length || !cap?.offsetParent || !floor || !solid) return;
      const h = Math.max(...Array.from(items, (el) => el.offsetHeight));
      const room = floor.offsetTop - cap.offsetTop; // the promises' space
      const hidden = solid.offsetTop - cap.offsetTop; // where the next is out of sight
      const n = Math.max(1, Math.floor((room + MIN_GAP) / (h + MIN_GAP)));
      const most = n > 1 ? (room - n * h) / (n - 1) : Infinity;
      const gap = Math.max(MIN_GAP, Math.min(hidden / n - h, most));
      section.style.setProperty("--promise-gap", `${Math.floor(gap)}px`);
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [ref, mobile]);

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
      {/* Phone: "후보자에게 묻는다" as a band at the top of the section,
          centred over a soft line (no room beside the heading). */}
      <a className={styles.askBand} href={QNA_PAGE}>
        <MicIcon className={styles.askIcon} />
        <span>후보자에게 묻는다</span>
      </a>
      <div className={styles.inner}>
        {/* The title opens the 여섯 가지 약속 page (2026-10-29). */}
        <a className={styles.heading} href={PROMISES_PAGE}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>유병현의 여섯 가지 약속</h2>
        </a>
        <ol className={styles.list} data-pager-stops="">
          {promises.map((item) => (
            <Reveal
              as="li"
              key={item.index}
              className={styles.item}
              distance={mobile ? 32 : "calc(90 * var(--u))"}
              duration={mobile ? 700 : 900}
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
          {/* What shows and takes the click on a wide screen; out of the
              tab order (the link in the flow is the one for keyboards
              and screen readers). */}
          <a
            className={`${styles.heading} ${styles.capHeading}`}
            href={PROMISES_PAGE}
            tabIndex={-1}
          >
            <PlusIcon />
            <span className={styles.headingTitle}>유병현의 여섯 가지 약속</span>
          </a>
          <span className={styles.capEdge} data-pager-cover="" />
        </div>
      </div>
      {/* Wide screens: "후보자에게 묻는다" on the right of the pinned
          heading's row, pinned with it (2026-10-29). */}
      <div className={styles.ask}>
        <div className={styles.askPin}>
          <a className={styles.askButton} href={QNA_PAGE}>
            <MicIcon className={styles.askIcon} />
            <span className={styles.askLabel}>후보자에게 묻는다</span>
          </a>
        </div>
      </div>
      {/* The cue pinned to the bottom of the screen while the section is
          on it: the section runs past the screen, and at the bottom of
          the section it was cut off by the last page stop (2026-10-29). */}
      <div className={styles.cue}>
        <div className={styles.cuePin}>
          <div className={styles.cueCover} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.bgImage} src={withBasePath("/images/promises-bg.png")} alt="" />
            <div className={styles.overlay} />
          </div>
          <ScrollDownIndicator active={settled} />
          <span className={styles.cueFloor} data-pager-floor="" />
          <span className={styles.cueSolid} data-cover-solid="" />
        </div>
      </div>
    </section>
  );
}
