import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';

const API_BASE    = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, '');
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/2Tf3bk6VqhB7JukgrDrS/webhook-trigger/d8540795-784f-4424-b207-1c5073e84bb8';

type LangKey = 'en' | 'fr';
type Step = 'choose' | 'contact' | 'generating' | 'success';

function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }
function fmtCAD(n: number) { return '$' + Math.round(n).toLocaleString('en-CA'); }

const PILLARS = [
  {
    key: 'Digital Foundations',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M6 8h12M6 12h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    title:    { en: 'Digital Foundations',      fr: 'Fondations Numériques' },
    sub:      { en: 'High-Performance Web Infrastructure', fr: 'Infrastructure Web Haute Performance' },
    target:   { en: 'Global Authority',         fr: 'Autorité Mondiale' },
    accentColor: '#22d3ee',
    glowColor:   'rgba(34,211,238,0.18)',
    borderGlow:  'rgba(34,211,238,0.4)',
    popular: false,
  },
  {
    key: 'AI Revenue Engine',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    title:    { en: 'AI Revenue Engine',        fr: 'Moteur de Revenus IA' },
    sub:      { en: '24/7 Lead Recovery & SMS Automation', fr: 'Récupération de Leads & Automatisation SMS 24/7' },
    target:   { en: 'High-Volume Sales Teams',  fr: 'Équipes Ventes à Haut Volume' },
    accentColor: '#f59e0b',
    glowColor:   'rgba(245,158,11,0.14)',
    borderGlow:  'rgba(245,158,11,0.45)',
    popular: true,
  },
  {
    key: 'Custom SaaS & Systems',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M17.5 14v7M14 17.5h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    title:    { en: 'Custom SaaS & Systems',    fr: 'SaaS & Systèmes Sur Mesure' },
    sub:      { en: 'Private Multi-tenant Infrastructure', fr: 'Infrastructure Multi-locataire Privée' },
    target:   { en: 'Enterprise Logic',         fr: 'Logique Entreprise' },
    accentColor: '#6366f1',
    glowColor:   'rgba(99,102,241,0.14)',
    borderGlow:  'rgba(99,102,241,0.4)',
    popular: false,
  },
];

const copy = {
  step1Badge:   { en: 'System Configuration',              fr: 'Configuration Système' },
  step1Title:   { en: 'Define Your System Architecture.',  fr: 'Définissez Votre Architecture Système.' },
  step1Sub:     { en: 'Select the infrastructure node you need to deploy.', fr: "Sélectionnez le nœud d'infrastructure à déployer." },
  continueBtn:  { en: 'Continue →',                        fr: 'Continuer →' },
  step2Badge:   { en: 'Deployment Authorization',          fr: 'Autorisation de Déploiement' },
  step2Title:   { en: 'Authorize System Deployment.',      fr: 'Autorisez le Déploiement Système.' },
  step2Sub:     { en: 'Your contact details',              fr: 'Vos coordonnées' },
  firstNamePH:  { en: 'First Name',                        fr: 'Prénom' },
  emailPH:      { en: 'your@email.com',                    fr: 'votre@email.com' },
  submitBtn:    { en: 'Request System Deployment →',       fr: 'Demander le Déploiement →' },
  back:         { en: '← Back',                            fr: '← Retour' },
  generating:   { en: 'Encrypting & Sending…',             fr: 'Chiffrement & Envoi…' },
  successTitle: { en: 'Transmission Received.',            fr: 'Transmission Reçue.' },
  successSub:   { en: 'Our systems will contact you shortly.', fr: 'Nos systèmes vous contacteront sous peu.' },
  close:        { en: 'Close',                             fr: 'Fermer' },
  leakLabel:    { en: 'Annual Revenue Leak',               fr: 'Fuite de Revenus Annuelle' },
  propPrice:    { en: 'Avg. Property Price',               fr: 'Prix Moyen de la Propriété' },
  commPct:      { en: 'Commission %',                      fr: 'Commission %' },
  monthlyLeads: { en: 'Monthly Leads',                     fr: 'Prospects Mensuels' },
  target:       { en: 'TARGET',                            fr: 'CIBLE' },
  popular:      { en: 'MOST POPULAR',                      fr: 'LE PLUS POPULAIRE' },
};

interface Props { open: boolean; onClose: () => void; }

