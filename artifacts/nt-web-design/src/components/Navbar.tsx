import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/lib/i18n';
import { Menu, X, ArrowRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'wouter';
import { CommandPalette } from '@/components/CommandPalette';

/* Smooth-scroll to an anchor id, compensating for the fixed navbar height */
const NAVBAR_OFFSET = 88; // px — navbar height + comfortable gap

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [location, navigate] = useLocation();
  const isHome = location === '/';
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform);

  /* Global ⌘K / Ctrl+K shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* Intercept anchor clicks for butter-smooth JS scroll */
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(href.slice(1));
  }, []);

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
    { href: isHome ? '#business-suite' : '/#business-suite', label: lang === 'fr' ? 'Suite' : 'Business Suite', highlight: true },
    { href: isHome ? '#roi-calculator' : '/#roi-calculator', label: lang === 'fr' ? 'Audit ROI' : 'ROI Audit' },
    { href: isHome ? '#contact' : '/#contact', label: 'Contact' },
  ];

  return (
    <header
      style={{
        /* Floating glass dock — detached from the top edge, centered horizontally.
           translateX(-50%) makes this header a containing block, but the mobile
           menu is portaled to <body> so it still renders fullscreen. */
        position: 'fixed',
        top: scrolled ? '12px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: 'min(1140px, calc(100vw - 24px))',
        borderRadius: '999px',
        background: scrolled ? 'rgba(0,0,0,0.78)' : 'rgba(0,0,0,0.62)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: scrolled
          ? '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
          : '0 8px 28px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'top 0.4s cubic-bezier(0.22,1,0.36,1), background 0.35s ease, box-shadow 0.35s ease, height 0.35s ease',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          padding: scrolled ? '0 18px 0 22px' : '0 22px 0 26px',
          height: scrolled ? '54px' : '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'height 0.35s cubic-bezier(0.22,1,0.36,1), padding 0.35s ease',
        }}
      >
        {/* Logo */}
        <a href={isHome ? '#' : '/'} style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src={`${import.meta.env.BASE_URL}icon.png`}
            alt=""
            style={{ height: '30px', width: 'auto', objectFit: 'contain', display: 'block', filter: 'brightness(0) invert(1)' }}
          />
          <img
            src={`${import.meta.env.BASE_URL}wordmark.png`}
            alt="NTWebUX"
            style={{ height: '30px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="navbar-desktop" style={{ alignItems: 'center', gap: '24px', whiteSpace: 'nowrap' }}>
          {links.map((link) => {
            const linkStyle: React.CSSProperties = {
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            };
            return link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                style={(link as any).highlight ? { ...linkStyle, color: '#93c5fd' } : linkStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = (link as any).highlight ? '#93c5fd' : 'rgba(255,255,255,0.65)')}
              >
                {(link as any).highlight ? (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '2px 7px',
                    background: 'rgba(59,130,246,0.12)',
                    border: '1px solid rgba(59,130,246,0.35)',
                    borderRadius: '999px',
                    color: '#93c5fd',
                  }}>
                    {link.label}
                  </span>
                ) : link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right */}
        <div className="navbar-desktop" style={{ alignItems: 'center', gap: '12px' }}>
          {/* ⌘K search trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            aria-label="Open command palette"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 8px 6px 10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.55)',
              cursor: 'pointer',
              transition: 'background 0.18s, color 0.18s, border-color 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <Search size={13} />
            <span style={{
              fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
              padding: '2px 5px', borderRadius: '4px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.6)',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
            }}>{isMac ? '⌘K' : 'Ctrl+K'}</span>
          </button>
          <a
            href={isHome ? '#contact' : '/#contact'}
            onClick={(e) => handleAnchorClick(e, isHome ? '#contact' : '')}
            className="btn-violet"
            style={{ padding: '9px 20px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em' }}
          >
            {t('nav.quote')}
          </a>
        </div>

        {/* Mobile right — search + lang toggle + hamburger */}
        <div className="navbar-mobile-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setCmdOpen(true)}
            aria-label="Search"
            style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Search size={15} />
          </button>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {(['en', 'fr'] as const).map((l, i) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '5px 10px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: lang === l ? 'rgba(59,130,246,0.3)' : 'transparent',
                  color: lang === l ? '#93c5fd' : 'rgba(255,255,255,0.45)',
                  border: 'none',
                  borderRight: i === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >{l.toUpperCase()}</button>
            ))}
          </div>

          <button
            className="navbar-mobile-btn"
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style>{`
        .navbar-desktop { display: none; }
        .navbar-mobile-right { display: flex; }
        .navbar-mobile-lang { display: flex; }
        .navbar-mobile-btn { display: flex; align-items: center; }
        @media (min-width: 960px) {
          .navbar-desktop { display: flex; }
          .navbar-mobile-right { display: none; }
        }
      `}</style>

      {/* Mobile menu — portaled to <body> so it escapes the header's backdrop-filter
          containing block (otherwise position:fixed inset:0 gets clipped to 68px). */}
      {createPortal(
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
              zIndex: 100,
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
              <a href={isHome ? '#' : '/'} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }} onClick={() => setOpen(false)}>
                <img src={`${import.meta.env.BASE_URL}icon.png`} alt="" style={{ height: '30px', width: 'auto', objectFit: 'contain', display: 'block', filter: 'brightness(0) invert(1)' }} />
                <img src={`${import.meta.env.BASE_URL}wordmark.png`} alt="NTWebUX" style={{ height: '20px', width: 'auto', objectFit: 'contain', display: 'block' }} />
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
              {links.map((link, i) => {
                const innerContent = (
                  <>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(59,130,246,0.5)', letterSpacing: '0.08em', width: '20px', flexShrink: 0 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mob-link-text" style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, transition: 'color 0.2s' }}>
                      {link.label}
                    </span>
                    <ArrowRight size={16} color="rgba(59,130,246,0.4)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                  </>
                );
                const sharedStyle: React.CSSProperties = {
                  display: 'flex', alignItems: 'center', gap: '18px',
                  padding: '18px 0',
                  textDecoration: 'none',
                  borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  position: 'relative',
                };
                const hoverHandlers = {
                  onMouseEnter: (e: React.MouseEvent) => { (e.currentTarget.querySelector('.mob-link-text') as HTMLElement)!.style.color = '#3b82f6'; },
                  onMouseLeave: (e: React.MouseEvent) => { (e.currentTarget.querySelector('.mob-link-text') as HTMLElement)!.style.color = '#fff'; },
                };
                const motionProps = {
                  initial: { opacity: 0, x: 24 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.08 + i * 0.06, duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                };

                if (link.isPage) {
                  return (
                    <motion.div
                      key={link.href}
                      {...motionProps}
                      style={{ ...sharedStyle, cursor: 'pointer' }}
                      onClick={() => { navigate(link.href); setOpen(false); }}
                      {...hoverHandlers}
                    >
                      {innerContent}
                    </motion.div>
                  );
                }
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
                    {...motionProps}
                    style={sharedStyle}
                    {...hoverHandlers}
                  >
                    {innerContent}
                  </motion.a>
                );
              })}
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
                    {l === 'en' ? 'EN' : 'FR'}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <a
                href={isHome ? '#contact' : '/#contact'}
                onClick={(e) => handleAnchorClick(e, isHome ? '#contact' : '')}
                className="btn-violet"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', fontSize: '15px', fontWeight: 700, borderRadius: '12px', textDecoration: 'none' }}
              >
                {t('nav.quote')} <ArrowRight size={15} />
              </a>

              <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.18)', margin: 0 }}>NT Web UX · Global · info@ntwebux.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* ⌘K command palette */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </header>
  );
}
