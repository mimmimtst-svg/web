"use client";

import styles from "./DevelopmentPlan.module.css";
import { ArrowRightIcon, ChevronIcon } from "./icons";
import { planCards } from "@/lib/policyData";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
import { withBasePath } from "@/lib/basePath";
import CarouselDots from "./CarouselDots";
import Reveal from "./Reveal";

export default function DevelopmentPlan() {
  const {
    trackRef,
    atStart,
    atEnd,
    activeIndex,
    dragging,
    scrollByCard,
    scrollToIndex,
    onPointerDown,
    onPointerMove,
    endDrag,
  } = useHorizontalCarousel<HTMLUListElement>();

  return (
    <section className={styles.section} id="plan">
      <div className={styles.inner}>
        <div className={styles.gridWrap}>
          <ul
            className={`${styles.grid} ${dragging ? styles.gridDragging : ""}`}
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {planCards.map((card, index) => (
              <Reveal
                as="li"
                key={card.title}
                className={styles.card}
                delay={index * 180}
                distance={56}
                scale={0.95}
                duration={1100}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.cardBg}
                  src={withBasePath(card.image)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <div className={styles.cardOverlay} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <div className={styles.cardTitleBlock}>
                    <span className={styles.cardTitle}>{card.title}</span>
                    <span className={styles.cardSubtitle}>{card.subtitle}</span>
                  </div>
                  <p className={styles.cardDesc}>{card.description}</p>
                  <a className={styles.cardLink} href="#">
                    <span>자세히 보기</span>
                    <ArrowRightIcon />
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className={styles.mobileNav}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="이전 카드"
            >
              <ChevronIcon />
            </button>
            <CarouselDots
              count={planCards.length}
              activeIndex={activeIndex}
              onSelect={scrollToIndex}
            />
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="다음 카드"
            >
              <ChevronIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
