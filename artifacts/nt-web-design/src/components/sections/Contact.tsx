import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, "");

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '12px 16px',
  fontSize: '14px',
  color: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.3)',
  marginBottom: '8px',
};

export function Contact() {
  const { t, lang } = useLanguage();
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const perks = t('contact.perks') as { title: string; desc: string }[];
  const formT = t('contact.form') as any;
  const eyebrow = lang === 'fr' ? 'Travaillons Ensemble' : "Let's Work Together";

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 6000);
      } else {
        alert(lang === 'fr' ? 'Erreur. Veuillez réessayer.' : 'Error. Please try again.');
      }
    } catch {
      alert(lang === 'fr' ? 'Erreur. Veuillez réessayer.' : 'Error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>{eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '16px' }}>
            {lang === 'fr' ? <>Prêt à <span className="gradient-text">passer à l'étape suivante?</span></> : <>Ready to <span className="gradient-text">level up?</span></>}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.7 }}>
            {t('contact.desc')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '48px', alignItems: 'start' }} className="contact-grid">
          {/* Info */}
          <div>
            {perks.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>{p.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '28px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="tel:+14388067640" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd' }}>
                  <Phone size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '2px' }}>Phone</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>(438) 806-7640</div>
                </div>
              </a>
              <a href="mailto:nicktech@computer4u.com" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd' }}>
                  <Mail size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '2px' }}>Email</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>nicktech@computer4u.com</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="glass" style={{ borderRadius: '20px', padding: '36px' }}>
            {success ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', textAlign: 'center', gap: '16px' }}>
                <CheckCircle2 size={56} color="#93c5fd" />
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>
                  {lang === 'fr' ? 'Message envoyé !' : 'Message sent!'}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>
                  {lang === 'fr' ? 'Nous vous répondrons dans les 24 heures.' : "We'll get back to you within 24 hours."}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="name-grid">
                  <div>
                    <label style={labelStyle}>{formT.fn}</label>
                    <input {...register('firstName')} style={inputStyle} onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>
                  <div>
                    <label style={labelStyle}>{formT.ln}</label>
                    <input {...register('lastName')} style={inputStyle} onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{formT.email} *</label>
                  <input {...register('email')} type="email" style={{ ...inputStyle, borderColor: errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)' }} onFocus={e => (e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.7)' : 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)')} />
                  {errors.email && <span style={{ fontSize: '12px', color: '#f87171', marginTop: '4px', display: 'block' }}>{errors.email.message}</span>}
                </div>

                <div>
                  <label style={labelStyle}>{formT.phone}</label>
                  <input {...register('phone')} type="tel" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>

                <div>
                  <label style={labelStyle}>{formT.service}</label>
                  <select {...register('service')} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}>
                    <option value="" style={{ background: '#111' }}>-- Select --</option>
                    {(formT.serviceOptions as string[]).map((opt: string) => (
                      <option key={opt} value={opt} style={{ background: '#111' }}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>{formT.msg} *</label>
                  <textarea {...register('message')} rows={4} style={{ ...inputStyle, resize: 'none', borderColor: errors.message ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)' }} onFocus={e => (e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.7)' : 'rgba(59,130,246,0.5)')} onBlur={e => (e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)')} />
                  {errors.message && <span style={{ fontSize: '12px', color: '#f87171', marginTop: '4px', display: 'block' }}>{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-violet"
                  style={{ padding: '14px 0', fontSize: '14px', fontWeight: 600, width: '100%', borderRadius: '10px', gap: '8px', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer', marginTop: '4px' }}
                >
                  {submitting ? (lang === 'fr' ? 'Envoi...' : 'Sending...') : <>{formT.submit} <ArrowRight size={15} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .contact-grid { grid-template-columns: 1fr !important; } }
        @media(max-width:480px){ .name-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
