import { existsSync } from "node:fs";
import { join } from "node:path";
import styles from "./DevelopmentPlanPage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import { LineDownloadIcon } from "./icons";
import { withBasePath } from "@/lib/basePath";

/** The booklet, served from public/. Until the file is added there the
    download button shows "준비 중" instead of a link that would 404. */
const PLAN_PDF = "/files/development-plan.pdf";
const PLAN_PDF_NAME = "유병현_고려대학교_발전계획서.pdf";
const hasPlanPdf = existsSync(join(process.cwd(), "public", PLAN_PDF));

/**
 * 발전계획서 (menu): the press page's frame — centred title on a white
 * page — over one box: the booklet's slogan and a PDF download button.
 */
export default function DevelopmentPlanPage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>발전계획서</h1>
          <div className={styles.cardWrap}>
            <section className={styles.card}>
              <LineDownloadIcon className={styles.icon} />
              <h2 className={styles.title}>발전계획서 내려받기</h2>
              <p className={styles.slogan}>
                자유로운 지성, 시대를 여는 고대
                <span className={styles.sloganEn}>Free Intelligence, a New Era</span>
              </p>
              <p className={styles.text}>고려대학교 발전계획서 전문을 PDF 파일로 받아 보실 수 있습니다.</p>
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
          </div>
        </div>
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
