import styles from "./PressPage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import PressTabs from "./PressTabs";
import PressList from "./PressList";
import { pressColumns, pressReports } from "@/lib/pressData";

/**
 * 언론 보도 자료 (menu): a centred title, a pill tab bar — 언론기고 /
 * 언론보도 — and under it a list of rows (source tag, title, date) that
 * open the articles. 언론보도 keeps the booklet's period subheadings.
 */
export default function PressPage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>언론 보도 자료</h1>
          <PressTabs
            tabs={[
              { id: "columns", label: "언론기고", content: <PressList items={pressColumns} /> },
              {
                id: "reports",
                label: "언론보도",
                content: pressReports.map((group, index) => (
                  <section className={styles.group} key={group.title ?? index}>
                    {group.title && <h2 className={styles.groupTitle}>{group.title}</h2>}
                    <PressList items={group.items} />
                  </section>
                )),
              },
            ]}
          />
        </div>
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
