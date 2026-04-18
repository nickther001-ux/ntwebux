import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ROICalculator } from "@/components/ROICalculator";
import { SoftwareIntakeModal } from "@/components/SoftwareIntakeModal";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight, Zap, MessageSquare, CalendarCheck, Star } from "lucide-react";

/* ─── bilingual copy ──────────────────────────────────────── */
const copy = {
  hero: {
    badge:   { en: "Business Software",        fr: "Logiciels d'Affaires" },
    h1:      { en: "Scale Your Operations.\nStop Missing Leads.",
                fr: "Automatisez votre croissance.\nNe perdez plus un seul client." },
    sub:     { en: "The borderless AI operating system designed to automate lead acquisition and scale service operations for the next generation of global contractors.",
                fr: "Le système d'exploitation IA sans frontières conçu pour automatiser l'acquisition de leads et propulser les opérations des entrepreneurs de nouvelle génération à l'échelle mondiale." },
    cta:     { en: "Let's Build Your Software", fr: "Construisons votre logiciel" },
    ctaSec:  { en: "Talk to a Strategist",     fr: "Parler à un conseiller" },
  },
  features: {
    eyebrow: { en: "Anti-Missed-Call System",  fr: "Système Anti-Appels-Manqués" },
    title:   { en: "Three Features That Pay for Themselves",
                fr: "Trois fonctionnalités qui se rentabilisent seules" },
    cards: [
      {
        spec:  { en: "01 / Conversational AI",  fr: "01 / IA Conversationnelle" },
        title: { en: "AI Text-Back",            fr: "Réponse SMS Intelligente" },
        desc:  { en: "Stop lead leakage. Our AI instantly detects missed calls and initiates a conversational SMS sequence. It qualifies the prospect's needs and keeps them engaged so they don't call your competitor.",
                  fr: "Stoppez la fuite de prospects. Notre IA détecte instantanément les appels manqués et déclenche une séquence SMS conversationnelle. Elle qualifie les besoins du client et le garde engagé pour qu'il n'appelle pas votre concurrent." },
      },
      {
        spec:  { en: "02 / Calendar Sync",      fr: "02 / Synchronisation Agenda" },
        title: { en: "Auto-Booking",            fr: "Prise de Rendez-vous Auto" },
        desc:  { en: "Direct calendar integration. Syncs with Google/Outlook to book qualified estimates in real-time, eliminating the back-and-forth.",
                  fr: "Intégration directe avec votre agenda. Se synchronise avec Google et Outlook pour réserver des estimations qualifiées en temps réel, en éliminant les allers-retours." },
      },
      {
        spec:  { en: "03 / Local SEO Engine",   fr: "03 / Moteur SEO Local" },
        title: { en: "Review Engine",           fr: "Moteur d'Avis Google" },
        desc:  { en: "Dominate local search. Automated SMS review requests are triggered the moment a job is completed, boosting your Google ranking and authority on autopilot.",
                  fr: "Dominez la recherche locale. Des demandes d'avis SMS sont déclenchées dès qu'un contrat est terminé, propulsant votre classement Google et votre autorité en pilote automatique." },
      },
    ],
  },
  calc: {
    heading: { en: "Calculate Your Lost Revenue",
                fr: "Calculez vos pertes de revenus" },
  },
  footer: {
    text:    { en: "Stop leaving money on the table. We set up your entire system in 72 hours.",
                fr: "Arrêtez de laisser de l'argent sur la table. Nous configurons votre système complet en 72 heures." },
    cta:     { en: "Let's Build Your Software", fr: "Construisons votre logiciel" },
  },
};

