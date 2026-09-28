"use client";

import styles from "./Promises.module.css";
import { ArrowRightIcon, PlusIcon } from "./icons";
import { promises } from "@/lib/policyData";
import { withBasePath } from "@/lib/basePath";
import { useSectionSettled } from "@/hooks/useSectionSettled";
import Reveal from "./Reveal";
import ScrollDownIndicator from "./ScrollDownIndicator";

export default function Promises() {
  const { ref, settled } = useSectionSettled<HTMLElement>();

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
              /* Nothing observes (and so nothing can fire mid-transition)
                 until the section has fully settled into view — once it
                 has, each item reveals on its own as the user scrolls it
                 into view, one at a time, matching how a taller-than-
                 viewport section naturally scrolls in steps. */
              visible={settled ? undefined : false}
              delay={(index % 2) * 150}
              distance={254}
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
