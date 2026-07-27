import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Check, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL || '').replace(/\/$/, '');

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
      // 1. Dispatch lead notification to info@ntwebux.com
      await fetch('https://formspree.io/f/xknlqrqv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _replyto: email,
          recipient: 'info@ntwebux.com',
          client_email: email,
          lead_type: '2026 Playbook PDF Lead Magnet Download',
          source_website: 'ntwebux.com',
          timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' }),
        }),
      });

      // 2. Dispatch to backend API
      await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          recipient: 'info@ntwebux.com',
          service: '2026 Playbook Download',
          message: 'Client requested 2026 Local Business Automation Playbook PDF',
        }),
      });
    } catch {
      // Fallthrough
    }

    setSubmitting(false);
    setSuccess(true);

    // 3. Automatically open PDF in a new browser tab for instant in-browser viewing
    const pdfUrl = `${import.meta.env.BASE_URL || '/'}NT_WebUX_2026_Masterclass_Playbook.pdf`;
    window.open(pdfUrl, '_blank');
  };

  const isFr = lang === 'fr';

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative', width: '100%', maxWidth: '500px',
              padding: '36px 32px', borderRadius: '24px', background: '#090e1a',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.8), 0 0 40px rgba(59,130,246,0.12)',
              zIndex: 10000,
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '18px', right: '18px',
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            {success ? (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#34d399' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  {isFr ? "Guide Ouvert dans un Nouvel Onglet !" : "Playbook Unlocked!"}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {isFr
                    ? "Le guide s'est ouvert dans un nouvel onglet. Vous pouvez également cliquer ci-dessous pour le consulter ou le télécharger."
                    : "The Playbook has opened in a new browser tab. You can also view or download it directly below."}
                </p>
                <a
                  href={`${import.meta.env.BASE_URL || '/'}NT_WebUX_2026_Masterclass_Playbook.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-violet"
                  style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ExternalLink size={16} /> {isFr ? "Ouvrir / Télécharger le PDF" : "View / Download PDF"}
                </a>
              </div>
            ) : (
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '999px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '18px' }}>
                  <BookOpen size={12} /> {isFr ? "Guide Gratuit 2026" : "Free 2026 Playbook"}
                </div>

                <h3 style={{ fontSize: '24px', fontWeight 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '10px' }}>
                  {isFr ? "Guide d'Automatisation PME 2026" : "2026 Local Business Automation Playbook"}
                </h3>

                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '22px' }}>
                  {isFr
                    ? "Découvrez comment les entreprises de services réduisent leurs coûts de 40% et captent des leads 24h/24."
                    : "Discover how local service businesses cut operational overhead by 40% and capture 24/7 client leads."}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
                  {[
                    isFr ? "Réduction de 40 % des coûts d'exploitation" : "40% reduction in operational overhead",
                    isFr ? "Capture de leads IA 24h/24 & SMS automatique" : "24/7 AI lead capture & instant SMS text-back",
                    isFr ? "Blueprint de site bilingue haute conversion" : "High-converting bilingual website blueprint",
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'rgba(255,255,255,0.85)' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={11} color="#93c5fd" strokeWidth={3} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input
                    type="email"
                    required
                    placeholder={isFr ? "Entrez votre adresse email professionnelle..." : "Enter your business email address..."}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)',
                      borderRadius: '12px', fontSize: '14px', color: '#fff', outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-violet"
                    style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 700, borderRadius: '12px', cursor: 'pointer' }}
                  >
                    {submitting ? (isFr ? "Chargement..." : "Opening...") : (isFr ? "Consulter le Guide →" : "Access Playbook Now →")}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
