"use client";

import styles from "./Promises.module.css";
import { PlusIcon } from "./icons";
import { promises } from "@/lib/policyData";
import { withBasePath } from "@/lib/basePath";
import { useSectionSettled } from "@/hooks/useSectionSettled";
import { useEnterView } from "@/hooks/useEnterView";
import { PORTRAIT, useMediaQuery } from "@/hooks/useMediaQuery";
import Reveal from "./Reveal";
import ScrollDownIndicator from "./ScrollDownIndicator";

/** Desktop: the gap between one promise coming in and the next. */
const CASCADE_MS = 130;

export default function Promises() {
  const { ref, settled } = useSectionSettled<HTMLElement>();
  // Desktop: all six promises come in together, one after another, as
  // the section slides into view (~25% on screen) — a cascade, not one
  // per scroll (2026-10-18; the step-through reveal is gone).
  const entered = useEnterView(ref, 0.25);
  // Mobile layout (portrait): the page scrolls freely, and each item
  // rises in on its own as it scrolls into view (Figma 672:2228 motion:
  // 152.4px up + fade, easeInOut).
  const mobile = useMediaQuery(PORTRAIT);

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
              visible={mobile ? undefined : entered}
              delay={mobile ? 0 : CASCADE_MS * index}
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
      <ScrollDownIndicator active={settled} />
    </section>
  );
}
