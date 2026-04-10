import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Globe, Wrench, Package, Building2, Bot, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { OnboardingModal } from '@/components/OnboardingModal';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const WORK_IMAGES: Record<string, string> = {
  'Tremblay Excavation Inc.':   `${BASE}/portfolio/proj-construction.png`,
  'Excavation Tremblay Inc.':   `${BASE}/portfolio/proj-construction.png`,
  'Physio Optimal':             `${BASE}/portfolio/proj-medical.png`,
  "Saveurs d'Haïti MTL":       `${BASE}/portfolio/proj-restaurant.png`,
};

const PLAN_ICONS = [Globe, Wrench, Package, Building2, Bot];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ServicesPortfolio() {
  const { t, lang } = useLanguage();
  const [activePlan, setActivePlan] = useState<{ name: string; price: string | number } | null>(null);
  const svc   = t('portfolio.services') as any;
  const work  = t('portfolio.work')     as any;
  const plans: any[] = svc.plans;
  const items: any[] = work.items;

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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }} className="pricing-grid">
            {plans.map((plan, i) => {
              const Icon = PLAN_ICONS[i];
              return (
                <motion.div
                  key={plan.name}
                  {...fadeUp(i * 0.08)}
                  className="glass"
                  style={{
                    borderRadius: '18px',
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    border: plan.featured
                      ? '1px solid rgba(59,130,246,0.45)'
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: plan.featured
                      ? '0 0 0 1px rgba(59,130,246,0.15), 0 24px 64px rgba(59,130,246,0.12)'
                      : 'none',
                  }}
                >
                  {/* Top glow for featured */}
                  {plan.featured && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                  )}

                  {plan.badge && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#3b82f6', color: '#fff', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '99px' }}>
                      {plan.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', marginBottom: '18px' }}>
                    <Icon size={19} strokeWidth={1.5} />
                  </div>

                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>{plan.name}</div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '4px' }}>
                    {plan.price !== '—' && <span style={{ fontSize: '20px', fontWeight: 700, color: '#93c5fd' }}>$</span>}
                    <span style={{ fontSize: '42px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{plan.price}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' }}>{plan.cycle}</div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {plan.features.map((f: string) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                        <Check size={13} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Action buttons */}
                  <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="/#contact"
                      className="btn-outline"
                      style={{ padding: '12px 16px', fontSize: '13px', borderRadius: '10px', textDecoration: 'none', textAlign: 'center' }}
                    >
                      {plan.ctaContact}
                    </a>
                    <button
                      onClick={() => setActivePlan({ name: plan.name, price: plan.price })}
                      className="btn-violet"
                      style={{ padding: '12px 16px', fontSize: '13px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                    >
                      <MessageCircle size={14} />
                      {plan.ctaBuy}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
        @media(max-width:960px){
          .pricing-grid { grid-template-columns: repeat(2,1fr) !important; }
          .work-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width:600px){
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Onboarding intake modal */}
      <OnboardingModal
        plan={activePlan}
        onClose={() => setActivePlan(null)}
      />
    </div>
    </>
  );
}
