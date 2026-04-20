import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

type LangKey = 'en' | 'fr';
function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

/* ── Pillar data ────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: '01',
    label:  { en: 'PILLAR 01',           fr: 'PILIER 01' },
    title:  { en: 'DIGITAL FOUNDATIONS', fr: 'FONDATIONS NUMÉRIQUES' },
    build:  {
      en: 'High-performance web infrastructure and bespoke UX.',
      fr: 'Infrastructure web haute performance et UX sur mesure.',
    },
    value:  {
      en: 'Engineered for sub-second performance and elite search positioning.',
      fr: 'Conçue pour des performances sub-seconde et un positionnement SEO d\'élite.',
    },
    target: {
      en: 'Firms requiring an authoritative global presence.',
      fr: 'Entreprises nécessitant une présence mondiale de référence.',
    },
    accent: '#22d3ee',
    glow:   'rgba(34,211,238,0.18)',
    border: 'rgba(34,211,238,0.14)',
    bg:     'rgba(34,211,238,0.04)',
  },
  {
    id: '02',
    label:  { en: 'PILLAR 02',          fr: 'PILIER 02' },
    title:  { en: 'AI REVENUE ENGINES', fr: 'MOTEURS DE REVENUS IA' },
    build:  {
      en: '24/7 Lead Recovery and SMS Automation OS.',
      fr: 'Récupération de leads 24h/7j et OS d\'automatisation SMS.',
    },
    value:  {
      en: 'Stops revenue leaks by qualifying and booking leads in < 60 seconds.',
      fr: 'Stoppe les fuites de revenus en qualifiant et réservant des leads en < 60 secondes.',
    },
    target: {
      en: 'High-commission teams — Real Estate, Legal, Contracting.',
      fr: 'Équipes à fortes commissions — Immobilier, Juridique, Construction.',
    },
    accent: '#a78bfa',
    glow:   'rgba(167,139,250,0.18)',
    border: 'rgba(167,139,250,0.14)',
    bg:     'rgba(167,139,250,0.04)',
  },
  {
    id: '03',
    label:  { en: 'PILLAR 03',             fr: 'PILIER 03' },
    title:  { en: 'CUSTOM SAAS & SYSTEMS', fr: 'SAAS & SYSTÈMES SUR MESURE' },
    build:  {
      en: 'Scalable software platforms and internal business tools.',
      fr: 'Plateformes logicielles évolutives et outils métier internes.',
    },
    value:  {
      en: 'Private, multi-tenant infrastructure designed for global scalability.',
      fr: 'Infrastructure multi-tenant privée conçue pour une scalabilité mondiale.',
    },
    target: {
      en: 'Startups and enterprises needing proprietary logic.',
      fr: 'Startups et entreprises nécessitant une logique propriétaire.',
    },
    accent: '#3b82f6',
    glow:   'rgba(59,130,246,0.18)',
    border: 'rgba(59,130,246,0.14)',
    bg:     'rgba(59,130,246,0.04)',
  },
];

/* ── Smooth scroll helper ───────────────────────────────────────── */
function scrollToROI() {
  const el = document.getElementById('roi-calculator');
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

/* ── Copy ───────────────────────────────────────────────────────── */
const copy = {
  header:  { en: '[STRATEGIC_INFRASTRUCTURE]', fr: '[INFRASTRUCTURE_STRATÉGIQUE]' },
  sub:     { en: 'Engineered systems designed for high-margin growth.', fr: 'Systèmes conçus pour une croissance à haute marge.' },
  build:   { en: 'THE BUILD',   fr: 'LA RÉALISATION' },
  value:   { en: 'THE VALUE',   fr: 'LA VALEUR' },
  target:  { en: 'TARGET',      fr: 'CIBLE' },
  cta:     { en: 'Request Technical Audit', fr: 'Demander un Audit Technique' },
};

/* ── Component ─────────────────────────────────────────────────── */
export function ActiveDeployments() {
  const { lang } = useLanguage();
  const l = lang as LangKey;

  return (
    <section style={{ width: '100%', padding: '0 24px 100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* ── Header ── */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ position: 'relative', width: '8px', height: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(59,130,246,0.35)', animation: 'si-ring 2s ease-in-out infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 6px rgba(59,130,246,0.8)', display: 'block', position: 'relative', zIndex: 1 }} />
              </span>
              <span style={{
                fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
              }}>
                {bi(copy.header, l)}
              </span>
            </div>
            <p style={{
              fontSize: '13px', color: 'rgba(255,255,255,0.28)', margin: 0,
              fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
              letterSpacing: '0.05em',
            }}>
              {bi(copy.sub, l)}
            </p>
          </div>

          {/* ── 3-column pillar grid ── */}
          <div className="si-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '32px',
          }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'rgba(5,12,28,0.82)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                  transition: 'background 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(10,20,45,0.92)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(5,12,28,0.82)'}
              >
                {/* Accent glow top-left */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '180px', height: '180px',
                  background: `radial-gradient(ellipse at top left, ${p.glow}, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Pillar label */}
                <div style={{
                  fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em',
                  color: p.accent, marginBottom: '10px', position: 'relative', zIndex: 1,
                }}>
                  {bi(p.label, l)}
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                  fontSize: '14px', fontWeight: 800, letterSpacing: '0.08em',
                  color: '#ffffff', marginBottom: '24px',
                  lineHeight: 1.3, position: 'relative', zIndex: 1,
                }}>
                  {bi(p.title, l)}
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '22px' }} />

                {/* Build row */}
                <div style={{ marginBottom: '18px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em',
                    color: p.accent, marginBottom: '6px', opacity: 0.8,
                  }}>
                    {bi(copy.build, l)}
                  </div>
                  <div style={{
                    fontSize: '13px', color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.6, fontWeight: 500,
                  }}>
                    {bi(p.build, l)}
                  </div>
                </div>

                {/* Value row */}
                <div style={{ marginBottom: '18px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em',
                    color: p.accent, marginBottom: '6px', opacity: 0.8,
                  }}>
                    {bi(copy.value, l)}
                  </div>
                  <div style={{
                    fontSize: '13px', color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.6, fontWeight: 500,
                  }}>
                    {bi(p.value, l)}
                  </div>
                </div>

                {/* Target row */}
                <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '16px' }} />
                  <div style={{
                    fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em',
                    color: p.accent, marginBottom: '6px', opacity: 0.8,
                  }}>
                    {bi(copy.target, l)}
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '6px 12px',
                    background: p.bg,
                    border: `1px solid ${p.border}`,
                    borderRadius: '8px',
                  }}>
                    <span style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: p.accent,
                      boxShadow: `0 0 6px ${p.glow}`,
                      display: 'inline-block', flexShrink: 0,
                      animation: 'si-dot 2.4s ease-in-out infinite',
                    }} />
                    <span style={{
                      fontSize: '12px', color: 'rgba(255,255,255,0.65)',
                      fontWeight: 500, lineHeight: 1.4,
                    }}>
                      {bi(p.target, l)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── CTA button ── */}
          <div style={{ textAlign: 'center' }}>
            <motion.button
              onClick={scrollToROI}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '14px 36px',
                background: 'rgba(5,12,28,0.82)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = 'rgba(59,130,246,0.1)';
                b.style.borderColor = 'rgba(59,130,246,0.4)';
                b.style.color = '#fff';
                b.style.boxShadow = '0 0 28px rgba(59,130,246,0.2)';
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = 'rgba(5,12,28,0.82)';
                b.style.borderColor = 'rgba(255,255,255,0.12)';
                b.style.color = 'rgba(255,255,255,0.75)';
                b.style.boxShadow = 'none';
              }}
            >
              {bi(copy.cta, l)} →
            </motion.button>
          </div>

        </motion.div>
      </div>

      <style>{`
        @keyframes si-ring {
          0%,100% { transform: scale(1);   opacity: 0.5; }
          50%      { transform: scale(2.8); opacity: 0;   }
        }
        @keyframes si-dot {
          0%,100% { opacity: 1;    }
          50%      { opacity: 0.4; }
        }
        @media (max-width: 860px) { .si-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
