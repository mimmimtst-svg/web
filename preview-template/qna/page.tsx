import type { Metadata } from "next";
import QnaPage from "@/components/QnaPage";

/** 후보자에게 묻는다 under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "후보자에게 묻는다 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewQnaPage() {
  return <QnaPage />;
}
