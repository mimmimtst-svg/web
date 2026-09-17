import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "유병현 | 고려대학교 제22대 총장 후보",
  description: "자유로운 지성, 시대를 여는 고대 — 고려대학교 제22대 총장 후보 유병현",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
