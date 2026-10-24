"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import styles from "./PressPage.module.css";

type Tab = { id: string; label: string; content: ReactNode };

/** The page's two lists behind a pill tab bar (언론기고 / 언론보도). The
    white pill slides to the chosen tab (2026-10-24), and the list that
    comes in rises in row by row (PressPage.module.css). */
export default function PressTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const barRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ left: number; width: number } | null>(null);

  // The pill under the chosen tab: measured, so it fits either label.
  useLayoutEffect(() => {
    const measure = () => {
      const tab = barRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (tab) setThumb({ left: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="언론 보도 자료 분류" ref={barRef}>
        {thumb && (
          <span
            className={styles.tabThumb}
            style={{ transform: `translateX(${thumb.left}px)`, width: thumb.width }}
            aria-hidden="true"
          />
        )}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            data-id={tab.id}
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
