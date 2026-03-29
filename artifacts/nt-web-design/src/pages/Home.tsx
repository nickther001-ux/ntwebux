import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatsAndMarquee } from "@/components/sections/StatsAndMarquee";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <StatsAndMarquee />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
