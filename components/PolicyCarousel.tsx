"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./PolicyCarousel.module.css";
import { ArrowRightIcon, CheckIcon, ChevronIcon, PlusIcon } from "./icons";
import { policyCards } from "@/lib/policyData";
import Footer from "./Footer";

export default function PolicyCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const drag = useRef<{ active: boolean; startX: number; startScrollLeft: number }>({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [dragging, setDragging] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(`.${styles.card}`) as HTMLElement | null;
    const distance = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  // Mouse click-and-drag horizontal scroll (touch/trackpad already
  // scroll the track natively via overflow-x: auto).
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { active: true, startX: e.clientX, startScrollLeft: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScrollLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    drag.current.active = false;
    setDragging(false);
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

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
      <Footer />
    </section>
  );
}
