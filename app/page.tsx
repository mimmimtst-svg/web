import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DevelopmentPlan from "@/components/DevelopmentPlan";
import Promises from "@/components/Promises";
import PolicyCarousel from "@/components/PolicyCarousel";
import SectionPager from "@/components/SectionPager";

export default function Home() {
  return (
    <>
      <Header />
      <SectionPager />
      <main>
        <Hero />
        <DevelopmentPlan />
        <Promises />
        {/* PolicyCarousel renders its own <Footer /> as the last element
            inside its <section>, so Section 4 + footer share a single
            one-screen snap block instead of the footer being its own
            (hard to land on) snap area. */}
        <PolicyCarousel />
      </main>
    </>
  );
}
