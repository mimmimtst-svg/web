import type { Metadata } from "next";
import SiteHome from "@/components/SiteHome";

/**
 * Unlisted preview of the full site while "/" shows the coming-soon page
 * (lib/siteMode.ts). This folder is a template, not a route: the GitHub
 * Pages workflow copies it to app/<secret path>/ at build time (this
 * file → the main page, profile/ → the profile, direction/ → P2-1,
 * plan/ → P2-2, press/ → the press page),
 * using the PREVIEW_SLUG repository secret, so the address never appears
 * in this public repository. Never indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function PreviewPage() {
  return <SiteHome />;
}
