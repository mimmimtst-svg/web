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
    would 404. Each file carries its download name too, so browsers that
    ignore `download` (in-app browsers) still save it under that name.
    `ko`: two boxes side by side (2026-11-09) — the full booklet and its
    summary (Dropbox 공약집/최종). `en`: the English summary (2026-11-02),
    one box. */
type PlanFile = { pdf: string; title: string; text: string; button: string };

const PLANS: Record<
  "ko" | "en",
  { heading: string; slogan: string; sloganSub: string; pending: string; files: PlanFile[] }
> = {
  ko: {
    heading: "발전계획서 전문 및 요약 다운로드",
    slogan: "자유로운 지성, 시대를 여는 고대",
    sloganSub: "Free Intelligence, a New Era",
    pending: "준비 중입니다",
    files: [
      {
        pdf: "/files/유병현 고려대 제22대 총장후보자.pdf",
        title: "발전계획서 전문",
        text: "고려대학교 발전계획서 전문을 PDF 파일로 받아 보실 수 있습니다.",
        button: "전문 다운로드",
      },
      {
        pdf: "/files/유병현 고려대 제22대 총장후보자 발전계획서 요약.pdf",
        title: "발전계획서 요약",
        text: "고려대학교 발전계획서 요약본을 PDF 파일로 받아 보실 수 있습니다.",
        button: "요약 다운로드",
      },
    ],
  },
  en: {
    heading: "Development Plan Download",
    slogan: "Free Intelligence, a New Era",
    sloganSub: "자유로운 지성, 시대를 여는 고대",
    pending: "Coming soon",
    files: [
      {
        pdf: "/files/Byung-Hyun Yoo, Candidate for the 22nd President of Korea University.pdf",
        title: "Strategic Development Plan",
        text: "Download the English summary of the Korea University Strategic Development Plan as a PDF file.",
        button: "Download PDF",
      },
    ],
  },
};

const hasPdf = (path: string) => existsSync(join(process.cwd(), "public", path));

/**
 * 공약집 다운로드 (menu; 발전계획서 until 2026-10-23): the press page's frame — centred title on a white
 * page — over the download boxes: the booklet's slogan and a PDF download
 * button in each (two side by side in Korean: 전문 | 요약, stacked on phones).
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
          <div
            className={`${styles.cardWrap} ${plan.files.length > 1 ? styles.cardWrapTwo : ""}`}
          >
            {plan.files.map((file) => (
              <section key={file.pdf} className={styles.card}>
                <LineDownloadIcon className={styles.icon} />
                <h2 className={styles.title}>{file.title}</h2>
                <p className={styles.slogan}>
                  {plan.slogan}
                  <span className={styles.sloganEn} lang={lang === "ko" ? "en" : "ko"}>
                    {plan.sloganSub}
                  </span>
                </p>
                <p className={styles.text}>{file.text}</p>
                {hasPdf(file.pdf) ? (
                  <a
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    href={encodeURI(withBasePath(file.pdf))}
                    download={file.pdf.split("/").pop()}
                  >
                    {file.button}
                  </a>
                ) : (
                  <span className={`${styles.button} ${styles.buttonPending}`} aria-disabled="true">
                    {plan.pending}
                  </span>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
