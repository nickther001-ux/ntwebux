import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '64px', paddingBottom: '40px', marginTop: '0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }} className="grid-footer">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <svg viewBox="0 0 200 200" fill="none" style={{ height: '32px', width: '32px' }}>
                <defs>
                  <linearGradient id="fg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <polygon points="22,30 46,30 46,170 22,170" fill="url(#fg1)" />
                <polygon points="44,30 100,90 100,130 44,70" fill="url(#fg1)" />
                <polygon points="154,30 178,30 178,170 154,170" fill="url(#fg1)" />
                <polygon points="100,110 156,170 134,170 78,110" fill="url(#fg1)" />
              </svg>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>
                NT<span style={{ background: 'linear-gradient(135deg,#93c5fd,#bfdbfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>WebUX</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, maxWidth: '220px' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>Services</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Website Design', 'Development', 'eCommerce', 'SEO & Marketing', 'AI Integrations'].map(s => (
                <li key={s}><a href="#services" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>Company</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['Process', '#process'], ['Why Us', '#why-us'], ['Contact', '#contact']].map(([label, href]) => (
                <li key={href}><a href={href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>Contact</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="mailto:nicktech@computer4u.com" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >nicktech@computer4u.com</a></li>
              <li><a href="tel:+14388067640" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >(438) 806-7640</a></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>{t('footer.copy')}</p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            Built with <span style={{ color: '#93c5fd' }}>♥</span> by NT Web UX
          </p>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .grid-footer { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:480px){
          .grid-footer { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
