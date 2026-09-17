import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DevelopmentPlan from "@/components/DevelopmentPlan";
import Promises from "@/components/Promises";
import PolicyCarousel from "@/components/PolicyCarousel";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DevelopmentPlan />
        <Promises />
        {/* PolicyCarousel renders its own <Footer /> as the last element
            inside its <section>, so Section 4 + footer share a single
            100dvh scroll-snap block instead of the footer being its own
            (unreachable) snap area. */}
        <PolicyCarousel />
      </main>
    </>
  );
}
