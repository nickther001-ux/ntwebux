import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Check, Download, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, "");

export function LeadMagnetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitting(true);

    try {
      await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          service: 'Lead Magnet Download',
          message: 'Downloaded 2026 Local Business Automation Playbook PDF',
        }),
      });
    } catch {
      // Fallthrough for instant UX
    }

    setSubmitting(false);
    setSuccess(true);
  };

  const isFr = lang === 'fr';

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              padding: '36px 32px',
              borderRadius: '24px',
              zIndex: 101,
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            {success ? (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#34d399' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  {isFr ? 'Accès Débloqué !' : 'Access Unlocked!'}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {isFr
                    ? 'Votre guide PDF est prêt. Cliquez ci-dessous pour télécharger votre exemplaire gratuit.'
                    : 'Your PDF guide is ready. Click below to download your free copy.'}
                </p>
                <a
                  href={`${import.meta.env.BASE_URL}robots.txt`}
                  download="NT-WebUX-2026-Automation-Playbook.pdf"
                  className="btn-violet"
                  style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Download size={16} /> {isFr ? 'Télécharger le PDF Gratuit' : 'Download Free PDF'}
                </a>
              </div>
            ) : (
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '999px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '16px' }}>
                  <BookOpen size={12} /> {isFr ? 'Guide Gratuit 2026' : 'Free 2026 Playbook'}
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '10px' }}>
                  {isFr
                    ? "Guide d\'Automatisation PME & Acquisition 2026"
                    : '2026 Local Business Automation Playbook'}
                </h3>

                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {isFr
                    ? 'Découvrez comment les entreprises de services réduisent leurs coûts de 40% et captent des leads 24h/24.'
                    : 'Discover how local service businesses cut operational overhead by 40% and capture 24/7 client leads.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {[
                    isFr ? 'Réduction de 40 % des coûts d'exploitation' : '40% reduction in operational overhead',
                    isFr ? 'Capture de leads IA 24h/24 & SMS automatique' : '24/7 AI lead capture & instant SMS text-back',
                    isFr ? 'Blueprint de site bilingue haute conversion' : 'High-converting bilingual website blueprint',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={11} color="#93c5fd" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="email"
                    required
                    placeholder={isFr ? 'Entrez votre adresse email professionnelle...' : 'Enter your business email address...'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '13px 16px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '12px', fontSize: '14px', color: '#fff', outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-violet"
                    style={{ width: '100%', padding: '13px', fontSize: '14px', fontWeight: 700, borderRadius: '12px', cursor: 'pointer' }}
                  >
                    {submitting ? (isFr ? 'Envoi...' : 'Sending...') : (isFr ? 'Télécharger le Guide →' : 'Get Instant Access →')}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
