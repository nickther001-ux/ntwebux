import { useEffect, useState, type CSSProperties } from 'react';
import { useLanguage } from '@/lib/i18n';

/* ── Live Digital Clock ─────────────────────────────────────── */
function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);
  return (
    <span style={{
      fontVariantNumeric: 'tabular-nums',
      fontFamily: '"SF Mono","Fira Code","Cascadia Code",monospace',
      fontSize: '11px',
      color: '#60a5fa',
      letterSpacing: '0.06em',
    }}>
      {time}
    </span>
  );
}

/* ── Constants ───────────────────────────────────────────────── */
const HUBS = [
  { city: 'Montreal', tz: 'America/Toronto', label: 'EST' },
  { city: 'Paris',    tz: 'Europe/Paris',    label: 'CET' },
  { city: 'Japan',    tz: 'Asia/Tokyo',      label: 'JST' },
];

const COL_HEAD: CSSProperties = {
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.20)',
  marginBottom: '20px',
};

const LINK: CSSProperties = {
  fontSize: '12px',
  color: 'rgba(255,255,255,0.42)',
  textDecoration: 'none',
  letterSpacing: '0.02em',
  lineHeight: 1,
  transition: 'color 0.18s',
  display: 'block',
};

const hover = {
  enter: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#fff'; },
  leave: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = 'rgba(255,255,255,0.42)'; },
};

/* ── Footer ──────────────────────────────────────────────────── */
export function Footer() {
  const { t } = useLanguage();
  const ft = t('footer');

  return (
    <footer style={{
      width: '100%',
      background: '#020617',           /* slate-950 */
      borderTop: '1px solid rgba(255,255,255,0.10)',
      paddingTop: '60px',
      paddingBottom: '0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── Brand strip ───────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.10)',
          marginBottom: '44px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={`${import.meta.env.BASE_URL}icon.png`}
              alt=""
              loading="eager"
              style={{ height: '28px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
            <img
              src={`${import.meta.env.BASE_URL}wordmark.png`}
              alt="NT Digital Group"
              loading="eager"
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)', maxWidth: '360px', lineHeight: 1.7, margin: 0 }}>
            {ft.tagline}
          </p>
        </div>

        {/* ── 4-column grid ─────────────────────────────────────── */}
        <div
          className="footer-cols"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: '40px',
            marginBottom: '52px',
          }}
        >

          {/* Col 1 — Global Hubs */}
          <div>
            <div style={COL_HEAD}>{ft.hubsLabel}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {HUBS.map(({ city, tz, label }) => (
                <div key={city}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{city}</span>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.22)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
                  </div>
                  <LiveClock timezone={tz} />
                </div>
              ))}
            </div>
          </div>

          {/* Col 2 — Foundations */}
          <div>
            <div style={COL_HEAD}>{ft.foundationsLabel}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {(ft.foundationsLinks as Array<{ label: string; href: string }>).map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={LINK} onMouseEnter={hover.enter} onMouseLeave={hover.leave}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Enterprise AI */}
          <div>
            <div style={COL_HEAD}>{ft.aiLabel}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {(ft.aiLinks as Array<{ label: string; href: string }>).map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={LINK} onMouseEnter={hover.enter} onMouseLeave={hover.leave}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <div style={COL_HEAD}>{ft.companyLabel}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {(ft.companyLinks as Array<{ label: string; href: string }>).map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={LINK} onMouseEnter={hover.enter} onMouseLeave={hover.leave}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.10)',
          paddingTop: '20px',
          paddingBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.04em', margin: 0 }}>
            {ft.copy}
          </p>

          {/* System Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ position: 'relative', width: '10px', height: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'rgba(34,197,94,0.30)',
                animation: 'ftPulse 2.2s ease-in-out infinite',
              }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'block', position: 'relative', zIndex: 1 }} />
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)' }}>
              {ft.statusLabel}
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes ftPulse {
          0%,100% { transform:scale(1);   opacity:.55; }
          50%      { transform:scale(2.4); opacity:0;   }
        }
        @media (max-width: 860px) { .footer-cols { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .footer-cols { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
