"use client";

import { useState, type ReactNode } from "react";
import styles from "./ProfilePage.module.css";

type PaperListProps = {
  /** The rendered rows, newest first. */
  children: ReactNode[];
  /** How many show before "더보기". */
  initial?: number;
};

/** The profile's papers: the newest few, then a "더보기" button below
    that reveals the rest (and folds them away again). */
export default function PaperList({ children, initial = 5 }: PaperListProps) {
  const [open, setOpen] = useState(false);
  const rest = children.length - initial;
  return (
    <>
      <ul className={styles.entries} id="profile-papers">
        {open ? children : children.slice(0, initial)}
      </ul>
      {rest > 0 && (
        <button
          type="button"
          className={styles.more}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="profile-papers"
        >
          {open ? "접기" : `더보기 (${rest}편)`}
          <span className={`${styles.moreIcon} ${open ? styles.moreIconOpen : ""}`} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
