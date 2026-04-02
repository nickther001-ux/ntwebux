import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: isHome ? '#services' : '/#services', label: 'Services' },
    { href: isHome ? '#portfolio' : '/#portfolio', label: lang === 'fr' ? 'Portfolio' : 'Portfolio' },
    { href: isHome ? '#process' : '/#process', label: lang === 'fr' ? 'Processus' : 'Process' },
    { href: '/services', label: lang === 'fr' ? 'Tarifs' : 'Pricing', isPage: true },
    { href: isHome ? '#contact' : '/#contact', label: 'Contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(6,13,26,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a href={isHome ? '#' : '/'} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="NT Web UX"
            style={{ height: '38px', width: '38px', objectFit: 'contain', borderRadius: '8px' }}
          />
          <div style={{ lineHeight: 1, whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              NT <span style={{ background: 'linear-gradient(135deg,#3b82f6,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Web UX</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar-desktop" style={{ alignItems: 'center', gap: '36px' }}>
          {links.map((link) =>
            link.isPage ? (
              <a
                key={link.href}
                href={link.href}
                style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Right */}
        <div className="navbar-desktop" style={{ alignItems: 'center', gap: '20px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '32px', marginLeft: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600 }}>
            <button
              onClick={() => setLang('en')}
              style={{ color: lang === 'en' ? '#3b82f6' : 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em' }}
            >EN</button>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
            <button
              onClick={() => setLang('fr')}
              style={{ color: lang === 'fr' ? '#3b82f6' : 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em' }}
            >FR</button>
          </div>
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="btn-violet"
            style={{ padding: '9px 20px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em' }}
          >
            {t('nav.quote')}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-mobile-btn"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <style>{`
        .navbar-desktop { display: none; }
        .navbar-mobile-btn { display: flex; align-items: center; }
        @media (min-width: 768px) {
          .navbar-desktop { display: flex; }
          .navbar-mobile-btn { display: none; }
        }
      `}</style>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#060d1a',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Top bar — logo + close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '68px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
              <a href={isHome ? '#' : '/'} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} onClick={() => setOpen(false)}>
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NT Web UX" style={{ height: '32px', width: '32px', objectFit: 'contain', borderRadius: '7px' }} />
                <span style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  NT <span style={{ background: 'linear-gradient(135deg,#3b82f6,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Web UX</span>
                </span>
              </a>
              <button
                onClick={() => setOpen(false)}
                style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.7)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', gap: '4px' }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '18px',
                    padding: '18px 0',
                    textDecoration: 'none',
                    borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { (e.currentTarget.querySelector('.mob-link-text') as HTMLElement)!.style.color = '#3b82f6'; }}
                  onMouseLeave={e => { (e.currentTarget.querySelector('.mob-link-text') as HTMLElement)!.style.color = '#fff'; }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(59,130,246,0.5)', letterSpacing: '0.08em', width: '20px', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mob-link-text" style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, transition: 'color 0.2s' }}>
                    {link.label}
                  </span>
                  <ArrowRight size={16} color="rgba(59,130,246,0.4)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                </motion.a>
              ))}
            </nav>

            {/* Footer — lang + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.38 }}
              style={{ padding: '24px 28px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}
            >
              {/* Language toggle */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
                {(['en', 'fr'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      flex: 1, padding: '10px', fontSize: '13px', fontWeight: 700,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      background: lang === l ? 'rgba(59,130,246,0.18)' : 'transparent',
                      color: lang === l ? '#3b82f6' : 'rgba(255,255,255,0.35)',
                      border: 'none', cursor: 'pointer',
                      borderRight: l === 'en' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    {l === 'en' ? '🇨🇦 EN' : '🇫🇷 FR'}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <a
                href={isHome ? '#contact' : '/#contact'}
                onClick={() => setOpen(false)}
                className="btn-violet"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', fontSize: '15px', fontWeight: 700, borderRadius: '12px', textDecoration: 'none' }}
              >
                {t('nav.quote')} <ArrowRight size={15} />
              </a>

              <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.18)', margin: 0 }}>NT Web UX · Montréal · nicktech@computer4u.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
