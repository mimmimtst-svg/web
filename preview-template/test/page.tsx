import type { Metadata } from "next";
import SiteHome from "@/components/SiteHome";

/**
 * Design test page under the unlisted preview address (see ../page.tsx):
 * the main page with what is being tried out before it goes live —
 * 2026-11-10: the header's video link (영상으로 만나는 유병현 ↗) and a
 * smaller 후보자에게 묻는다 button.
 */
export const metadata: Metadata = {
  title: "디자인 테스트 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewTestPage() {
  return <SiteHome test />;
}
