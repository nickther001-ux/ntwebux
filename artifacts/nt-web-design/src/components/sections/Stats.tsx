import { useLanguage } from '@/lib/i18n';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return count;
}

interface StatItem {
  num: number;
  prefix?: string;
  suffix: string;
  label: string;
}

function AnimatedStat({ num, prefix = '', suffix, label, delay, borderRight }: StatItem & { delay: number; borderRight: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCountUp(num, 10000, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      style={{
        padding: '40px 24px',
        textAlign: 'center',
        borderRight: borderRight ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div style={{
        fontSize: 'clamp(28px,4vw,42px)',
        fontWeight: 800,
        background: 'linear-gradient(135deg,#93c5fd,#bfdbfe)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
        marginTop: '8px',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

export function Stats() {
  const { lang } = useLanguage();

  const items: StatItem[] = lang === 'fr'
    ? [
        { num: 200, suffix: '+',  label: 'Sites Livrés' },
        { num: 72,  suffix: 'h',  label: 'Délai Moyen' },
        { num: 98,  suffix: '%',  label: 'Satisfaction Client' },
        { num: 5,   suffix: '★', label: 'Note Moyenne' },
      ]
    : [
        { num: 200, suffix: '+',  label: 'Websites Delivered' },
        { num: 72,  suffix: 'h',  label: 'Avg. Turnaround' },
        { num: 98,  suffix: '%',  label: 'Client Satisfaction' },
        { num: 5,   suffix: '★', label: 'Average Rating' },
      ];

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stats-grid">
        {items.map((s, i) => (
          <AnimatedStat
            key={s.label}
            {...s}
            delay={i * 0.08}
            borderRight={i < 3}
          />
        ))}
      </div>
      <style>{`
        @media(max-width:640px){ .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </div>
  );
}
