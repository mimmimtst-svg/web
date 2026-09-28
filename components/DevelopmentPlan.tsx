"use client";

import styles from "./DevelopmentPlan.module.css";
import { ArrowRightIcon, ChevronIcon } from "./icons";
import { planCards } from "@/lib/policyData";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
import { useSectionSettled } from "@/hooks/useSectionSettled";
import { withBasePath } from "@/lib/basePath";
import CarouselDots from "./CarouselDots";
import Reveal from "./Reveal";
import ScrollDownIndicator from "./ScrollDownIndicator";

// Figma's authored motion (get_motion_context, node 612:1416): the middle
// card rises from below, the two side cards slide in from their own edge —
// all three fading in at once. Translated 1:1 from its keyframe offsets
// (614:6554 x:-666.667, 614:6464 y:909.369, 614:6570 x:666.667).
const CARD_MOTION = [
  { axis: "x" as const, distance: -667, delay: 450 },
  { axis: "y" as const, distance: 909, delay: 0 },
  { axis: "x" as const, distance: 667, delay: 450 },
];

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
  const { ref: sectionRef, settled } = useSectionSettled<HTMLElement>();

  return (
    <section className={styles.section} id="plan" ref={sectionRef}>
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
                visible={settled}
                axis={CARD_MOTION[index].axis}
                distance={CARD_MOTION[index].distance}
                delay={CARD_MOTION[index].delay}
                duration={1200}
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
      <ScrollDownIndicator active={settled} />
    </section>
  );
}
