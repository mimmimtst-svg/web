/**
 * Asks SectionPager to glide to a page with its own page-turn animation,
 * so links (the header brand, etc.) move the page exactly like a scroll
 * gesture does instead of the browser's own `scroll-behavior` jump.
 */
export const GOTO_EVENT = "sectionpager:goto";

export function goToSection(id: string) {
  window.dispatchEvent(new CustomEvent<string>(GOTO_EVENT, { detail: id }));
}
