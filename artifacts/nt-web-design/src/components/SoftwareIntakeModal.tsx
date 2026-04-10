import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronRight, ArrowLeft, Mail, Phone, CheckCircle2 } from 'lucide-react';

/* ── Plan data ──────────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Most Popular',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.22)',
    features: [
      'All the Tools to Capture More Leads',
      'Nurture & Close Leads into Customers',
      'Full Online Booking, Pipelines, Social Cal & Website Builder',
      'Unlimited Contacts & Users',
    ],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    badge: 'Best Value',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.22)',
    features: [
      'Everything in Starter, PLUS:',
      'Setup Up To Three Sub-Accounts',
      'API Access — Integrate with Anything',
      'Unlimited Sub-Accounts for One Price',
      'Branded Desktop App — Custom Domains & Full Control',
    ],
  },
  {
    id: 'saas',
    name: 'SaaS Mode',
    badge: 'Enterprise',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.22)',
    features: [
      'Everything in Unlimited, PLUS:',
      'SaaS Mode — Auto Sub-Account Creation',
      'Rebilling for Email, SMS, Voice & AI (Set Your Own Markup)',
      'Unlimited Custom Dashboards & Custom Objects',
      'Template Library Control & Rollup Report Scheduler',
      'Advanced API Access',
    ],
  },
];

const TIMES = ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–8pm)', 'Anytime'];

const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, '');

/* ── Types ──────────────────────────────────────────────────────────────── */
interface Props {
  open: boolean;
  onClose: () => void;
}

