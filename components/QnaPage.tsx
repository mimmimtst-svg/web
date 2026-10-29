import promiseStyles from "./PromisePage.module.css";
import candidateStyles from "./CandidatePage.module.css";
import profileStyles from "./ProfilePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import { QnaList } from "./CandidatePage";

/**
 * 후보자에게 묻는다 (menu, 2026-10-29): the booklet's Q&A on a page of its
 * own (it was a tab of 후보자 소개, then of 여섯 가지 약속), under the
 * same page title as 여섯 가지 약속.
 */
export default function QnaPage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main
        className={`${profileStyles.page} ${candidateStyles.page} ${promiseStyles.noTabs}`}
      >
        <QnaList
          heading={<h1 className={promiseStyles.pageTitle}>후보자에게 묻는다</h1>}
        />
      </main>
      <Footer className={profileStyles.footer} />
      <ScrollTopButton />
    </>
  );
}
