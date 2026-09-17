import styles from "./Promises.module.css";
import { ArrowRightIcon, PlusIcon } from "./icons";
import { promises } from "@/lib/policyData";
import { withBasePath } from "@/lib/basePath";
import Reveal from "./Reveal";

export default function Promises() {
  return (
    <section className={styles.section} id="promises">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.bgImage} src={withBasePath("/images/promises-bg.png")} alt="" aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.heading}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>유병현의 세 가지 약속</h2>
        </div>
        <ol className={styles.list}>
          {promises.map((item, index) => (
            <Reveal
              as="li"
              key={item.index}
              className={styles.item}
              delay={index * 120}
              distance={40}
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
    </section>
  );
}
