import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, '');

type Tier = 'starter' | 'pro' | 'full' | '';
type Lang = 'en' | 'fr';

export interface BSuiteIntakeModalProps {
  open: boolean;
  onClose: () => void;
  preselectedTier?: Tier;
  lang: Lang;
}

const copy = {
  headline:  { en: 'Tell us about your business — takes 2 minutes', fr: 'Parlez-nous de votre entreprise — prend 2 minutes' },
  name:      { en: 'Your name',          fr: 'Votre nom' },
  biz:       { en: 'Business name',      fr: "Nom de l'entreprise" },
  phone:     { en: 'Phone number',       fr: 'Numéro de téléphone' },
  email:     { en: 'Email',              fr: 'Courriel' },
  bizType:   { en: 'What type of business?', fr: 'Quel type d\'entreprise ?' },
  challenge: { en: "What's your biggest challenge right now? (e.g., missed calls, no follow-up system, need more reviews)", fr: 'Quel est votre plus grand défi en ce moment ? (ex: appels manqués, pas de système de suivi, besoin de plus d\'avis)' },
  challengeP:{ en: 'Be specific — it helps us show you exactly what you need.', fr: 'Soyez précis — ça nous aide à vous montrer exactement ce dont vous avez besoin.' },
  tierLabel: { en: 'Which plan are you interested in?', fr: 'Quel forfait vous intéresse ?' },
  submit:    { en: 'Submit — We\'ll Call You Within 24 Hours →', fr: 'Soumettre — On vous rappelle sous 24h →' },
  submitting:{ en: 'Sending…', fr: 'Envoi…' },
  disclaimer:{ en: 'We respect your time. No spam. No pushy sales calls. Just a real conversation about whether NT Business Suite is a fit for your business.', fr: "On respecte votre temps. Pas de spam. Pas de vente agressive. Juste une vraie conversation pour voir si NT Business Suite convient à votre entreprise." },
  successH:  { en: "Got it!", fr: "Reçu !" },
  successB:  { en: "We'll review your info and call you within 24 hours. Check your email — we just sent you a confirmation.", fr: "On examine vos informations et on vous appelle sous 24h. Vérifiez votre courriel — on vient de vous envoyer une confirmation." },
  errorMsg:  { en: 'Something went wrong. Please try again.', fr: 'Une erreur est survenue. Veuillez réessayer.' },
  close:     { en: 'Close', fr: 'Fermer' },
};

const bizOptions = {
  en: ['Select your industry…','Construction','HVAC & Plumbing','Medical & Wellness','Dental','Legal','Real Estate','Restaurant','Auto Services','Other'],
  fr: ['Sélectionnez votre secteur…','Construction','CVAC & Plomberie','Médical & Bien-être','Dentaire','Juridique','Immobilier','Restauration','Services automobiles','Autre'],
};

const tierOptions: { id: Tier; en: string; fr: string }[] = [
  { id: 'starter', en: 'Starter ($297/mo)',          fr: 'Démarrage (297 $/mois)' },
  { id: 'pro',     en: 'Professional ($497/mo)',      fr: 'Professionnel (497 $/mois)' },
  { id: 'full',    en: 'Full Scope ($899/mo)',        fr: 'Portée complète (899 $/mois)' },
  { id: '',        en: 'Not sure yet',                fr: 'Pas encore sûr' },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', color: '#fff', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  fontFamily: 'inherit',
};

function FieldLabel({ text }: { text: string }) {
  return <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{text}</label>;
}

