import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function Stats() {
  const { lang } = useLanguage();

  const items = lang === 'fr'
    ? [
        { v: '200+', l: 'Sites Livrés' },
        { v: '14 Jours', l: 'Délai Moyen' },
        { v: '98%', l: 'Satisfaction Client' },
        { v: '5★', l: 'Note Moyenne' },
      ]
    : [
        { v: '200+', l: 'Websites Delivered' },
        { v: '14 Days', l: 'Avg. Turnaround' },
        { v: '98%', l: 'Client Satisfaction' },
        { v: '5★', l: 'Average Rating' },
      ];

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stats-grid">
        {items.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            style={{
              padding: '40px 24px',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <div style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, background: 'linear-gradient(135deg,#c4b5fd,#f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
              {s.v}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media(max-width:640px){ .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </div>
  );
}
