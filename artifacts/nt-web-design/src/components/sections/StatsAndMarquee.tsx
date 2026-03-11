import React from 'react';
import { useLanguage } from '@/lib/i18n';

export function StatsAndMarquee() {
  const { t } = useLanguage();

  const stats = [
    { v: t('stats.s1.v'), l: t('stats.s1.l') },
    { v: t('stats.s2.v'), l: t('stats.s2.l') },
    { v: t('stats.s3.v'), l: t('stats.s3.l') },
    { v: t('stats.s4.v'), l: t('stats.s4.l') },
  ];

  return (
    <div className="relative z-10">
      {/* Stats Row */}
      <div className="border-y border-border bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 lg:p-12 flex flex-col items-center text-center gap-2 group hover:bg-accent/5 transition-colors">
              <div className="font-display text-4xl lg:text-5xl text-accent group-hover:scale-110 transition-transform">
                {stat.v}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted">
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="bg-foreground py-4 overflow-hidden border-y-4 border-black relative">
        <div className="flex w-[200%] animate-ticker hover:[animation-play-state:paused]">
          {/* Double content for seamless looping */}
          {[1, 2].map((group) => (
            <div key={group} className="flex-1 flex justify-around items-center whitespace-nowrap">
              {['Web Design', '✦', 'E-Commerce', '✦', 'SEO Ready', '✦', 'Mobile First', '✦', 'Fast & Secure', '✦', 'Branding', '✦'].map((text, i) => (
                <span key={i} className={`font-display text-2xl tracking-[0.1em] px-8 ${text === '✦' ? 'text-accent' : 'text-background'}`}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
