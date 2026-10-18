import type { Metadata } from "next";
import PledgeOverview from "@/components/PledgeOverview";

/** P4-1 under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "주요 공약 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewPledgeOverviewPage() {
  return <PledgeOverview />;
}
