import styles from "./PressPage.module.css";
import { LineArrowRightIcon } from "./icons";
import type { PressItem } from "@/lib/pressData";

/** Rows of source tag · title · date (only where there is one — 언론보도
    has none); each row opens the article in a new tab. */
export default function PressList({ items }: { items: PressItem[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            className={`${styles.row} ${item.date ? "" : styles.rowNoDate}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.source}>{item.source}</span>
            <span className={styles.title}>{item.title}</span>
            {item.date && <span className={styles.date}>{item.date}</span>}
            <LineArrowRightIcon className={styles.arrow} />
            <span className={styles.visuallyHidden}> (새 창)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
