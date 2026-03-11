import React from 'react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#020508] pt-24 pb-8 relative z-10">
      <div className="px-5 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 group mb-6">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12">
                <defs>
                  <linearGradient id="f1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#0044dd' }}/>
                    <stop offset="45%" style={{ stopColor: '#00aaee' }}/>
                    <stop offset="100%" style={{ stopColor: '#00ff77' }}/>
                  </linearGradient>
                </defs>
                <polygon points="22,30 46,30 46,170 22,170" fill="url(#f1)"/>
                <polygon points="44,30 100,90 100,130 44,70" fill="url(#f1)"/>
                <polygon points="154,30 178,30 178,170 154,170" fill="url(#f1)"/>
                <polygon points="100,110 156,170 134,170 78,110" fill="url(#f1)"/>
              </svg>
              <div className="font-sans text-sm font-extrabold tracking-widest uppercase leading-tight text-white">
                NT
                <span className="block text-accent text-[0.72rem] tracking-[0.18em]">WebUX</span>
              </div>
            </a>
            <p className="font-serif text-sm text-white/40 max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h5 className="font-bold text-[10px] uppercase tracking-widest text-white/30 mb-6">{t('footer.links1')}</h5>
            <ul className="flex flex-col gap-4">
              <li><a href="#services" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Business Websites</a></li>
              <li><a href="#services" className="text-sm font-medium text-white/60 hover:text-white transition-colors">E-Commerce</a></li>
              <li><a href="#services" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Landing Pages</a></li>
              <li><a href="#services" className="text-sm font-medium text-white/60 hover:text-white transition-colors">SEO & Performance</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[10px] uppercase tracking-widest text-white/30 mb-6">{t('footer.links2')}</h5>
            <ul className="flex flex-col gap-4">
              <li><a href="#process" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Process</a></li>
              <li><a href="#why-us" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Why Us</a></li>
              <li><a href="#contact" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[10px] uppercase tracking-widest text-white/30 mb-6">{t('footer.links3')}</h5>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            {t('footer.copy')}
          </p>
          <div className="text-xs text-white/30 font-medium">
            Designed & Built by <span className="text-accent">NT WebUX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
