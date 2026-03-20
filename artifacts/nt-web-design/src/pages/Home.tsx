import React from 'react';
import { MatrixBackground } from '@/components/MatrixBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { StatsAndMarquee } from '@/components/sections/StatsAndMarquee';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { WhyUs } from '@/components/sections/WhyUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background stays at z-index 0 */}
      <MatrixBackground />
      
      {/* All content layers sit on top */}
      <Navbar />
      
      <main>
        <Hero />
        <StatsAndMarquee />
        <Services />
        <Process />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
