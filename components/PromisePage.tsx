import styles from "./PromisePage.module.css";
import candidateStyles from "./CandidatePage.module.css";
import profileStyles from "./ProfilePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import Reveal from "./Reveal";
import { promises } from "@/lib/policyData";

/**
 * 여섯 가지 약속 (menu, 2026-10-26): the six promises as the main page's
 * section 3 lists them (lib/policyData.ts), on white — "첫째," and the
 * title on the left, the points on the right — under the page title.
 * (The Q&A, a second tab here until 2026-10-29, is now 후보자에게 묻는다,
 * QnaPage.)
 */
export default function PromisePage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={`${profileStyles.page} ${candidateStyles.page} ${styles.noTabs}`}>
        <div className={candidateStyles.text}>
          <h1 className={styles.pageTitle}>여섯 가지 약속</h1>
          <ol className={styles.list}>
            {promises.map((item) => (
              <Reveal as="li" className={styles.item} key={item.index} distance={32}>
                <h2 className={styles.head}>
                  <span className={styles.number}>{item.index}</span>
                  <span className={styles.title}>{item.title}</span>
                </h2>
                <ul className={`${candidateStyles.dashList} ${styles.points}`}>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </main>
      <Footer className={profileStyles.footer} />
      <ScrollTopButton />
    </>
  );
}
