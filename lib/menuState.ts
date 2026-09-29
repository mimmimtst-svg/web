/**
 * Set on <html> while the site menu (components/SiteMenu.tsx) is open.
 * Scroll-driven handlers (SectionPager, Promises' step-through reveal)
 * check it so a wheel/swipe/key press over the open menu can't turn a
 * page or reveal an item behind it.
 */
export const MENU_OPEN_ATTR = "data-menu-open";

export const isMenuOpen = () =>
  typeof document !== "undefined" && document.documentElement.hasAttribute(MENU_OPEN_ATTR);
