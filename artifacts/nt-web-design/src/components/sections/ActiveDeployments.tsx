import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

type LangKey = 'en' | 'fr';
function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

type StatusCode = 'LIVE' | 'DEPLO' | 'SYNC';

const STATUS_COLOR: Record<StatusCode, string> = {
  LIVE:  '#22c55e',
  DEPLO: '#3b82f6',
  SYNC:  '#a78bfa',
};

const deployments: {
  status: StatusCode;
  label: { en: string; fr: string };
  client: { en: string; fr: string };
}[] = [
  {
    status: 'LIVE',
    label:  { en: 'AI-Integrated CRM',             fr: 'CRM Intégré IA' },
    client: { en: 'High-Performance Contractor — Montréal', fr: 'Entrepreneur Haute Performance — Montréal' },
  },
  {
    status: 'DEPLO',
    label:  { en: 'Multi-Tenant HR SaaS',           fr: 'SaaS RH Multi-Tenant' },
    client: { en: 'Recruitment Firm — West Africa', fr: 'Cabinet de Recrutement — Afrique de l\'Ouest' },
  },
  {
    status: 'SYNC',
    label:  { en: 'Bilingual E-Commerce Engine',    fr: 'Moteur E-Commerce Bilingue' },
    client: { en: 'International Logistics Hub',    fr: 'Hub Logistique International' },
  },
];

export function ActiveDeployments() {
  const { lang } = useLanguage();
  const l = lang as LangKey;

  const title  = bi({ en: 'ACTIVE DEPLOYMENTS', fr: 'DÉPLOIEMENTS ACTIFS' }, l);
  const sub    = bi({ en: 'Live systems under NT Digital Group architecture.', fr: 'Systèmes actifs sous architecture NT Digital Group.' }, l);

  return (
    <section style={{ width: '100%', padding: '0 24px 100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#22c55e', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '3px 12px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'adep-pulse 1.4s infinite' }} />
                {title}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0, fontFamily: "'Courier New', ui-monospace, monospace", letterSpacing: '0.04em' }}>
              {sub}
            </p>
          </div>

          {/* Table */}
          <div style={{
            background: 'rgba(5,12,28,0.7)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            overflow: 'hidden',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '90px 1fr 1fr',
              padding: '12px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              {(['STATUS', 'SYSTEM', bi({ en: 'CLIENT', fr: 'CLIENT' }, l)] as string[]).map((h) => (
                <span key={h} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)', fontFamily: "'Courier New', ui-monospace, monospace" }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {deployments.map((d, i) => {
              const color = STATUS_COLOR[d.status];
              const isLive = d.status === 'LIVE';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'grid', gridTemplateColumns: '90px 1fr 1fr',
                    padding: '18px 24px',
                    borderBottom: i < deployments.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    alignItems: 'center',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                >
                  {/* Status badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    {isLive && (
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0, animation: 'adep-pulse 1.4s infinite', boxShadow: `0 0 6px ${color}` }} />
                    )}
                    {!isLive && (
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0, opacity: 0.7 }} />
                    )}
                    <span style={{ fontFamily: "'Courier New', ui-monospace, monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color }}>
                      [{d.status}]
                    </span>
                  </div>

                  {/* System name */}
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                    {bi(d.label, l)}
                  </span>

                  {/* Client */}
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', fontFamily: "'Courier New', ui-monospace, monospace", letterSpacing: '0.02em' }}>
                    {bi(d.client, l)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes adep-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.65); }
        }
        @media (max-width: 600px) {
          .adep-grid { grid-template-columns: 80px 1fr !important; }
          .adep-client { display: none !important; }
        }
      `}</style>
    </section>
  );
}
