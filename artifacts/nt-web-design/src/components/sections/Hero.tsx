import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 1200, active = false) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

function StatCard({ v, num, suffix, l, sub, delay }: { v: string; num: number | null; suffix: string; l: string; sub: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(num ?? 0, 1100, inView && num !== null);
  const display = num !== null ? `${count}${suffix}` : v;

  return (
    <motion.div
      ref={ref}
      className="glass"
      initial={{ opacity: 0, y: 24, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.18, ease: 'easeOut' } }}
      style={{ padding: '20px 28px', borderRadius: '14px', textAlign: 'center', minWidth: '150px', cursor: 'default' }}
    >
      <div style={{
        fontSize: '32px', fontWeight: 900,
        background: 'linear-gradient(135deg,#93c5fd,#bfdbfe)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
      }}>
        {display}
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '8px', fontWeight: 700, lineHeight: 1.4 }}>{l}</div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '3px', lineHeight: 1.3 }}>{sub}</div>
    </motion.div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 22 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }) };

export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section style={{ position: 'relative', paddingTop: '160px', paddingBottom: '120px', overflow: 'hidden', textAlign: 'center' }}>
      {/* Dot grid */}
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }} />

      {/* Tight focal glow behind headline — adds depth on top of the body glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '860px', height: '460px', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(96,165,250,0.22) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Soft horizon line glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <span className="pill-label">
            <Sparkles size={11} />
            {lang === 'fr' ? 'Studio Web Design' : 'Web Design Studio'}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '28px',
          }}
        >
          {lang === 'fr' ? (
            <>Votre business en ligne.<br /><span className="gradient-text">Fait pour convertir.</span></>
          ) : (
            <>Your business online.<br /><span className="gradient-text">Built to convert.</span></>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 44px' }}
        >
          {t('hero.sub')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#contact" className="btn-violet" style={{ padding: '14px 28px', fontSize: '15px', gap: '8px' }}>
            {t('hero.btn1')} <ArrowRight size={16} />
          </a>
          <a href="#services" className="btn-outline" style={{ padding: '14px 28px', fontSize: '15px' }}>
            {t('hero.btn2')}
          </a>
        </motion.div>

        {/* Industry reality cards */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginTop: '72px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}
        >
          {(lang === 'fr' ? [
            { v: '72%',  num: 72,   suffix: '%',   l: 'des entreprises ont un site',      sub: 'en 2024–2025' },
            { v: '28%',  num: 28,   suffix: '%',   l: 'des PME n\'ont toujours pas',      sub: 'de présence en ligne' },
            { v: '1Md+', num: null, suffix: '',    l: 'de sites web actifs',              sub: 'dans le monde' },
            { v: '3×',   num: 3,    suffix: '×',   l: 'plus de prospects',                sub: 'avec un site pro' },
          ] : [
            { v: '72%',  num: 72,   suffix: '%',   l: 'of businesses have a website',    sub: 'as of 2024–2025' },
            { v: '28%',  num: 28,   suffix: '%',   l: 'of small businesses still don\'t', sub: 'have an online presence' },
            { v: '1B+',  num: null, suffix: '',    l: 'active websites worldwide',        sub: 'and growing daily' },
            { v: '3×',   num: 3,    suffix: '×',   l: 'more leads',                      sub: 'with a pro website' },
          ]).map((s, i) => (
            <StatCard key={s.v} {...s} delay={0.55 + i * 0.12} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
