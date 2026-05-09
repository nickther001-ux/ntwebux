import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

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

function StatCard({ v, num, suffix, l, sub, detail, source, delay }: {
  v: string; num: number | null; suffix: string;
  l: string; sub: string; detail: string; source: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCountUp(num ?? 0, 1100, inView && num !== null);
  const display = num !== null ? `${count}${suffix}` : v;

  return (
    <motion.div
      ref={ref}
      className="glass"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
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

const CARDS_EN = [
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
];

const CARDS_FR = [
  { v: 'Moy. 3 jours', num: null, suffix: '', l: 'La plupart des sites livrés en 72h', sub: 'rapide, fiable, sans surprise',
    detail: 'La plupart de nos sites sont en ligne en 3 jours ouvrables. Les projets plus complexes prennent un peu plus — jamais des mois.',
    source: 'Délai garanti NT Digital' },
  { v: 'Bilingue', num: null, suffix: '', l: 'Français + Anglais, natif', sub: '100% natif dans les deux langues',
    detail: 'Tous nos livrables — site, contenu, automatisations — sont entièrement natifs en français et en anglais. Aucune traduction automatique.',
    source: 'Standard NT Digital' },
  { v: 'Loi 25', num: null, suffix: '', l: 'Conforme à la Loi 25', sub: 'Conformité vie privée Québec',
    detail: 'Chaque projet que nous livrons respecte la Loi 25 du Québec : politique de confidentialité, consentement aux cookies et pratiques de collecte de données.',
    source: 'Conformité Québec · 2024' },
  { v: '28%', num: 28, suffix: '%', l: 'des PME sans présence en ligne', sub: "plus de 9 millions d'entreprises",
    detail: "Plus de 9 millions de petites entreprises passent à côté de clients qui les cherchent activement sur Google chaque jour — faute de site web.",
    source: 'Statista · 2024' },
  { v: '72%', num: 72, suffix: '%', l: 'des entreprises ont un site', sub: 'en 2024–2025',
    detail: "Aux États-Unis et au Canada, près de 3 entreprises sur 4 ont une présence en ligne professionnelle. Votre concurrence, probablement.",
    source: 'Forbes Advisor · 2024' },
  { v: '3×', num: null, suffix: '', l: 'plus de prospects avec un site pro', sub: 'vs. sans site ou site basique',
    detail: "Les entreprises avec un site professionnel et bien optimisé génèrent en moyenne 3 fois plus de demandes qualifiées que celles sans site.",
    source: 'HubSpot Research · 2024' },
];

export function RealityCards() {
  const { lang } = useLanguage();
  const cards = lang === 'fr' ? CARDS_FR : CARDS_EN;

  return (
    <section style={{ width: '100%', padding: '0 24px 80px' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }} className="reality-cards-grid">
        {cards.map((card, i) => (
          <StatCard key={i} {...card} delay={i * 0.08} />
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) { .reality-cards-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .reality-cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
