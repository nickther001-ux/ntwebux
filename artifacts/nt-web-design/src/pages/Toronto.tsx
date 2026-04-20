import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';
import { ChevronDown, TrendingDown, Zap, Shield, Clock } from 'lucide-react';

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/2Tf3bk6VqhB7JukgrDrS/webhook-trigger/ba4df511-fbe1-4bf5-b0c0-faa2eb2150cf';

/* ── Animated counter ──────────────────────────────────────────── */
function useCountUp(target: number, duration = 1400, active = false) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    started.current = false;
    setVal(0);
  }, [target]);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

function LeakCounter({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  const count = useCountUp(value, 1200, inView);
  const fmt = count.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

  return (
    <div ref={ref} style={{
      fontFamily: '"SF Mono","Fira Code","Cascadia Code",monospace',
      fontSize: 'clamp(36px, 8vw, 72px)',
      fontWeight: 900,
      letterSpacing: '-0.03em',
      lineHeight: 1,
      color: '#ef4444',
      textShadow: '0 0 40px rgba(239,68,68,0.55), 0 0 80px rgba(239,68,68,0.25)',
      fontVariantNumeric: 'tabular-nums',
    }}>
      {fmt}
    </div>
  );
}

/* ── Slider input ──────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.02em' }}>{label}</label>
        <span style={{
          fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em',
          color: '#d4af37',
          fontFamily: '"SF Mono","Fira Code",monospace',
        }}>{format(value)}</span>
      </div>
      <div style={{ position: 'relative', height: '4px' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, borderRadius: '2px', background: 'linear-gradient(90deg, #d4af37, #f5d76e)' }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', height: '100%' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '5px', letterSpacing: '0.04em' }}>
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
}

/* ── Proof stat card ───────────────────────────────────────────── */
function ProofCard({ icon: Icon, stat, label, source }: { icon: typeof TrendingDown; stat: string; label: string; source: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(10,18,36,0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(212,175,55,0.12)',
        borderRadius: '16px',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Icon size={18} color="rgba(212,175,55,0.7)" strokeWidth={1.5} />
      <div style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{stat}</div>
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '10px', color: 'rgba(212,175,55,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px' }}>{source}</div>
    </motion.div>
  );
}

