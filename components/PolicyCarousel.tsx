"use client";

import styles from "./PolicyCarousel.module.css";
import { ArrowRightIcon, CheckIcon, ChevronIcon, PlusIcon } from "./icons";
import { policyCards } from "@/lib/policyData";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
import CarouselDots from "./CarouselDots";
import Footer from "./Footer";

export default function PolicyCarousel() {
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
    <section className={styles.section} id="policies">
      <div className={styles.headerWrap}>
        <div className={styles.heading}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>나답게・다함께・앞으로</h2>
        </div>
        <div className={styles.navRow}>
          <div className={styles.navButtons}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="이전 카드"
            >
              <ChevronIcon />
            </button>
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

      <div className={styles.trackOuter}>
        <ul
          className={`${styles.track} ${dragging ? styles.trackDragging : ""}`}
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
        >
          {policyCards.map((card) => (
            <li className={styles.card} key={card.number}>
              <div className={styles.cardInner}>
                <div className={styles.cardHead}>
                  <span className={styles.cardNumber}>{card.number}</span>
                  <span className={styles.cardTitle}>{card.title}</span>
                </div>
                <div className={styles.cardLine} />
                <div className={styles.cardCategories}>
                  {card.categories.map((category) => (
                    <div className={styles.category} key={category.label}>
                      <p className={styles.categoryLabel}>{category.label}</p>
                      <ul className={styles.categoryItems}>
                        {category.items.map((item) => (
                          <li className={styles.categoryItem} key={item}>
                            <CheckIcon />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className={styles.cardFoot}>
                  <a className={styles.cardLink} href="#">
                    <span>자세히 보기</span>
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

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
          count={policyCards.length}
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

      <Footer />
    </section>
  );
}
