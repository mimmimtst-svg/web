import styles from "./QnaPage.module.css";
import promiseStyles from "./PromisePage.module.css";
import candidateStyles from "./CandidatePage.module.css";
import profileStyles from "./ProfilePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import { QnaList } from "./CandidatePage";
import { qna } from "@/lib/candidateData";

/** Every question at the top, two to a row, each a link down to its
    answer (2026-10-29: in place of a page title), then a rule. */
function QnaIndex() {
  return (
    <nav className={styles.index} aria-label="질문 목록" data-qna-index="">
      <h1 className={candidateStyles.visuallyHidden}>후보자에게 묻는다</h1>
      <ol className={styles.indexList}>
        {qna.map((q, i) => (
          <li key={q.id}>
            <a className={styles.indexItem} href={`#${q.id}`}>
              <span className={styles.indexNum}>Q{i + 1}</span>
              <span className={styles.indexText}>{q.question}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * 후보자에게 묻는다 (menu, 2026-10-29): the booklet's Q&A on a page of its
 * own (it was a tab of 후보자 소개, then of 여섯 가지 약속), all seven
 * questions listed at the top. The question navigation (dots / the
 * phone's bar, QnaNav) stays as it was.
 */
export default function QnaPage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main
        className={`${profileStyles.page} ${candidateStyles.page} ${promiseStyles.noTabs}`}
      >
        <QnaList heading={<QnaIndex />} className={styles.column} />
      </main>
      <Footer className={profileStyles.footer} />
      <ScrollTopButton />
    </>
  );
}
