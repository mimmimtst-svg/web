import { Fragment, type ReactNode } from "react";
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
import Reveal from "./Reveal";
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

function RichText({ text }: { text: Rich }) {
  if (typeof text === "string") return text;
  return text.map((part, i) =>
    typeof part === "string" ? part : <strong key={i}>{part.b}</strong>,
  );
}

function Blocks({ blocks }: { blocks: TextBlock[] }) {
  return blocks.map((block, i) =>
    block.type === "p" ? (
      <Reveal as="p" className={styles.para} key={i}>
        <RichText text={block.text} />
      </Reveal>
    ) : (
      <Reveal as="ul" className={styles.dashList} key={i}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Reveal>
    ),
  );
}

/** 인사말's photos in the letter (the user's, 2026-10-24), after these
    paragraphs, where the booklet has its photos. */
const GREETING_PHOTOS: Record<
  number,
  { src: string; alt: string; focus: string }
> = {
  7: {
    src: "greeting-photo-2-2026-10-24.webp",
    alt: "행사장에서 인사를 나누는 유병현 후보",
    focus: "center 15%",
  },
  11: {
    src: "greeting-photo-3-2026-10-24.webp",
    alt: "고려대학교 캠퍼스의 맞잡은 손 조형물",
    focus: "center 68%",
  },
};

/** A photo across the text column, 2:1 (2026-10-24: the column is now
    1200px wide, so the photo is cut top and bottom rather than standing
    taller), rounded corners; `focus` keeps its subject in the frame. */
function Photo({
  src,
  alt,
  focus,
}: {
  src: string;
  alt: string;
  focus?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.photo}
      style={focus ? { objectPosition: focus } : undefined}
      src={withBasePath(`/images/${src}`)}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}

/** I. 후보자 인사말 (2026-10-24, "the opening should have impact"): a
    full-width crimson band — the candidate (약력's cut-out portrait,
    2026-10-27; a stage photo before) standing on its foot on the left,
    the main page's hero title right-aligned on the right — then the
    letter with the booklet's photos, the sign-off on the right. */
