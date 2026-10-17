import { existsSync } from "node:fs";
import { join } from "node:path";
import styles from "./DevelopmentPlanPage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import { LineDownloadIcon, LineMailIcon } from "./icons";
import { withBasePath } from "@/lib/basePath";

/** The booklet, served from public/. Until the file is added there the
    download button shows "준비 중" instead of a link that would 404. */
const PLAN_PDF = "/files/development-plan.pdf";
const PLAN_PDF_NAME = "유병현_고려대학교_발전계획서.pdf";
const hasPlanPdf = existsSync(join(process.cwd(), "public", PLAN_PDF));

const OPINION_EMAIL = "bhyoo@korea.ac.kr";
const OPINION_HREF = `mailto:${OPINION_EMAIL}?subject=${encodeURIComponent(
  "발전계획서에 대한 의견",
)}`;

/**
 * 발전계획서 (menu): the press page's frame — centred title on a white
 * page — over two boxes side by side: the booklet as a PDF download, and
 * an invitation to send the candidate an opinion by e-mail.
 */
export default function DevelopmentPlanPage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>발전계획서</h1>
          <div className={styles.cards}>
            <section className={styles.card}>
              <LineDownloadIcon className={styles.icon} />
              <h2 className={styles.title}>발전계획서 내려받기</h2>
              <p className={styles.text}>
                나답게, 다함께, 더높게.{" "}
                <br />
                발전계획서 전문을 PDF 파일로 받아 보실 수 있습니다.
              </p>
              {hasPlanPdf ? (
                <a
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  href={withBasePath(PLAN_PDF)}
                  download={PLAN_PDF_NAME}
                >
                  PDF 다운로드
                </a>
              ) : (
                <span className={`${styles.button} ${styles.buttonPending}`} aria-disabled="true">
                  준비 중입니다
                </span>
              )}
            </section>
            <section className={styles.card}>
              <LineMailIcon className={styles.icon} />
              <h2 className={styles.title}>고견을 부탁드립니다</h2>
              <p className={styles.text}>
                발전계획서에 더하실 생각이나 아쉬운 점이 있으시면{" "}
                <br />
                언제든 말씀해 주십시오. 귀 기울여 듣겠습니다.
              </p>
              <p className={styles.email}>{OPINION_EMAIL}</p>
              <a className={`${styles.button} ${styles.buttonOutline}`} href={OPINION_HREF}>
                의견 보내기
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
