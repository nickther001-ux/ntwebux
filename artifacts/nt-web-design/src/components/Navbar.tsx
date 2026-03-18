import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: isHome ? "#services" : "/#services", label: t('nav.services') },
    { href: isHome ? "#process" : "/#process", label: t('nav.process') },
    { href: isHome ? "#why-us" : "/#why-us", label: t('nav.whyUs') },
    { href: "/services-portfolio", label: lang === 'fr' ? 'Portfolio' : 'Portfolio', isPage: true },
    { href: isHome ? "#contact" : "/#contact", label: t('nav.contact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/90 backdrop-blur-lg border-b border-border' : 'bg-transparent py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group z-50 relative">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 transform group-hover:scale-105 transition-transform">
            <defs>
              <linearGradient id="ng1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0044dd' }}/>
                <stop offset="45%" style={{ stopColor: '#00aaee' }}/>
                <stop offset="100%" style={{ stopColor: '#00ff77' }}/>
              </linearGradient>
              <linearGradient id="ng2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00ffaa', stopOpacity: 0.9 }}/>
                <stop offset="60%" style={{ stopColor: '#0077ff', stopOpacity: 0.8 }}/>
                <stop offset="100%" style={{ stopColor: '#0033cc' }}/>
              </linearGradient>
            </defs>
            <polygon points="22,30 46,30 46,170 22,170" fill="url(#ng1)"/>
            <polygon points="44,30 100,90 100,130 44,70" fill="url(#ng1)"/>
            <polygon points="100,90 156,30 178,30 122,90" fill="url(#ng2)" opacity="0.85"/>
            <polygon points="154,30 178,30 178,170 154,170" fill="url(#ng1)"/>
            <polygon points="100,110 156,170 134,170 78,110" fill="url(#ng1)"/>
            <polygon points="100,20 200,20 200,44 100,44" fill="url(#ng2)" opacity="0.9"/>
            <polygon points="152,20 178,20 178,180 152,180" fill="url(#ng2)" opacity="0.95"/>
            <polygon points="46,34 68,34 120,88 100,88" fill="url(#ng2)" opacity="0.4"/>
            <polygon points="100,44 152,44 152,88 100,88" fill="#020508" opacity="0.6"/>
          </svg>
          <div className="font-sans text-sm font-extrabold tracking-widest uppercase leading-tight text-foreground">
            NT
            <span className="block text-accent text-[0.72rem] tracking-[0.18em]">WebUX</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.isPage ? (
                <Link href={link.href} className="text-sm font-bold tracking-widest uppercase text-foreground hover:text-accent transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-accent hover:after:w-full after:transition-all after:duration-300">
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} className="text-sm font-bold tracking-widest uppercase text-foreground hover:text-accent transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-accent hover:after:w-full after:transition-all after:duration-300">
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-muted">
            <button onClick={() => setLang('en')} className={`px-1 transition-colors ${lang === 'en' ? 'text-accent' : 'hover:text-foreground'}`}>EN</button>
            <span className="opacity-40">|</span>
            <button onClick={() => setLang('fr')} className={`px-1 transition-colors ${lang === 'fr' ? 'text-accent' : 'hover:text-foreground'}`}>FR</button>
          </div>
          <a href="#contact" className="px-6 py-2.5 bg-accent text-white rounded font-bold uppercase tracking-wider text-xs hover:bg-accent/80 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,170,221,0.3)] transition-all">
            {t('nav.quote')}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-foreground z-50 relative p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center pt-20"
          >
            <ul className="flex flex-col gap-8 items-center mb-12">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.isPage ? (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-display tracking-widest uppercase text-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-display tracking-widest uppercase text-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 text-sm font-bold tracking-widest text-muted mb-8">
              <button onClick={() => setLang('en')} className={`transition-colors ${lang === 'en' ? 'text-accent' : ''}`}>EN</button>
              <span>|</span>
              <button onClick={() => setLang('fr')} className={`transition-colors ${lang === 'fr' ? 'text-accent' : ''}`}>FR</button>
            </div>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-4 bg-accent text-white rounded font-bold uppercase tracking-wider text-sm shadow-[0_4px_20px_rgba(0,170,221,0.3)]"
            >
              {t('nav.quote')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
