"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./CandidatePage.module.css";

export type CandidateTab = { id: string; label: string; content: ReactNode };

/**
 * The 후보자 소개 page's menu: a tab bar sticky under the header (P4-2's
 * look), one panel shown at a time. The address carries the open tab
 * (#greeting …), so a link can open any of them; switching goes back to
 * the top of the page. On a phone the bar scrolls sideways, the current
 * tab kept in view.
 */
export default function CandidateTabs({ tabs }: { tabs: CandidateTab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const [stuck, setStuck] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Open the tab named in the address, now and on back/forward. An
  // address naming something inside a tab (a Q&A question, #q3) opens
  // that tab and goes to it.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (tabs.some((tab) => tab.id === id)) {
        setActive(id);
        return;
      }
      const target = id ? document.getElementById(id) : null;
      const tabId = target?.closest<HTMLElement>("[role=tabpanel]")?.dataset.tab;
      if (!target || !tabId) return;
      setActive(tabId);
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On a phone the tabs scroll sideways: keep the current one in view.
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !tab) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  const open = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <nav
        className={`${styles.tabs} ${stuck ? styles.tabsStuck : ""}`}
        aria-label="후보자 소개"
      >
        <div className={styles.tabList} ref={listRef} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              data-id={tab.id}
              id={`candidate-tab-${tab.id}`}
              aria-selected={tab.id === active}
              aria-controls={`candidate-panel-${tab.id}`}
              className={`${styles.tab} ${tab.id === active ? styles.tabActive : ""}`}
              onClick={() => open(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`candidate-panel-${tab.id}`}
          aria-labelledby={`candidate-tab-${tab.id}`}
          data-tab={tab.id}
          className={styles.tabPanel}
          hidden={tab.id !== active}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}
