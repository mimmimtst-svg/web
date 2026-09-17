"use client";

import styles from "./DevelopmentPlan.module.css";
import { ArrowRightIcon, ChevronIcon, PlusIcon } from "./icons";
import { planCards } from "@/lib/policyData";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
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
        <div className={styles.heading}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>유병현의 세 가지 약속</h2>
        </div>
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