function Greeting() {
  return (
    <>
      <header className={styles.greetingHero}>
        {/* The main page hero's pattern, fainter (2026-10-27). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.greetingHeroPattern}
          src={withBasePath("/images/hero-bg.png")}
          alt=""
          aria-hidden="true"
        />
        {/* The same cut-out as 약력 (ProfilePage), on the band's crimson. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.greetingHeroBg}
          src={withBasePath("/images/profile-portrait-2026-10-20.webp")}
          alt="유병현 후보"
          width={1241}
          height={1835}
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
        <Reveal as="p" className={styles.salutation}>
          {greeting.salutation.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Reveal>
        {greeting.body.map((para, i) => (
          <div key={i}>
            <Reveal as="p" className={styles.para}>
              {para}
            </Reveal>
            {GREETING_PHOTOS[i] && (
              <Reveal className={styles.wideSlot} distance={40} duration={900}>
                <Photo {...GREETING_PHOTOS[i]} />
              </Reveal>
            )}
          </div>
        ))}
        <Reveal as="p" className={styles.para}>
          {greeting.closing}
        </Reveal>
        <Reveal as="p" className={styles.signoff}>
          {greeting.signoff.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Reveal>
      </div>
    </>
  );
}

/** 자기소개's one-line introduction, written from its text (the user asked
    for a line that sums it up, not the first sentence): the closing
    paragraph's "법학자의 균형 감각 … 행정가의 실행력" and the opening's
    "모교의 새로운 도약에 헌신". */
const MOTIVATION_HEADLINE =
  "법학자의 균형 감각과 행정가의 실행력으로, 고려대학교의 새로운 도약에 헌신하겠습니다.";

type MoPhoto = { src: string; alt: string; focus?: string };

/** 자기소개's layout (the user's photos): the text in groups, some beside
    a photo that runs the full height of its paragraphs (its top on the
    first line, its foot on the last), photos of different shapes on
    alternating sides; one wide photo across the column. `paras` are
    indexes into the booklet's eight paragraphs. */
type MoBlock =
  | {
      kind: "side";
      paras: number[];
      photo: MoPhoto;
      side: "left" | "right";
      shape: string;
      /** On a phone, the photo between the two paragraphs, not after. */
      phoneMid?: boolean;
    }
  | { kind: "text"; paras: number[] }
  | { kind: "wide"; photo: MoPhoto };

const MOTIVATION_LAYOUT: MoBlock[] = [
  {
    kind: "side",
    paras: [0, 1],
    side: "right",
    shape: "moSideLarge",
    photo: {
      src: "motivation-photo-1-2026-10-24.webp",
      alt: "고려대학교 역대 총장 동판 앞의 유병현 후보",
      focus: "35% center",
    },
  },
  { kind: "text", paras: [2] },
  {
    kind: "side",
    paras: [3, 4],
    side: "left",
    shape: "moSideTall",
    phoneMid: true,
    photo: {
      src: "motivation-photo-2-2026-10-24.webp",
      alt: "회의 자료를 살피는 유병현 후보",
      focus: "40% center",
    },
  },
  {
    kind: "wide",
    photo: {
      src: "motivation-photo-3-2026-10-24.webp",
      alt: "KU PRIDE CLUB 게시판과 교기 앞의 유병현 후보",
      focus: "center 30%",
    },
  },
  { kind: "text", paras: [5] },
  {
    kind: "side",
    paras: [6, 7],
    side: "right",
    shape: "moSideSquare",
    phoneMid: true,
    photo: {
      // 2026-10-30: the user's photo ("자기소개_마지막"), cropped to their
      // marked area — his face and the stand's title, room above his head.
      src: "motivation-photo-4-2026-10-30.webp",
      alt: "‘의료분쟁조정법 개정과 발전 방향’ 학술대회 안내판 옆의 유병현 후보",
      focus: "55% 20%",
    },
  },
];

function MoImg({ photo, className }: { photo: MoPhoto; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
      src={withBasePath(`/images/${photo.src}`)}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
    />
  );
}

/** II. 자기소개 및 동기 (2026-10-24): the one-line introduction across
    the top in one line, then the booklet's eight paragraphs with the
    user's photos (MOTIVATION_LAYOUT). */
function Motivation() {
  return (
    <div className={styles.motivation}>
      <Reveal as="h2" className={styles.moHeadline} distance={32}>
        {MOTIVATION_HEADLINE}
      </Reveal>
      <div className={styles.moText}>
        {MOTIVATION_LAYOUT.map((block, i) =>
          block.kind === "wide" ? (
            <Reveal key={i} distance={40} duration={900}>
              <MoImg
                photo={block.photo}
                className={`${styles.moPhoto} ${styles.moWide}`}
              />
            </Reveal>
          ) : block.kind === "text" ? (
            <Reveal className={styles.moBlock} key={i}>
              {block.paras.map((n) => (
                <p className={styles.para} key={n}>
                  {motivation[n]}
                </p>
              ))}
            </Reveal>
          ) : (
            <Reveal
              className={`${styles.moBlock} ${styles.moSide} ${styles[block.shape]} ${
                block.side === "left" ? styles.moSideLeft : ""
              } ${block.phoneMid ? styles.moSideMid : ""}`}
              key={i}
              distance={36}
              duration={850}
            >
              <div>
                {block.paras.map((n) => (
                  <p className={styles.para} key={n}>
                    {motivation[n]}
                  </p>
                ))}
              </div>
              <MoImg photo={block.photo} className={styles.moPhoto} />
            </Reveal>
          ),
        )}
      </div>
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
    <Reveal className={styles.related}>
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
    </Reveal>
  );
}

/** IV. Q&A: each question — opening, numbered parts with their points,
    closing — and its related pledges by policy area, each opening its
    page; QnaNav goes from question to question (dots on a wide screen,
    a drop-down bar on a phone). Its own page, 후보자에게 묻는다, since
    2026-10-29 (QnaPage; on 여섯 가지 약속 before). `heading`: what goes
    over it; `className`: added to its text column. */
export function QnaList({ heading, className = "" }: { heading?: ReactNode; className?: string }) {
  return (
    <div className={`${styles.text} ${className}`}>
      {heading}
      <QnaNav items={qna.map(({ id, question }) => ({ id, question }))} />
      {qna.map((q, i) => (
        <article
          className={styles.qa}
          id={q.id}
          key={q.id}
          aria-labelledby={`${q.id}-title`}
        >
          {/* Two columns as on the 주요 공약 detail page: "Q1" and the
              question on the left (staying in view), the answer right. */}
          <Reveal
            as="h2"
            className={styles.question}
            id={`${q.id}-title`}
            distance={32}
          >
            <span className={styles.qBig}>Q{i + 1}</span>
            <span className={styles.questionText}>{q.question}</span>
          </Reveal>
          <div className={styles.answer}>
            <Blocks blocks={q.intro} />
            {q.sections.map((section, n) => (
              <section className={styles.qSection} key={section.title}>
                <Reveal as="h3" className={styles.qSectionTitle}>
                  <span className={styles.qSectionNum}>{n + 1}.</span>
                  {section.title}
                </Reveal>
                <Blocks blocks={section.blocks} />
              </section>
            ))}
            <Blocks blocks={q.outro} />
            <RelatedPledges items={q.related} />
          </div>
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
          <Reveal
            as="article"
            className={styles.rec}
            key={rec.name}
            aria-label={`${rec.name} 추천사`}
            distance={40}
            duration={850}
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
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/**
 * 후보자 소개 (2026-10-23; public at /profile/ since 2026-10-25, before
 * that only at the unlisted preview address). A menu of five under the
 * header — 인사말 · 자기소개 및 동기 · 약력 · 언론 기고 · 미주 교우님
 * 추천사 — filled from the candidate booklet (lib/candidateData.ts); 약력
 * is the current profile, 언론 기고 the press page's two lists. (Q&A
 * moved to the 여섯 가지 약속 page on 2026-10-26.)
 */
export default function CandidatePage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={`${profileStyles.page} ${styles.page}`}>
        <h1 className={styles.visuallyHidden}>후보자 소개</h1>
        <CandidateTabs
          label="후보자 소개"
          tabs={[
            { id: "greeting", label: "인사말", content: <Greeting /> },
            {
              id: "motivation",
              label: "자기소개 및 동기",
              content: <Motivation />,
            },
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
