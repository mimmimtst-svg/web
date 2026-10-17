import type { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage";

/** The profile page under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "유병현 고려대학교 총장 후보",
  robots: { index: false, follow: false },
};

export default function PreviewProfilePage() {
  return <ProfilePage />;
}
