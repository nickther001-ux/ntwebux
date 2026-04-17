import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.16, ease: 'easeOut' } }}
      style={{ padding: '20px 16px', borderRadius: '14px', textAlign: 'center', cursor: 'default', width: '100%' }}
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

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }) };

export function Hero() {
  const { t, lang } = useLanguage();

  // Parallax: hero content drifts up at 40% of scroll speed → depth effect
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);

  return (
    <section ref={sectionRef} style={{ position: 'relative', width: '100%', paddingTop: '140px', paddingBottom: '120px', overflow: 'hidden', textAlign: 'center', background: '#000000' }}>
      {/* Atmospheric mist — soft horizon haze instead of bright blue glow (Landio signature) */}
      <div className="hero-mist" />

      {/* Dot grid — very subtle */}
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none', maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)' }} />

      {/* Soft horizon line glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(120,140,180,0.25), transparent)',
        pointerEvents: 'none',
      }} />

      <motion.div style={{ y: contentY, maxWidth: '960px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Glowing icon badge — Landio signature element */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px' }}
        >
          <div style={{
            position: 'relative',
            width: '64px', height: '64px',
            borderRadius: '14px',
            background: 'linear-gradient(180deg, rgba(30,40,60,0.9), rgba(10,15,25,0.9))',
            border: '1px solid rgba(120,140,180,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.04) inset, ' +
              '0 8px 32px rgba(96,165,250,0.25), ' +
              '0 0 60px rgba(96,165,250,0.18)',
          }}>
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt=""
              style={{ width: '34px', height: '34px', borderRadius: '6px' }}
            />
            {/* Underglow */}
            <div style={{
              position: 'absolute', bottom: '-18px', left: '50%',
              transform: 'translateX(-50%)',
              width: '90%', height: '24px',
              background: 'radial-gradient(ellipse, rgba(96,165,250,0.55) 0%, transparent 70%)',
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }} />
          </div>
        </motion.div>

        {/* Muted pill label */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
          <span className="pill-muted">
            {lang === 'fr' ? 'Studio Web Design' : 'Web Design Studio'}
          </span>
        </motion.div>

        {/* Headline — light weight, silvery, with italic serif accent on last word */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="silver-text"
          style={{
            fontSize: 'clamp(2.6rem, 7.6vw, 6rem)',
            fontWeight: 500,
            lineHeight: 1.06,
            letterSpacing: '-0.035em',
            marginBottom: '28px',
          }}
        >
          {lang === 'fr' ? (
            <>Votre business en ligne. Fait pour <span className="serif-italic">convertir.</span></>
          ) : (
            <>Your business online. Built to <span className="serif-italic">convert.</span></>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: '540px', margin: '0 auto 40px', fontWeight: 400 }}
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
          style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '14px' }}
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
      </motion.div>
    </section>
  );
}
