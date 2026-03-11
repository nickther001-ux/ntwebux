import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';

const avatarColors = [
  { bg: 'rgba(0,170,221,0.2)', text: '#00AADD' },
  { bg: 'rgba(201,168,76,0.2)', text: '#C9A84C' },
  { bg: 'rgba(0,140,255,0.15)', text: '#5A9AFF' },
];

function Avatar({ src, name, index }: { src: string; name: string; index: number }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('');
  const color = avatarColors[index % avatarColors.length];

  if (failed) {
    return (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2 border-border"
        style={{ background: color.bg, color: color.text }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-12 h-12 rounded-full object-cover border-2 border-border shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  const items = t('testimonials.items') as { quote: string, name: string, role: string }[];

  const avatars = [
    '/images/avatar-1.png',
    '/images/avatar-2.png',
    '/images/avatar-3.png',
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
                  <Avatar src={avatars[i]} name={item.name} index={i} />
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
