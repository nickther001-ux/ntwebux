import { CompetitorComparison } from "@/components/sections/CompetitorComparison";
import { AnimatedWhyUs } from "@/components/sections/AnimatedWhyUs";
import { ScrollLinkedColumns } from "@/components/sections/ScrollLinkedColumns";
import { Testimonials } from "@/components/sections/Testimonials";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { TwoPathSection } from "@/components/sections/TwoPathSection";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { FounderSection } from "@/components/sections/FounderSection";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { RevealSection } from "@/components/RevealSection";
import { CursorGlow } from "@/components/CursorGlow";
import { OnboardingModal } from "@/components/OnboardingModal";
import { ScrollTilt } from "@/components/ScrollTilt";

const TITLE = "NT Web Design";
const DESC  = "Premium web design and AI-driven solutions delivered in exactly 72 hours. Specializing in high-performance websites and SaaS for startups in Canada & USA. 100% code ownership.";
const URL   = "https://ntwebux.com/";
const IMG   = "https://ntwebux.com/logo.png?v=2";

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
  const { lang } = useLanguage();
  const [activePlan, setActivePlan] = useState<{ name: string; price: string | number } | null>(null);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <script type="application/ld+json">{SCHEMA}</script>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={IMG} />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="NT Web Design" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={IMG} />
      </Helmet>

      <div className="relative w-full min-h-screen bg-[#030712] text-zinc-50">
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero onStart={() => setActivePlan({ name: 'Custom Project', price: 'Custom' })} />

          <ScrollTilt>
            <RevealSection variant="fadeIn">
              <TrustBar />
            </RevealSection>
          </ScrollTilt>

          <ScrollTilt>
            <RevealSection variant="fadeUp" delay={0.05}>
              <TwoPathSection />
            </RevealSection>
          </ScrollTilt>

          <RevealSection variant="fadeUp" delay={0.05}>
            <Services />
          </RevealSection>

          <Process />

          <RevealSection variant="scale">
            <ScrollLinkedColumns />
          </RevealSection>

          <RevealSection variant="slideRight">
            <AnimatedWhyUs />
          </RevealSection>

          <RevealSection variant="fadeUp">
            <Testimonials />
          </RevealSection>

          <RevealSection variant="scale" delay={0.05}>
            <CompetitorComparison />
          </RevealSection>

          <RevealSection variant="fadeUp">
            <Contact />
          </RevealSection>

          <RevealSection variant="fadeUp" delay={0.1}>
            <FounderSection />
          </RevealSection>

        </main>
        <Footer />
      </div>

      <OnboardingModal plan={activePlan} onClose={() => setActivePlan(null)} />
    </>
  );
}
