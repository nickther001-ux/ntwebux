import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import { ArrowRight } from "lucide-react";

const TITLE = "Portfolio — NT Web Design";
const DESC  = "Explore our work: bilingual websites, SaaS platforms, e-commerce stores, and AI-powered applications built for high-performance businesses.";
const URL   = "https://ntwebux.com/portfolio";
const IMG   = "https://ntwebux.com/logo.png?v=2";

const DEFAULT_PLAN = { name: "New Project", price: "500" };

export default function PortfolioPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={URL} />
        <meta property="og:title"       content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image"       content={IMG} />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={IMG} />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />
        <main style={{ paddingTop: "80px" }}>
          <Portfolio />
          <Contact />

          {/* ── Start My Project CTA ── */}
          <section style={{ padding: '80px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60a5fa' }}>Ready to build yours?</p>
              <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                Let's build your project
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>
                Bilingual, fast, and built to convert. Most sites go live in 72 hours.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-violet"
                style={{ padding: '14px 32px', fontSize: '15px', fontWeight: 700, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                Start My Project <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      <OnboardingModal plan={modalOpen ? DEFAULT_PLAN : null} onClose={() => setModalOpen(false)} />
    </>
  );
}
