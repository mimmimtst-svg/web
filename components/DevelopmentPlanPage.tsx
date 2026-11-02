import { existsSync } from "node:fs";
import { join } from "node:path";
import styles from "./DevelopmentPlanPage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import { LineDownloadIcon } from "./icons";
import { withBasePath } from "@/lib/basePath";

/** The booklets, served from public/. Until a file is added there its
    download button shows "준비 중" / "Coming soon" instead of a link that
    would 404. `en`: the English summary (2026-11-02), the same page in
    English. */
const PLANS = {
  ko: {
    pdf: "/files/development-plan.pdf",
    // The booklet as the user named it (2026-10-30).
    pdfName: "공약집 _ 자유로운 지성, 시대를 여는 고대 20261030.pdf",
    heading: "공약집 다운로드",
    title: "발전계획서 내려받기",
    slogan: "자유로운 지성, 시대를 여는 고대",
    sloganSub: "Free Intelligence, a New Era",
    text: "고려대학교 발전계획서 전문을 PDF 파일로 받아 보실 수 있습니다.",
    button: "PDF 다운로드",
    pending: "준비 중입니다",
  },
  en: {
    // The user's file ("TalkFile_Strategic Development Plan.pdf").
    pdf: "/files/strategic-development-plan.pdf",
    pdfName: "Korea University Strategic Development Plan.pdf",
    heading: "Development Plan Download",
    title: "Strategic Development Plan",
    slogan: "Free Intelligence, a New Era",
    sloganSub: "자유로운 지성, 시대를 여는 고대",
    text: "Download the English summary of the Korea University Strategic Development Plan as a PDF file.",
    button: "Download PDF",
    pending: "Coming soon",
  },
};

const hasPdf = (path: string) => existsSync(join(process.cwd(), "public", path));

/**
 * 공약집 다운로드 (menu; 발전계획서 until 2026-10-23): the press page's frame — centred title on a white
 * page — over one box: the booklet's slogan and a PDF download button.
 * `lang="en"`: Development Plan Download (menu, 2026-11-02), the English
 * summary on the same page.
 */
export default function DevelopmentPlanPage({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const plan = PLANS[lang];
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page} lang={lang}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>{plan.heading}</h1>
          <div className={styles.cardWrap}>
            <section className={styles.card}>
              <LineDownloadIcon className={styles.icon} />
              <h2 className={styles.title}>{plan.title}</h2>
              <p className={styles.slogan}>
                {plan.slogan}
                <span className={styles.sloganEn} lang={lang === "ko" ? "en" : "ko"}>
                  {plan.sloganSub}
                </span>
              </p>
              <p className={styles.text}>{plan.text}</p>
              {hasPdf(plan.pdf) ? (
                <a
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  href={withBasePath(plan.pdf)}
                  download={plan.pdfName}
                >
                  {plan.button}
                </a>
              ) : (
                <span className={`${styles.button} ${styles.buttonPending}`} aria-disabled="true">
                  {plan.pending}
                </span>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
