import type { Metadata, Viewport } from "next";
import "./globals.css";

// Link previews (KakaoTalk, Facebook, Slack …) use app/opengraph-image.png
// (1200×630: the hero's red, FINE-KU, the candidate's photo); the tab
// icon is app/icon.png + favicon.ico (FINE / KU on key red). Both are
// static files (2026-10-18). metadataBase makes the preview image's
// address absolute, as the scrapers need.
export const metadata: Metadata = {
  metadataBase: new URL("https://byunghyun.kr"),
  title: "유병현 | 고려대학교 제22대 총장 후보",
  description: "자유로운 지성, 시대를 여는 고대 — 고려대학교 제22대 총장 후보 유병현",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "유병현 | 고려대학교 제22대 총장 후보",
    title: "유병현 | 고려대학교 제22대 총장 후보",
    description: "FINE-KU, 자유로운 지성, 시대를 여는 고대",
  },
  twitter: { card: "summary_large_image" },
};

// Browser chrome tint (status bar / toolbars): white. The hero's red was
// tried there and looked worse (2026-10-01).
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        {/* Reveal starts hidden (opacity: 0) until IntersectionObserver
            fires; without JS that would never happen, so force it visible. */}
        <noscript>
          <style>{`.revealHidden{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
