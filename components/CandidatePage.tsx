import styles from "./CandidatePage.module.css";
import profileStyles from "./ProfilePage.module.css";
import pressStyles from "./PressPage.module.css";
import planStyles from "./PlanDetail.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import CandidateTabs from "./CandidateTabs";
import PressTabs from "./PressTabs";
import PressList from "./PressList";
import { ProfileCv, ProfileIntro } from "./ProfilePage";
import QnaNav from "./QnaNav";
import { CheckIcon } from "./icons";
import { pressColumns, pressReports } from "@/lib/pressData";
import { pledgeAnchor, pledgeParts } from "@/lib/pledgeDetail";
import { withBasePath } from "@/lib/basePath";
import {
  greeting,
  motivation,
  qna,
  recommendationNote,
  recommendations,
  type RelatedPledge,
  type Rich,
  type TextBlock,
} from "@/lib/candidateData";

/**
 * A place kept for a photo still to come: a beige box of the photo's
 * shape, its number in the middle so it can be named ("인사말 사진 2").
 */
function PhotoSlot({
  label,
  ratio,
  className = "",
}: {
  label: string;
  ratio: string;
  className?: string;
}) {
  return (
    <div
      className={`${styles.photoSlot} ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`${label} (준비 중)`}
    >
      <span className={styles.photoSlotLabel}>{label}</span>
    </div>
  );
}

function RichText({ text }: { text: Rich }) {
  if (typeof text === "string") return text;
  return text.map((part, i) =>
    typeof part === "string" ? part : <strong key={i}>{part.b}</strong>,
  );
}

function Blocks({ blocks }: { blocks: TextBlock[] }) {
  return blocks.map((block, i) =>
    block.type === "p" ? (
      <p className={styles.para} key={i}>
        <RichText text={block.text} />
      </p>
    ) : (
      <ul className={styles.dashList} key={i}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  );
}

/** 인사말's photos in the letter (the user's, 2026-10-24), after these
    paragraphs, where the booklet has its photos. */
const GREETING_PHOTOS: Record<number, { src: string; alt: string }> = {
  7: {
    src: "greeting-photo-2-2026-10-24.webp",
    alt: "행사장에서 인사를 나누는 유병현 후보",
  },
  11: {
    src: "greeting-photo-3-2026-10-24.webp",
    alt: "고려대학교 캠퍼스의 맞잡은 손 조형물",
  },
};

/** A photo in the reading column, 3:2 with rounded corners. */
function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.photo}
      src={withBasePath(`/images/${src}`)}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}

/** I. 후보자 인사말 (2026-10-24, "the opening should have impact"): a
    full-width band — the candidate on stage (the user's photo) on the
    left, its crimson carried on to the right, where the main page's hero
    title sits right-aligned — then the letter with the booklet's photos,
    the sign-off on the right. */
function Greeting() {
  return (
    <>
      <header className={styles.greetingHero}>
        {/* The user's stage photo (from the 5760×2000 original, 2880×1000):
            the candidate between crimson on both sides, so it can sit
            anywhere in the band. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.greetingHeroBg}
          src={withBasePath("/images/greeting-hero-v4-2026-10-24.webp")}
          alt="연단에서 인사하는 유병현 후보"
          width={2880}
          height={1000}
        />
        <div className={styles.greetingHeroInner}>
          {/* The main page's hero title, right-aligned. */}
          <div className={styles.greetingHeroText}>
            <p className={styles.heroEn}>{greeting.slogan[2]}</p>
            <p className={styles.heroBrand}>FINE - KU</p>
            <p className={styles.heroKr}>
              {greeting.slogan[0].split(", ").map((part, i, all) => (
                <span key={part}>
                  {part}
                  {i < all.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </header>
      <div className={`${styles.text} ${styles.greetingText}`}>
        <p className={styles.salutation}>
          {greeting.salutation.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        {greeting.body.map((para, i) => (
          <div key={i}>
            <p className={styles.para}>{para}</p>
            {GREETING_PHOTOS[i] && (
              <div className={styles.wideSlot}>
                <Photo {...GREETING_PHOTOS[i]} />
              </div>
            )}
          </div>
        ))}
        <p className={styles.para}>{greeting.closing}</p>
        <p className={styles.signoff}>
          {greeting.signoff.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
    </>
  );
}

/** 자기소개's chapters, one per paragraph from the second to the
    seventh: the year (or name) each turns on, from its own text. */
const MOTIVATION_MARKS = [
  "1994",
  "2009",
  "2011",
  "2012 · 2015",
  "KU PRIDE CLUB",
  "이제",
];

/** 자기소개's key figures, each in the booklet's words. */
const MOTIVATION_FIGURES = [
  {
    value: "제1호",
    label: "고려대학교 민사소송법 분야 법학박사",
    note: "1994",
  },
  {
    value: "1,100억 원",
    label: "한 해 모금액 돌파, 고려대학교 역사상 최초",
    note: "2017",
  },
  {
    value: "약 5,000명",
    label: "KU PRIDE CLUB에 참여한 교우",
    note: "2019년 2월 기준",
  },
  {
    value: "약 162억 원",
    label: "KU PRIDE CLUB으로 모인 기금",
    note: "2026년 6월 기준",
  },
];

/** A paragraph's first sentence, and the rest. */
function splitFirst(text: string): [string, string] {
  const at = text.indexOf("다. ");
  return at < 0 ? [text, ""] : [text.slice(0, at + 2), text.slice(at + 3)];
}

/** II. 자기소개 및 동기 (2026-10-24, "more readable, more refined" than
    the booklet's alternating photos): the opening paragraph large beside
    a portrait; four key figures from the text; the career as chapters —
    the year in key red, the paragraph's first sentence bold, the rest,
    a photo beside it; the closing paragraph on a rounded crimson card. */
function Motivation() {
  const [lead, ...rest] = motivation;
  const chapters = rest.slice(0, MOTIVATION_MARKS.length);
  const [closingHead, closingRest] = splitFirst(rest[rest.length - 1]);
  return (
    <div className={styles.motivation}>
      <header className={styles.moLead}>
        <div>
          <p className={styles.moEyebrow}>자기소개 및 총장 입후보 동기</p>
          <p className={styles.moLeadText}>{lead}</p>
        </div>
        <PhotoSlot label="자기소개 사진 1" ratio="4 / 5" />
      </header>

      <ul className={styles.moFigures}>
        {MOTIVATION_FIGURES.map((f) => (
          <li key={f.value}>
            <span className={styles.moFigureValue}>{f.value}</span>
            <span className={styles.moFigureLabel}>{f.label}</span>
            <span className={styles.moFigureNote}>{f.note}</span>
          </li>
        ))}
      </ul>

      <ol className={styles.moChapters}>
        {chapters.map((para, i) => {
          const [head, body] = splitFirst(para);
          return (
            <li className={styles.moChapter} key={i}>
              <p className={styles.moMark}>{MOTIVATION_MARKS[i]}</p>
              <div className={styles.moBody}>
                <p className={styles.moHead}>{head}</p>
                {body && <p className={styles.para}>{body}</p>}
              </div>
              <PhotoSlot label={`자기소개 사진 ${i + 2}`} ratio="4 / 3" />
            </li>
          );
        })}
      </ol>

      <section className={styles.moClosing}>
        <p className={styles.moClosingHead}>{closingHead}</p>
        {closingRest && <p className={styles.moClosingText}>{closingRest}</p>}
      </section>
    </div>
  );
}

/** Where a related pledge opens: its entry on the 주요 공약 page (same
    codes as the booklet), or nothing while it has none yet. */
const LISTED = new Set(
  pledgeParts.flatMap((part) => part.pledges.map((p) => p.code)),
);
const hrefOf = (item: RelatedPledge) =>
  item.href ??
  (item.code && LISTED.has(item.code)
    ? `../pledges/detail/#${pledgeAnchor(item.code)}`
    : undefined);

/** Q&A's related pledges grouped under their policy area — the booklet's
    code ("1-1") starts with the area's number (01 선도적 연구 …) — in the
    areas' order; the college plans, which have no code, last. */
function RelatedPledges({ items }: { items: RelatedPledge[] }) {
  const groups = new Map<string, RelatedPledge[]>();
  for (const item of items) {
    const key = item.code ? item.code.split("-")[0].padStart(2, "0") : "";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  const keys = [...groups.keys()].sort((a, b) =>
    a && b ? a.localeCompare(b) : a ? -1 : 1,
  );
  // The P2-2 pledge box (2026-10-23, "make it like that one"): each area's
  // name in key red over its pledges with the check, two areas side by
  // side, one area's list in two columns.
  return (
    <div className={styles.related}>
      <p className={styles.relatedLabel}>관련 공약</p>
      <div
        className={`${planStyles.pledges} ${keys.length > 1 ? planStyles.pledgesSplit : ""}`}
      >
        {keys.map((key) => (
          <div className={planStyles.pledgeGroup} key={key}>
            <p className={planStyles.pledgeArea}>
              {pledgeParts.find((p) => p.number === key)?.title ??
                "단과대별 발전계획"}
            </p>
            <ul className={planStyles.pledgeList}>
              {groups.get(key)!.map((item) => {
                const href = hrefOf(item);
                return (
                  <li key={item.text}>
                    {href ? (
                      <a className={planStyles.pledge} href={href}>
                        <CheckIcon />
                        <span>{item.text}</span>
                      </a>
                    ) : (
                      <span className={planStyles.pledge}>
                        <CheckIcon />
                        <span>{item.text}</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** IV. Q&A: each question — opening, numbered parts with their points,
    closing — and its related pledges by policy area, each opening its
    page; QnaNav goes from question to question (dots on a wide screen,
    a drop-down bar on a phone). */
function QnaList() {
  return (
    <div className={styles.text}>
      <QnaNav items={qna.map(({ id, question }) => ({ id, question }))} />
      {qna.map((q, i) => (
        <article
          className={styles.qa}
          id={q.id}
          key={q.id}
          aria-labelledby={`${q.id}-title`}
        >
          <h2 className={styles.question} id={`${q.id}-title`}>
            <span className={styles.qNum}>Q{i + 1}</span>
            {q.question}
          </h2>
          <Blocks blocks={q.intro} />
          {q.sections.map((section, n) => (
            <section className={styles.qSection} key={section.title}>
              <h3 className={styles.qSectionTitle}>
                <span className={styles.qSectionNum}>{n + 1}.</span>
                {section.title}
              </h3>
              <Blocks blocks={section.blocks} />
            </section>
          ))}
          <Blocks blocks={q.outro} />
          <RelatedPledges items={q.related} />
        </article>
      ))}
    </div>
  );
}

/** VI. 미주 교우님들의 추천사: the booklet's footnote, then every letter in
    a rounded beige box, no lines — the two the booklet shows as pictures
    (a handwritten card, a letterhead) in the same box. */
function Recommendations() {
  return (
    <div className={styles.text}>
      <p className={styles.recNote}>{recommendationNote}</p>
      <div className={styles.recList}>
        {recommendations.map((rec) => (
          <article
            className={styles.rec}
            key={rec.name}
            aria-label={`${rec.name} 추천사`}
          >
            {rec.type === "letter" ? (
              <>
                {rec.title && <h2 className={styles.recTitle}>{rec.title}</h2>}
                {rec.body.map((block, i) =>
                  typeof block === "string" ? (
                    <p className={styles.recPara} key={i}>
                      {block}
                    </p>
                  ) : (
                    <ol className={styles.recOl} key={i}>
                      {block.ol.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  ),
                )}
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles.recImage}
                src={withBasePath(`/images/${rec.src}`)}
                width={rec.width}
                height={rec.height}
                alt={rec.alt}
                loading="lazy"
                decoding="async"
              />
            )}
            <p className={styles.recSign}>
              <span className={styles.recName}>{rec.name}</span>
              {rec.role && <span className={styles.recRole}>{rec.role}</span>}
              {rec.place && <span className={styles.recRole}>{rec.place}</span>}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

/**
 * 후보자 소개, the work-in-progress version (2026-10-23): only at the
 * unlisted preview address (preview-template/profile/), while the public
 * /profile/ keeps the current page. A menu of six under the header —
 * 인사말 · 자기소개 및 동기 · Q&A · 약력 · 언론 기고 · 미주 교우님 추천사 —
 * filled from the candidate booklet (lib/candidateData.ts); 약력 is the
 * current profile, 언론 기고 the press page's two lists. The photos of
 * 인사말 and 자기소개 are numbered places until they come.
 */
export default function CandidatePage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={`${profileStyles.page} ${styles.page}`}>
        <h1 className={styles.visuallyHidden}>후보자 소개</h1>
        <CandidateTabs
          tabs={[
            { id: "greeting", label: "인사말", content: <Greeting /> },
            {
              id: "motivation",
              label: "자기소개 및 동기",
              content: <Motivation />,
            },
            { id: "qna", label: "Q&A", content: <QnaList /> },
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
                  <PressTabs
                    tabs={[
                      {
                        id: "columns",
                        label: "언론기고",
                        content: <PressList items={pressColumns} />,
                      },
                      {
                        id: "reports",
                        label: "언론보도",
                        content: pressReports.map((group, index) => (
                          <section
                            className={pressStyles.group}
                            key={group.title ?? index}
                          >
                            {group.title && (
                              <h2 className={pressStyles.groupTitle}>
                                {group.title}
                              </h2>
                            )}
                            <PressList items={group.items} />
                          </section>
                        )),
                      },
                    ]}
                  />
                </div>
              ),
            },
            {
              id: "recommendations",
              label: "미주 교우님 추천사",
              content: <Recommendations />,
            },
          ]}
        />
      </main>
      <Footer className={profileStyles.footer} />
      <ScrollTopButton />
    </>
  );
}
