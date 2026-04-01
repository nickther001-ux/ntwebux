import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export function Process() {
  const { t, lang } = useLanguage();
  const steps = t('process.steps') as { title: string; desc: string }[];
  const eyebrow = lang === 'fr' ? 'Comment Nous Travaillons' : 'How We Work';

  return (
    <section id="process" style={{ padding: '120px 24px', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', right: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,70,239,0.07) 0%, transparent 65%)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />

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
          {/* Connector line */}
          <div style={{ position: 'absolute', top: '28px', left: '12%', right: '12%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)' }} className="connector-line" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ position: 'relative', zIndex: 1, padding: '0 8px' }}
            >
              {/* Number circle */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                color: '#a78bfa',
                marginBottom: '24px',
              }}>
                0{i + 1}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
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
