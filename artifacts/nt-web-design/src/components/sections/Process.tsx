import React from 'react';
import { useLanguage } from '@/lib/i18n';

export function Process() {
  const { t } = useLanguage();
  const steps = t('process.steps') as { title: string, desc: string }[];

  return (
    <section id="process" className="py-32 bg-[#030608] relative z-10 scroll-m-20 border-y border-border/50">
      <div className="px-5 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.15em] uppercase text-accent mb-6">
            <span className="w-8 h-[2px] bg-accent inline-block"></span>
            {t('process.eyebrow')}
            <span className="w-8 h-[2px] bg-accent inline-block"></span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-display text-white leading-none mb-6">
            {t('process.title')}
          </h2>
          <p className="font-serif text-muted leading-relaxed">
            {t('process.desc')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-[36px] left-[10%] right-[10%] h-[1px] bg-border/50 z-0" />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 group">
              <div className="w-[72px] h-[72px] rounded-full bg-[#030608] border-2 border-accent/30 flex items-center justify-center font-display text-2xl text-accent mb-8 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300 mx-auto sm:mx-0">
                0{i + 1}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4 text-center sm:text-left">
                {step.title}
              </h3>
              <p className="font-serif text-sm text-white/50 leading-relaxed text-center sm:text-left">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
