import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Check } from 'lucide-react';

export function WhyUs() {
  const { t, lang } = useLanguage();
  const pills = t('whyUs.pills') as { title: string; desc: string }[];
  const eyebrow = lang === 'fr' ? 'Pourquoi Nous' : 'Why Choose Us';

  return (
    <section id="why-us" style={{ padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', position: 'relative' }} className="whyus-grid">
        {/* Left */}
        <div>
          <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>{eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '16px', marginBottom: '20px' }}>
            {t('whyUs.title')} <span className="gradient-text">{lang === 'fr' ? 'Différemment.' : 'Differently.'}</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '48px', maxWidth: '400px' }}>
            {lang === 'fr'
              ? "Nous ne sommes pas une agence typique. Nous sommes vos partenaires de croissance digitale."
              : "We're not a typical agency. We're your digital growth partners, obsessed with results."}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pills.map((pill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass glass-hover"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '18px 20px', borderRadius: '12px', cursor: 'default' }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <Check size={14} color="#6ee7b7" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{pill.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{pill.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — decorative stat card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="whyus-visual"
        >
          <div className="glass" style={{ borderRadius: '24px', padding: '48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontSize: '80px', fontWeight: 900, background: 'linear-gradient(135deg,#6ee7b7,#bef264)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '12px' }}>100%</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{lang === 'fr' ? 'Sur Mesure' : 'Custom Built'}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '260px', margin: '0 auto' }}>
              {lang === 'fr' ? 'Aucun template préfabriqué. Chaque projet est unique.' : 'No templates. No cookie-cutter. Every project is built from scratch.'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '36px' }}>
              {[
                { n: '200+', l: lang === 'fr' ? 'Projets' : 'Projects' },
                { n: '98%', l: lang === 'fr' ? 'Satisfaction' : 'Satisfaction' },
                { n: '14d', l: lang === 'fr' ? 'Délai' : 'Turnaround' },
                { n: '5★', l: lang === 'fr' ? 'Notes' : 'Rating' },
              ].map(({ n, l }) => (
                <div key={n} style={{ padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#6ee7b7' }}>{n}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:900px){ .whyus-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        @media(max-width:900px){ .whyus-visual { display: none; } }
      `}</style>
    </section>
  );
}
