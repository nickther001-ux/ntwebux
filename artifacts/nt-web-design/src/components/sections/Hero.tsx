import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-5 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Decorative background glows specific to hero */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 text-xs font-bold tracking-[0.15em] uppercase text-accent mb-6">
            <span className="w-8 h-[2px] bg-accent inline-block"></span>
            {t('hero.eyebrow')}
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] leading-[0.95] text-foreground mb-8">
            {t('hero.h1_1')}<br/>
            {t('hero.h1_2')}<br/>
            <span className="text-accent">{t('hero.h1_3')}</span><br/>
            <span className="text-stroke-transparent">{t('hero.h1_4')}</span>
          </h1>
          
          <p className="font-serif text-lg md:text-xl text-muted leading-relaxed max-w-lg mb-10">
            {t('hero.sub')}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-accent/90 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,170,221,0.35)] transition-all group">
              {t('hero.btn1')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#process" className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-foreground border border-border rounded font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-accent/10 hover:border-accent/50 transition-all">
              {t('hero.btn2')}
            </a>
          </div>
        </motion.div>

        {/* Visual Mock Browser */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 hidden lg:block"
        >
          <div className="relative w-full h-[480px]">
            {/* The actual mock window */}
            <div className="absolute inset-0 bg-[#030608] rounded-xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6 flex flex-col overflow-hidden">
              {/* Browser Bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                <div className="flex-1 bg-card h-6 ml-2 rounded flex items-center px-4 font-mono text-[10px] text-muted-foreground">
                  https://your-success.com
                </div>
              </div>

              {/* Mock Content */}
              <div className="flex-1 bg-gradient-to-br from-card to-background rounded-lg p-6 relative overflow-hidden flex flex-col justify-center items-start border border-border/30">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl"></div>
                <div className="text-[10px] font-bold tracking-[0.15em] text-accent uppercase mb-2">NEW PLATFORM</div>
                <div className="font-display text-4xl text-white leading-none mb-4">SCALE YOUR<br/>VISION</div>
                <div className="w-3/4 h-2 bg-card-foreground/10 rounded mb-2"></div>
                <div className="w-1/2 h-2 bg-card-foreground/10 rounded mb-6"></div>
                <div className="px-4 py-2 bg-accent text-white text-[10px] font-bold uppercase tracking-wider rounded">Discover More</div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-6 top-8 bg-accent text-white px-5 py-3 rounded shadow-[0_8px_30px_rgba(0,170,221,0.4)] animate-float font-bold text-xs uppercase tracking-wider border border-white/20 backdrop-blur-sm z-20">
              {t('hero.mockBadge')}
            </div>

            {/* Floating Stat Card */}
            <div className="absolute -left-8 -bottom-6 bg-[#0D1B35] rounded-xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-border animate-[float_4.5s_ease-in-out_infinite_reverse] z-20">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Conversion Rate</div>
              <div className="font-display text-5xl text-accent leading-none">24.8%</div>
              <div className="text-xs text-green-400 mt-2 font-medium flex items-center gap-1">
                <ArrowRight size={12} className="-rotate-45" /> +12.4% this month
              </div>
            </div>
            
            {/* Outline decorative ring */}
            <div className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full border border-accent/20 animate-pulse-ring pointer-events-none -z-10"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
