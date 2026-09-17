import styles from "./Promises.module.css";
import { ArrowRightIcon, PlusIcon } from "./icons";
import { promises } from "@/lib/policyData";

export default function Promises() {
  return (
    <section className={styles.section} id="promises">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.bgImage} src="/images/promises-bg.png" alt="" aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.heading}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>유병현의 세 가지 약속</h2>
        </div>
        <ol className={styles.list}>
          {promises.map((item) => (
            <li className={styles.item} key={item.index}>
              <span className={styles.itemNumber}>{item.index}</span>
              <div className={styles.itemBody}>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemDesc}>{item.body}</p>
                <a className={styles.itemLink} href="#">
                  <span>자세히 보기</span>
                  <ArrowRightIcon />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
