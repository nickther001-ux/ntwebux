import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import {
  HardHat, Wrench, Stethoscope, Scale,
  ShoppingBag, Cloud, Utensils, Sparkles,
} from 'lucide-react';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  metric: string;
  metricLabel: string;
  img: string;
  industry: string;
}

/* Highlight numeric/result phrases inside a quote.
   Returns an array of React-friendly fragments (string | JSX). */
function highlightMetrics(quote: string): Array<string | { mark: string }> {
  /* Matches: 95%, +40%, +67%, 2× leads, 24/7, 6 weeks, 6 semaines,
     72 hours, doubled, doublé, tripled, triplé, $X, X stars, 5★ */
  const re = /(\+?\d+(?:[.,]\d+)?\s?%|\b\d+\s?[×x]\s?[\p{L}]+|\d+\/\d+|\b\d+\s?(?:weeks?|semaines?|hours?|heures?|days?|jours?|months?|mois|fois)\b|\bdoubled?\b|\bdoubl[ée]e?s?\b|\btripled?\b|\btripl[ée]e?s?\b|\$\s?\d+[KkMm]?|\d+★|\b5\s?stars?\b)/giu;
  const out: Array<string | { mark: string }> = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(quote)) !== null) {
    if (m.index > last) out.push(quote.slice(last, m.index));
    out.push({ mark: m[0] });
    last = m.index + m[0].length;
  }
  if (last < quote.length) out.push(quote.slice(last));
  return out;
}

/* ── Animated star rating counter ──────────────────────────────── */
function StarRatingCounter({ label }: { label: string }) {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setCount(0);
    const DURATION = 3200;
    const STEPS    = 160;
    const INTERVAL = DURATION / STEPS;
    let step = 0;
    const iv = setInterval(() => {
      step++;
      setCount(Math.min(step * (5 / STEPS), 5));
      if (step >= STEPS) clearInterval(iv);
    }, INTERVAL);
    return () => clearInterval(iv);
  }, [started]);

  const filled = Math.min(Math.floor(count + 0.12), 5);

  return (
    <div ref={ref} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      {/* Counting number */}
      <span style={{
        fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
        fontSize: '48px',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        color: '#fff',
        lineHeight: 1,
        minWidth: '80px',
        textAlign: 'center',
      }}>
        {count.toFixed(1)}
      </span>

      {/* Accumulating stars */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <svg
            key={i}
            width="28" height="28" viewBox="0 0 24 24"
            style={{
              transition: 'opacity 0.25s ease, filter 0.4s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              opacity:    i <= filled ? 1 : 0.12,
              filter:     i <= filled ? 'drop-shadow(0 0 8px rgba(251,191,36,0.7))' : 'none',
              transform:  i <= filled ? 'scale(1.12)' : 'scale(0.88)',
            }}
          >
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={i <= filled ? '#fbbf24' : 'rgba(255,255,255,0.15)'}
            />
          </svg>
        ))}
      </div>

      {/* Label */}
      <span style={{
        fontFamily: '"SF Mono","Fira Code","Cascadia Code","Courier New",monospace',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        marginTop: '2px',
      }}>
        {label}
      </span>
    </div>
  );
}

/* Industry → icon mapping (works in both EN and FR) */
function industryIcon(industry: string) {
  const i = industry.toLowerCase();
  if (i.includes('construction'))                    return HardHat;
  if (i.includes('hvac') || i.includes('cvc'))       return Wrench;
  if (i.includes('health') || i.includes('santé') ||
      i.includes('sante')  || i.includes('medical')) return Stethoscope;
  if (i.includes('legal') || i.includes('droit'))    return Scale;
  if (i.includes('commerce'))                        return ShoppingBag;
  if (i.includes('saas'))                            return Cloud;
  if (i.includes('restaurant'))                      return Utensils;
  return Sparkles; /* Wellness / Bien-être / fallback */
}

