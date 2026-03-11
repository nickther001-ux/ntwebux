import React from 'react';
import { useLanguage } from '@/lib/i18n';

export function Testimonials() {
  const { t } = useLanguage();
  const items = t('testimonials.items') as { quote: string, name: string, role: string }[];
  
  // Use AI-generated images
  const avatars = [
    `${import.meta.env.BASE_URL}images/avatar-1.png`,
    `${import.meta.env.BASE_URL}images/avatar-2.png`,
    `${import.meta.env.BASE_URL}images/avatar-3.png`
  ];

  return (
    <section className="py-32 bg-[#07101F] relative z-10 border-y border-border/50">
      <div className="px-5 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-display text-foreground mb-16">
          {t('testimonials.title')}
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-xl border border-border relative hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 ${
                i === 0 ? 'lg:col-span-2 bg-[#0B1526]' : 'bg-background'
              }`}
            >
              <div className="font-display text-6xl text-accent/30 absolute top-6 left-6 pointer-events-none select-none">
                "
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-8">
                  <div className="text-accent text-sm tracking-[0.2em] mb-4">★★★★★</div>
                  <p className={`font-serif text-lg leading-relaxed ${i === 0 ? 'text-white/80' : 'text-muted'}`}>
                    {item.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={avatars[i]} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">{item.name}</h4>
                    <p className="text-xs text-muted mt-1">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
