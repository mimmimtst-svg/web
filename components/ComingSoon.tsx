import styles from "./ComingSoon.module.css";
import { withBasePath } from "@/lib/basePath";

/**
 * Placeholder shown at "/" while the site is private (lib/siteMode.ts):
 * the hero's red and line pattern, the candidate's name, and a short
 * "being prepared" line.
 */
export default function ComingSoon() {
  return (
    <main className={styles.page}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.bg} src={withBasePath("/images/hero-bg.png")} alt="" aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.brand}>
          <span className={styles.brandLabel}>고려대학교 제22대 총장 후보</span>
          <span className={styles.brandName}>유병현</span>
        </p>
        <h1 className={styles.title}>웹사이트를 준비하고 있습니다</h1>
        <p className={styles.sub}>Coming soon</p>
      </div>
    </main>
  );
}
