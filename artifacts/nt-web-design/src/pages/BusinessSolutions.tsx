import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ROICalculator } from "@/components/ROICalculator";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { ArrowRight, Zap } from "lucide-react";

/* ─── bilingual copy ──────────────────────────────────────── */
const copy = {
  hero: {
    badge:   { en: "Business Software",        fr: "Logiciels d'Affaires" },
    h1:      { en: "Scale Your Operations.\nStop Missing Leads.",
                fr: "Automatisez votre croissance.\nNe perdez plus un seul client." },
    sub:     { en: "The all-in-one AI engine built for Montreal's top contractors (HVAC, Roofing, Auto Detailing).",
                fr: "Le moteur IA tout-en-un conçu pour les meilleurs entrepreneurs de Montréal (CVAC, Toiture, Esthétique Automobile)." },
    cta:     { en: "Start 14-Day Free Trial",  fr: "Essai Gratuit (14 Jours)" },
    ctaSec:  { en: "Talk to a Strategist",     fr: "Parler à un conseiller" },
  },
  features: {
    eyebrow: { en: "Anti-Missed-Call System",  fr: "Système Anti-Appels-Manqués" },
    title:   { en: "Three Features That Pay for Themselves",
                fr: "Trois fonctionnalités qui se rentabilisent seules" },
    cards: [
      {
        emoji: "⚡",
        title: { en: "AI Text-Back",          fr: "Réponse SMS IA" },
        desc:  { en: "Miss a call? Our system texts them back in 60 seconds.",
                  fr: "Un appel manqué ? Notre système répond par SMS en 60 secondes." },
      },
      {
        emoji: "📅",
        title: { en: "Auto-Booking",          fr: "Prise de Rendez-vous" },
        desc:  { en: "The AI qualifies the lead and books your calendar.",
                  fr: "L'IA qualifie le client et l'ajoute à votre calendrier." },
      },
      {
        emoji: "⭐",
        title: { en: "Review Engine",         fr: "Moteur d'Avis Google" },
        desc:  { en: "Automated 5-star review requests after every job.",
                  fr: "Demandes d'avis automatisées après chaque contrat." },
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
    cta:     { en: "Claim Your Beta Setup",   fr: "Réclamez votre configuration Beta" },
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

  const TITLE_TAG =
    l === 'fr'
      ? "Logiciels d'Affaires — FieldOps Pro | NT Web Design"
      : "Business Software — FieldOps Pro | NT Web Design";
  const DESC_TAG =
    l === 'fr'
      ? "Le moteur IA tout-en-un pour les entrepreneurs de Montréal : SMS automatique, prise de rendez-vous IA, moteur d'avis Google."
      : "All-in-one AI engine for Montreal contractors: automated text-back, AI booking, and Google review automation.";

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
          {/* ══ HERO ══════════════════════════════════════════ */}
          <section style={{
            minHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '120px 24px 80px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle ring accent */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-55%)',
              width: '680px', height: '680px', borderRadius: '50%',
              border: '1px solid rgba(59,130,246,0.08)',
              pointerEvents: 'none',
            }} />

            <motion.div
              variants={fadeUp} initial="hidden" animate="show"
              transition={{ duration: 0.6, ease }}
              style={{ maxWidth: '860px' }}
            >
              {/* Badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                marginBottom: '22px',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#3b82f6',
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.22)',
                borderRadius: '20px', padding: '5px 16px',
              }}>
                <Zap size={11} /> {bi(copy.hero.badge, l)}
              </span>

              {/* H1 */}
              <h1 style={{
                fontSize: 'clamp(34px, 6.5vw, 68px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                margin: '0 0 24px',
                whiteSpace: 'pre-line',
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.78) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {bi(copy.hero.h1, l).split('\n')[0]}
                </span>
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 55%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {bi(copy.hero.h1, l).split('\n')[1]}
                </span>
              </h1>

              {/* Subheading */}
              <p style={{
                fontSize: 'clamp(15px, 2.4vw, 18px)',
                color: 'rgba(255,255,255,0.48)',
                maxWidth: '600px',
                margin: '0 auto 38px',
                lineHeight: 1.68,
              }}>
                {bi(copy.hero.sub, l)}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="#cta"
                  onClick={(e) => { e.preventDefault(); document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                    color: '#fff', fontWeight: 700, fontSize: '15px',
                    padding: '14px 28px', borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 28px rgba(59,130,246,0.4)',
                    transition: 'transform 0.18s, box-shadow 0.18s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(59,130,246,0.52)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,130,246,0.4)'; }}
                >
                  {bi(copy.hero.cta, l)} <ArrowRight size={15} />
                </a>
                <Link
                  href="/#contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.72)', fontWeight: 600, fontSize: '15px',
                    padding: '14px 28px', borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'background 0.18s, color 0.18s',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; }}
                >
                  {bi(copy.hero.ctaSec, l)}
                </Link>
              </div>
            </motion.div>
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

              {/* 3-card grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
                {copy.features.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.52, delay: i * 0.1, ease }}
                    style={{
                      padding: '36px 30px',
                      background: 'rgba(10,20,42,0.6)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(59,130,246,0.16)',
                      borderRadius: '20px',
                      boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 20px 48px rgba(0,0,0,0.28)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      transition: 'border-color 0.2s, transform 0.2s',
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
                  >
                    {/* Emoji icon */}
                    <div style={{
                      width: '52px', height: '52px',
                      borderRadius: '14px',
                      background: 'rgba(59,130,246,0.12)',
                      border: '1px solid rgba(59,130,246,0.22)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px',
                    }}>
                      {card.emoji}
                    </div>

                    <h3 style={{
                      fontSize: '18px', fontWeight: 700,
                      color: '#fff', margin: 0,
                      letterSpacing: '-0.015em',
                    }}>
                      {bi(card.title, l)}
                    </h3>

                    <p style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.68, margin: 0,
                    }}>
                      {bi(card.desc, l)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
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

              <Link
                href="/#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  padding: '16px 36px', borderRadius: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(59,130,246,0.42)',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 42px rgba(59,130,246,0.55)'; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.42)'; }}
              >
                {bi(copy.footer.cta, l)} <ArrowRight size={16} />
              </Link>

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
    </>
  );
}
