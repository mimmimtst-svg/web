import type { Metadata } from "next";
import PlanDetail from "@/components/PlanDetail";
import ComingSoon from "@/components/ComingSoon";
import { SITE_PRIVATE } from "@/lib/siteMode";

// While the site is private this address shows the coming-soon page too;
// the real page lives under the unlisted preview address
// (preview-template/plan/page.tsx).
export const metadata: Metadata = SITE_PRIVATE
  ? { robots: { index: false, follow: false } }
  : { title: "나답게 · 다함께 · 더높게 | 유병현" };

export default function Page() {
  return SITE_PRIVATE ? <ComingSoon /> : <PlanDetail />;
}
