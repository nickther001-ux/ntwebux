import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const fadeUp = { hidden: { opacity: 0, y: 22 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }) };

export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section style={{ position: 'relative', paddingTop: '160px', paddingBottom: '120px', overflow: 'hidden', textAlign: 'center' }}>
      {/* Dot grid */}
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }} />

      {/* Glow ring behind headline */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-60%)',
        width: '700px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(16,185,129,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <span className="pill-label">
            <Sparkles size={11} />
            {lang === 'fr' ? 'Studio Web Design · Montréal' : 'Web Design Studio · Montréal'}
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

        {/* Floating stat cards */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginTop: '72px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
        >
          {[
            { v: '200+', l: lang === 'fr' ? 'Sites Livrés' : 'Websites Delivered' },
            { v: '14d', l: lang === 'fr' ? 'Délai Moyen' : 'Avg. Turnaround' },
            { v: '98%', l: lang === 'fr' ? 'Satisfaction' : 'Client Satisfaction' },
            { v: '5★', l: lang === 'fr' ? 'Note Moyenne' : 'Average Rating' },
          ].map((s) => (
            <div
              key={s.v}
              className="glass"
              style={{ padding: '14px 24px', borderRadius: '12px', textAlign: 'center', minWidth: '110px' }}
            >
              <div style={{ fontSize: '22px', fontWeight: 800, background: 'linear-gradient(135deg,#6ee7b7,#bef264)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.v}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '3px', fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