export function ProjectBriefModal({ open, onClose }: Props) {
  const { lang } = useLanguage();
  const l = lang as LangKey;

  const [step, setStep]           = useState<Step>('choose');
  const [selected, setSelected]   = useState<number | null>(null);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail]         = useState('');
  const [genPct, setGenPct]       = useState(0);
  const [slide, setSlide]         = useState(false);

  /* ROI Calculator state */
  const [propPrice, setPropPrice]     = useState(750000);
  const [commPct, setCommPct]         = useState(2.5);
  const [monthLeads, setMonthLeads]   = useState(20);

  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef    = useRef<HTMLInputElement>(null);

  const annualLeak = propPrice * (commPct / 100) * monthLeads * 12 * 0.5;
  const showCalc   = selected === 1;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (step === 'contact') setTimeout(() => nameRef.current?.focus(), 120);
    if (step === 'generating') {
      setGenPct(0);
      let p = 0;
      const iv = setInterval(() => { p += 4; setGenPct(Math.min(p, 100)); if (p >= 100) clearInterval(iv); }, 60);
      const t  = setTimeout(() => setStep('success'), 1600);
      return () => { clearInterval(iv); clearTimeout(t); };
    }
  }, [step]);

  function handleClose() {
    onClose();
    setTimeout(() => { setStep('choose'); setSelected(null); setFirstName(''); setEmail(''); setGenPct(0); setSlide(false); }, 320);
  }

  function handleContinue() {
    if (selected === null) return;
    setSlide(true);
    setTimeout(() => { setStep('contact'); setSlide(false); }, 280);
  }

  function handleBack() {
    setSlide(true);
    setTimeout(() => { setStep('choose'); setSlide(false); }, 280);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setStep('generating');

    const pillar        = selected !== null ? PILLARS[selected] : null;
    const selectedSystem = pillar?.key ?? 'Vision Brief';
    const choiceTitle   = pillar ? bi(pillar.title, l) : 'Vision Brief';
    const choiceSub     = pillar ? bi(pillar.sub, l)   : '—';
    const leakAmount    = showCalc ? annualLeak : 0;

    fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name:         firstName.trim(),
        email:              email.trim(),
        selected_system:    selectedSystem,
        annual_leak_amount: leakAmount,
        source:             'Toronto Fast Track',
      }),
    }).then(res => {
      console.log('[ProjectBriefModal] webhook:', res.status);
    }).catch(err => {
      console.error('[ProjectBriefModal] webhook failed:', err);
    });

    fetch(`${API_BASE}/api/intake`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:    email.trim(),
        name:     firstName.trim(),
        plan:     { name: choiceTitle, price: '—' },
        siteType: choiceSub,
        style:    'custom',
        lang,
        business: '', industry: '', description: '', city: '',
        goals: [], hasLogo: '', hasContent: '', hasExistingSite: '',
        existingUrl: '', phone: '', bestTime: '', method: 'email', notes: '',
      }),
    }).catch(() => {});
  }

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#fff', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(2,6,23,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'vbm-fade 0.2s ease',
        overflowY: 'auto',
      }}
    >
      <div style={{
        width: '100%', maxWidth: '520px',
        background: 'linear-gradient(160deg,rgba(15,23,42,0.98) 0%,rgba(2,6,23,0.99) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: 'clamp(22px,4vw,40px)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
        overflow: 'hidden',
        animation: 'vbm-up 0.32s cubic-bezier(0.22,1,0.36,1)',
        position: 'relative',
        margin: 'auto',
      }}>

        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{ position: 'absolute', top: '14px', right: '14px', width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', zIndex: 2 }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.background='rgba(255,255,255,0.09)'; b.style.color='#fff'; }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.background='rgba(255,255,255,0.03)'; b.style.color='rgba(255,255,255,0.4)'; }}
        >×</button>

        <div style={{ opacity: slide ? 0 : 1, transform: slide ? 'translateX(-10px)' : 'none', transition: 'opacity 0.24s ease, transform 0.24s ease' }}>

          {/* ══ STEP 1 ══ */}
          {step === 'choose' && (
            <>
              <div style={{ marginBottom: '24px', paddingRight: '28px' }}>
                <span style={{ display: 'inline-block', marginBottom: '12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#22d3ee', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: '20px', padding: '3px 11px', fontFamily: "'Courier New', monospace" }}>
                  {bi(copy.step1Badge, l)}
                </span>
                <h2 style={{ fontSize: 'clamp(1.2rem,3.8vw,1.6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 8px', lineHeight: 1.1 }}>
                  {bi(copy.step1Title, l)}
                </h2>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.5 }}>
                  {bi(copy.step1Sub, l)}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {PILLARS.map((p, i) => {
                  const isSelected = selected === i;
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                      <button
                        onClick={() => setSelected(i === selected ? null : i)}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '14px',
                          padding: '16px 18px', borderRadius: '12px',
                          border: isSelected ? `1px solid ${p.borderGlow}` : '1px solid rgba(51,65,85,0.6)',
                          background: isSelected ? p.glowColor : 'rgba(15,23,42,0.6)',
                          cursor: 'pointer', textAlign: 'left', width: '100%',
                          transition: 'all 0.2s',
                          boxShadow: isSelected ? `0 0 24px ${p.glowColor}, inset 0 0 20px rgba(0,0,0,0.2)` : 'none',
                          outline: 'none',
                          backdropFilter: 'blur(8px)',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        onMouseEnter={e => {
                          if (!isSelected) {
                            const b = e.currentTarget;
                            b.style.borderColor = p.borderGlow;
                            b.style.background  = p.glowColor;
                            b.style.boxShadow   = `0 0 16px ${p.glowColor}`;
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isSelected) {
                            const b = e.currentTarget;
                            b.style.borderColor = 'rgba(51,65,85,0.6)';
                            b.style.background  = 'rgba(15,23,42,0.6)';
                            b.style.boxShadow   = 'none';
                          }
                        }}
                      >
                        {p.popular && (
                          <span style={{
                            position: 'absolute', top: '0', right: '0',
                            fontSize: '7.5px', fontWeight: 800, letterSpacing: '0.14em',
                            color: '#f59e0b', background: 'rgba(245,158,11,0.15)',
                            border: '1px solid rgba(245,158,11,0.3)',
                            borderRadius: '0 12px 0 8px',
                            padding: '3px 9px',
                            fontFamily: "'Courier New', monospace",
                            textTransform: 'uppercase',
                          }}>
                            {bi(copy.popular, l)}
                          </span>
                        )}

                        <div style={{ color: p.accentColor, flexShrink: 0, marginTop: '1px' }}>
                          {p.icon}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', marginBottom: '3px' }}>
                            {bi(p.title, l)}
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4, marginBottom: '8px' }}>
                            {bi(p.sub, l)}
                          </div>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', color: p.accentColor, fontFamily: "'Courier New', monospace", textTransform: 'uppercase', opacity: 0.7 }}>
                              {bi(copy.target, l)}
                            </span>
                            <span style={{ fontSize: '9px', fontWeight: 600, color: p.accentColor, fontFamily: "'Courier New', monospace", letterSpacing: '0.06em' }}>
                              {bi(p.target, l)}
                            </span>
                          </div>
                        </div>

                        <div style={{
                          width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
                          border: isSelected ? `2px solid ${p.accentColor}` : '1.5px solid rgba(255,255,255,0.2)',
                          background: isSelected ? p.accentColor : 'transparent',
                          transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {isSelected && (
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </button>

                      {/* ── Inline ROI Calculator (Card 2 only) ── */}
                      {i === 1 && isSelected && (
                        <div style={{
                          marginTop: '8px',
                          padding: '18px 20px',
                          background: 'rgba(245,158,11,0.04)',
                          border: '1px solid rgba(245,158,11,0.18)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(8px)',
                          animation: 'vbm-expand 0.25s ease',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.7)', fontFamily: "'Courier New', monospace" }}>
                              // Revenue Leak Calculator
                            </span>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', fontFamily: "'Courier New', monospace", marginBottom: '1px' }}>
                                {bi(copy.leakLabel, l)}
                              </div>
                              <div style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.05em', color: '#ef4444', textShadow: '0 0 20px rgba(239,68,68,0.6)' }}>
                                {fmtCAD(annualLeak)}
                              </div>
                            </div>
                          </div>

                          {[
                            { label: bi(copy.propPrice, l), value: propPrice, min: 200000, max: 3000000, step: 50000, fmt: fmtCAD, set: setPropPrice },
                            { label: `${bi(copy.commPct, l)} (${commPct.toFixed(1)}%)`, value: commPct,   min: 1,      max: 5,       step: 0.1,   fmt: (v: number) => `${v.toFixed(1)}%`, set: setCommPct },
                            { label: bi(copy.monthlyLeads, l), value: monthLeads, min: 5, max: 200, step: 5, fmt: (v: number) => String(v), set: setMonthLeads },
                          ].map(({ label, value, min, max, step, fmt, set }) => (
                            <div key={label} style={{ marginBottom: '14px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Courier New', monospace", letterSpacing: '0.04em' }}>{label}</span>
                                <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 700, fontFamily: "'Courier New', monospace" }}>{fmt(value)}</span>
                              </div>
                              <div style={{ position: 'relative', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px' }}>
                                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${((value - min) / (max - min)) * 100}%`, background: 'linear-gradient(90deg,#f59e0b,#ef4444)', borderRadius: '99px', boxShadow: '0 0 8px rgba(245,158,11,0.5)' }} />
                                <input
                                  type="range" min={min} max={max} step={step} value={value}
                                  onChange={e => set(Number(e.target.value))}
                                  style={{ position: 'absolute', inset: '-8px 0', opacity: 0, cursor: 'pointer', width: '100%', margin: 0 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleContinue}
                disabled={selected === null}
                style={{
                  width: '100%', padding: '14px 20px', borderRadius: '10px', border: 'none',
                  background: selected !== null
                    ? `linear-gradient(135deg, ${PILLARS[selected].accentColor}cc, ${PILLARS[selected].accentColor})`
                    : 'rgba(255,255,255,0.05)',
                  color: selected !== null ? (selected === 1 ? '#000' : '#fff') : 'rgba(255,255,255,0.2)',
                  fontSize: '13.5px', fontWeight: 700, cursor: selected !== null ? 'pointer' : 'not-allowed',
                  letterSpacing: '-0.01em',
                  boxShadow: selected !== null ? `0 6px 28px ${PILLARS[selected].glowColor}, 0 0 0 1px ${PILLARS[selected].borderGlow}44` : 'none',
                  transition: 'all 0.25s',
                }}
              >
                {bi(copy.continueBtn, l)}
              </button>
            </>
          )}

          {/* ══ STEP 2: CONTACT ══ */}
          {step === 'contact' && (
            <>
              <div style={{ marginBottom: '24px', paddingRight: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#22d3ee', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: '20px', padding: '3px 11px', fontFamily: "'Courier New', monospace" }}>
                    {bi(copy.step2Badge, l)}
                  </span>
                  {selected !== null && (
                    <span style={{ fontSize: '10px', color: PILLARS[selected].accentColor, fontWeight: 600, fontFamily: "'Courier New', monospace", opacity: 0.8 }}>
                      [{bi(PILLARS[selected].title, l)}]
                    </span>
                  )}
                </div>
                <h2 style={{ fontSize: 'clamp(1.1rem,3.4vw,1.45rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 6px', lineHeight: 1.15 }}>
                  {bi(copy.step2Title, l)}
                </h2>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                  {bi(copy.step2Sub, l)}
                </p>
              </div>

              {selected === 1 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', padding: '12px 16px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '10px' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontFamily: "'Courier New', monospace", letterSpacing: '0.06em' }}>
                    {bi(copy.leakLabel, l)}
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ef4444', letterSpacing: '-0.04em', textShadow: '0 0 14px rgba(239,68,68,0.5)' }}>
                    {fmtCAD(annualLeak)}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  ref={nameRef}
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder={bi(copy.firstNamePH, l)}
                  required
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = selected !== null ? PILLARS[selected].borderGlow : 'rgba(59,130,246,0.5)'; e.target.style.boxShadow = `0 0 0 3px ${selected !== null ? PILLARS[selected].glowColor : 'rgba(59,130,246,0.1)'}`; }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={bi(copy.emailPH, l)}
                  required
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = selected !== null ? PILLARS[selected].borderGlow : 'rgba(59,130,246,0.5)'; e.target.style.boxShadow = `0 0 0 3px ${selected !== null ? PILLARS[selected].glowColor : 'rgba(59,130,246,0.1)'}`; }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    style={{ padding: '13px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '12px', fontWeight: 600, transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.borderColor='rgba(255,255,255,0.22)'; b.style.color='rgba(255,255,255,0.65)'; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.borderColor='rgba(255,255,255,0.08)'; b.style.color='rgba(255,255,255,0.4)'; }}
                  >
                    {bi(copy.back, l)}
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1, padding: '13px 18px', borderRadius: '10px', border: 'none',
                      background: selected !== null
                        ? `linear-gradient(135deg, ${PILLARS[selected].accentColor}cc, ${PILLARS[selected].accentColor})`
                        : 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
                      color: selected === 1 ? '#000' : '#fff',
                      fontSize: '12.5px', fontWeight: 700, cursor: 'pointer',
                      letterSpacing: '-0.01em',
                      boxShadow: selected !== null
                        ? `0 6px 24px ${PILLARS[selected].glowColor}, 0 0 0 1px ${PILLARS[selected].borderGlow}44`
                        : '0 6px 24px rgba(59,130,246,0.35)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.transform='translateY(-1px)'; b.style.filter='brightness(1.1)'; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.transform='none'; b.style.filter='none'; }}
                  >
                    {bi(copy.submitBtn, l)}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ══ GENERATING ══ */}
          {step === 'generating' && (
            <div style={{ textAlign: 'center', padding: '28px 0' }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#22c55e', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: '20px', padding: '4px 14px', marginBottom: '18px', fontFamily: "'Courier New', monospace" }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'vbm-pulse 0.9s infinite' }} />
                  {bi(copy.generating, l)}
                </div>
                {selected !== null && (
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: '10px', color: `${PILLARS[selected].accentColor}88`, letterSpacing: '0.08em', marginBottom: '4px' }}>
                    NODE: {PILLARS[selected].key.toUpperCase()}
                  </div>
                )}
              </div>
              <div style={{ maxWidth: '280px', margin: '0 auto' }}>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${genPct}%`, background: selected !== null ? `linear-gradient(90deg,${PILLARS[selected].accentColor}88,${PILLARS[selected].accentColor})` : 'linear-gradient(90deg,#3b82f6,#22c55e)', borderRadius: '99px', transition: 'width 0.06s linear', boxShadow: selected !== null ? `0 0 10px ${PILLARS[selected].glowColor}` : '0 0 10px rgba(59,130,246,0.5)' }} />
                </div>
                <div style={{ marginTop: '8px', fontSize: '10px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', fontFamily: "'Courier New', monospace" }}>{Math.round(genPct)}%</div>
              </div>
            </div>
          )}

          {/* ══ SUCCESS ══ */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: selected !== null ? PILLARS[selected].glowColor : 'rgba(59,130,246,0.1)',
                border: `1px solid ${selected !== null ? PILLARS[selected].borderGlow : 'rgba(59,130,246,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '22px',
                color: selected !== null ? PILLARS[selected].accentColor : '#60a5fa',
                boxShadow: selected !== null ? `0 0 28px ${PILLARS[selected].glowColor}` : '0 0 20px rgba(59,130,246,0.25)',
              }}>✓</div>
              <h3 style={{ fontSize: 'clamp(1.15rem,3.5vw,1.45rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 10px' }}>
                {bi(copy.successTitle, l)}
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '0 0 26px', lineHeight: 1.7, maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>
                {bi(copy.successSub, l)}
              </p>
              <button
                onClick={handleClose}
                style={{ padding: '11px 26px', fontSize: '12px', fontWeight: 600, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.borderColor='rgba(255,255,255,0.25)'; b.style.color='#fff'; }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.borderColor='rgba(255,255,255,0.1)'; b.style.color='rgba(255,255,255,0.45)'; }}
              >
                {bi(copy.close, l)}
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes vbm-fade   { from { opacity:0 } to { opacity:1 } }
        @keyframes vbm-up     { from { opacity:0; transform:translateY(22px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes vbm-pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @keyframes vbm-expand { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#f59e0b; cursor:pointer; box-shadow:0 0 6px rgba(245,158,11,0.6); }
        input[type=range]::-moz-range-thumb    { width:14px; height:14px; border-radius:50%; background:#f59e0b; cursor:pointer; border:none; box-shadow:0 0 6px rgba(245,158,11,0.6); }
      `}</style>
    </div>
  );
}
