import styles from "./Hero.module.css";
import { withBasePath } from "@/lib/basePath";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.bgImage}
        src={withBasePath("/images/hero-bg.png")}
        alt=""
        aria-hidden="true"
      />
      <div className={styles.inner}>
        <div className={styles.headline}>
          <h1 className={styles.headlineKr}>
            <span className={styles.headlineLine}>자유로운 지성,</span>{" "}
            <span className={styles.headlineLine}>시대를 여는 고대</span>
          </h1>
          <p className={styles.headlineEn}>Free Minds, a New Era</p>
        </div>
      </div>
      <div className={styles.portraitWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.portrait}
          src={withBasePath("/images/hero-portrait.png")}
          alt="유병현 교수"
        />
      </div>
    </section>
  );
}
