import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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

function StatCard({ v, num, suffix, l, sub, detail, source, delay }: { v: string; num: number | null; suffix: string; l: string; sub: string; detail: string; source: string; delay: number }) {
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
      style={{ padding: '26px 22px', borderRadius: '14px', textAlign: 'left', cursor: 'default', width: '100%' }}
    >
      <div style={{
        fontSize: '40px', fontWeight: 900,
        background: 'linear-gradient(135deg,#93c5fd,#bfdbfe)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
      }}>
        {display}
      </div>
      <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', marginTop: '12px', fontWeight: 700, lineHeight: 1.35 }}>{l}</div>
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', lineHeight: 1.4 }}>{sub}</div>
      <div style={{
        fontSize: '13px', color: 'rgba(255,255,255,0.65)',
        marginTop: '14px', paddingTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        lineHeight: 1.6,
      }}>{detail}</div>
      <div style={{
        fontSize: '11px', color: 'rgba(147,197,253,0.55)',
        marginTop: '8px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>{source}</div>
    </motion.div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }) };

export function Hero({ onStart }: { onStart?: () => void } = {}) {
  const { t, lang } = useLanguage();

  // Parallax: hero content drifts up at 40% of scroll speed → depth effect
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);

  return (
    <section ref={sectionRef} style={{ position: 'relative', width: '100%', paddingTop: '120px', paddingBottom: '90px', overflow: 'hidden', textAlign: 'center' }}>
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

      <motion.div style={{ y: contentY, maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

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
            fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
            fontWeight: 900,
            lineHeight: 1.06,
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
          <button
            type="button"
            onClick={() => onStart?.()}
            className="btn-violet"
            style={{ padding: '14px 28px', fontSize: '15px', gap: '8px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', border: 'none' }}
          >
            {t('hero.btn1')} <ArrowRight size={16} />
          </button>
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
          style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}
        >
          {(lang === 'fr' ? [
            { v: '72%',  num: 72,   suffix: '%',   l: 'des entreprises ont un site',      sub: 'en 2024–2025',
              detail: 'Aux États-Unis et au Canada, près de 3 entreprises sur 4 disposent désormais d\u2019une présence en ligne professionnelle pour acquérir et fidéliser leurs clients.',
              source: 'Forbes Advisor · 2024' },
            { v: '28%',  num: 28,   suffix: '%',   l: 'des PME n\'ont toujours pas',      sub: 'de présence en ligne',
              detail: 'Cela représente plus de 9 millions de petites entreprises qui passent à côté de clients qui les cherchent activement sur Google chaque jour.',
              source: 'Statista · 2024' },
            { v: '1Md+', num: null, suffix: '',    l: 'de sites web actifs',              sub: 'dans le monde',
              detail: 'Pour vous démarquer, votre site doit être rapide, sécurisé, optimisé SEO et conçu pour la conversion — pas juste « en ligne ».',
              source: 'Internet Live Stats · 2025' },
            { v: '3×',   num: 3,    suffix: '×',   l: 'plus de prospects',                sub: 'avec un site pro',
              detail: 'Les entreprises avec un site professionnel et bien optimisé génèrent en moyenne 3 fois plus de demandes qualifiées que celles avec un site basique ou aucun site.',
              source: 'HubSpot Research · 2024' },
          ] : [
            { v: '72%',  num: 72,   suffix: '%',   l: 'of businesses have a website',    sub: 'as of 2024–2025',
              detail: 'In the U.S. and Canada, nearly 3 out of 4 businesses now run a professional online presence to acquire and retain customers.',
              source: 'Forbes Advisor · 2024' },
            { v: '28%',  num: 28,   suffix: '%',   l: 'of small businesses still don\'t', sub: 'have an online presence',
              detail: 'That\u2019s over 9 million small businesses missing out on customers actively searching for them on Google every single day.',
              source: 'Statista · 2024' },
            { v: '1B+',  num: null, suffix: '',    l: 'active websites worldwide',        sub: 'and growing daily',
              detail: 'To stand out, your site must be fast, secure, SEO-optimized and built to convert — not just “online”.',
              source: 'Internet Live Stats · 2025' },
            { v: '3×',   num: 3,    suffix: '×',   l: 'more leads',                      sub: 'with a pro website',
              detail: 'Businesses with a professional, well-optimized website generate on average 3× more qualified inquiries than those with a basic site or no site at all.',
              source: 'HubSpot Research · 2024' },
          ]).map((s, i) => (
            <StatCard key={s.v} {...s} delay={0.55 + i * 0.12} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
