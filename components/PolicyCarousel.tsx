"use client";

import styles from "./PolicyCarousel.module.css";
import { CheckIcon, ChevronIcon, LineArrowRightIcon, PlusIcon } from "./icons";
import { policyCards } from "@/lib/policyData";
import { pledgeAnchor, pledgeParts } from "@/lib/pledgeDetail";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
import { withBasePath } from "@/lib/basePath";
import CarouselDots from "./CarouselDots";
import Reveal from "./Reveal";
import FadeImage from "./FadeImage";
import { PORTRAIT, useMediaQuery } from "@/hooks/useMediaQuery";
import { useRef, type ReactNode } from "react";
import { useEnterView } from "@/hooks/useEnterView";
import Footer from "./Footer";

// A card with more pledges than this keeps the tight spacing between its
// 나답게 / 다함께 / 더높게 groups so it still fits (05 had 19 until the
// 2026-10-23 table; now the most is 04's 14); the others get more air
// between them.
const DENSE_ITEMS = 15;

// Each card opens its part of the 주요 공약 page (P4-2), and each pledge
// on it opens that pledge there, by its code — or the part's top while a
// new pledge has no entry on the page yet. Relative path: the main page
// sits at the site root or under the unlisted preview address.
const PLEDGE_PAGE = "pledges/detail/";

/** Where pledge `code` on card `cardIndex` opens. */
const pledgeHref = (cardIndex: number, code: string) => {
  const part = pledgeParts[cardIndex];
  const listed = part?.pledges.some((pledge) => pledge.code === code);
  return `${PLEDGE_PAGE}#${listed ? pledgeAnchor(code) : (part?.id ?? "")}`;
};

// A Latin parenthetical inside an item, e.g. "(Chaired Professor)", is set
// a size smaller in Figma (14px against the 18px line on desktop).
const NOTE = /(\([A-Za-z][^)]*\))/;

function ItemText({ text }: { text: string }) {
  return text.split(NOTE).map((part, i) =>
    NOTE.test(part) ? (
      <span key={i} className={styles.itemNote}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

/** A card's <li>. On a phone the cards rise in together, once, as the
    section comes in (one trigger for the carousel, so swiping never moves
    them up or down; 2026-10-29); on a wide screen they simply sit in the
    page. */
function Card({
  mobile,
  entered,
  index,
  children,
}: {
  mobile: boolean;
  entered: boolean;
  index: number;
  children: ReactNode;
}) {
  return mobile ? (
    <Reveal as="li" className={styles.card} visible={entered} delay={Math.min(index, 2) * 120}>
      {children}
    </Reveal>
  ) : (
    <li className={styles.card}>{children}</li>
  );
}

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
  const mobile = useMediaQuery(PORTRAIT);
  const sectionRef = useRef<HTMLElement>(null);
  const entered = useEnterView(sectionRef, 0.15);

  return (
    <section className={styles.section} id="policies" ref={sectionRef}>
      <div className={styles.contentWrap}>
      <div className={styles.headerWrap}>
        {/* The title opens the 주요 공약 overview, P4-1 (2026-10-29). */}
        <a className={styles.heading} href="pledges/" draggable={false}>
          <PlusIcon />
          <h2 className={styles.headingTitle}>나답게・다함께・더높게 핵심 공약</h2>
        </a>
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
          {policyCards.map((card, cardIndex) => (
            <Card key={card.number} mobile={mobile} entered={entered} index={cardIndex}>
              <div className={styles.cardInner}>
                <FadeImage
                  className={styles.cardBg}
                  src={withBasePath("/images/policy-card-bg-dark-2026-10-29.webp")}
                  aria-hidden="true"
                />
                <div className={styles.cardHead}>
                  <span className={styles.cardTitleRow}>
                    <span className={styles.cardNumber}>{card.number}</span>
                    <span className={styles.cardTitle}>{card.title}</span>
                  </span>
                  <a
                    className={styles.cardHeadLink}
                    href={`${PLEDGE_PAGE}#${pledgeParts[cardIndex]?.id ?? ""}`}
                    aria-label={`${card.title} 자세히 보기`}
                    draggable={false}
                  >
                    <LineArrowRightIcon />
                  </a>
                </div>
                <div
                  className={`${styles.cardCategories} ${
                    card.categories.reduce((n, c) => n + c.items.length, 0) > DENSE_ITEMS
                      ? styles.cardCategoriesDense
                      : ""
                  }`}
                >
                  {card.categories.map((category) => (
                    <div className={styles.category} key={category.label}>
                      <p className={styles.categoryLabel}>{category.label}</p>
                      <ul className={styles.categoryItems}>
                        {category.items.map((item) => (
                          <li key={item.code}>
                            <a
                              className={styles.categoryItem}
                              href={pledgeHref(cardIndex, item.code)}
                              draggable={false}
                            >
                              <CheckIcon />
                              <span>
                                <ItemText text={item.text} />
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
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
      </div>

      <Footer />
    </section>
  );
}
