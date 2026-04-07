import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export function Process() {
  const { t, lang } = useLanguage();
  const steps = t('process.steps') as { title: string; desc: string }[];
  const eyebrow = lang === 'fr' ? 'Comment Nous Travaillons' : 'How We Work';

  return (
    <section id="process" style={{ width: '100%', padding: '120px 24px', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'absolute', top: '50%', right: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,197,253,0.07) 0%, transparent 65%)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="pill-label" style={{ display: 'inline-flex', marginBottom: '24px' }}>{eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '16px' }}>
            {t('process.title')}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0', lineHeight: 1.7 }}>
            {t('process.desc')}
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', position: 'relative' }} className="process-grid">
          <div style={{ position: 'absolute', top: '28px', left: '12%', right: '12%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }} className="connector-line" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative', zIndex: 1, padding: '0 8px' }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', fontWeight: 800, color: '#93c5fd', marginBottom: '24px',
              }}>
                0{i + 1}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: '80px', textAlign: 'center', padding: '48px 40px', background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.12)', borderRadius: '20px' }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.6)', marginBottom: '14px' }}>
            {lang === 'fr' ? 'Prêt à Commencer ?' : 'Ready to Get Started?'}
          </div>
          <h3 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            {lang === 'fr'
              ? <>Votre projet mérite une<br /><span className="gradient-text">vraie stratégie.</span></>
              : <>Your project deserves a<br /><span className="gradient-text">real strategy.</span></>}
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', maxWidth: '420px', margin: '0 auto 28px', lineHeight: 1.7 }}>
            {lang === 'fr'
              ? "Réservez un appel de découverte gratuit de 30 minutes. Aucun engagement, que de la valeur."
              : "Book a free 30-minute discovery call. No commitment, just value."}
          </p>
          <a href="#contact" className="btn-violet" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', fontSize: '14px', fontWeight: 600, borderRadius: '10px', textDecoration: 'none' }}>
            {lang === 'fr' ? 'Réserver un Appel Gratuit' : 'Book a Free Call'} →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:768px){ 
          .process-grid { grid-template-columns: repeat(2,1fr) !important; }
          .connector-line { display: none; }
        }
        @media(max-width:480px){ .process-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
