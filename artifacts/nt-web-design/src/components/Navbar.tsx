import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';
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
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '36px', width: '36px' }}>
            <defs>
              <linearGradient id="vg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="vg2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#bfdbfe" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
            </defs>
            <polygon points="22,30 46,30 46,170 22,170" fill="url(#vg1)" />
            <polygon points="44,30 100,90 100,130 44,70" fill="url(#vg1)" />
            <polygon points="100,90 156,30 178,30 122,90" fill="url(#vg2)" opacity="0.85" />
            <polygon points="154,30 178,30 178,170 154,170" fill="url(#vg1)" />
            <polygon points="100,110 156,170 134,170 78,110" fill="url(#vg1)" />
          </svg>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>
              NT<span style={{ background: 'linear-gradient(135deg,#3b82f6,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>WebUX</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="hidden md:flex">
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="hidden md:flex">
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
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6,13,26,0.97)',
              backdropFilter: 'blur(24px)',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '36px',
            }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '-0.01em' }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
              <button onClick={() => setLang('en')} style={{ color: lang === 'en' ? '#3b82f6' : 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>EN</button>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <button onClick={() => setLang('fr')} style={{ color: lang === 'fr' ? '#3b82f6' : 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>FR</button>
            </div>
            <a href={isHome ? '#contact' : '/#contact'} onClick={() => setOpen(false)} className="btn-violet" style={{ padding: '14px 40px', fontSize: '15px', marginTop: '8px' }}>
              {t('nav.quote')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
