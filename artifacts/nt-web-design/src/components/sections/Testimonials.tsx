import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  metric: string;
  metricLabel: string;
  img: string;
  industry: string;
}

export function Testimonials() {
  const { t, lang } = useLanguage();
  const items = t('testimonials.items') as TestimonialItem[];
  const eyebrow = lang === 'fr' ? 'Témoignages' : 'Testimonials';
  const heading = lang === 'fr'
    ? <><span className="gradient-text">Résultats réels.</span><br />Clients réels.</>
    : <><span className="gradient-text">Real results.</span><br />Real clients.</>;

  return (
    <section style={{ width: '100%', padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '900px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Header + Google badge */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>{eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '16px', marginBottom: '24px' }}>
            {heading}
          </h2>

          {/* 5★ Google badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '99px', padding: '8px 18px 8px 12px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBC05">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>5.0</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Google</span>
          </div>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="testimonials-grid">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22,1,0.36,1] }}
              className="glass glass-hover"
              style={{ borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'default' }}
            >
              {/* Portfolio image preview */}
              <div style={{ position: 'relative', height: '140px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={`${BASE}/portfolio/${item.img}`}
                  alt={item.role}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
                {/* Cover browser chrome + page header (Framer branding area) */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '56px', background: '#02040a', zIndex: 2 }} />
                {/* Smooth fade from cover to content */}
                <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, height: '20px', background: 'linear-gradient(to bottom, #02040a, transparent)', zIndex: 2 }} />
                {/* Blur any watermark at bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', background: 'rgba(2,4,10,0.65)', zIndex: 2 }} />
                {/* Industry tag overlay */}
                <div style={{ position: 'absolute', bottom: '8px', left: '10px', zIndex: 2, background: 'rgba(59,130,246,0.85)', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '4px' }}>
                  {item.industry}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>

                {/* Metric pill */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontSize: '22px', fontWeight: 900, lineHeight: 1,
                    background: 'linear-gradient(135deg,#93c5fd,#bfdbfe)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{item.metric}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{item.metricLabel}</span>
                </div>

                {/* Quote */}
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, flex: 1, margin: 0 }}>
                  "{item.quote}"
                </p>

                {/* Author */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Avatar */}
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,rgba(59,130,246,0.4),rgba(37,99,235,0.6))',
                    border: '1px solid rgba(59,130,246,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 800, color: '#93c5fd',
                  }}>
                    {item.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{item.role}</div>
                  </div>
                  {/* 5 stars */}
                  <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto', flexShrink: 0 }}>
                    {[1,2,3,4,5].map(j => (
                      <svg key={j} width="11" height="11" viewBox="0 0 24 24" fill="#93c5fd">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .testimonials-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:600px){ .testimonials-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
