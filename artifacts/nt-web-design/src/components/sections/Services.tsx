import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Layout, ShoppingCart, Target, Search, Smartphone, Server } from 'lucide-react';

export function Services() {
  const { t } = useLanguage();
  
  const icons = [Layout, ShoppingCart, Target, Search, Smartphone, Server];
  const items = t('services.items') as { title: string, desc: string }[];

  return (
    <div className="relative z-10" style={{ background: 'linear-gradient(135deg, #EEF6FF 0%, #DAEEFF 40%, #EAF2FF 70%, #F5F9FF 100%)' }}>
      {/* subtle top border accent */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #00AADD, #005FA3, transparent)' }} />

      <section id="services" className="py-32 px-5 lg:px-8 max-w-7xl mx-auto scroll-m-20">
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-bold tracking-[0.15em] uppercase mb-6" style={{ color: '#005FA3' }}>
              <span className="w-8 h-[2px] inline-block" style={{ background: '#005FA3' }}></span>
              {t('services.eyebrow')}
            </div>
            <h2 className="text-5xl lg:text-6xl font-display leading-none" style={{ color: '#071828' }}>
              {t('services.title')}
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0.5" style={{ background: 'rgba(0,95,163,0.15)' }}>
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="p-10 relative group overflow-hidden transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.85)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)')}
              >
                {/* Bottom animated accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500 ease-out" style={{ background: '#00AADD' }} />

                {/* Big faded number */}
                <div className="absolute top-8 right-8 font-display text-6xl pointer-events-none" style={{ color: 'rgba(0,95,163,0.07)' }}>
                  0{i + 1}
                </div>

                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-8 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(0,170,221,0.12)', color: '#005FA3' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#00AADD'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,170,221,0.12)'; (e.currentTarget as HTMLElement).style.color = '#005FA3'; }}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: '#071828' }}>
                  {item.title}
                </h3>
                <p className="font-serif leading-relaxed" style={{ color: '#2A4A6A' }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* subtle bottom border accent */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #005FA3, #00AADD, transparent)' }} />
    </div>
  );
}
