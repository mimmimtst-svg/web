import type { Metadata } from "next";
import SiteHome from "@/components/SiteHome";
import ComingSoon from "@/components/ComingSoon";
import { SITE_PRIVATE } from "@/lib/siteMode";

// Keep the placeholder out of search results while the site is private.
export const metadata: Metadata = SITE_PRIVATE ? { robots: { index: false, follow: false } } : {};

export default function Page() {
  return SITE_PRIVATE ? <ComingSoon /> : <SiteHome />;
}
