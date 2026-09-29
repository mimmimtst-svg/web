"use client";

import styles from "./Promises.module.css";
import { ArrowRightIcon, PlusIcon } from "./icons";
import { promises } from "@/lib/policyData";
import { withBasePath } from "@/lib/basePath";
import { useSectionSettled } from "@/hooks/useSectionSettled";
import { useSequentialReveal } from "@/hooks/useSequentialReveal";
import { useEnterView } from "@/hooks/useEnterView";
import Reveal from "./Reveal";
import ScrollDownIndicator from "./ScrollDownIndicator";

export default function Promises() {
  const { ref, settled } = useSectionSettled<HTMLElement>();
  /* The section is fixed to exactly one screen (see .section in the CSS
     module) with no internal scroll of its own, so a position-based
     "scrolled into view" trigger has nothing to react to for items 2-6 —
     they'd stay stuck mid-transition forever. Each discrete scroll while
     settled instead reveals one more item by count. */
  // The first promise comes in while the section is still sliding into
  // view (~25% on screen) rather than after it has fully snapped.
  const entered = useEnterView(ref, 0.25);
  const revealedCount = useSequentialReveal(promises.length, settled, entered);
  const shownCount = entered ? Math.max(revealedCount, 1) : 0;

  return (
    <section className={styles.section} id="promises" ref={ref}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.bgImage} src={withBasePath("/images/promises-bg.png")} alt="" aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.heading}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>유병현의 여섯 가지 약속</h2>
        </div>
        <ol className={styles.list}>
          {promises.map((item, index) => (
            <Reveal
              as="li"
              key={item.index}
              className={styles.item}
              /* Explicitly controlled by the discrete reveal count above —
                 item N becomes visible once N scroll gestures have
                 happened since the section settled into view. */
              visible={index < shownCount}
              delay={0}
              distance="calc(254 * var(--u))"
              duration={950}
            >
              <span className={styles.itemNumber}>{item.index}</span>
              <div className={styles.itemBody}>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemDesc}>{item.body}</p>
                <a className={styles.itemLink} href="#">
                  <span>자세히 보기</span>
                  <ArrowRightIcon />
                </a>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
      <ScrollDownIndicator active={settled} />
    </section>
  );
}
