import React from 'react';
import { useLanguage } from '@/lib/i18n';

export const CompetitorComparison = () => {
  const { t } = useLanguage();
  const rows: { feature: string; us: string; them: string; usCheck?: boolean; themX?: boolean }[] = t('competitorComparison.rows');

  return (
    <section className="py-24 bg-transparent text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="pill-label mb-4">{t('competitorComparison.eyebrow')}</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-sans">
            {t('competitorComparison.title')}
          </h2>
          <p className="text-muted text-lg">
            {t('competitorComparison.subtitle')}
          </p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-border/60 text-sm font-semibold uppercase tracking-wider text-muted">
                  <th className="py-6 px-8 w-2/5">{t('competitorComparison.featuresLabel')}</th>
                  <th className="py-6 px-8 text-center bg-white/[0.02] border-l border-border/60">
                    <span className="text-white block text-base font-bold">{t('competitorComparison.colUs')}</span>
                    <span className="text-xs text-primary font-normal">{t('competitorComparison.colUsSub')}</span>
                  </th>
                  <th className="py-6 px-8 text-center border-l border-border/60">
                    <span className="text-muted-foreground block text-base font-bold">{t('competitorComparison.colThem')}</span>
                    <span className="text-xs text-muted font-normal">{t('competitorComparison.colThemSub')}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {rows.map((row, i) => (
                  <tr key={i} className="transition-colors hover:bg-white/[0.01]">
                    <td className="py-6 px-8 font-medium text-foreground">{row.feature}</td>
                    <td className="py-6 px-8 text-center bg-primary/5 font-semibold text-primary border-l border-border/60">
                      {row.usCheck && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary mr-2">✓</span>
                      )}
                      {row.us}
                    </td>
                    <td className="py-6 px-8 text-center text-muted border-l border-border/60">
                      {row.themX && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-red-400 mr-2">✕</span>
                      )}
                      {row.them}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-violet px-8 py-4 h-12 text-base">
            {t('competitorComparison.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};