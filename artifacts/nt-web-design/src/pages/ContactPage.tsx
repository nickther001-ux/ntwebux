import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}