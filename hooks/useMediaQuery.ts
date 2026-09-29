"use client";

import { useSyncExternalStore } from "react";

/** The mobile layout (Figma 629:7979) applies to any portrait screen. */
export const PORTRAIT = "(orientation: portrait)";

/** Live `matchMedia(query).matches`; false during SSR. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
