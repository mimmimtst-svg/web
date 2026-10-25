import type { Metadata } from "next";
import CandidatePage from "@/components/CandidatePage";
import ComingSoon from "@/components/ComingSoon";
import { SITE_PRIVATE } from "@/lib/siteMode";

// 후보자 소개 (CandidatePage, public since 2026-10-25 — before that only
// under the unlisted preview address). While the site is private this
// address shows the coming-soon page too.
export const metadata: Metadata = SITE_PRIVATE
  ? { robots: { index: false, follow: false } }
  : { title: "유병현 고려대학교 총장 후보" };

export default function Page() {
  return SITE_PRIVATE ? <ComingSoon /> : <CandidatePage />;
}
