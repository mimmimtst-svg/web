import type { Metadata } from "next";
import CandidatePage from "@/components/CandidatePage";

/** The 후보자 소개 page in progress, only under the unlisted preview
    address (see ../page.tsx); the public /profile/ keeps ProfilePage. */
export const metadata: Metadata = {
  title: "후보자 소개 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewProfilePage() {
  return <CandidatePage />;
}
