import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export function Testimonials() {
  const { t, lang } = useLanguage();
  const items = t('testimonials.items') as { quote: string; name: string; role: string }[];
  const eyebrow = lang === 'fr' ? 'Témoignages' : 'Testimonials';
  const heading = lang === 'fr' ? <>Ne nous croyez pas<br /><span className="gradient-text">sur parole.</span></> : <>Don't just take<br /><span className="gradient-text">our word for it.</span></>;

  return (
    <section style={{ padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>{eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '16px' }}>
            {heading}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="testimonials-grid">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="glass glass-hover"
              style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px', cursor: 'default' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#93c5fd">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>

              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, flex: 1 }}>
                "{item.quote}"
              </p>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginTop: '3px' }}>{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .testimonials-grid { grid-template-columns: 1fr !important; } }
        @media(max-width:600px){ .testimonials-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
