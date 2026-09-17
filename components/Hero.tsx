import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.bgImage}
        src="/images/hero-bg.png"
        alt=""
        aria-hidden="true"
      />
      <div className={styles.inner}>
        <div className={styles.headline}>
          <h1 className={styles.headlineKr}>자유로운 지성, 시대를 여는 고대</h1>
          <p className={styles.headlineEn}>Free Minds, a New Era</p>
        </div>
        <div className={styles.portraitWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.portrait}
            src="/images/hero-portrait.png"
            alt="유병현 교수"
          />
        </div>
      </div>
    </section>
  );
}
