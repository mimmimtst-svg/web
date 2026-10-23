import type { Metadata } from "next";
import DevelopmentPlanPage from "@/components/DevelopmentPlanPage";

/** The 발전계획서 page under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "공약집 다운로드 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewDevelopmentPlanPage() {
  return <DevelopmentPlanPage />;
}
