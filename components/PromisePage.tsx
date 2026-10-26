import styles from "./PromisePage.module.css";
import candidateStyles from "./CandidatePage.module.css";
import profileStyles from "./ProfilePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import CandidateTabs from "./CandidateTabs";
import { QnaList } from "./CandidatePage";
import Reveal from "./Reveal";
import { promises } from "@/lib/policyData";

/** The six promises as the main page's section 3 lists them, on white:
    "첫째," and the title on the left, the points on the right. */
function PromiseList() {
  return (
    <div className={candidateStyles.text}>
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
  );
}

/**
 * 여섯 가지 약속 (menu, 2026-10-26): two tabs under the header, as on
 * 후보자 소개 — the six promises (lib/policyData.ts, the main page's
 * section 3 without its photo) and the Q&A, moved here from 후보자 소개.
 */
export default function PromisePage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={`${profileStyles.page} ${candidateStyles.page}`}>
        <h1 className={candidateStyles.visuallyHidden}>여섯 가지 약속</h1>
        <CandidateTabs
          label="여섯 가지 약속"
          tabs={[
            { id: "promises", label: "여섯 가지 약속", content: <PromiseList /> },
            { id: "qna", label: "Q&A", content: <QnaList /> },
          ]}
        />
      </main>
      <Footer className={profileStyles.footer} />
      <ScrollTopButton />
    </>
  );
}
