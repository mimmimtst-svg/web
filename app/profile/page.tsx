import type { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage";
import ComingSoon from "@/components/ComingSoon";
import { SITE_PRIVATE } from "@/lib/siteMode";

// While the site is private this address shows the coming-soon page too;
// the real page lives under the unlisted preview address
// (preview-template/profile/page.tsx).
export const metadata: Metadata = SITE_PRIVATE
  ? { robots: { index: false, follow: false } }
  : { title: "유병현 고려대학교 총장 후보" };

export default function Page() {
  return SITE_PRIVATE ? <ComingSoon /> : <ProfilePage />;
}
