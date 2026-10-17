import type { Metadata } from "next";
import PressPage from "@/components/PressPage";

/** The press page under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "언론 보도 자료 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewPressPage() {
  return <PressPage />;
}
