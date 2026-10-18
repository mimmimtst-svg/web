import styles from "./PledgeDetail.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import PledgeNav from "./PledgeNav";
import { CheckIcon, LineArrowRightIcon, PlusIcon } from "./icons";
import { pledgeAnchor, pledgeParts, type PledgeLine } from "@/lib/pledgeDetail";

const NAV_ITEMS = pledgeParts.map(({ id, number, title }) => ({ id, number, label: title }));

/** A box line's target: a pledge code ("1-1") or a part id. */
const hrefFor = (to: string) => `#${/^\d/.test(to) ? pledgeAnchor(to) : to}`;

/** One line of a keyword box: the whole line is the link, or — for a line
    naming two pledges — each half links to its own. */
function BoxLine({ line }: { line: PledgeLine }) {
  if (line.length === 1) {
    return (
      <a className={styles.boxLink} href={hrefFor(line[0].to)}>
        <span>{line[0].text}</span>
        <LineArrowRightIcon className={styles.boxArrow} />
      </a>
    );
  }
  return (
    <span className={styles.boxSplit}>
      {line.map((part, i) => (
        <span key={part.to}>
          {i > 0 && <span aria-hidden="true">·</span>}
          <a className={styles.boxPart} href={hrefFor(part.to)}>
            {part.text}
          </a>
        </span>
      ))}
      <LineArrowRightIcon className={styles.boxArrow} />
    </span>
  );
}

/**
 * P4-2, 주요 공약 (menu): the booklet's five policy areas. A sticky tab bar
 * of the five parts; each part opens with its infographic — headline,
 * sub-headline, then four keyword boxes around a key-red circle with the
 * part's name and keywords — and below it every
 * pledge, cut to one lead sentence and its key points. Each box line
 * links down to the pledge it sums up.
 */
export default function PledgeDetail() {
  return (
    <>
      <Header homeHref="../../" solid />
      <main className={styles.page}>
        <h1 className={styles.visuallyHidden}>주요 공약</h1>
        <PledgeNav items={NAV_ITEMS} />

        {pledgeParts.map((part) => (
          <section className={styles.part} id={part.id} key={part.id} aria-labelledby={`${part.id}-title`}>
            <div className={styles.inner}>
              {/* The tab bar already names the part, so the head is just the
                  headline and sub-headline (2026-10-18: the part label and
                  the three intro lines are gone, the infographic comes
                  straight after). */}
              <header className={styles.partHead}>
                <h2 className={styles.headline} id={`${part.id}-title`}>
                  <span className={styles.visuallyHidden}>{part.title}: </span>
                  {part.headline}
                </h2>
                <p className={styles.subline}>{part.subline}</p>
              </header>

              <div className={styles.infographic}>
                <div className={styles.hub} aria-hidden="true">
                  <span
                    className={`${styles.hubTitle} ${
                      part.title.length > 6 ? styles.hubTitleLong : ""
                    }`}
                  >
                    {part.title}
                  </span>
                  <span className={styles.hubKeywords}>{part.keywords}</span>
                </div>
                {part.boxes.map((box) => (
                  <div className={styles.box} key={box.name}>
                    <div className={styles.boxHead}>
                      <h3 className={styles.boxName}>{box.name}</h3>
                      <p className={styles.boxTagline}>{box.tagline}</p>
                    </div>
                    <ul className={styles.boxLines}>
                      {box.lines.map((line) => (
                        <li key={line.map((l) => l.text).join("·")}>
                          <BoxLine line={line} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <h3 className={styles.pledgesHeading}>
                <PlusIcon />
                세부 공약
              </h3>
              <ol className={styles.pledges}>
                {part.pledges.map((pledge, index) => (
                  <li
                    className={styles.pledge}
                    id={pledgeAnchor(pledge.code)}
                    data-pledge=""
                    key={pledge.code}
                  >
                    <div className={styles.pledgeHead}>
                      <span className={styles.pledgeNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className={styles.pledgeTitle}>{pledge.title}</h4>
                    </div>
                    <div className={styles.pledgeBody}>
                      <p className={styles.pledgeLead}>{pledge.lead}</p>
                      <ul className={styles.pledgePoints}>
                        {pledge.points.map((point) => (
                          <li key={point}>
                            <CheckIcon />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
