import styles from "./PlanDetail.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import DetailNav from "./DetailNav";
import ScrollTopButton from "./ScrollTopButton";
import { CheckIcon, PlusIcon } from "./icons";
import { groupPledges, planParts } from "@/lib/planDetail";

const NAV_ITEMS = planParts.map(({ id, title }) => ({ id, label: title }));

/**
 * P2-2: the page behind section 2's three cards. At the top, the three
 * parts side by side with their numbered pillars (all links), then one
 * part per card (나답게 · 다함께 · 더높게):
 * a sticky title column beside a short summary and the numbered pillars
 * ("~한 대학", one or two lines each), each with its pledges grouped by
 * policy area. Each card links to its part by hash (plan/#<id>).
 *
 * (P2-1 is a separate page, reached from the menu.) Every link back is
 * relative ("../"), so the page works at the site root and under the
 * unlisted preview address alike.
 */
export default function PlanDetail() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page}>
        {/* The whole page at a glance: each part with its numbered
            pillars, every line a link down to it. */}
        <nav className={styles.jumpBar} aria-label="나답게 · 다함께 · 더높게 공약 요약">
          <ol className={styles.jumpList}>
            {planParts.map((part) => (
              <li className={styles.jumpItem} key={part.id}>
                <a className={styles.jump} href={`#${part.id}`}>
                  <span className={styles.jumpTitle}>{part.title}</span>
                  <span className={styles.jumpSub}>{part.subtitle}</span>
                </a>
                <ol className={styles.jumpPillars}>
                  {part.pillars.map((pillar, pillarIndex) => (
                    <li key={pillar.title}>
                      <a className={styles.jumpPillar} href={`#${part.id}-${pillarIndex + 1}`}>
                        <span className={styles.jumpPillarNumber}>{pillarIndex + 1}.</span>
                        <span>{pillar.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </nav>

        {planParts.map((part, index) => (
          <section
            className={`${styles.part} ${index % 2 ? styles.partAlt : ""}`}
            id={part.id}
            key={part.id}
          >
            <div className={styles.partInner}>
              <header className={styles.partHead}>
                <Reveal>
                  <h2 className={styles.partTitle}>{part.title}</h2>
                  <p className={styles.partSub}>{part.subtitle}</p>
                  <p className={styles.partLead}>{part.lead}</p>
                </Reveal>
              </header>

              <div className={styles.partBody}>
                <Reveal>
                  <p className={styles.summary}>{part.summary}</p>
                </Reveal>

                <h3 className={styles.pillarsHeading}>
                  <PlusIcon />
                  <span>세부 공약</span>
                </h3>
                <ol className={styles.pillars}>
                  {part.pillars.map((pillar, pillarIndex) => {
                    const groups = groupPledges(pillar.pledges);
                    return (
                      <Reveal as="li" className={styles.pillar} key={pillar.title}>
                        <h4
                          className={styles.pillarTitle}
                          id={`${part.id}-${pillarIndex + 1}`}
                        >
                          {pillarIndex + 1}. {pillar.title}
                        </h4>
                        <p className={styles.body}>{pillar.body}</p>
                        <div
                          className={`${styles.pledges} ${
                            groups.length > 1 ? styles.pledgesSplit : ""
                          }`}
                        >
                          {groups.map((group) => (
                            <div className={styles.pledgeGroup} key={group.area}>
                              <p className={styles.pledgeArea}>{group.area}</p>
                              <ul className={styles.pledgeList}>
                                {group.pledges.map((pledge) => (
                                  <li className={styles.pledge} key={pledge.code}>
                                    <CheckIcon />
                                    <span>{pledge.label}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </Reveal>
                    );
                  })}
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