/* ── Main page ─────────────────────────────────────────────────── */
export function Toronto() {
  const { lang } = useLanguage();

  /* Calculator sliders */
  const [price,    setPrice]    = useState(1_500_000);
  const [commRate, setCommRate] = useState(2.5);
  const [leads,    setLeads]    = useState(50);
  const [lossRate, setLossRate] = useState(50);

  const annualLeak = Math.round(
    ((price * (commRate / 100)) * leads * (lossRate / 100)) * 12
  );

  const fmtCAD  = (v: number) => `$${(v / 1_000_000).toFixed(2)}M`;
  const fmtPct  = (v: number) => `${v}%`;
  const fmtNum  = (v: number) => `${v}`;

  /* CTA inline form */
  const [ctaName,  setCtaName]  = useState('');
  const [ctaEmail, setCtaEmail] = useState('');
  const [ctaState, setCtaState] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function handleCtaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ctaName.trim() || !ctaEmail.trim() || ctaState !== 'idle') return;
    setCtaState('sending');
    try {
      await fetch(WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name:           ctaName.trim(),
          email:                ctaEmail.trim(),
          annual_leak_amount:   annualLeak,
          source:               'Toronto Fast Track AI Engine',
        }),
      });
    } catch {
      /* swallow network errors — still show success */
    }
    setCtaState('sent');
  }

  const proof = [
    { icon: TrendingDown, stat: '62%', label: 'of luxury buyer inquiries receive no response within 24 hours', source: 'NAR Research · 2024' },
    { icon: Clock,        stat: '5min',label: 'response window to maximize lead-to-showing conversion',       source: 'Harvard Business Review' },
    { icon: Zap,          stat: '100×', label: 'higher conversion rate when reached in the first 5 minutes',  source: 'Lead Response Mgmt Study' },
    { icon: Shield,       stat: '$0',   label: 'additional ad spend required — just stop leaking what you already generate', source: 'NT Digital Group' },
  ];

  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '140px 24px 80px', overflow: 'hidden', textAlign: 'center' }}>

        {/* Deep gold ambient glow */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)', pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>

          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px', padding: '5px 14px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.22)', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d4af37' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4af37', boxShadow: '0 0 8px rgba(212,175,55,0.8)' }} />
            {lang === 'fr' ? 'Stratégie Immobilière Luxe · Toronto' : 'Luxury Real Estate · Toronto, ON'}
          </div>

          {/* H1 */}
          <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.04em', color: '#fff', marginBottom: '24px' }}>
            {lang === 'fr'
              ? <>Le Moteur de Récupération<br /><span style={{ color: '#d4af37' }}>des Commissions Perdues.</span></>
              : <>The Commission Recovery Engine<br /><span style={{ color: '#d4af37' }}>for Toronto's Elite Teams.</span></>
            }
          </h1>

          {/* Sub */}
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 44px' }}>
            {lang === 'fr'
              ? "Chaque lead non traité en 5 minutes est une commission perdue. Nos systèmes IA changent ça."
              : "Every lead not contacted within 5 minutes is a commission lost. Our AI systems change that — permanently."
            }
          </p>

          {/* Scroll cue */}
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} style={{ display: 'flex', justifyContent: 'center' }}>
            <ChevronDown size={20} color="rgba(212,175,55,0.4)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── CALCULATOR ───────────────────────────────────────── */}
      <section id="calculator" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(8,14,30,0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(212,175,55,0.18)',
              borderRadius: '24px',
              padding: 'clamp(32px, 7vw, 60px)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(212,175,55,0.08)',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <span style={{ display: 'inline-block', marginBottom: '14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d4af37', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.22)', borderRadius: '20px', padding: '4px 14px' }}>
                {lang === 'fr' ? 'Calculateur de Fuites de Commission' : 'Commission Leak Calculator'}
              </span>
              <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 10px' }}>
                {lang === 'fr' ? 'Combien perdez-vous chaque année?' : 'How much are you losing every year?'}
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                {lang === 'fr' ? 'Ajustez les paramètres pour voir votre fuite de commission annuelle.' : 'Adjust the parameters to reveal your annual commission leak.'}
              </p>
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '44px' }}>
              <Slider
                label={lang === 'fr' ? 'Prix moyen de la propriété' : 'Average Property Price'}
                value={price} min={500_000} max={10_000_000} step={100_000}
                format={v => `$${(v / 1_000_000).toFixed(2)}M`}
                onChange={setPrice}
              />
              <Slider
                label={lang === 'fr' ? 'Taux de commission (%)' : 'Commission Rate (%)'}
                value={commRate} min={1} max={5} step={0.1}
                format={fmtPct}
                onChange={setCommRate}
              />
              <Slider
                label={lang === 'fr' ? 'Volume mensuel de leads' : 'Monthly Lead Volume'}
                value={leads} min={5} max={200} step={5}
                format={fmtNum}
                onChange={setLeads}
              />
              <Slider
                label={lang === 'fr' ? 'Leads perdus estimés (%)' : 'Estimated Lead Loss (%)'}
                value={lossRate} min={10} max={90} step={5}
                format={fmtPct}
                onChange={setLossRate}
              />
            </div>

            {/* Result display */}
            <div style={{
              textAlign: 'center',
              padding: 'clamp(28px, 5vw, 44px)',
              background: 'rgba(239,68,68,0.05)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '18px',
              boxShadow: 'inset 0 0 60px rgba(239,68,68,0.06)',
              marginBottom: '28px',
            }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(239,68,68,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 14px' }}>
                {lang === 'fr' ? 'Commission Annuelle Perdue' : 'Annual Lost Commission'}
              </p>
              <LeakCounter value={annualLeak} />
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: '16px 0 0', fontFamily: '"SF Mono","Fira Code",monospace', letterSpacing: '0.04em' }}>
                = ((${(price/1_000_000).toFixed(2)}M × {commRate}%) × {leads} leads × {lossRate}%) × 12 months
              </p>
            </div>

            {/* Breakdown pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '36px' }}>
              {[
                { label: lang === 'fr' ? 'Par commission' : 'Per commission', value: `$${Math.round(price * commRate / 100).toLocaleString('en-CA')}` },
                { label: lang === 'fr' ? 'Perdus / mois' : 'Lost per month', value: `$${Math.round(annualLeak / 12).toLocaleString('en-CA')}` },
                { label: lang === 'fr' ? 'Leads perdus / mois' : 'Leads lost / month', value: `${Math.round(leads * lossRate / 100)}` },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: '14px 16px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#d4af37', letterSpacing: '-0.02em', marginBottom: '4px' }}>{value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* CTA — inline webhook form */}
            {ctaState === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  background: 'rgba(212,175,55,0.06)',
                  border: '1px solid rgba(212,175,55,0.22)',
                  borderRadius: '16px',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>✓</div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#d4af37', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                  {lang === 'fr' ? 'Transmission Reçue.' : 'Transmission Received.'}
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>
                  {lang === 'fr' ? 'Nos systèmes vous contacteront sous peu.' : 'Our systems will contact you shortly.'}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleCtaSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }} className="toronto-cta-grid">
                  <input
                    type="text"
                    value={ctaName}
                    onChange={e => setCtaName(e.target.value)}
                    placeholder={lang === 'fr' ? 'Prénom' : 'First Name'}
                    required
                    disabled={ctaState === 'sending'}
                    style={{
                      padding: '15px 18px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(212,175,55,0.18)',
                      borderRadius: '12px', color: '#fff', fontSize: '14px',
                      outline: 'none', boxSizing: 'border-box', width: '100%',
                      fontFamily: 'inherit', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(212,175,55,0.55)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'rgba(212,175,55,0.18)'; }}
                  />
                  <input
                    type="email"
                    value={ctaEmail}
                    onChange={e => setCtaEmail(e.target.value)}
                    placeholder={lang === 'fr' ? 'Adresse courriel' : 'Email Address'}
                    required
                    disabled={ctaState === 'sending'}
                    style={{
                      padding: '15px 18px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(212,175,55,0.18)',
                      borderRadius: '12px', color: '#fff', fontSize: '14px',
                      outline: 'none', boxSizing: 'border-box', width: '100%',
                      fontFamily: 'inherit', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(212,175,55,0.55)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'rgba(212,175,55,0.18)'; }}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button
                    type="submit"
                    disabled={ctaState === 'sending'}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      padding: '16px 40px', fontSize: '15px', fontWeight: 800,
                      letterSpacing: '-0.01em', borderRadius: '14px', border: 'none',
                      cursor: ctaState === 'sending' ? 'not-allowed' : 'pointer',
                      background: ctaState === 'sending'
                        ? 'rgba(212,175,55,0.4)'
                        : 'linear-gradient(135deg, #d4af37 0%, #f5d76e 50%, #d4af37 100%)',
                      color: '#0a0a0a',
                      boxShadow: ctaState === 'sending' ? 'none' : '0 8px 32px rgba(212,175,55,0.4)',
                      transition: 'transform 0.15s, box-shadow 0.15s, background 0.2s',
                      opacity: ctaState === 'sending' ? 0.75 : 1,
                    }}
                    onMouseEnter={e => { if (ctaState === 'idle') { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 44px rgba(212,175,55,0.55)'; } }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = ctaState === 'idle' ? '0 8px 32px rgba(212,175,55,0.4)' : 'none'; }}
                  >
                    {ctaState === 'sending'
                      ? (lang === 'fr' ? 'Chiffrement & Envoi...' : 'Encrypting & Sending...')
                      : (lang === 'fr' ? 'Récupérer Mes Commissions →' : 'Recover My Commission →')
                    }
                  </button>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '12px', letterSpacing: '0.04em' }}>
                    {lang === 'fr' ? 'Audit technique gratuit · Aucune carte de crédit requise' : 'Free technical audit · No credit card required'}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── PROOF STATS ───────────────────────────────────────── */}
      <section style={{ padding: '60px 24px 100px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(18px, 3.5vw, 26px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 10px' }}>
              {lang === 'fr' ? 'La réalité des équipes immobilières de pointe' : 'The reality of elite real estate teams'}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              {lang === 'fr' ? 'Des données que les meilleures équipes utilisent pour écraser la concurrence.' : 'The data top teams use to dominate their market.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {proof.map(p => <ProofCard key={p.stat + p.label} {...p} />)}
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 560px) {
          .toronto-cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