export function Testimonials() {
  const { t, lang } = useLanguage();
  const items = t('testimonials.items') as TestimonialItem[];

  /* Bilingual chrome strings */
  const eyebrow = lang === 'fr' ? 'Témoignages' : 'Testimonials';
  const ratingLabel = lang === 'fr' ? 'Note Clients' : 'Client Rating';
  const verifiedLabel = lang === 'fr' ? 'Vérifié' : 'Verified';
  const tickerLabel   = lang === 'fr' ? 'Industries servies' : 'Industries served';
  const heading = lang === 'fr'
    ? <><span className="gradient-text">Résultats réels.</span><br />Clients réels.</>
    : <><span className="gradient-text">Real results.</span><br />Real clients.</>;

  /* Logo cloud — bilingual industry labels with monochrome icons */
  const tickerItems: Array<{ label: string; Icon: typeof HardHat }> = lang === 'fr'
    ? [
        { label: 'Construction', Icon: HardHat },
        { label: 'CVC',          Icon: Wrench },
        { label: 'Santé',        Icon: Stethoscope },
        { label: 'Juridique',    Icon: Scale },
        { label: 'E-commerce',   Icon: ShoppingBag },
        { label: 'SaaS',         Icon: Cloud },
      ]
    : [
        { label: 'Construction', Icon: HardHat },
        { label: 'HVAC',         Icon: Wrench },
        { label: 'Medical',      Icon: Stethoscope },
        { label: 'Legal',        Icon: Scale },
        { label: 'E-commerce',   Icon: ShoppingBag },
        { label: 'SaaS',         Icon: Cloud },
      ];

  return (
    <section id="testimonials" style={{
      width: '100%', padding: '120px 24px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
    }}>
      {/* soft ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '900px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* ── Header ──────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="pill-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>
            {eyebrow}
          </span>

          <h2 style={{
            fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800,
            letterSpacing: '-0.02em', marginTop: '12px', marginBottom: '20px',
          }}>
            {heading}
          </h2>

          {/* Animated star rating counter */}
          <StarRatingCounter label={ratingLabel} />
        </div>

        {/* ── Masonry Wall of Love ───────────────────────────── */}
        <div className="wol-masonry">
          {items.map((item, i) => {
            const IndustryIcon = industryIcon(item.industry);
            const fragments    = highlightMetrics(item.quote);
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="wol-card"
              >
                {/* Industry tag (top-right) */}
                <div className="wol-industry-tag">
                  <IndustryIcon size={11} strokeWidth={2} />
                  {item.industry}
                </div>

                {/* Metric pill */}
                <div className="wol-metric">
                  <span className="wol-metric-value">{item.metric}</span>
                  <span className="wol-metric-label">{item.metricLabel}</span>
                </div>

                {/* Quote — with metric phrases highlighted */}
                <p className="wol-quote">
                  <span className="wol-quote-mark" aria-hidden="true">“</span>
                  {fragments.map((f, idx) =>
                    typeof f === 'string'
                      ? <span key={idx}>{f}</span>
                      : <mark key={idx} className="wol-highlight">{f.mark}</mark>
                  )}
                  <span className="wol-quote-mark" aria-hidden="true">”</span>
                </p>

                {/* Author block */}
                <footer className="wol-author">
                  <div className="wol-avatar">
                    {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="wol-author-name">
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </span>
                      {/* Verified checkmark */}
                      <span className="wol-verified" title={verifiedLabel} aria-label={verifiedLabel}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 2 L14.39 4.42 L17.74 3.79 L18.91 6.99 L22 8.5 L21.09 11.79 L23 14.5 L20.39 16.79 L20.5 20 L17.21 19.91 L15.5 22.62 L12 21 L8.5 22.62 L6.79 19.91 L3.5 20 L3.61 16.79 L1 14.5 L2.91 11.79 L2 8.5 L5.09 6.99 L6.26 3.79 L9.61 4.42 Z"
                            fill="#22d3ee" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5" strokeLinejoin="round" />
                          <path d="M8 12.2 L11 15.2 L16.2 9.5" stroke="#02040a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      </span>
                    </div>
                    <div className="wol-author-role">{item.role}</div>
                  </div>
                  {/* 5 stars */}
                  <div className="wol-stars">
                    {[1, 2, 3, 4, 5].map(j => (
                      <svg key={j} width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                </footer>
              </motion.article>
            );
          })}
        </div>

        {/* ── Industry Ticker (logo cloud) ───────────────────── */}
        <div className="wol-ticker-wrap" aria-label={tickerLabel}>
          <div className="wol-ticker-fade wol-ticker-fade--left"  />
          <div className="wol-ticker-fade wol-ticker-fade--right" />
          <div className="wol-ticker-track">
            {[...tickerItems, ...tickerItems, ...tickerItems].map(({ label, Icon }, idx) => (
              <div key={idx} className="wol-ticker-item">
                <Icon size={18} strokeWidth={1.6} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ─── Masonry grid (CSS columns) ─── */
        .wol-masonry {
          column-count: 3;
          column-gap: 22px;
        }
        @media (max-width: 980px) { .wol-masonry { column-count: 2; } }
        @media (max-width: 640px) { .wol-masonry { column-count: 1; } }

        .wol-card {
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          page-break-inside: avoid;
          margin: 0 0 22px;
          padding: 22px 22px 18px;
          border-radius: 16px;
          background-color: rgba(255,255,255,0.02);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.10);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }
        .wol-card:hover {
          border-color: rgba(34,211,238,0.45);
          background-color: rgba(255,255,255,0.035);
          box-shadow:
            0 0 0 1px rgba(34,211,238,0.18),
            0 0 32px rgba(34,211,238,0.15),
            0 12px 40px -12px rgba(0,0,0,0.6);
          transform: translateY(-2px);
        }

        /* Industry tag (top-right of each card) */
        .wol-industry-tag {
          align-self: flex-end;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: -4px;
        }
        .wol-industry-tag svg { color: rgba(147,197,253,0.85); }

        /* Headline metric */
        .wol-metric {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .wol-metric-value {
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #67e8f9 0%, #818cf8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .wol-metric-label {
          font-size: 11px;
          color: rgba(255,255,255,0.42);
          font-weight: 500;
        }

        /* Quote */
        .wol-quote {
          font-size: 14.5px;
          color: rgba(255,255,255,0.72);
          line-height: 1.72;
          margin: 0;
          flex: 1;
        }
        .wol-quote-mark {
          color: rgba(34,211,238,0.45);
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 18px;
          line-height: 0;
          margin: 0 2px;
          vertical-align: -2px;
        }
        .wol-highlight {
          background: linear-gradient(180deg, transparent 60%, rgba(34,211,238,0.22) 60%);
          color: #e5e7eb;
          font-weight: 700;
          padding: 0 2px;
          border-radius: 2px;
        }

        /* Author footer */
        .wol-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .wol-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          flex-shrink: 0;
          background: linear-gradient(135deg, rgba(34,211,238,0.30), rgba(99,102,241,0.40));
          border: 1px solid rgba(34,211,238,0.30);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800;
          color: #ecfeff;
          letter-spacing: 0.02em;
        }
        .wol-author-name {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          max-width: 100%;
        }
        .wol-verified {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          filter: drop-shadow(0 0 4px rgba(34,211,238,0.45));
        }
        .wol-author-role {
          font-size: 11px;
          color: rgba(255,255,255,0.40);
          margin-top: 2px;
          line-height: 1.3;
        }
        .wol-stars {
          display: flex;
          gap: 1.5px;
          margin-left: auto;
          flex-shrink: 0;
        }

        /* ─── Industry ticker / logo cloud ─── */
        .wol-ticker-wrap {
          position: relative;
          margin-top: 56px;
          padding: 22px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .wol-ticker-fade {
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .wol-ticker-fade--left {
          left: 0;
          background: linear-gradient(to right, #02040a 0%, transparent 100%);
        }
        .wol-ticker-fade--right {
          right: 0;
          background: linear-gradient(to left, #02040a 0%, transparent 100%);
        }
        .wol-ticker-track {
          display: flex;
          align-items: center;
          gap: 64px;
          width: max-content;
          animation: wol-ticker 38s linear infinite;
          will-change: transform;
        }
        .wol-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.42);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .wol-ticker-item:hover { color: #67e8f9; }
        .wol-ticker-item svg   { opacity: 0.85; }
        @keyframes wol-ticker {
          from { transform: translate3d(0, 0, 0); }
          /* Triple-tile the list, advance by exactly one tile (-33.333%) for a seamless loop */
          to   { transform: translate3d(-33.3333%, 0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .wol-ticker-track,
          .wol-live-dot { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
