import styles from "./DirectionPage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import ScrollTopButton from "./ScrollTopButton";
import { LineArrowRightIcon } from "./icons";
import { planParts } from "@/lib/planDetail";

/**
 * P2-1 (발전 방향, from the menu): the three directions side by side on
 * one screen — title, subtitle, the booklet's short statement and its
 * closing line (p. 8). Each panel links to its part of P2-2
 * (../plan/#<id>), where the pledges are. Relative links, so it works at
 * the site root and under the preview address alike.
 */
export default function DirectionPage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page}>
        <h1 className={styles.visuallyHidden}>발전 방향</h1>
        <ul className={styles.panels}>
          {planParts.map((part, index) => (
            <Reveal
              as="li"
              className={styles.panel}
              key={part.id}
              delay={index * 150}
              distance="calc(80 * var(--u))"
              duration={1000}
            >
              <a className={styles.link} href={`../plan/#${part.id}`}>
                <span className={styles.titleBlock}>
                  <span className={styles.title}>{part.title}</span>
                  <span className={styles.subtitle}>{part.subtitle}</span>
                </span>
                <span className={styles.text}>
                  <span className={styles.vision}>{part.vision}</span>{" "}
                  <strong className={styles.lead}>{part.lead}</strong>
                </span>
                <span className={styles.more}>
                  세부 공약 보기
                  <LineArrowRightIcon />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
