import type { Metadata } from "next";
import CandidatePage from "@/components/CandidatePage";

/** 후보자 소개 under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "후보자 소개 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewProfilePage() {
  return <CandidatePage />;
}
