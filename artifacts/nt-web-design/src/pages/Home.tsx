import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { FounderSection } from "@/components/sections/FounderSection";
import { Footer } from "@/components/Footer";
import { ROICalculator } from "@/components/ROICalculator";
import { ActiveDeployments } from "@/components/sections/ActiveDeployments";
import { OnboardingModal } from "@/components/OnboardingModal";

const TITLE = "NT Web Design";
const DESC  = "Premium web design and AI-driven solutions delivered in exactly 72 hours. Specializing in high-performance websites and SaaS for startups in Canada & USA. 100% code ownership.";
const URL   = "https://ntwebux.com/";
const IMG   = "https://ntwebux.com/logo.png";

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "NT Web Design",
  "url": "https://ntwebux.com/",
  "description": DESC,
  "publisher": {
    "@type": "LocalBusiness",
    "name": "NT Web Design",
    "url": "https://ntwebux.com/",
    "logo": "https://ntwebux.com/logo.png",
    "email": "info@ntwebux.com",
    "telephone": "+14388067640",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montréal",
      "addressRegion": "QC",
      "addressCountry": "CA"
    }
  }
});

export default function Home() {
  const [activePlan, setActivePlan] = useState<{ name: string; price: string | number } | null>(null);
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />

        {/* WebSite structured data — tells Google the official site name */}
        <script type="application/ld+json">{SCHEMA}</script>

        {/* OpenGraph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={URL} />
        <meta property="og:title"       content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image"       content={IMG} />
        <meta property="og:locale"      content="en_CA" />
        <meta property="og:site_name"   content="NT Web Design" />

        {/* Twitter / X */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={IMG} />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />
        <main>
          <Hero onStart={() => setActivePlan({ name: 'Custom Project', price: 'Custom' })} />
          <TrustBar />
          <Stats />
          <Services />
          <ActiveDeployments />
          <ROICalculator />
          <Portfolio />
          <Process />
          <WhyUs />
          <Testimonials />
          <Contact />
          <FounderSection />
        </main>
        <Footer />
      </div>

      <OnboardingModal plan={activePlan} onClose={() => setActivePlan(null)} />
    </>
  );
}
