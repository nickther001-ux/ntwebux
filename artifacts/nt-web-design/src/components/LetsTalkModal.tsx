import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, '');

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '12px 16px',
  fontSize: '14px',
  color: '#fff',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: '8px',
};

const REACH_OPTIONS = [
  { value: 'email',    Icon: Mail,          en: 'Email',    fr: 'Email' },
  { value: 'phone',    Icon: Phone,         en: 'Phone',    fr: 'Téléphone' },
  { value: 'whatsapp', Icon: MessageCircle, en: 'WhatsApp', fr: 'WhatsApp' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function LetsTalkModal({ open, onClose }: Props) {
  const { lang } = useLanguage();
  const fr = lang === 'fr';

  const [name, setName]       = useState('');
  const [needs, setNeeds]     = useState('');
  const [reach, setReach]     = useState('email');
  const [contact, setContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState('');

  const reset = () => {
    setName(''); setNeeds(''); setReach('email'); setContact('');
    setSuccess(false); setError('');
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !needs.trim() || !contact.trim()) {
      setError(fr ? 'Veuillez remplir tous les champs.' : 'Please fill in all fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const message = `[Full Scope Inquiry]\nName: ${name}\nBest way to reach: ${reach} — ${contact}\n\nWhat they need:\n${needs}`;
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: name, email: reach === 'email' ? contact : 'n/a', phone: reach !== 'email' ? contact : '', message }),
      });
      if (res.ok) { setSuccess(true); }
      else { setError(fr ? 'Erreur. Veuillez réessayer.' : 'Error. Please try again.'); }
    } catch {
      setError(fr ? 'Erreur. Veuillez réessayer.' : 'Error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '480px',
              background: '#0a1628',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '20px',
              padding: '36px 32px',
              position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.1)',
            }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={15} />
            </button>

            {success ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={48} color="#22d3ee" style={{ marginBottom: '16px' }} />
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {fr ? 'Message reçu !' : "Message received!"}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {fr
                    ? "On vous revient dans les 24h. Gardez un oeil sur votre boîte."
                    : "We'll get back to you within 24 hours. Keep an eye on your inbox."}
                </div>
                <button
                  onClick={handleClose}
                  style={{
                    marginTop: '24px', padding: '11px 28px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '999px', color: '#fff',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {fr ? 'Fermer' : 'Close'}
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '3px 12px',
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.25)',
                    borderRadius: '999px',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                    color: '#93c5fd', textTransform: 'uppercase',
                    marginBottom: '14px',
                  }}>
                    Full Scope — $899/mo
                  </div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                    {fr ? "Parlons de votre projet" : "Let's talk about your project"}
                  </h2>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                    {fr
                      ? "Dites-nous ce dont vous avez besoin et la meilleure façon de vous joindre."
                      : "Tell us what you need and the best way to reach you."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Name */}
                  <div>
                    <label style={labelStyle}>{fr ? 'Votre nom' : 'Your name'}</label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={fr ? 'Jean Tremblay' : 'Jane Smith'}
                      style={inputStyle}
                    />
                  </div>

                  {/* What they need */}
                  <div>
                    <label style={labelStyle}>{fr ? "Ce dont vous avez besoin" : "What you need"}</label>
                    <textarea
                      value={needs}
                      onChange={e => setNeeds(e.target.value)}
                      rows={4}
                      placeholder={fr
                        ? "Ex : Agent vocal IA pour 3 emplacements, intégration WhatsApp, migration CRM..."
                        : "E.g. AI voice agent for 3 locations, WhatsApp integration, CRM migration..."}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    />
                  </div>

                  {/* Best way to reach */}
                  <div>
                    <label style={labelStyle}>{fr ? 'Meilleure façon de vous joindre' : 'Best way to reach you'}</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      {REACH_OPTIONS.map(({ value, Icon, en, fr: frLabel }) => {
                        const active = reach === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setReach(value)}
                            style={{
                              flex: 1, padding: '9px 8px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                              borderRadius: '9px', cursor: 'pointer',
                              fontSize: '12px', fontWeight: 600,
                              background: active ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                              border: `1px solid ${active ? 'rgba(59,130,246,0.45)' : 'rgba(255,255,255,0.08)'}`,
                              color: active ? '#93c5fd' : 'rgba(255,255,255,0.45)',
                              transition: 'all 0.18s',
                            }}
                          >
                            <Icon size={13} />
                            {lang === 'fr' ? frLabel : en}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      value={contact}
                      onChange={e => setContact(e.target.value)}
                      placeholder={
                        reach === 'email'
                          ? (fr ? 'votre@email.com' : 'you@email.com')
                          : reach === 'phone'
                          ? (fr ? '+1 (438) 000-0000' : '+1 (555) 000-0000')
                          : (fr ? 'Votre numéro WhatsApp' : 'Your WhatsApp number')
                      }
                      style={inputStyle}
                    />
                  </div>

                  {error && (
                    <div style={{ fontSize: '12.5px', color: '#f87171', padding: '10px 14px', background: 'rgba(239,68,68,0.08)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%', padding: '14px',
                      background: submitting ? 'rgba(59,130,246,0.4)' : 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
                      border: 'none', borderRadius: '11px',
                      color: '#fff', fontSize: '14px', fontWeight: 700,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      boxShadow: '0 4px 24px rgba(29,78,216,0.35)',
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {submitting
                      ? (fr ? 'Envoi en cours...' : 'Sending...')
                      : (fr ? 'Envoyer ma demande' : 'Send my request')}
                    {!submitting && <ArrowRight size={15} />}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
