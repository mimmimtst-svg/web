import styles from "./PlanDetail.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import DetailNav from "./DetailNav";
import ScrollTopButton from "./ScrollTopButton";
import { PlusIcon } from "./icons";
import { planParts } from "@/lib/planDetail";
import { withBasePath } from "@/lib/basePath";

const NAV_ITEMS = planParts.map(({ id, title }) => ({ id, label: title }));

/**
 * P2-1: the page behind section 2's three cards. An intro band in the
 * hero's red, then one part per card (나답게 · 다함께 · 더높게), each a
 * sticky title column beside its text: three introductory paragraphs
 * (a one-line key over the original text), then the pillars with their
 * numbered pledges. Each card links to its part by hash (plan/#<id>).
 *
 * Every link back is relative ("../"), so the page works at the site
 * root and under the unlisted preview address alike.
 */
export default function PlanDetail() {
  return (
    <>
      <Header homeHref="../" />
      <main className={styles.page}>
        {/* id="hero": the header stays transparent over this band, like
            over the main page's hero. */}
        <section className={styles.intro} id="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.introBg}
            src={withBasePath("/images/hero-bg.png")}
            alt=""
            aria-hidden="true"
          />
          <div className={styles.introInner}>
            <p className={styles.eyebrow}>유병현의 고려대학교 발전 방향</p>
            <h1 className={styles.introTitle}>
              {planParts.map((part, index) => (
                <span className={styles.introWord} key={part.id}>
                  {index > 0 && (
                    <span className={styles.introDot} aria-hidden="true">
                      ・
                    </span>
                  )}
                  {part.title}
                </span>
              ))}
            </h1>
            <p className={styles.introLead}>
              본질에 충실하고, 다양성을 힘으로 모아, 한계를 넘어 도약하는 고려대학교
            </p>
            <ol className={styles.jumpList}>
              {planParts.map((part) => (
                <li key={part.id}>
                  <a className={styles.jump} href={`#${part.id}`}>
                    <span className={styles.jumpNumber}>{part.number}</span>
                    <span className={styles.jumpTitle}>{part.title}</span>
                    <span className={styles.jumpSub}>{part.subtitle}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {planParts.map((part, index) => (
          <section
            className={`${styles.part} ${index % 2 ? styles.partAlt : ""}`}
            id={part.id}
            key={part.id}
          >
            <div className={styles.partInner}>
              <header className={styles.partHead}>
                <Reveal>
                  <p className={styles.partNumber}>{part.number}</p>
                  <h2 className={styles.partTitle}>{part.title}</h2>
                  <p className={styles.partSub}>{part.subtitle}</p>
                  <p className={styles.partLead}>{part.lead}</p>
                </Reveal>
              </header>

              <div className={styles.partBody}>
                <div className={styles.paragraphs}>
                  {part.intro.map((paragraph) => (
                    <Reveal className={styles.paragraph} key={paragraph.key}>
                      <p className={styles.key}>{paragraph.key}</p>
                      <p className={styles.body}>{paragraph.body}</p>
                    </Reveal>
                  ))}
                </div>

                <h3 className={styles.pillarsHeading}>
                  <PlusIcon />
                  <span>이렇게 실천하겠습니다</span>
                </h3>
                <ol className={styles.pillars}>
                  {part.pillars.map((pillar) => (
                    <Reveal as="li" className={styles.pillar} key={pillar.order}>
                      <p className={styles.pillarOrder}>{pillar.order}</p>
                      <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                      <p className={styles.body}>{pillar.body}</p>
                      <div className={styles.pledges}>
                        <p className={styles.pledgesLabel}>세부 공약</p>
                        <ul className={styles.pledgeList}>
                          {pillar.pledges.map((pledge) => (
                            <li className={styles.pledge} key={pledge.code}>
                              <span className={styles.pledgeCode}>{pledge.code}</span>
                              <span>{pledge.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer className={styles.footer} />
      <DetailNav items={NAV_ITEMS} />
      <ScrollTopButton />
    </>
  );
}
