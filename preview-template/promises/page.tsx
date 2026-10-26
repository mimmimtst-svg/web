import type { Metadata } from "next";
import PromisePage from "@/components/PromisePage";

/** 여섯 가지 약속 under the unlisted preview address (see ../page.tsx). */
export const metadata: Metadata = {
  title: "여섯 가지 약속 | 유병현",
  robots: { index: false, follow: false },
};

export default function PreviewPromisePage() {
  return <PromisePage />;
}
