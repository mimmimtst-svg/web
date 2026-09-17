import styles from "./DevelopmentPlan.module.css";
import { ArrowRightIcon, PlusIcon } from "./icons";
import { planCards } from "@/lib/policyData";
import Reveal from "./Reveal";

export default function DevelopmentPlan() {
  return (
    <section className={styles.section} id="plan">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>유병현의 세 가지 약속</h2>
        </div>
        <ul className={styles.grid}>
          {planCards.map((card, index) => (
            <Reveal
              as="li"
              key={card.title}
              className={styles.card}
              delay={index * 120}
              distance={64}
              scale={0.92}
            >
              <div className={styles.cardBody}>
                <div className={styles.cardTitleRow}>
                  <span className={styles.cardTitle}>{card.title}</span>
                  <span className={styles.cardDivider}>|</span>
                  <span className={styles.cardSubtitle}>{card.subtitle}</span>
                </div>
                <div className={styles.cardLine} />
                <div className={styles.cardFooter}>
                  <p className={styles.cardDesc}>{card.description}</p>
                  <a className={styles.cardLink} href="#">
                    <span>자세히 보기</span>
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>
              <div className={styles.cardImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.cardImage}
                  src={card.image}
                  alt=""
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