/* ── Component ──────────────────────────────────────────────────────────── */
export function SoftwareIntakeModal({ open, onClose }: Props) {
  const [step, setStep]               = useState(1);
  const [plan, setPlan]               = useState('');
  const [name, setName]               = useState('');
  const [contactPref, setContactPref] = useState<'email' | 'phone'>('email');
  const [email, setEmail]             = useState('');
  const [phone, setPhone]             = useState('');
  const [bestTime, setBestTime]       = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState('');

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep(1); setPlan(''); setName('');
      setEmail(''); setPhone(''); setBestTime('');
      setContactPref('email'); setError('');
    }, 300);
  }

  async function handleSubmit() {
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (contactPref === 'email' && !email.trim()) { setError('Please enter your email.'); return; }
    if (contactPref === 'phone' && !phone.trim()) { setError('Please enter your phone number.'); return; }
    if (!bestTime) { setError('Please select a best time to reach you.'); return; }

    setError('');
    setSubmitting(true);
    const [firstName, ...rest] = name.trim().split(' ');
    try {
      await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(' ') || undefined,
          email: contactPref === 'email' ? email : `${phone}@phone.placeholder`,
          phone: contactPref === 'phone' ? phone : undefined,
          service: `FieldOps Pro — ${PLANS.find(p => p.id === plan)?.name ?? plan}`,
          message: `Best time to reach: ${bestTime}. Contact preference: ${contactPref === 'email' ? `Email (${email})` : `Phone (${phone})`}.`,
        }),
      });
      setStep(3);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const selectedPlan = PLANS.find(p => p.id === plan);

  /* ── Backdrop ── */
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={handleClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(2,4,10,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          {/* Modal card — stops click propagation */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: step === 1 ? '920px' : '520px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(8,16,36,0.98)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '24px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.08)',
              padding: 'clamp(24px,5vw,40px)',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            >
              <X size={16} />
            </button>

            {/* ── Step indicators ── */}
            {step < 3 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
                {[1, 2].map((s) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: step >= s ? '#3b82f6' : 'rgba(255,255,255,0.07)',
                      border: `1px solid ${step >= s ? '#3b82f6' : 'rgba(255,255,255,0.12)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700,
                      color: step >= s ? '#fff' : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.2s',
                    }}>
                      {step > s ? <Check size={13} /> : s}
                    </div>
                    <span style={{ fontSize: '12px', color: step >= s ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
                      {s === 1 ? 'Choose Plan' : 'Your Info'}
                    </span>
                    {s < 2 && <div style={{ width: '32px', height: '1px', background: step > s ? '#3b82f6' : 'rgba(255,255,255,0.1)' }} />}
                  </div>
                ))}
              </div>
            )}

            {/* ══ STEP 1 — Plan picker ══════════════════════════════════ */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                  <h2 style={{ fontSize: 'clamp(20px,3.5vw,28px)', fontWeight: 800, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                    What are you looking for?
                  </h2>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: '0 0 28px' }}>
                    Select the plan that fits your business. We'll set everything up for you.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px', marginBottom: '24px' }}>
                    {PLANS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setPlan(p.id); setStep(2); }}
                        style={{
                          textAlign: 'left',
                          padding: '24px',
                          background: plan === p.id ? p.glow : 'rgba(255,255,255,0.03)',
                          border: `1.5px solid ${plan === p.id ? p.color : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.18s',
                          position: 'relative',
                          color: '#fff',
                        }}
                        onMouseEnter={(e) => { if (plan !== p.id) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = p.color + '55'; } }}
                        onMouseLeave={(e) => { if (plan !== p.id) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; } }}
                      >
                        {/* Badge */}
                        <span style={{
                          display: 'inline-block', marginBottom: '12px',
                          fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                          textTransform: 'uppercase', color: p.color,
                          background: `${p.color}18`,
                          border: `1px solid ${p.color}30`,
                          borderRadius: '20px', padding: '3px 10px',
                        }}>
                          {p.badge}
                        </span>

                        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.015em', color: '#fff' }}>
                          {p.name}
                        </h3>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                          {p.features.map((f) => (
                            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.45 }}>
                              <CheckCircle2 size={13} color={p.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          paddingTop: '14px',
                          borderTop: `1px solid ${p.color}22`,
                          color: p.color, fontSize: '13px', fontWeight: 600,
                        }}>
                          Select this plan <ChevronRight size={15} />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ══ STEP 2 — Contact form ════════════════════════════════ */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                  {/* Back */}
                  <button
                    onClick={() => { setStep(1); setError(''); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                      cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      marginBottom: '20px', padding: 0, transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    <ArrowLeft size={14} /> Back to plans
                  </button>

                  {/* Selected plan pill */}
                  {selectedPlan && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      marginBottom: '20px',
                      padding: '5px 14px',
                      background: `${selectedPlan.color}14`,
                      border: `1px solid ${selectedPlan.color}35`,
                      borderRadius: '20px',
                      fontSize: '12px', fontWeight: 700, color: selectedPlan.color,
                    }}>
                      <Check size={12} /> {selectedPlan.name} Plan selected
                    </div>
                  )}

                  <h2 style={{ fontSize: 'clamp(18px,3.5vw,26px)', fontWeight: 800, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                    How should we reach you?
                  </h2>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: '0 0 28px' }}>
                    We'll reach out to build your setup plan together.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Full name */}
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input
                        type="text"
                        placeholder="Jean Tremblay"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Contact preference toggle */}
                    <div>
                      <label style={labelStyle}>Preferred Contact Method</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {(['email', 'phone'] as const).map((pref) => (
                          <button
                            key={pref}
                            onClick={() => setContactPref(pref)}
                            style={{
                              flex: 1,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                              padding: '11px',
                              background: contactPref === pref ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                              border: `1.5px solid ${contactPref === pref ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
                              borderRadius: '10px',
                              color: contactPref === pref ? '#93c5fd' : 'rgba(255,255,255,0.45)',
                              fontSize: '13px', fontWeight: 600,
                              cursor: 'pointer', transition: 'all 0.15s',
                            }}
                          >
                            {pref === 'email' ? <Mail size={14} /> : <Phone size={14} />}
                            {pref === 'email' ? 'Email' : 'Phone'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email or phone field */}
                    <div>
                      <label style={labelStyle}>{contactPref === 'email' ? 'Email Address' : 'Phone Number'}</label>
                      <input
                        type={contactPref === 'email' ? 'email' : 'tel'}
                        placeholder={contactPref === 'email' ? 'you@example.com' : '+1 (514) 000-0000'}
                        value={contactPref === 'email' ? email : phone}
                        onChange={(e) => contactPref === 'email' ? setEmail(e.target.value) : setPhone(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Best time */}
                    <div>
                      <label style={labelStyle}>Best Time to Reach You</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            onClick={() => setBestTime(t)}
                            style={{
                              padding: '10px 14px',
                              background: bestTime === t ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                              border: `1.5px solid ${bestTime === t ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
                              borderRadius: '10px',
                              color: bestTime === t ? '#93c5fd' : 'rgba(255,255,255,0.5)',
                              fontSize: '13px', fontWeight: 500,
                              cursor: 'pointer', textAlign: 'left',
                              transition: 'all 0.15s',
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <p style={{ margin: 0, fontSize: '13px', color: '#f87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px' }}>
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        background: submitting ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
                        color: '#fff', border: 'none',
                        padding: '15px', borderRadius: '12px',
                        fontSize: '15px', fontWeight: 700,
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        boxShadow: '0 6px 24px rgba(59,130,246,0.38)',
                        transition: 'transform 0.15s, box-shadow 0.15s, background 0.15s',
                      }}
                      onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(59,130,246,0.5)'; } }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(59,130,246,0.38)'; }}
                    >
                      {submitting ? 'Sending…' : <>Let's Build Your Software <ChevronRight size={16} /></>}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ══ STEP 3 — Confirmation ════════════════════════════════ */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: 'center', padding: '20px 0 8px' }}
                >
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
                    style={{
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 8px 32px rgba(59,130,246,0.45)',
                    }}
                  >
                    <Check size={32} color="#fff" strokeWidth={3} />
                  </motion.div>

                  <h2 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                    You're on the list!
                  </h2>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', margin: '0 0 8px', lineHeight: 1.65 }}>
                    We received your request for the <strong style={{ color: '#93c5fd' }}>{selectedPlan?.name} Plan</strong>.
                  </p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: '0 0 32px', lineHeight: 1.65 }}>
                    Our team will reach out {bestTime ? `during ${bestTime.toLowerCase()}` : 'shortly'} to start building your system.
                    Expect a response within 24 hours.
                  </p>

                  <button
                    onClick={handleClose}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.7)',
                      padding: '12px 28px', borderRadius: '10px',
                      fontSize: '14px', fontWeight: 600,
                      cursor: 'pointer', transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Shared styles ──────────────────────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
  marginBottom: '8px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  boxSizing: 'border-box',
};
