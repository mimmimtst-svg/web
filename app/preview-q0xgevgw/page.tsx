import type { Metadata } from "next";
import SiteHome from "@/components/SiteHome";

// Unlisted preview of the full site (lib/siteMode.ts) — never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function PreviewPage() {
  return <SiteHome />;
}
