import type { Metadata } from "next";
import DevelopmentPlanPage from "@/components/DevelopmentPlanPage";

/** The English summary's download page under the unlisted preview address
    (see ../page.tsx). */
export const metadata: Metadata = {
  title: "Development Plan Download | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewDevelopmentPlanEnPage() {
  return <DevelopmentPlanPage lang="en" />;
}
