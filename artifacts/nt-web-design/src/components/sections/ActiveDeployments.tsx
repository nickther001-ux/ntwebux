import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

type LangKey = 'en' | 'fr';
function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

/* ── Node data ─────────────────────────────────────────────────── */
type NodeStatus = 'OPTIMIZED' | 'ACTIVE' | 'ENCRYPTED' | 'SYNCED';

const STATUS_COLOR: Record<NodeStatus, { text: string; glow: string; bg: string }> = {
  OPTIMIZED: { text: '#22d3ee',  glow: 'rgba(34,211,238,0.35)',  bg: 'rgba(34,211,238,0.06)'  },
  ACTIVE:    { text: '#22c55e',  glow: 'rgba(34,197,94,0.35)',   bg: 'rgba(34,197,94,0.06)'   },
  ENCRYPTED: { text: '#a78bfa',  glow: 'rgba(167,139,250,0.35)', bg: 'rgba(167,139,250,0.06)' },
  SYNCED:    { text: '#3b82f6',  glow: 'rgba(59,130,246,0.35)',  bg: 'rgba(59,130,246,0.06)'  },
};

const NODES: {
  id: string;
  title: { en: string; fr: string };
  stack: string;
  status: NodeStatus;
  metric: { en: string; fr: string };
}[] = [
  {
    id: '01',
    title:  { en: 'FOUNDATIONS',   fr: 'FONDATIONS' },
    stack:  'Next.js 15 / React / Tailwind CSS',
    status: 'OPTIMIZED',
    metric: { en: '100 Lighthouse Performance', fr: '100 Performance Lighthouse' },
  },
  {
    id: '02',
    title:  { en: 'INTELLIGENCE',  fr: 'INTELLIGENCE' },
    stack:  'Custom AI / Natural Language Processing',
    status: 'ACTIVE',
    metric: { en: '< 2s Response Latency', fr: '< 2s Latence de Réponse' },
  },
  {
    id: '03',
    title:  { en: 'INFRASTRUCTURE', fr: 'INFRASTRUCTURE' },
    stack:  'PostgreSQL / Vercel Edge / AWS',
    status: 'ENCRYPTED',
    metric: { en: '99.9% Uptime SLA', fr: '99.9% SLA de Disponibilité' },
  },
  {
    id: '04',
    title:  { en: 'GLOBAL SYNC',   fr: 'SYNC GLOBAL' },
    stack:  'Bilingual L10n / Multi-Currency',
    status: 'SYNCED',
    metric: { en: 'Montreal · Paris · Japan', fr: 'Montréal · Paris · Japon' },
  },
];

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
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              {/* Pulsing blue dot */}
              <span style={{ position: 'relative', width: '8px', height: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(59,130,246,0.35)', animation: 'sysreg-ring 2s ease-in-out infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 6px rgba(59,130,246,0.8)', display: 'block', position: 'relative', zIndex: 1 }} />
              </span>
              <span style={{
                fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}>
                {bi({ en: '[SYSTEM_SPECIFICATIONS]', fr: '[SPÉCIFICATIONS_SYSTÈME]' }, l)}
              </span>
            </div>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.28)',
              margin: 0,
              fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
              letterSpacing: '0.05em',
            }}>
              {bi({ en: 'Engineering benchmarks for the borderless enterprise.', fr: 'Références d\'ingénierie pour l\'entreprise sans frontières.' }, l)}
            </p>
          </div>

          {/* ── 4-column grid ── */}
          <div className="sysreg-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '18px',
            overflow: 'hidden',
          }}>
            {NODES.map((node, i) => {
              const s = STATUS_COLOR[node.status];
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: 'rgba(5,12,28,0.82)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(10,20,45,0.92)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(5,12,28,0.82)'}
                >
                  {/* Node ID + Title */}
                  <div>
                    <div style={{
                      fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: 'rgba(255,255,255,0.2)',
                      marginBottom: '6px',
                    }}>
                      NODE {node.id}
                    </div>
                    <div style={{
                      fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#ffffff',
                    }}>
                      {bi(node.title, l)}
                    </div>
                  </div>

                  {/* Stack */}
                  <div style={{
                    fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '14px',
                  }}>
                    {node.stack}
                  </div>

                  {/* Status badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    alignSelf: 'flex-start',
                    padding: '3px 10px',
                    background: s.bg,
                    border: `1px solid ${s.text}30`,
                    borderRadius: '6px',
                  }}>
                    <span style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: s.text,
                      boxShadow: `0 0 5px ${s.glow}`,
                      display: 'inline-block',
                      flexShrink: 0,
                      animation: 'sysreg-dot 2s ease-in-out infinite',
                    }} />
                    <span style={{
                      fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: s.text,
                    }}>
                      [{node.status}]
                    </span>
                  </div>

                  {/* Metric */}
                  <div style={{
                    fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.04em',
                    marginTop: 'auto',
                    paddingTop: '4px',
                  }}>
                    {bi(node.metric, l)}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>

      <style>{`
        @keyframes sysreg-ring {
          0%,100% { transform: scale(1);   opacity: 0.5; }
          50%      { transform: scale(2.8); opacity: 0;   }
        }
        @keyframes sysreg-dot {
          0%,100% { opacity: 1;    }
          50%      { opacity: 0.45; }
        }
        @media (max-width: 860px) { .sysreg-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .sysreg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
