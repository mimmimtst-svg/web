import styles from "./CandidatePage.module.css";
import profileStyles from "./ProfilePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import CandidateTabs from "./CandidateTabs";
import PressList from "./PressList";
import { ProfileCv, ProfileIntro } from "./ProfilePage";
import { pressColumns } from "@/lib/pressData";

/** A tab whose text hasn't come yet. */
function Pending() {
  return <p className={styles.pending}>내용을 준비하고 있습니다.</p>;
}

/**
 * 후보자 소개, the work-in-progress version (2026-10-23): only at the
 * unlisted preview address (preview-template/profile/), while the public
 * /profile/ keeps the current page. A menu of six under the header —
 * 인사말 · 자기소개 및 동기 · Q&A · 약력 · 언론 기고 · 미주 교우님 추천사.
 * 약력 is the current profile (photo band and CV), 언론 기고 the press
 * page's columns list; the rest wait for their text.
 */
export default function CandidatePage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={`${profileStyles.page} ${styles.page}`}>
        <h1 className={styles.visuallyHidden}>후보자 소개</h1>
        <CandidateTabs
          tabs={[
            { id: "greeting", label: "인사말", content: <Pending /> },
            {
              id: "motivation",
              label: "자기소개 및 동기",
              content: <Pending />,
            },
            { id: "qna", label: "Q&A", content: <Pending /> },
            {
              id: "career",
              label: "약력",
              content: (
                <>
                  <ProfileIntro underBar />
                  <ProfileCv />
                </>
              ),
            },
            {
              id: "columns",
              label: "언론 기고",
              content: (
                <div className={styles.inner}>
                  <PressList items={pressColumns} />
                </div>
              ),
            },
            {
              id: "recommendations",
              label: "미주 교우님 추천사",
              content: <Pending />,
            },
          ]}
        />
      </main>
      <Footer className={profileStyles.footer} />
      <ScrollTopButton />
    </>
  );
}
