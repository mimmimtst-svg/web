import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DevelopmentPlan from "@/components/DevelopmentPlan";
import Promises from "@/components/Promises";
import PolicyCarousel from "@/components/PolicyCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DevelopmentPlan />
        <Promises />
        <PolicyCarousel />
      </main>
      <Footer />
    </>
  );
}
