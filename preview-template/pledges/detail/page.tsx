import type { Metadata } from "next";
import PledgeDetail from "@/components/PledgeDetail";

/** P4-2 under the unlisted preview address (see ../../page.tsx). */
export const metadata: Metadata = {
  title: "주요 공약 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewPledgeDetailPage() {
  return <PledgeDetail />;
}
