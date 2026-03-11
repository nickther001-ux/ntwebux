import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { CheckCircle2 } from 'lucide-react';

export function WhyUs() {
  const { t } = useLanguage();
  const pills = t('whyUs.pills') as { title: string, desc: string }[];

  return (
    <section id="why-us" className="py-32 px-5 lg:px-8 max-w-7xl mx-auto relative z-10 scroll-m-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Pills */}
        <div className="flex flex-col gap-4 relative">
          {/* Background large ghost text */}
          <div className="absolute -top-16 -left-8 font-display text-[12rem] leading-none text-accent/5 pointer-events-none select-none">
            WHY
          </div>
          
          <h2 className="text-5xl font-display text-foreground leading-none mb-8 relative z-10">
            {t('whyUs.title')}
          </h2>

          <div className="relative z-10 flex flex-col gap-4">
            {pills.map((pill, i) => (
              <div key={i} className="flex gap-5 items-center p-5 rounded border border-border bg-card/50 hover:bg-card hover:border-accent transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,170,221,0.15)] group">
                <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-1">
                    {pill.title}
                  </h4>
                  <p className="font-serif text-sm text-muted">
                    {pill.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Side */}
        <div className="hidden lg:block relative h-full min-h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-border">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
          <img 
            src={`${import.meta.env.BASE_URL}images/why-us-bg.png`} 
            alt="Abstract Web Design Elements" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-10 right-10 z-20">
            <div className="bg-background/80 backdrop-blur-md border border-border rounded-xl p-8">
              <div className="font-display text-4xl text-accent mb-2">100%</div>
              <div className="text-sm font-bold uppercase tracking-wider text-foreground">Custom Engineered</div>
              <div className="w-full h-1 bg-border mt-4 rounded overflow-hidden">
                <div className="w-full h-full bg-accent"></div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
