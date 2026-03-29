import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/sections/Process";
import { Footer } from "@/components/Footer";

export default function ProcessPage() {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Process />
      </main>
      <Footer />
    </div>
  );
}