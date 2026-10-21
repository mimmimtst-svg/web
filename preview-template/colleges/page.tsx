import type { Metadata } from "next";
import CollegePlans from "@/components/CollegePlans";

/** 단과대별 발전계획 under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "단과대별 발전계획 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewCollegesPage() {
  return <CollegePlans />;
}
