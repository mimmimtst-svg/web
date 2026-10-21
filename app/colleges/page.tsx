import type { Metadata } from "next";
import CollegePlans from "@/components/CollegePlans";
import ComingSoon from "@/components/ComingSoon";
import { SITE_PRIVATE } from "@/lib/siteMode";

// While the site is private this address shows the coming-soon page too;
// the real page lives under the unlisted preview address
// (preview-template/colleges/page.tsx).
export const metadata: Metadata = SITE_PRIVATE
  ? { robots: { index: false, follow: false } }
  : { title: "단과대별 발전계획 | 유병현" };

export default function Page() {
  return SITE_PRIVATE ? <ComingSoon /> : <CollegePlans />;
}
