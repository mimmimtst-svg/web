import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DevelopmentPlan from "@/components/DevelopmentPlan";
import Promises from "@/components/Promises";
import PolicyCarousel from "@/components/PolicyCarousel";
import SectionPager from "@/components/SectionPager";

/**
 * The full one-page site. Rendered at "/" when the site is public, and
 * always at the unlisted preview route (preview-template/page.tsx) so it
 * can be checked while "/" shows the coming-soon page (lib/siteMode.ts).
 */
export default function SiteHome() {
  return (
    <>
      <Header />
      <SectionPager />
      {/* Colour test (2026-10-29, Figma 837:3361 "1920w light"): with
          ?theme=light the page takes its light colours — set before the
          sections paint, so there is no flash of the regular colours.
          Layout and photos stay as they are. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            'if(/[?&]theme=light(&|$)/.test(location.search))document.documentElement.setAttribute("data-light","")',
        }}
      />
      <main>
        <Hero />
        {/* 2026-10-29: the six promises before the three plan cards
            (they were section 3, after the cards). */}
        <Promises />
        <DevelopmentPlan />
        {/* PolicyCarousel renders its own <Footer /> as the last element
            inside its <section>, so Section 4 + footer share a single
            one-screen snap block instead of the footer being its own
            (hard to land on) snap area. */}
        <PolicyCarousel />
      </main>
    </>
  );
}
