import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Layout, ShoppingCart, Target, Search, Smartphone, Server } from 'lucide-react';

export function Services() {
  const { t } = useLanguage();
  
  const icons = [Layout, ShoppingCart, Target, Search, Smartphone, Server];
  const items = t('services.items') as { title: string, desc: string }[];

  return (
    <section id="services" className="py-32 px-5 lg:px-8 max-w-7xl mx-auto relative z-10 scroll-m-20">
      <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
        <div>
          <div className="flex items-center gap-3 text-xs font-bold tracking-[0.15em] uppercase text-accent mb-6">
            <span className="w-8 h-[2px] bg-accent inline-block"></span>
            {t('services.eyebrow')}
          </div>
          <h2 className="text-5xl lg:text-6xl font-display text-foreground leading-none">
            {t('services.title')}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-border border border-border">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="bg-background p-10 relative group overflow-hidden transition-colors hover:bg-[#07101F]">
              {/* Bottom animated border line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500 ease-out" />
              
              {/* Big faded number background */}
              <div className="absolute top-8 right-8 font-display text-6xl text-foreground/5 pointer-events-none">
                0{i + 1}
              </div>

              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold uppercase tracking-wider text-foreground mb-4">
                {item.title}
              </h3>
              <p className="font-serif text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
