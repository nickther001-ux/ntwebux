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

function StatCard({ v, num, suffix, l, sub, detail, source, tech, delay }: { v: string; num: number | null; suffix: string; l: string; sub: string; detail: string; source: string; tech?: string; delay: number }) {
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
      {tech && (
        <div style={{
          marginTop: '10px',
          fontFamily: "'Courier New', monospace",
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: 'rgba(34,211,238,0.7)',
          background: 'rgba(34,211,238,0.06)',
          border: '1px solid rgba(34,211,238,0.18)',
          borderRadius: '6px',
          padding: '4px 8px',
          display: 'inline-block',
        }}>{tech}</div>
      )}
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
            {lang === 'fr' ? 'Agence IA + Plateforme tout-en-un pour entrepreneurs' : 'AI Agency + All-in-One Platform for Service Businesses'}
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
            <>On propulse<br /><span className="gradient-text">votre croissance.</span></>
          ) : (
            <>We Engineer<br /><span className="gradient-text">Revenue Engines.</span></>
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

        {/* Reality cards */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}
        >
          {(lang === 'fr' ? [
            { v: 'Moy. 3 jours', num: null, suffix: '', l: 'La plupart des sites livrés en 72h', sub: 'rapide, fiable, sans surprise',
              detail: 'La plupart de nos sites sont en ligne en 3 jours ouvrables. Les projets plus complexes prennent un peu plus — jamais des mois.',
              source: 'Délai garanti NT Digital' },
            { v: 'Bilingue', num: null, suffix: '', l: 'Français + Anglais, natif', sub: '100% natif dans les deux langues',
              detail: 'Tous nos livrables — site, contenu, automatisations — sont entièrement natifs en français et en anglais. Aucune traduction automatique.',
              source: 'Standard NT Digital' },
            { v: 'Loi 25', num: null, suffix: '', l: 'Conforme à la Loi 25', sub: 'Conformité vie privée Québec',
              detail: 'Chaque projet que nous livrons respecte la Loi 25 du Québec : politique de confidentialité, consentement aux cookies et pratiques de collecte de données.',
              source: 'Conformité Québec · 2024' },
            { v: '28%', num: 28, suffix: '%', l: 'des PME sans présence en ligne', sub: 'plus de 9 millions d\'entreprises',
              detail: 'Plus de 9 millions de petites entreprises passent à côté de clients qui les cherchent activement sur Google chaque jour — faute de site web.',
              source: 'Statista · 2024' },
            { v: '72%', num: 72, suffix: '%', l: 'des entreprises ont un site', sub: 'en 2024–2025',
              detail: 'Aux États-Unis et au Canada, près de 3 entreprises sur 4 ont une présence en ligne professionnelle. Votre concurrence, probablement.',
              source: 'Forbes Advisor · 2024' },
            { v: '3×', num: null, suffix: '', l: 'plus de prospects avec un site pro', sub: 'vs. sans site ou site basique',
              detail: 'Les entreprises avec un site professionnel et bien optimisé génèrent en moyenne 3 fois plus de demandes qualifiées que celles sans site.',
              source: 'HubSpot Research · 2024' },
          ] : [
            { v: 'Avg. 3 days', num: null, suffix: '', l: 'Most sites delivered in 72 hours', sub: 'fast, reliable, no surprises',
              detail: 'Most of our sites go live within 3 business days. More complex builds take a little longer — never months.',
              source: 'NT Digital Guaranteed SLA' },
            { v: 'Bilingual', num: null, suffix: '', l: 'French + English, fully native', sub: '100% native in both languages',
              detail: 'Every deliverable — site, copy, automations — is natively bilingual in French and English. No machine translation. No hybrid copy.',
              source: 'NT Digital Standard' },
            { v: 'Law 25 Ready', num: null, suffix: '', l: 'Quebec privacy compliant', sub: 'Built for Law 25 from day one',
              detail: 'Every project we deliver is Law 25 compliant: privacy policy, cookie consent, and data collection practices built in from the start.',
              source: 'Quebec Privacy Law · 2024' },
            { v: '28%', num: 28, suffix: '%', l: 'of small businesses have no website', sub: 'over 9 million companies',
              detail: 'Over 9 million small businesses are missing out on customers actively searching for them on Google every day — simply because they have no site.',
              source: 'Statista · 2024' },
            { v: '72%', num: 72, suffix: '%', l: 'of businesses have a website', sub: 'as of 2024–2025',
              detail: 'In the U.S. and Canada, nearly 3 out of 4 businesses now run a professional online presence. Your competition, probably.',
              source: 'Forbes Advisor · 2024' },
            { v: '3×', num: null, suffix: '', l: 'more leads with a pro website', sub: 'vs. no site or a basic one',
              detail: 'Businesses with a professional, well-optimized website generate on average 3× more qualified inquiries than those with a basic site or no site at all.',
              source: 'HubSpot Research · 2024' },
          ]).map((s, i) => (
            <StatCard key={i} {...s} delay={0.55 + i * 0.12} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
