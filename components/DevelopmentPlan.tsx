"use client";

import styles from "./DevelopmentPlan.module.css";
import { ArrowRightIcon, ChevronIcon } from "./icons";
import { planCards } from "@/lib/policyData";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
import { useSectionSettled } from "@/hooks/useSectionSettled";
import { useEnterView } from "@/hooks/useEnterView";
import { withBasePath } from "@/lib/basePath";
import CarouselDots from "./CarouselDots";
import Reveal from "./Reveal";
import ScrollDownIndicator from "./ScrollDownIndicator";

// Figma's authored motion (get_motion_context, node 612:1416): the middle
// card rises from below, the two side cards slide in from their own edge.
// Offsets are Figma px (614:6554 x:-666.667, 614:6464 y:909.369,
// 614:6570 x:666.667), scaled by --u like the rest of the section. Each
// move runs 1.4s easeInOut; the side cards start 0.53s after the middle.
const CARD_MOTION = [
  { axis: "x" as const, distance: "calc(-667 * var(--u))", delay: 530 },
  { axis: "y" as const, distance: "calc(909 * var(--u))", delay: 0 },
  { axis: "x" as const, distance: "calc(667 * var(--u))", delay: 530 },
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
  // Cards come in while the section is still sliding into view (~25% on
  // screen), not after it has fully snapped — waiting for the snap made
  // them feel late.
  const entered = useEnterView(sectionRef, 0.25);

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
                visible={entered}
                axis={CARD_MOTION[index].axis}
                distance={CARD_MOTION[index].distance}
                delay={CARD_MOTION[index].delay}
                duration={1400}
              >
                <div className={styles.cardInner}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.cardBg}
                    src={withBasePath(card.image)}
                    alt=""
                    aria-hidden="true"
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
