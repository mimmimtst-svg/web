"use client";

import { useState, type ReactNode } from "react";
import styles from "./ProfilePage.module.css";

type PaperListProps = {
  /** The rendered rows, newest first. */
  children: ReactNode[];
  /** How many show before "더보기". */
  initial?: number;
};

/** The profile's papers: the newest few fading out at the bottom, then a
    gray "+ 더보기" below that reveals the rest (and folds them away
    again). No counts in the label — user request. */
export default function PaperList({ children, initial = 5 }: PaperListProps) {
  const [open, setOpen] = useState(false);
  const rest = children.length - initial;
  return (
    <>
      <ul
        className={`${styles.entries} ${open || rest <= 0 ? "" : styles.entriesFaded}`}
        id="profile-papers"
      >
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
          <span className={`${styles.moreIcon} ${open ? styles.moreIconOpen : ""}`} aria-hidden="true" />
          {open ? "접기" : "더보기"}
        </button>
      )}
    </>
  );
}
