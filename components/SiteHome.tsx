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
