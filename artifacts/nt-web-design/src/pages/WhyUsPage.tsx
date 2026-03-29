import { Navbar } from "@/components/Navbar";
import { WhyUs } from "@/components/sections/WhyUs";
import { Footer } from "@/components/Footer";

export default function WhyUsPage() {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <main className="pt-20">
        <WhyUs />
      </main>
      <Footer />
    </div>
  );
}