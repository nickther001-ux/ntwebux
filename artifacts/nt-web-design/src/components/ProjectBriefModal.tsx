import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';

type LangKey = 'en' | 'fr';
function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

const copy = {
  badge:        { en: 'No calls. No back-and-forth.',        fr: 'Sans appels. Sans allers-retours.' },
  title:        { en: 'Submit Your Vision.',                 fr: 'Soumettez votre Vision.' },
  sub:          { en: 'Tell us what you want to build. We will architect the path and get back to you within 24 hours.', fr: 'Dites-nous ce que vous souhaitez construire. Nous architecturons le chemin et revenons vers vous sous 24 heures.' },
  fieldVision:  { en: 'What is your vision?',               fr: 'Quelle est votre vision ?' },
  visionPH:     { en: 'Describe your project, goals, or the problem you want to solve…', fr: 'Décrivez votre projet, vos objectifs ou le problème que vous souhaitez résoudre…' },
  fieldName:    { en: 'Your Name',                          fr: 'Votre Nom' },
  fieldEmail:   { en: 'Email or Phone',                     fr: 'Email ou Téléphone' },
  fieldType:    { en: 'Project Type',                       fr: 'Type de Projet' },
  typeOptions:  {
    en: ['Select a project type…', 'Digital Foundation (Website)', 'eCommerce Store', 'AI Automation OS', 'Business Software (FieldOps)', 'Full Stack — Custom Build', 'Strategy Only'],
    fr: ['Sélectionnez un type de projet…', 'Fondation Numérique (Site Web)', 'Boutique eCommerce', 'IA Automation OS', 'Logiciel d\'entreprise (FieldOps)', 'Full Stack — Développement sur mesure', 'Stratégie uniquement'],
  },
  submitBtn:    { en: 'Submit Your Vision →',               fr: 'Soumettre votre Vision →' },
  submitting:   { en: 'Transmitting…',                      fr: 'Transmission…' },
  successTitle: { en: 'Vision received.',                   fr: 'Vision reçue.' },
  successSub:   { en: 'Our architect will study your brief and contact you within 24 hours — no calls, no noise.', fr: 'Notre architecte étudiera votre dossier et vous contactera sous 24 heures — sans appel, sans bruit.' },
  closeBtn:     { en: 'Close',                              fr: 'Fermer' },
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ProjectBriefModal({ open, onClose }: Props) {
  const { lang } = useLanguage();
  const l = lang as LangKey;

  const [vision, setVision]   = useState('');
  const [name, setName]       = useState('');
  const [contact, setContact] = useState('');
  const [type, setType]       = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const overlayRef            = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vision.trim() || !name.trim() || !contact.trim()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setVision(''); setName(''); setContact(''); setType(''); setSent(false); setSending(false); }, 300);
  }

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#fff', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)', marginBottom: '8px',
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(2,6,23,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'modal-fade-in 0.22s ease',
      }}
    >
      <div style={{
        width: '100%', maxWidth: '540px',
        background: 'rgba(8,16,38,0.96)',
        border: '1px solid rgba(59,130,246,0.22)',
        borderRadius: '24px',
        padding: 'clamp(28px, 5vw, 48px)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.08)',
        maxHeight: '90vh', overflowY: 'auto',
        animation: 'modal-slide-up 0.28s cubic-bezier(0.22,1,0.36,1)',
        position: 'relative',
      }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{ position: 'absolute', top: '18px', right: '18px', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, transition: 'all 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}
          aria-label="Close"
        >
          ×
        </button>

        {!sent ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: '28px', paddingRight: '32px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.22)', borderRadius: '20px', padding: '4px 12px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
                {bi(copy.badge, l)}
              </span>
              <h2 style={{ fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 10px', background: 'linear-gradient(135deg,#fff 40%,#93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
                {bi(copy.title, l)}
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.7 }}>
                {bi(copy.sub, l)}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Vision — primary field */}
              <div>
                <label style={{ ...labelStyle, color: 'rgba(147,197,253,0.7)' }}>
                  {bi(copy.fieldVision, l)} *
                </label>
                <textarea
                  value={vision}
                  onChange={e => setVision(e.target.value)}
                  placeholder={bi(copy.visionPH, l)}
                  rows={4}
                  required
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '110px', lineHeight: 1.6 }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.55)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>{bi(copy.fieldName, l)} *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={l === 'fr' ? 'Votre nom' : 'Your name'}
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.55)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{bi(copy.fieldEmail, l)} *</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    placeholder="email@company.com"
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.55)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>{bi(copy.fieldType, l)}</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', background: 'rgba(8,16,38,0.95)', color: type ? '#fff' : 'rgba(255,255,255,0.3)' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.55)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                >
                  {copy.typeOptions[l].map((opt, i) => (
                    <option key={i} value={i === 0 ? '' : opt} disabled={i === 0} style={{ background: '#08101f', color: '#fff' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{
                  marginTop: '4px', width: '100%', padding: '15px 28px',
                  fontSize: '14px', fontWeight: 700, letterSpacing: '-0.01em',
                  borderRadius: '12px', border: 'none',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  background: sending ? 'rgba(59,130,246,0.45)' : 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                  color: '#fff',
                  boxShadow: sending ? 'none' : '0 0 0 1px rgba(59,130,246,0.3), 0 8px 32px rgba(59,130,246,0.45), 0 0 48px rgba(59,130,246,0.2)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!sending) (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 1px rgba(59,130,246,0.4), 0 12px 40px rgba(59,130,246,0.6), 0 0 64px rgba(59,130,246,0.28)'; }}
                onMouseLeave={e => { if (!sending) (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 1px rgba(59,130,246,0.3), 0 8px 32px rgba(59,130,246,0.45), 0 0 48px rgba(59,130,246,0.2)'; }}
              >
                {sending ? bi(copy.submitting, l) : bi(copy.submitBtn, l)}
              </button>
            </form>
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '26px' }}>
              ✓
            </div>
            <h3 style={{ fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 12px' }}>
              {bi(copy.successTitle, l)}
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '0 0 28px', lineHeight: 1.7, maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto' }}>
              {bi(copy.successSub, l)}
            </p>
            <button
              onClick={handleClose}
              style={{ padding: '12px 28px', fontSize: '13px', fontWeight: 600, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; }}
            >
              {bi(copy.closeBtn, l)}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modal-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
