import styles from "./ProfilePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import ScrollTopButton from "./ScrollTopButton";
import PaperList from "./PaperList";
import {
  profileBooks,
  profileCourses,
  profileIntro,
  profilePapers,
  profileSections,
  type ProfileEntry,
} from "@/lib/profileData";
import { withBasePath } from "@/lib/basePath";

/** One CV line: the date first, small and light, then the entry. */
function EntryRow({ entry }: { entry: ProfileEntry }) {
  return (
    <li className={styles.entry}>
      <span className={styles.period}>{entry.period}</span>
      <span className={styles.entryText}>{entry.text}</span>
    </li>
  );
}

function Entries({ entries }: { entries: ProfileEntry[] }) {
  return (
    <ul className={styles.entries}>
      {entries.map((entry) => (
        <EntryRow entry={entry} key={entry.text} />
      ))}
    </ul>
  );
}

/**
 * The candidate's profile (menu "유 병 현"): photo, name and contacts in
 * a beige band, then the CV from the booklet up to 강의과목 — each
 * section a label column beside its entries (newest first), each entry's
 * date before it. Papers show the newest five and a "더보기".
 */
export default function ProfilePage() {
  return (
    <>
      <Header homeHref="../" solid />
      <main className={styles.page}>
        <section className={styles.intro}>
          <div className={styles.introInner}>
            <Reveal className={styles.photoWrap} visible>
              {/* Cut-out portrait facing the text (its own photo since
                  2026-10-17), standing on the band's bottom edge. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.photo}
                src={withBasePath("/images/profile-portrait-2026-10-20.webp")}
                alt="유병현 교수"
                width={1241}
                height={1835}
              />
            </Reveal>
            <Reveal className={styles.introText} visible>
              <h1 className={styles.title}>
                <span className={styles.name}>{profileIntro.name}</span>
                <span className={styles.role}>고려대학교 총장 후보</span>
              </h1>
              <p className={styles.meta}>
                <span lang="zh-Hant">{profileIntro.hanja}</span>
                <span aria-hidden="true">·</span>
                <span>{profileIntro.born}</span>
              </p>
              <dl className={styles.contacts}>
                {profileIntro.contacts.map((contact) => (
                  <div className={styles.contact} key={contact.label}>
                    <dt>{contact.label}</dt>
                    <dd>
                      {contact.href ? <a href={contact.href}>{contact.value}</a> : contact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <div className={styles.cv}>
          {profileSections.map((section) => (
            <Reveal as="section" className={styles.row} key={section.id}>
              <h2 className={styles.label}>{section.title}</h2>
              <div className={styles.content}>
                {section.groups.map((group, index) => (
                  <div className={styles.group} key={group.title ?? index}>
                    {group.title && <h3 className={styles.groupTitle}>{group.title}</h3>}
                    <Entries entries={group.entries} />
                  </div>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal as="section" className={styles.row}>
            <h2 className={styles.label}>저서, 논문</h2>
            <div className={styles.content}>
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>저서</h3>
                <Entries entries={profileBooks} />
              </div>
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>논문</h3>
                <PaperList>
                  {profilePapers.map((paper) => (
                    <EntryRow entry={paper} key={paper.text} />
                  ))}
                </PaperList>
              </div>
            </div>
          </Reveal>

          <Reveal as="section" className={styles.row}>
            <h2 className={styles.label}>강의과목</h2>
            <div className={styles.content}>
              <ul className={styles.courses}>
                {profileCourses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer className={styles.footer} />
      <ScrollTopButton />
    </>
  );
}
