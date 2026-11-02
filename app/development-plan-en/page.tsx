import type { Metadata } from "next";
import DevelopmentPlanPage from "@/components/DevelopmentPlanPage";
import ComingSoon from "@/components/ComingSoon";
import { SITE_PRIVATE } from "@/lib/siteMode";

// The English summary's download page (2026-11-02). While the site is
// private this address shows the coming-soon page too; the real page
// lives under the unlisted preview address
// (preview-template/development-plan-en/page.tsx).
export const metadata: Metadata = SITE_PRIVATE
  ? { robots: { index: false, follow: false } }
  : { title: "Development Plan Download | 유병현" };

export default function Page() {
  return SITE_PRIVATE ? <ComingSoon /> : <DevelopmentPlanPage lang="en" />;
}
