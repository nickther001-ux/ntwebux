import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-GB', {
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
      fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
      fontSize: '11px',
      color: '#60a5fa',
      letterSpacing: '0.05em',
    }}>
      {time}
    </span>
  );
}

const HUBS = [
  { city: 'Montreal', tz: 'America/Toronto', label: 'EST' },
  { city: 'Abidjan', tz: 'Africa/Abidjan',  label: 'GMT' },
  { city: 'Paris',   tz: 'Europe/Paris',    label: 'CET' },
];

const COL_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.22)',
  marginBottom: '20px',
};

const LINK_STYLE: React.CSSProperties = {
  fontSize: '12px',
  color: 'rgba(255,255,255,0.45)',
  textDecoration: 'none',
  letterSpacing: '0.03em',
  lineHeight: 1,
  transition: 'color 0.2s',
};

export function Footer() {
  const { t, lang } = useLanguage();
  const ft = t('footer');

  return (
    <footer style={{
      width: '100%',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      paddingTop: '64px',
      paddingBottom: '0',
      marginTop: '0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── 4-column grid ── */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '56px',
          }}
        >

          {/* Col 0 — Brand */}
          <div style={COL_STYLE}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <img
                src={`${import.meta.env.BASE_URL}icon.png`}
                alt=""
                style={{ height: '30px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
              <img
                src={`${import.meta.env.BASE_URL}wordmark.png`}
                alt="NT Digital Group"
                style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.75, maxWidth: '210px', marginBottom: '24px' }}>
              {ft.tagline}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="mailto:info@ntwebux.com" style={{ ...LINK_STYLE, fontSize: '11px' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                info@ntwebux.com
              </a>
              <a href="tel:+14388067640" style={{ ...LINK_STYLE, fontSize: '11px' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                (438) 806-7640
              </a>
            </div>
          </div>

          {/* Col 1 — Global Hubs */}
          <div style={COL_STYLE}>
            <div style={LABEL_STYLE}>{ft.hubsLabel}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {HUBS.map(({ city, tz, label }) => (
                <div key={city} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.70)', letterSpacing: '0.04em', fontWeight: 500 }}>
                      {city}
                    </span>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>
                      {label}
                    </span>
                  </div>
                  <LiveClock timezone={tz} />
                </div>
              ))}
            </div>
          </div>

          {/* Col 2 — Foundations */}
          <div style={COL_STYLE}>
            <div style={LABEL_STYLE}>{ft.foundationsLabel}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {(ft.foundationsLinks as Array<{ label: string; href: string }>).map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={LINK_STYLE}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Solutions */}
          <div style={COL_STYLE}>
            <div style={LABEL_STYLE}>{ft.solutionsLabel}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {(ft.solutionsLinks as Array<{ label: string; href: string }>).map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={LINK_STYLE}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '20px',
          paddingBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.04em' }}>
            {ft.copy}
          </p>

          {/* System Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '10px' }}>
              <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'rgba(34,197,94,0.35)',
                animation: 'statusPulse 2s ease-in-out infinite',
              }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'block', position: 'relative', zIndex: 1 }} />
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
              {ft.statusLabel}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes statusPulse {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
