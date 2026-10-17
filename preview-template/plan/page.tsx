import type { Metadata } from "next";
import PlanDetail from "@/components/PlanDetail";

/** The P2-1 detail page under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "나답게 · 다함께 · 더높게 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewPlanPage() {
  return <PlanDetail />;
}