export function BSuiteIntakeModal({ open, onClose, preselectedTier = '', lang }: BSuiteIntakeModalProps) {
  const l = lang;
  const [name, setName]         = useState('');
  const [biz, setBiz]           = useState('');
  const [phone, setPhone]       = useState('');
  const [email, setEmail]       = useState('');
  const [bizType, setBizType]   = useState('');
  const [challenge, setChallenge] = useState('');
  const [tier, setTier]         = useState<Tier>(preselectedTier);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]   = useState(false);
  const [errMsg, setErrMsg]     = useState('');

  function reset() {
    setName(''); setBiz(''); setPhone(''); setEmail('');
    setBizType(''); setChallenge(''); setTier(preselectedTier);
    setSubmitting(false); setSuccess(false); setErrMsg('');
  }

  function handleClose() { onClose(); setTimeout(reset, 350); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !biz.trim() || !phone.trim() || !email.trim() || !bizType || bizType === bizOptions[l][0] || !challenge.trim()) return;
    setSubmitting(true); setErrMsg('');

    const tierLabel = tierOptions.find(t => t.id === tier)?.[l] || (l === 'fr' ? 'Pas encore sûr' : 'Not sure yet');
    const subject   = `NT Business Suite Lead — ${biz.trim()}`;
    const message   = [
      `[NT Business Suite Intake]`,
      `Subject: ${subject}`,
      `Name: ${name}`,
      `Business: ${biz}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Industry: ${bizType}`,
      `Interested Tier: ${tierLabel}`,
      `\nChallenge:\n${challenge}`,
    ].join('\n');

    const [firstName, ...rest] = name.trim().split(' ');
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName: rest.join(' ') || undefined, email, phone, message }),
      });
      if (!res.ok) throw new Error('api_fail');
      setSuccess(true);
    } catch {
      try {
        const fd = new FormData();
        fd.append('name', name); fd.append('business', biz);
        fd.append('email', email); fd.append('phone', phone);
        fd.append('industry', bizType); fd.append('tier', tierLabel);
        fd.append('challenge', challenge); fd.append('_subject', subject);
        const fs = await fetch('https://formspree.io/f/mojyrrje', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
        if (fs.ok) { setSuccess(true); } else { throw new Error(); }
      } catch {
        setErrMsg(copy.errorMsg[l]);
      }
    } finally { setSubmitting(false); }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)', zIndex: 900 }}
          />
          <div style={{ position: 'fixed', inset: 0, zIndex: 901, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', pointerEvents: 'none' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{
                pointerEvents: 'all', width: '100%', maxWidth: '540px',
                maxHeight: '92vh', overflowY: 'auto', scrollbarWidth: 'none',
                background: 'linear-gradient(160deg, #0d1627 0%, #080f1c 100%)',
                border: '1px solid rgba(59,130,246,0.28)',
                borderRadius: '20px', position: 'relative',
                boxShadow: '0 32px 96px rgba(0,0,0,0.85), 0 0 0 1px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '240px', height: '240px', pointerEvents: 'none', borderRadius: '20px', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(28px)' }} />

              {success ? (
                <div style={{ padding: '48px 36px', textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <CheckCircle2 size={28} color="#22c55e" />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-0.025em' }}>{copy.successH[l]}</h3>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '28px' }}>{copy.successB[l]}</p>
                  <button onClick={handleClose} style={{ padding: '12px 28px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                    {copy.close[l]}
                  </button>
                </div>
              ) : (
                <div style={{ padding: '32px 32px 28px', position: 'relative' }}>
                  <button onClick={handleClose} style={{ position: 'absolute', top: '18px', right: '20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}>
                    <X size={16} />
                  </button>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '8px' }}>NT BUSINESS SUITE</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.3, paddingRight: '36px' }}>{copy.headline[l]}</h3>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <FieldLabel text={copy.name[l]} />
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder={l === 'fr' ? 'Jean Tremblay' : 'John Smith'} style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                      </div>
                      <div>
                        <FieldLabel text={copy.biz[l]} />
                        <input type="text" value={biz} onChange={e => setBiz(e.target.value)} required placeholder={l === 'fr' ? 'Votre entreprise' : 'Your company'} style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <FieldLabel text={copy.phone[l]} />
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="+1 (438) 000-0000" style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                      </div>
                      <div>
                        <FieldLabel text={copy.email[l]} />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder={l === 'fr' ? 'vous@co.com' : 'you@co.com'} style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                      </div>
                    </div>

                    <div>
                      <FieldLabel text={copy.bizType[l]} />
                      <select value={bizType} onChange={e => setBizType(e.target.value)} required style={{ ...inputStyle, background: 'rgba(8,15,30,0.95)', cursor: 'pointer', appearance: 'none', color: bizType && bizType !== bizOptions[l][0] ? '#fff' : 'rgba(255,255,255,0.35)' }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}>
                        {bizOptions[l].map((o, i) => <option key={i} value={i === 0 ? '' : o} disabled={i === 0} style={{ background: '#0a1428', color: '#fff' }}>{o}</option>)}
                      </select>
                    </div>

                    <div>
                      <FieldLabel text={copy.challenge[l]} />
                      <textarea value={challenge} onChange={e => setChallenge(e.target.value)} required rows={3}
                        placeholder={copy.challengeP[l]}
                        style={{ ...inputStyle, resize: 'none', lineHeight: 1.55 }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>

                    <div>
                      <FieldLabel text={copy.tierLabel[l]} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {tierOptions.map(t => (
                          <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '9px 12px', borderRadius: '8px', border: `1px solid ${tier === t.id ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.07)'}`, background: tier === t.id ? 'rgba(59,130,246,0.08)' : 'transparent', transition: 'all 0.18s' }}>
                            <input type="radio" name="tier" value={t.id} checked={tier === t.id} onChange={() => setTier(t.id)}
                              style={{ accentColor: '#3b82f6', width: '14px', height: '14px', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', color: tier === t.id ? '#93c5fd' : 'rgba(255,255,255,0.6)', fontWeight: tier === t.id ? 600 : 400 }}>{t[l]}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {errMsg && (
                      <p style={{ fontSize: '13px', color: '#f87171', padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', margin: 0 }}>{errMsg}</p>
                    )}

                    <button type="submit" disabled={submitting}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', fontSize: '14px', fontWeight: 700, borderRadius: '12px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', background: submitting ? 'rgba(59,130,246,0.45)' : 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: '#fff', boxShadow: submitting ? 'none' : '0 8px 28px rgba(59,130,246,0.38)', transition: 'all 0.2s', marginTop: '4px' }}>
                      {submitting ? copy.submitting[l] : <>{copy.submit[l]} <ArrowRight size={15} /></>}
                    </button>

                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.55, margin: 0, textAlign: 'center' }}>{copy.disclaimer[l]}</p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
