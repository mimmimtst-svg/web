import styles from "./PledgeOverview.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import ScrollTopButton from "./ScrollTopButton";
import { LineArrowRightIcon } from "./icons";
import { pledgeParts } from "@/lib/pledgeDetail";

/**
 * P4-1, 주요 공약 (menu): the five policy areas side by side, each its
 * infographic in brief — number, the key-red circle with its name, the
 * keywords, the headline and the four keyword boxes (name + tagline).
 * The whole card opens that part on P4-2 (detail/#<part>).
 */
export default function PledgeOverview() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>주요 공약</h1>
          <ol className={styles.cards}>
            {pledgeParts.map((part, index) => (
              <Reveal as="li" key={part.id} delay={index * 120}>
                <a className={styles.card} href={`detail/#${part.id}`}>
                  <span className={styles.number}>{part.number}</span>
                  <span className={styles.hub}>
                    <span
                      className={`${styles.hubTitle} ${
                        part.title.length > 6 ? styles.hubTitleLong : ""
                      }`}
                    >
                      {part.title}
                    </span>
                  </span>
                  <span className={styles.keywords}>{part.keywords}</span>
                  <span className={styles.headline}>{part.headline}</span>
                  <span className={styles.boxes}>
                    {part.boxes.map((box) => (
                      <span className={styles.box} key={box.name}>
                        <span className={styles.boxName}>{box.name}</span>
                        <span className={styles.boxTagline}>{box.tagline}</span>
                      </span>
                    ))}
                  </span>
                  <span className={styles.more}>
                    자세히 보기
                    <LineArrowRightIcon />
                  </span>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
