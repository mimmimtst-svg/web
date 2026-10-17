"use client";

import { useState, type ReactNode } from "react";
import styles from "./PressPage.module.css";

type Tab = { id: string; label: string; content: ReactNode };

/** The page's two lists behind a pill tab bar (언론기고 / 언론보도). */
export default function PressTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="언론 보도 자료 분류">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`press-tab-${tab.id}`}
            aria-selected={tab.id === active}
            aria-controls={`press-panel-${tab.id}`}
            className={`${styles.tab} ${tab.id === active ? styles.tabActive : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`press-panel-${tab.id}`}
          aria-labelledby={`press-tab-${tab.id}`}
          hidden={tab.id !== active}
          className={styles.panel}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}
