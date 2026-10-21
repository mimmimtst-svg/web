import styles from "./CollegePlans.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import CollegeNav from "./CollegeNav";
import Reveal from "./Reveal";
import { collegeCampuses, type CollegeBlock } from "@/lib/collegePlans";

/** One block of the booklet's text (lib/collegePlans.ts). */
function Block({ block }: { block: CollegeBlock }) {
  switch (block.type) {
    case "p":
      return <p className={styles.para}>{block.text}</p>;
    case "heading":
      return <h4 className={styles.blockHeading}>{block.text}</h4>;
    case "list":
      return (
        <ul className={styles.dashList}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "group":
      return (
        <div className={styles.group}>
          <p className={styles.groupTitle}>{block.title}</p>
          <p className={styles.groupTagline}>{block.tagline}</p>
        </div>
      );
    case "tagline":
      // A hospital's one-line header: the same section style as a group.
      return (
        <div className={styles.group}>
          <p className={styles.groupTitle}>{block.text}</p>
        </div>
      );
  }
}

/**
 * 단과대별 발전계획 (menu, 2026-10-21): the booklet's chapter III in full,
 * laid out like P4-2 without its infographic — a sticky tab bar of the
 * three parts with a dropdown of each part's colleges (CollegeNav), then
 * each part: its name in the left column with its opening text (세종,
 * 의과대학/의료원) beside it, and every college as a row, its name on the
 * left (staying in view while its text scrolls) and the booklet's whole
 * text on the right.
 */
export default function CollegePlans() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page}>
        <h1 className={styles.visuallyHidden}>단과대별 발전계획</h1>
        <CollegeNav campuses={collegeCampuses} />

        {collegeCampuses.map((campus, campusIndex) => (
          <section
            className={styles.part}
            id={campus.id}
            key={campus.id}
            aria-labelledby={`${campus.id}-title`}
          >
            <div className={styles.inner}>
              <Reveal
                as="header"
                className={`${styles.unitGrid} ${styles.partHead}`}
                visible={campusIndex === 0 ? true : undefined}
              >
                <h2 className={styles.headline} id={`${campus.id}-title`}>
                  {campus.label}
                </h2>
                {campus.intro.length > 0 && (
                  <div className={styles.unitBody}>
                    {campus.intro.map((block, i) => (
                      <Block block={block} key={i} />
                    ))}
                  </div>
                )}
              </Reveal>

              <ol
                className={`${styles.units} ${campus.intro.length > 0 ? styles.unitsRuled : ""}`}
              >
                {campus.units.map((unit) => (
                  <li
                    className={styles.unit}
                    id={unit.id}
                    data-unit=""
                    key={unit.id}
                  >
                    <Reveal className={styles.unitGrid}>
                      <h3 className={styles.unitName}>
                        {unit.short ? (
                          <>
                            {unit.short.name}
                            <span className={styles.unitNote}>
                              {unit.short.note}
                            </span>
                          </>
                        ) : (
                          unit.name
                        )}
                      </h3>
                      <div className={styles.unitBody}>
                        {unit.blocks.map((block, i) => (
                          <Block block={block} key={i} />
                        ))}
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ))}
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
