import type { Metadata } from "next";
import DirectionPage from "@/components/DirectionPage";

/** The P2-1 발전 방향 page under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "발전 방향 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewDirectionPage() {
  return <DirectionPage />;
}