/* ─── helpers ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0 },
};
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type LangKey = 'en' | 'fr';
function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

/* ─── component ───────────────────────────────────────────── */
export default function BusinessSolutions() {
  const { lang } = useLanguage();
  const l = lang as LangKey;
  const [modalOpen, setModalOpen] = useState(false);

  const TITLE_TAG =
    l === 'fr'
      ? "Logiciels d'Affaires — FieldOps Pro | NT Web Design"
      : "Business Software — FieldOps Pro | NT Web Design";
  const DESC_TAG =
    l === 'fr'
      ? "Le système d'exploitation IA sans frontières pour les entrepreneurs internationaux : SMS automatique, prise de rendez-vous IA, moteur d'avis Google."
      : "The borderless AI operating system for global contractors: automated text-back, AI booking, and Google review automation.";

  return (
    <>
      <Helmet>
        <title>{TITLE_TAG}</title>
        <meta name="description" content={DESC_TAG} />
        <link rel="canonical" href="https://ntwebux.com/business" />
        <meta property="og:title"       content={TITLE_TAG} />
        <meta property="og:description" content={DESC_TAG} />
        <meta property="og:url"         content="https://ntwebux.com/business" />
        <meta property="og:site_name"   content="NT Web Design" />
        <meta property="og:image"       content="https://ntwebux.com/logo.png" />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />

        <main>
          {/* ══ HERO — Landio 4-layer composition ════════════════ */}
          {/* Layer 1: Dark canvas */}
          <section className="relative w-full overflow-hidden bg-[#0a0a0c] min-h-[80vh] flex flex-col items-center justify-center pt-32 pb-20 px-4">

            {/* Layer 2: Framer glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Layer 4: Glass top badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-blue-400 uppercase tracking-widest mb-8 backdrop-blur-sm z-10">
              <Zap className="w-4 h-4" />
              {bi(copy.hero.badge, l)}
            </div>

            {/* Layer 3: Hero typography */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-center leading-[1.1] z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                {bi(copy.hero.h1, l).split('\n')[0]}<br />
                {bi(copy.hero.h1, l).split('\n')[1]}
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-400 font-medium tracking-wide max-w-2xl text-center z-10">
              {bi(copy.hero.sub, l)}
            </p>

            {/* Buttons */}
            <div className="mt-10 z-10 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                {bi(copy.hero.cta, l)}
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="/#contact"
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm text-center"
              >
                {bi(copy.hero.ctaSec, l)}
              </a>
            </div>
          </section>

          {/* ══ ANTI-MISSED-CALL FEATURES ════════════════════ */}
          <section style={{ padding: '0 24px 96px' }}>
            <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
              <motion.div
                variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease }}
                style={{ textAlign: 'center', marginBottom: '52px' }}
              >
                <span style={{
                  display: 'inline-block', marginBottom: '12px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#3b82f6',
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.22)',
                  borderRadius: '20px', padding: '4px 14px',
                }}>
                  {bi(copy.features.eyebrow, l)}
                </span>
                <h2 style={{
                  fontSize: 'clamp(24px, 4vw, 40px)',
                  fontWeight: 800, letterSpacing: '-0.025em',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.72) 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  margin: 0,
                }}>
                  {bi(copy.features.title, l)}
                </h2>
              </motion.div>

              {/* Asymmetrical Bento Grid: 3-cols desktop, stacks on mobile */}
              <div className="bento-features-grid">
                {(() => {
                  const icons = [MessageSquare, CalendarCheck, Star];
                  const spans = [
                    { col: 'span 2', row: 'span 1' },  // AI Text-Back: wide top-left
                    { col: 'span 1', row: 'span 1' },  // Auto-Booking: small top-right
                    { col: 'span 3', row: 'span 1' },  // Review Engine: full-width bottom
                  ];
                  return copy.features.cards.map((card, i) => {
                    const Icon = icons[i];
                    return (
                      <motion.article
                        key={i}
                        variants={fadeUp} initial="hidden"
                        whileInView="show" viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.52, delay: i * 0.08, ease }}
                        whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
                        className="bento-feature-card"
                        style={{
                          gridColumn: spans[i].col,
                          gridRow: spans[i].row,
                        }}
                      >
                        {/* Tech-spec eyebrow */}
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'rgba(147,197,253,0.78)',
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        }}>
                          <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: '#3b82f6',
                            boxShadow: '0 0 8px rgba(59,130,246,0.7)',
                          }} />
                          {bi(card.spec, l)}
                        </div>

                        {/* Icon */}
                        <div style={{
                          width: '46px', height: '46px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.04) 100%)',
                          border: '1px solid rgba(59,130,246,0.24)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#93c5fd',
                        }}>
                          <Icon size={20} strokeWidth={1.6} />
                        </div>

                        <h3 style={{
                          fontSize: 'clamp(20px, 2.4vw, 26px)',
                          fontWeight: 700,
                          color: '#fff', margin: 0,
                          letterSpacing: '-0.03em',
                          lineHeight: 1.15,
                        }}>
                          {bi(card.title, l)}
                        </h3>

                        <p style={{
                          fontSize: '15px',
                          color: 'rgb(156,163,175)', /* text-gray-400 */
                          lineHeight: 1.7, margin: 0,
                          maxWidth: '62ch',
                        }}>
                          {bi(card.desc, l)}
                        </p>
                      </motion.article>
                    );
                  });
                })()}
              </div>
            </div>

            <style>{`
              .bento-features-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 18px;
              }
              @media (min-width: 820px) {
                .bento-features-grid {
                  grid-template-columns: repeat(3, 1fr);
                  gap: 22px;
                }
              }
              .bento-feature-card {
                position: relative;
                padding: 32px;
                background-color: rgba(255,255,255,0.02);
                background-image: radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px);
                background-size: 20px 20px;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                overflow: hidden;
                transition: border-color 0.25s ease, background-color 0.25s ease;
              }
              .bento-feature-card::before {
                content: '';
                position: absolute; inset: 0;
                border-radius: inherit;
                pointer-events: none;
                background: radial-gradient(120% 80% at 0% 0%, rgba(59,130,246,0.08), transparent 55%);
                opacity: 0;
                transition: opacity 0.3s ease;
              }
              .bento-feature-card:hover {
                border-color: rgba(255,255,255,0.18);
                background-color: rgba(255,255,255,0.035);
              }
              .bento-feature-card:hover::before { opacity: 1; }
              /* On mobile, stack — all cards full-width */
              @media (max-width: 819px) {
                .bento-feature-card {
                  grid-column: span 1 !important;
                  padding: 28px 24px;
                }
              }
            `}</style>
          </section>

          {/* ══ ROI CALCULATOR ═══════════════════════════════ */}
          <div style={{
            background: 'rgba(4,10,22,0.55)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ textAlign: 'center', padding: '72px 24px 0' }}>
              <motion.h2
                variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.52, ease }}
                style={{
                  fontSize: 'clamp(24px, 4vw, 38px)',
                  fontWeight: 800, letterSpacing: '-0.025em',
                  background: 'linear-gradient(135deg, #93c5fd 0%, #bfdbfe 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  margin: 0,
                }}
              >
                {bi(copy.calc.heading, l)}
              </motion.h2>
            </div>
            <ROICalculator />
          </div>

          {/* ══ FOOTER CTA ════════════════════════════════════ */}
          <section id="cta" style={{ padding: '100px 24px', textAlign: 'center' }}>
            <motion.div
              variants={fadeUp} initial="hidden"
              whileInView="show" viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease }}
              style={{
                maxWidth: '700px', margin: '0 auto',
                padding: 'clamp(40px, 8vw, 68px)',
                background: 'linear-gradient(135deg, rgba(29,78,216,0.22) 0%, rgba(59,130,246,0.07) 100%)',
                border: '1px solid rgba(59,130,246,0.24)',
                borderRadius: '28px',
                boxShadow: '0 0 80px rgba(59,130,246,0.1)',
              }}
            >
              <span style={{
                display: 'inline-block', marginBottom: '16px',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#3b82f6',
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: '20px', padding: '4px 14px',
              }}>
                {l === 'fr' ? 'Configuration en 72 heures' : '72-Hour Setup'}
              </span>

              <p style={{
                fontSize: 'clamp(17px, 3vw, 22px)',
                fontWeight: 600, color: 'rgba(255,255,255,0.88)',
                margin: '0 0 36px',
                lineHeight: 1.55,
              }}>
                {bi(copy.footer.text, l)}
              </p>

              <button
                onClick={() => setModalOpen(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  padding: '16px 36px', borderRadius: '14px',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(59,130,246,0.42)',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 42px rgba(59,130,246,0.55)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.42)'; }}
              >
                {bi(copy.footer.cta, l)} <ArrowRight size={16} />
              </button>

              <p style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.22)' }}>
                {l === 'fr'
                  ? 'Des questions ? Écrivez-nous à '
                  : 'Questions? Email us at '}
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>info@ntwebux.com</span>
                {l === 'fr' ? ' ou appelez ' : ' or call '}
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>(438) 806-7640</span>
              </p>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>

      <SoftwareIntakeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
