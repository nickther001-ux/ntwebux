import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Check } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

function useCountUp(target: number, duration: number = 1800, inView: boolean = false) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return value;
}

interface StatProps {
  raw: string;
  label: string;
  big?: boolean;
  inView: boolean;
}

function AnimatedStat({ raw, label, big = false, inView }: StatProps) {
  const match = raw.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : raw;
  const count = useCountUp(target, big ? 1600 : 1400, inView);

  return (
    <div style={big ? {} : { padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={big
        ? { fontSize: '80px', fontWeight: 900, background: 'linear-gradient(135deg,#93c5fd,#bfdbfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '12px' }
        : { fontSize: '22px', fontWeight: 800, color: '#93c5fd' }
      }>
        {count}{suffix}
      </div>
      {label && <div style={big
        ? { fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '8px' }
        : { fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }
      }>{label}</div>}
    </div>
  );
}

export function WhyUs() {
  const { t, lang } = useLanguage();
  const pills = t('whyUs.pills') as { title: string; desc: string }[];
  const eyebrow = lang === 'fr' ? 'Pourquoi Nous' : 'Why Choose Us';

  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });

  return (
    <section id="why-us" style={{ width: '100%', padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', position: 'relative' }} className="whyus-grid">
        {/* Left */}
        <div>
          <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>{eyebrow}</span>
          <h1 className="text-5xl font-bold text-white mb-4">
            Digital growth. <br />
            <span className="text-blue-400">Engineered custom.</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '48px', maxWidth: '400px' }}>
            {lang === 'fr'
              ? "Nous ne sommes pas une agence typique. Nous sommes vos partenaires de croissance digitale."
              : "We're not a typical agency. We're your digital growth partners, obsessed with results."}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pills.map((pill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="glass glass-hover"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '18px 20px', borderRadius: '12px', cursor: 'default' }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <Check size={14} color="#93c5fd" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{pill.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{pill.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — stat card with count-up */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="whyus-visual"
        >
          <div className="glass" style={{ borderRadius: '24px', padding: '48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <AnimatedStat
              raw="100%"
              label={lang === 'fr' ? 'Sur Mesure' : 'Custom Built'}
              big
              inView={inView}
            />
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '260px', margin: '0 auto' }}>
              {lang === 'fr' ? 'Aucun template préfabriqué. Chaque projet est unique.' : 'No templates. No cookie-cutter. Every project is built from scratch.'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '36px' }}>
              {[
                { raw: '200+', l: lang === 'fr' ? 'Projets' : 'Projects' },
                { raw: '98%', l: lang === 'fr' ? 'Satisfaction' : 'Satisfaction' },
                { raw: '72h', l: lang === 'fr' ? 'Délai' : 'Turnaround' },
                { raw: '5★', l: lang === 'fr' ? 'Notes' : 'Rating' },
              ].map(({ raw, l }) => (
                <AnimatedStat key={raw} raw={raw} label={l} inView={inView} />
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
