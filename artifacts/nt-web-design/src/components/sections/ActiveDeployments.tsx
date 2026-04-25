import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Link } from 'wouter';
import { Cpu, Code2, ArrowRight } from 'lucide-react';

type LangKey = 'en' | 'fr';
function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

const copy = {
  eyebrow: { en: 'How We Help You Scale', fr: 'Comment Nous Vous Aidons à Croître' },
  sub:     { en: 'Two ways to grow your business with NT Digital Group.', fr: 'Deux façons de développer votre entreprise avec NT Digital Group.' },

  col1: {
    tag:    { en: 'The Software',    fr: 'Le Logiciel' },
    title:  { en: 'NT Business Suite', fr: 'NT Business Suite' },
    body:   {
      en: 'The all-in-one AI operating system for service businesses. Automate follow-ups, capture missed calls, and manage your entire pipeline.',
      fr: 'Le système d\'exploitation IA tout-en-un pour les entreprises de services. Automatisez les suivis, capturez les appels manqués et gérez tout votre pipeline.',
    },
    cta:    { en: 'Explore the Software', fr: 'Explorer le Logiciel' },
  },

  col2: {
    tag:    { en: 'The Labor',         fr: 'Le Développement' },
    title:  { en: 'Custom Development', fr: 'Développement Sur Mesure' },
    body:   {
      en: 'Need a high-converting website or a custom internal application? We build high-performance digital assets you own 100%.',
      fr: 'Besoin d\'un site à forte conversion ou d\'une application interne sur mesure? Nous construisons des actifs numériques haute performance dont vous êtes 100% propriétaire.',
    },
    cta:    { en: 'Request a Custom Build', fr: 'Demander un Projet Sur Mesure' },
  },
};

export function ActiveDeployments() {
  const { lang } = useLanguage();
  const l = lang as LangKey;

  return (
    <section style={{ width: '100%', padding: '0 24px 100px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '14px',
          }}>
            {bi(copy.eyebrow, l)}
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            {bi(copy.sub, l)}
          </p>
        </motion.div>

        {/* ── 2-column grid ── */}
        <div className="hw-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
        }}>

          {/* ── Col 1: Software ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              background: 'rgba(5,12,28,0.80)',
              border: '1px solid rgba(34,211,238,0.18)',
              borderRadius: '20px',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div aria-hidden style={{
              position: 'absolute', top: 0, left: 0,
              width: '240px', height: '240px', pointerEvents: 'none',
              background: 'radial-gradient(ellipse at top left, rgba(34,211,238,0.13), transparent 70%)',
            }} />

            {/* Icon */}
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'rgba(34,211,238,0.10)',
              border: '1px solid rgba(34,211,238,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#22d3ee', marginBottom: '20px', position: 'relative',
            }}>
              <Cpu size={22} />
            </div>

            {/* Tag */}
            <div style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(34,211,238,0.75)',
              marginBottom: '10px', position: 'relative',
            }}>
              {bi(copy.col1.tag, l)}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontWeight: 800, color: '#ffffff',
              letterSpacing: '-0.025em', lineHeight: 1.2,
              marginBottom: '16px', position: 'relative',
            }}>
              {bi(copy.col1.title, l)}
            </h3>

            {/* Body */}
            <p style={{
              fontSize: '15px', color: 'rgba(255,255,255,0.58)',
              lineHeight: 1.7, marginBottom: '32px',
              flex: 1, position: 'relative',
            }}>
              {bi(copy.col1.body, l)}
            </p>

            {/* CTA */}
            <Link
              href="/business-suite"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 24px',
                background: 'rgba(34,211,238,0.10)',
                border: '1px solid rgba(34,211,238,0.30)',
                borderRadius: '10px',
                color: '#22d3ee',
                fontSize: '14px', fontWeight: 600,
                textDecoration: 'none',
                alignSelf: 'flex-start',
                position: 'relative',
                transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                const t = e.currentTarget;
                t.style.background = 'rgba(34,211,238,0.18)';
                t.style.borderColor = 'rgba(34,211,238,0.55)';
                t.style.boxShadow = '0 0 24px rgba(34,211,238,0.18)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                const t = e.currentTarget;
                t.style.background = 'rgba(34,211,238,0.10)';
                t.style.borderColor = 'rgba(34,211,238,0.30)';
                t.style.boxShadow = 'none';
              }}
            >
              {bi(copy.col1.cta, l)} <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* ── Col 2: Labor ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              background: 'rgba(5,12,28,0.80)',
              border: '1px solid rgba(59,130,246,0.18)',
              borderRadius: '20px',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div aria-hidden style={{
              position: 'absolute', top: 0, left: 0,
              width: '240px', height: '240px', pointerEvents: 'none',
              background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.13), transparent 70%)',
            }} />

            {/* Icon */}
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'rgba(59,130,246,0.10)',
              border: '1px solid rgba(59,130,246,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#3b82f6', marginBottom: '20px', position: 'relative',
            }}>
              <Code2 size={22} />
            </div>

            {/* Tag */}
            <div style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(59,130,246,0.75)',
              marginBottom: '10px', position: 'relative',
            }}>
              {bi(copy.col2.tag, l)}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontWeight: 800, color: '#ffffff',
              letterSpacing: '-0.025em', lineHeight: 1.2,
              marginBottom: '16px', position: 'relative',
            }}>
              {bi(copy.col2.title, l)}
            </h3>

            {/* Body */}
            <p style={{
              fontSize: '15px', color: 'rgba(255,255,255,0.58)',
              lineHeight: 1.7, marginBottom: '32px',
              flex: 1, position: 'relative',
            }}>
              {bi(copy.col2.body, l)}
            </p>

            {/* CTA */}
            <a
              href="mailto:info@ntwebux.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 24px',
                background: 'rgba(59,130,246,0.10)',
                border: '1px solid rgba(59,130,246,0.30)',
                borderRadius: '10px',
                color: '#3b82f6',
                fontSize: '14px', fontWeight: 600,
                textDecoration: 'none',
                alignSelf: 'flex-start',
                position: 'relative',
                transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                const t = e.currentTarget;
                t.style.background = 'rgba(59,130,246,0.18)';
                t.style.borderColor = 'rgba(59,130,246,0.55)';
                t.style.boxShadow = '0 0 24px rgba(59,130,246,0.18)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                const t = e.currentTarget;
                t.style.background = 'rgba(59,130,246,0.10)';
                t.style.borderColor = 'rgba(59,130,246,0.30)';
                t.style.boxShadow = 'none';
              }}
            >
              {bi(copy.col2.cta, l)} <ArrowRight size={14} />
            </a>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .hw-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hw-grid > div { padding: 28px 20px !important; }
        }
      `}</style>
    </section>
  );
}
