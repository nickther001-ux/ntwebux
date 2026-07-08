import React from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const MARQUEE_ITEMS = [
  'Web Design', '◆', 'E-Commerce', '◆', 'SEO Ready', '◆', 'Mobile First',
  '◆', 'Fast Delivery', '◆', 'Branding', '◆', 'AI Powered', '◆', 'Bilingual',
];

function Counter({ text }: { text: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Split numbers from symbols (e.g., "200" and "+")
  const match = typeof text === 'string' ? text.match(/^([0-9.]+)(.*)$/) : null;
  
  const count = useMotionValue(0);
  const num = match ? parseFloat(match[1]) : 0;
  const isFloat = match ? match[1].includes('.') : false;
  
  // Tally up to the target number
  const display = useTransform(count, (v) => match ? (isFloat ? v.toFixed(1) : Math.round(v)) : text);
  
  React.useEffect(() => {
    if (isInView && match) {
      animate(count, num, { duration: 7, ease: "easeOut" });
    }
  }, [isInView, num, count, match]);
  
  if (!match) return <span ref={ref}>{text}</span>;
  return <span ref={ref}><motion.span>{display}</motion.span>{match[2]}</span>;
}

export function StatsAndMarquee() {
  const { t } = useLanguage();

  const stats = [
    { v: t('stats.s1.v'), l: t('stats.s1.l') },
    { v: t('stats.s2.v'), l: t('stats.s2.l') },
    { v: t('stats.s3.v'), l: t('stats.s3.l') },
    { v: t('stats.s4.v'), l: t('stats.s4.l') },
  ];

  return (
    <div className="relative z-10">
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stats-row">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '40px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '8px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background 0.3s',
              }}
              className="stat-cell"
            >
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #93c5fd 0%, #bfdbfe 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                <Counter text={stat.v} />
              </div>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {stat.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        padding: '14px 0',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to right, rgba(2,4,10,0.95), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to left, rgba(2,4,10,0.95), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee-scroll 30s linear infinite',
            willChange: 'transform',
          }}
          className="marquee-track"
        >
          {[1, 2].map((g) => (
            <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {MARQUEE_ITEMS.map((item, i) => (
                <span
                  key={`${g}-${i}`}
                  style={{
                    padding: '0 28px',
                    fontSize: '12px',
                    fontWeight: item === '◆' ? 400 : 700,
                    letterSpacing: item === '◆' ? 0 : '0.14em',
                    textTransform: 'uppercase',
                    color: item === '◆' ? 'rgba(59,130,246,0.7)' : 'rgba(255,255,255,0.55)',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
