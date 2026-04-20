import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';

const API_BASE    = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, '');
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/2Tf3bk6VqhB7JukgrDrS/webhook-trigger/d8540795-784f-4424-b207-1c5073e84bb8';

type LangKey = 'en' | 'fr';
type Step = 'choose' | 'contact' | 'generating' | 'success';

function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

const choices = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="6" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 10h12M8 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="21" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title:    { en: 'High-Performance Website', fr: 'Site Web Haute Performance' },
    sub:      { en: 'Digital Foundations',       fr: 'Fondations Numériques' },
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3M6.93 6.93l2.12 2.12M18.95 18.95l2.12 2.12M6.93 21.07l2.12-2.12M18.95 9.05l2.12-2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title:    { en: 'AI Automation',            fr: 'Automatisation IA' },
    sub:      { en: 'Lead Recovery & Systems',  fr: 'Récupération de Leads & Systèmes' },
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="16" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="4" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 16v8M16 20h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title:    { en: 'Custom SaaS',              fr: 'SaaS Personnalisé' },
    sub:      { en: 'Web Apps & Infrastructure', fr: 'Apps Web & Infrastructure' },
  },
];

const copy = {
  step1Badge:   { en: 'Step 1 of 2',                          fr: 'Étape 1 sur 2' },
  step1Title:   { en: 'What are we building?',                fr: 'Que construisons-nous ?' },
  step2Badge:   { en: 'Step 2 of 2',                          fr: 'Étape 2 sur 2' },
  step2Title:   { en: 'Where should we send the architecture plan?', fr: "Où devrions-nous envoyer le plan d'architecture ?" },
  step2Sub:     { en: 'Your contact details',                 fr: 'Vos coordonnées' },
  firstNamePH:  { en: 'First Name',                           fr: 'Prénom' },
  emailPH:      { en: 'your@email.com',                       fr: 'votre@email.com' },
  submitBtn:    { en: 'Submit →',                             fr: 'Envoyer →' },
  back:         { en: '← Back',                               fr: '← Retour' },
  generating:   { en: 'Encrypting & Sending…',                fr: 'Chiffrement & Envoi…' },
  successTitle: { en: 'Transmission Received.',               fr: 'Transmission Reçue.' },
  successSub:   { en: 'Our systems will contact you shortly.', fr: 'Nos systèmes vous contacteront sous peu.' },
  close:        { en: 'Close',                                fr: 'Fermer' },
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
  const overlayRef                = useRef<HTMLDivElement>(null);
  const nameRef                   = useRef<HTMLInputElement>(null);
  const emailRef                  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (step === 'contact') {
      setTimeout(() => nameRef.current?.focus(), 120);
    }
    if (step === 'generating') {
      setGenPct(0);
      let p = 0;
      const iv = setInterval(() => {
        p += 4;
        setGenPct(Math.min(p, 100));
        if (p >= 100) clearInterval(iv);
      }, 60);
      const t = setTimeout(() => setStep('success'), 1550);
      return () => { clearInterval(iv); clearTimeout(t); };
    }
  }, [step]);

  function handleClose() {
    onClose();
    setTimeout(() => { setStep('choose'); setSelected(null); setFirstName(''); setEmail(''); setGenPct(0); setSlide(false); }, 320);
  }

  function handleChoose(idx: number) {
    setSelected(idx);
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

    const choiceTitle = selected !== null ? bi(choices[selected].title, l) : 'Vision Brief';
    const choiceSub   = selected !== null ? bi(choices[selected].sub, l)   : '—';

    /* ── CRM Webhook (primary) ── */
    fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name:         firstName.trim(),
        email:              email.trim(),
        annual_leak_amount: 0,
        source:             'Toronto Fast Track AI Engine',
      }),
    }).then(res => {
      console.log('[ProjectBriefModal] webhook response:', res.status);
    }).catch(err => {
      console.error('[ProjectBriefModal] webhook failed:', err);
    });

    /* ── Owner email notification (secondary, fire-and-forget) ── */
    fetch(`${API_BASE}/api/intake`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:           email.trim(),
        name:            firstName.trim(),
        plan:            { name: choiceTitle, price: '—' },
        siteType:        choiceSub,
        style:           'custom',
        lang,
        business: '', industry: '', description: '', city: '',
        goals: [], hasLogo: '', hasContent: '', hasExistingSite: '',
        existingUrl: '', phone: '', bestTime: '', method: 'email', notes: '',
      }),
    }).catch(() => {});
  }

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(2,6,23,0.9)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'vbm-fade 0.2s ease',
      }}
    >
      <div style={{
        width: '100%', maxWidth: '500px',
        background: 'rgba(2,6,23,0.92)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: 'clamp(24px,5vw,44px)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
        overflow: 'hidden',
        animation: 'vbm-up 0.3s cubic-bezier(0.22,1,0.36,1)',
        position: 'relative',
      }}>

        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{ position: 'absolute', top: '16px', right: '16px', width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background='rgba(255,255,255,0.1)'; b.style.color='#fff'; }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background='rgba(255,255,255,0.04)'; b.style.color='rgba(255,255,255,0.45)'; }}
        >×</button>

        <div style={{ opacity: slide ? 0 : 1, transform: slide ? 'translateX(-12px)' : 'translateX(0)', transition: 'opacity 0.25s ease, transform 0.25s ease' }}>

          {/* ── STEP 1: CHOOSE ── */}
          {step === 'choose' && (
            <>
              <div style={{ marginBottom: '28px', paddingRight: '32px' }}>
                <span style={{ display: 'inline-block', marginBottom: '14px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.22)', borderRadius: '20px', padding: '3px 12px' }}>
                  {bi(copy.step1Badge, l)}
                </span>
                <h2 style={{ fontSize: 'clamp(1.3rem,4vw,1.75rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', margin: 0, lineHeight: 1.1 }}>
                  {bi(copy.step1Title, l)}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {choices.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoose(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '18px',
                      padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.09)',
                      background: selected === i ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer', textAlign: 'left', width: '100%',
                      transition: 'all 0.18s',
                      outline: 'none',
                    }}
                    onMouseEnter={e => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.background = 'rgba(59,130,246,0.1)';
                      b.style.borderColor = 'rgba(59,130,246,0.4)';
                      b.style.transform = 'translateY(-1px)';
                      b.style.boxShadow = '0 6px 24px rgba(59,130,246,0.18)';
                    }}
                    onMouseLeave={e => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.background = 'rgba(255,255,255,0.03)';
                      b.style.borderColor = 'rgba(255,255,255,0.09)';
                      b.style.transform = 'translateY(0)';
                      b.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ color: '#3b82f6', flexShrink: 0, width: '28px', height: '28px' }}>
                      {c.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '2px' }}>
                        {bi(c.title, l)}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>
                        {bi(c.sub, l)}
                      </div>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '16px', flexShrink: 0 }}>→</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── STEP 2: CONTACT ── */}
          {step === 'contact' && (
            <>
              <div style={{ marginBottom: '28px', paddingRight: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.22)', borderRadius: '20px', padding: '3px 12px' }}>
                    {bi(copy.step2Badge, l)}
                  </span>
                  {selected !== null && (
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                      {bi(choices[selected].title, l)}
                    </span>
                  )}
                </div>
                <h2 style={{ fontSize: 'clamp(1.15rem,3.5vw,1.55rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
                  {bi(copy.step2Title, l)}
                </h2>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                  {bi(copy.step2Sub, l)}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  ref={nameRef}
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder={bi(copy.firstNamePH, l)}
                  required
                  style={{
                    width: '100%', padding: '15px 18px', marginBottom: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px', color: '#fff', fontSize: '15px',
                    outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
                />
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={bi(copy.emailPH, l)}
                  required
                  style={{
                    width: '100%', padding: '15px 18px', marginBottom: '14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px', color: '#fff', fontSize: '15px',
                    outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    style={{ padding: '13px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor='rgba(255,255,255,0.25)'; b.style.color='rgba(255,255,255,0.7)'; }}
                    onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor='rgba(255,255,255,0.1)'; b.style.color='rgba(255,255,255,0.45)'; }}
                  >
                    {bi(copy.back, l)}
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1, padding: '13px 20px', borderRadius: '10px', border: 'none',
                      background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
                      color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                      letterSpacing: '-0.01em',
                      boxShadow: '0 0 0 1px rgba(59,130,246,0.35), 0 6px 28px rgba(59,130,246,0.4), 0 0 48px rgba(59,130,246,0.18)',
                      transition: 'box-shadow 0.2s, transform 0.15s',
                    }}
                    onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.boxShadow='0 0 0 1px rgba(59,130,246,0.5), 0 10px 36px rgba(59,130,246,0.55), 0 0 60px rgba(59,130,246,0.26)'; b.style.transform='translateY(-1px)'; }}
                    onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.boxShadow='0 0 0 1px rgba(59,130,246,0.35), 0 6px 28px rgba(59,130,246,0.4), 0 0 48px rgba(59,130,246,0.18)'; b.style.transform='translateY(0)'; }}
                  >
                    {bi(copy.submitBtn, l)}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── GENERATING ── */}
          {step === 'generating' && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#22c55e', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '4px 14px', marginBottom: '20px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'vbm-pulse 0.9s infinite' }} />
                  {bi(copy.generating, l)}
                </div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: '11px', color: 'rgba(34,197,94,0.5)', letterSpacing: '0.06em' }}>
                  {selected !== null ? bi(choices[selected].title, l).toUpperCase() : ''}
                </div>
              </div>
              <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${genPct}%`, background: 'linear-gradient(90deg,#3b82f6,#22c55e)', borderRadius: '99px', transition: 'width 0.06s linear', boxShadow: '0 0 10px rgba(59,130,246,0.6)' }} />
                </div>
                <div style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>{Math.round(genPct)}%</div>
              </div>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', fontSize: '24px', color: '#60a5fa' }}>
                ✓
              </div>
              <h3 style={{ fontSize: 'clamp(1.2rem,3.5vw,1.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 12px' }}>
                {bi(copy.successTitle, l)}
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: '0 0 28px', lineHeight: 1.7, maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
                {bi(copy.successSub, l)}
              </p>
              <button
                onClick={handleClose}
                style={{ padding: '12px 28px', fontSize: '13px', fontWeight: 600, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor='rgba(255,255,255,0.3)'; b.style.color='#fff'; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor='rgba(255,255,255,0.12)'; b.style.color='rgba(255,255,255,0.55)'; }}
              >
                {bi(copy.close, l)}
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes vbm-fade { from { opacity:0 } to { opacity:1 } }
        @keyframes vbm-up   { from { opacity:0; transform:translateY(20px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes vbm-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
      `}</style>
    </div>
  );
}
