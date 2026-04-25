import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Globe, Layers, Crown, Sparkles, Cpu, Rocket, ArrowRight, Check } from 'lucide-react';
import { OnboardingModal } from '@/components/OnboardingModal';
import { LetsTalkModal } from '@/components/LetsTalkModal';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const WORK_IMAGES: Record<string, string> = {
  'Tremblay Excavation Inc.':   `${BASE}/portfolio/proj-construction.webp`,
  'Excavation Tremblay Inc.':   `${BASE}/portfolio/proj-construction.webp`,
  'Physio Optimal':             `${BASE}/portfolio/proj-medical.webp`,
  "Saveurs d'Haïti MTL":       `${BASE}/portfolio/proj-restaurant.webp`,
};

const WEB_ICONS = [Layers, Sparkles, Crown];
const AI_ICONS  = [Cpu,    Rocket,    Crown];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ServicesPortfolio() {
  const { t, lang } = useLanguage();
  const [activePlan, setActivePlan] = useState<{ name: string; price: string | number; isSaas?: boolean } | null>(null);
  const [letsTalkOpen, setLetsTalkOpen] = useState(false);
  const [track, setTrack] = useState<'web' | 'ai'>('ai');
  const svc   = t('portfolio.services') as any;
  const work  = t('portfolio.work')     as any;
  const webPlans: any[] = svc.webPlans ?? [];
  const aiPlans:  any[] = svc.aiPlans  ?? [];
  const plans = track === 'web' ? webPlans : aiPlans;
  const ICONS = track === 'web' ? WEB_ICONS : AI_ICONS;
  const items: any[] = work.items;
  const popularLabel = lang === 'fr' ? 'Le plus populaire' : 'Most Popular';
  const isAi = track === 'ai';

  const PT = "Project Showcase | NT Digital Group | SaaS & AI Engineering";
  const PD = "Explore our latest case studies, from custom AI integrations to scalable software architectures. See how we deliver elite digital infrastructure at speed.";
  const PU = "https://ntwebux.com/portfolio";
  const PI = "https://ntwebux.com/logo.png";

  return (
    <>
      <Helmet>
        <title>{PT}</title>
        <meta name="description" content={PD} />
        <link rel="canonical" href={PU} />

        {/* OpenGraph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={PU} />
        <meta property="og:title"       content={PT} />
        <meta property="og:description" content={PD} />
        <meta property="og:image"       content={PI} />
        <meta property="og:locale"      content="en_CA" />
        <meta property="og:site_name"   content="NT Digital Group" />

        {/* Twitter / X */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={PT} />
        <meta name="twitter:description" content={PD} />
        <meta name="twitter:image"       content={PI} />
      </Helmet>

    <div style={{ minHeight: '100vh', color: '#ffffff', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: '160px 24px 80px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse at 50% 10%, rgba(59,130,246,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <motion.div {...fadeUp(0)} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
          <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>
            {lang === 'fr' ? 'Services & Tarifs' : 'Services & Pricing'}
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '16px', marginBottom: '20px' }}>
            {svc.title1}<br />
            <span className="gradient-text">{svc.title2}</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{svc.desc}</p>
        </motion.div>
      </section>

      {/* ── PRICING PLANS ── */}
      <section style={{ padding: '0 24px 140px', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Track toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '56px' }}>
            <div
              role="tablist"
              aria-label={lang === 'fr' ? 'Type de tarification' : 'Pricing track'}
              style={{
                display: 'inline-flex',
                padding: '5px',
                gap: '4px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
              className="pricing-toggle"
            >
              {(['web', 'ai'] as const).map((opt) => {
                const active = track === opt;
                return (
                  <button
                    key={opt}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTrack(opt)}
                    style={{
                      padding: '11px 22px',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      borderRadius: '999px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.55)',
                      background: active ? '#3b82f6' : 'transparent',
                      boxShadow: active ? '0 6px 24px rgba(59,130,246,0.35)' : 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {svc.toggle?.[opt]}
                  </button>
                );
              })}
            </div>
          </div>

          {track === 'web' && (
            <div style={{ textAlign: 'center', marginBottom: '48px', padding: '28px 32px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '16px' }}>
              <div style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                {lang === 'fr'
                  ? 'On vous dit exactement combien de temps prendra votre projet — avant de commencer.'
                  : 'We tell you exactly how long your build will take — before we start.'}
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
                {lang === 'fr'
                  ? "Pas de délais vagues. Pas de retards. Chaque projet reçoit une fenêtre de livraison claire basée sur sa complexité, confirmée avant le début des travaux."
                  : "No vague timelines. No missed deadlines. Every project gets a clear delivery window based on its complexity, confirmed before work begins."}
              </div>
            </div>
          )}

          <div
            key={track}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'stretch' }}
            className="pricing-grid"
          >
            {plans.map((plan, i) => {
              const Icon = ICONS[i] ?? Globe;
              const featured = !!plan.featured;
              const isCustom = !!plan.isCustom;
              return (
                <motion.div
                  key={`${track}-${plan.name}`}
                  {...fadeUp(i * 0.08)}
                  className="glass"
                  style={{
                    borderRadius: '20px',
                    padding: '36px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    border: featured
                      ? '1px solid rgba(59,130,246,0.5)'
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: featured
                      ? '0 0 0 1px rgba(59,130,246,0.2), 0 28px 80px rgba(59,130,246,0.18)'
                      : 'none',
                    transform: featured ? 'translateY(-8px)' : 'none',
                    background: featured ? 'rgba(59,130,246,0.04)' : undefined,
                  }}
                >
                  {featured && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                  )}

                  {plan.badge && (
                    <div style={{ position: 'absolute', top: '18px', right: '18px', background: '#3b82f6', color: '#fff', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 11px', borderRadius: '99px', boxShadow: '0 4px 12px rgba(59,130,246,0.4)' }}>
                      {plan.badge ?? popularLabel}
                    </div>
                  )}

                  <div style={{ width: '44px', height: '44px', borderRadius: '11px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', marginBottom: '20px' }}>
                    <Icon size={20} strokeWidth={1.6} />
                  </div>

                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: '8px' }}>{plan.name}</div>
                  {!isAi && (plan as any).delivery && (
                    <div style={{ fontSize: '11px', color: '#67e8f9', fontWeight: 500, marginBottom: '10px', opacity: 0.85 }}>
                      ⏱ {(plan as any).delivery}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    {!isCustom && <span style={{ fontSize: '22px', fontWeight: 700, color: '#93c5fd', lineHeight: 1 }}>$</span>}
                    <span style={{ fontSize: isCustom ? '34px' : '46px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>{plan.price}</span>
                    {isAi && !isCustom && (
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginLeft: '2px' }}>/mo</span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: (plan as any).note ? '10px' : '26px', minHeight: '16px' }}>
                    {isAi ? '' : plan.cycle}
                  </div>
                  {(plan as any).note && (
                    <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', marginBottom: '20px', lineHeight: 1.5 }}>
                      {(plan as any).note}
                    </div>
                  )}

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {plan.features.map((f: string) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                        <Check size={14} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: '32px' }}>
                    <button
                      onClick={() => {
                        if (isAi && plan.name === 'Full Scope') {
                          setLetsTalkOpen(true);
                        } else {
                          setActivePlan({ name: plan.name, price: plan.price, isSaas: isAi });
                        }
                      }}
                      className={featured ? 'btn-violet' : 'btn-outline'}
                      style={{
                        padding: '13px 18px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        borderRadius: '11px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        border: featured ? 'none' : undefined,
                      }}
                    >
                      {plan.cta}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {track === 'web' && (
            <div style={{ marginTop: '52px' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(59,130,246,0.08)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textAlign: 'left' }}>
                        {lang === 'fr' ? 'Type de projet' : 'Project type'}
                      </th>
                      <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textAlign: 'left' }}>
                        {lang === 'fr' ? 'Délai moyen' : 'Typical delivery'}
                      </th>
                      <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textAlign: 'left' }}>
                        {lang === 'fr' ? 'À partir de' : 'Starting at'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(lang === 'fr' ? [
                      { type: 'Starter — site 5 pages', delivery: '2–3 jours ouvrables', price: '997 $' },
                      { type: "Croissance — jusqu'à 10 pages + CMS", delivery: '4–6 jours ouvrables', price: '2 497 $' },
                      { type: 'Entreprise — application web sur mesure', delivery: 'Selon la portée', price: 'Sur mesure' },
                    ] : [
                      { type: 'Starter — 5-page site', delivery: '2–3 business days', price: '$997' },
                      { type: 'Growth — up to 10 pages + CMS', delivery: '4–6 business days', price: '$2,497' },
                      { type: 'Enterprise — custom web app', delivery: 'Scoped per project', price: 'Custom' },
                    ]).map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{row.type}</td>
                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: '#67e8f9', fontWeight: 600 }}>{row.delivery}</td>
                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: '#93c5fd', fontWeight: 700 }}>{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PORTFOLIO / WORK ── */}
      <section style={{ padding: '0 24px 140px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', padding: '80px 0 60px' }}>
            <span className="pill-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>{work.eyebrow}</span>
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '14px', marginBottom: '16px' }}>
              {work.title1} <span className="gradient-text">{work.title2}</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>{work.desc}</p>
          </motion.div>

          {/* Work items with image previews */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px' }} className="work-grid">
            {items.map((item, i) => {
              const previewImg = WORK_IMAGES[item.title];
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp(i * 0.1)}
                  className="glass glass-hover"
                  style={{ borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
                >
                  {/* Portfolio image */}
                  <div style={{ position: 'relative', height: i === 0 ? '220px' : '160px', overflow: 'hidden', flexShrink: 0 }}>
                    {previewImg ? (
                      <>
                        <img
                          src={previewImg}
                          alt={item.title}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                        />
                        {/* Cover browser chrome + page header (Framer branding area) */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '56px', background: '#02040a', zIndex: 2 }} />
                        {/* Smooth fade-in from top cover to content */}
                        <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, height: '20px', background: 'linear-gradient(to bottom, #02040a, transparent)', zIndex: 2 }} />
                        {/* Blur any watermark at bottom */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', background: 'rgba(2,4,10,0.65)', zIndex: 2 }} />
                      </>
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(30,58,138,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Globe size={40} color="rgba(59,130,246,0.3)" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60a5fa' }}>{item.tag}</span>
                    <h3 style={{ fontSize: i === 0 ? '20px' : '17px', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>{item.title}</h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0, flex: 1 }}>{item.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <a href="/#contact" style={{ fontSize: '12px', fontWeight: 600, color: '#60a5fa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {lang === 'fr' ? 'Projet similaire' : 'Similar project'} <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div {...fadeUp(0.2)} style={{ textAlign: 'center', marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.55)' }}>{work.ctaText}</p>
            <a href="/#contact" className="btn-violet" style={{ padding: '16px 32px', fontSize: '15px', textDecoration: 'none', gap: '8px', borderRadius: '12px' }}>
              {work.ctaBtn} <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media(max-width:900px){
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-grid > div { transform: none !important; }
          .work-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width:520px){
          .pricing-toggle button { padding: 10px 14px !important; font-size: 12px !important; }
        }
      `}</style>

      {/* Onboarding intake modal */}
      <OnboardingModal
        plan={activePlan}
        onClose={() => setActivePlan(null)}
      />

      {/* Full Scope contact modal */}
      <LetsTalkModal
        open={letsTalkOpen}
        onClose={() => setLetsTalkOpen(false)}
      />
    </div>
    </>
  );
}
