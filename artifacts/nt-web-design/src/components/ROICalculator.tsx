import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';

const SUBSCRIPTION = 297;
type LangKey = 'en' | 'fr';
type Stage = 'calc' | 'diag' | 'bridge';

const copy = {
  badge:       { en: 'ROI Calculator',                              fr: 'Calculateur de ROI' },
  heading:     { en: 'Stop Leaving Money on the Table',             fr: "Arrêtez de laisser de l'argent sur la table" },
  sub:         { en: 'Drag the sliders to see your real revenue opportunity.',
                 fr: 'Faites glisser les curseurs pour voir votre véritable potentiel de revenus.' },
  jobValue:    { en: 'Average Job Value',     fr: 'Valeur moyenne par contrat' },
  missedCalls: { en: 'Missed Calls per Week', fr: 'Appels manqués par semaine' },
  teamSize:    { en: 'Team Size',             fr: "Taille de l'équipe" },
  person:      { en: 'person',                fr: 'personne' },
  people:      { en: 'people',                fr: 'personnes' },
  monthlyLost: { en: 'Monthly Revenue Lost',  fr: 'Revenus perdus par mois' },
  yearlyGain:  { en: 'Yearly Opportunity',    fr: 'Opportunité annuelle' },
  roiLabel:    { en: 'FieldOps Pro Estimated ROI', fr: 'ROI estimé de FieldOps Pro' },
  roiNote:     { en: 'Based on a $297/mo subscription', fr: "Basé sur un abonnement de 297 $/mois" },
  plugBtn:     { en: 'Plug the Leak →',       fr: 'Colmater la Fuite →' },

  diagLine1:   { en: '[SYSTEM] Analyzing Revenue Gaps...', fr: '[SYSTÈME] Analyse des pertes de revenus...' },
  diagLine2:   { en: '[SUCCESS] Optimization Path Found.', fr: '[SUCCÈS] Chemin d\'optimisation trouvé.' },

  bridgeTitle: { en: 'We found a way to recover', fr: 'Nous avons trouvé un moyen de récupérer' },
  bridgeOf:    { en: 'of your monthly revenue.', fr: 'de vos revenus mensuels.' },
  bridgeSub:   { en: 'Apply for the Q2 AI Automation Beta.', fr: 'Candidatez pour la Beta IA Automatisation Q2.' },
  fieldCompany:{ en: 'Company Name', fr: 'Nom de l\'entreprise' },
  fieldPhone:  { en: 'Phone Number (for SMS demo)', fr: 'Numéro de téléphone (pour la démo SMS)' },
  fieldPain:   { en: 'Primary Pain Point', fr: 'Problème principal' },
  painOptions: {
    en: ['Select your biggest challenge…', 'Missed calls & lost leads', 'No-shows & cancellations', 'Manual scheduling overhead', 'Slow follow-up / review requests', 'Other'],
    fr: ['Sélectionnez votre défi principal…', 'Appels manqués & prospects perdus', 'No-shows & annulations', 'Charge de planification manuelle', 'Suivi lent / demandes d\'avis', 'Autre'],
  },
  submitBtn:   { en: 'Request Technical Audit', fr: 'Demander un Audit Technique' },
  submitting:  { en: 'Sending…', fr: 'Envoi…' },
  successMsg:  { en: 'Request received. Our architect will contact you within 24 hours.', fr: 'Demande reçue. Notre architecte vous contactera dans les 24 heures.' },
  backBtn:     { en: '← Recalculate', fr: '← Recalculer' },
};

function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

function formatDollar(n: number, lang: LangKey) {
  const formatted = Math.round(n).toLocaleString(lang === 'fr' ? 'fr-CA' : 'en-CA');
  return lang === 'fr' ? `${formatted} $` : `$${formatted}`;
}

export function ROICalculator() {
  const { lang } = useLanguage();
  const l = lang as LangKey;

  const [jobValue, setJobValue]       = useState(500);
  const [missedCalls, setMissedCalls] = useState(5);
  const [teamSize, setTeamSize]       = useState(3);
  const [stage, setStage]             = useState<Stage>('calc');
  const [progress, setProgress]       = useState(0);
  const [diagLine, setDiagLine]       = useState(0);
  const [company, setCompany]         = useState('');
  const [phone, setPhone]             = useState('');
  const [pain, setPain]               = useState('');
  const [sending, setSending]         = useState(false);
  const [sent, setSent]               = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const monthlyLost = jobValue * missedCalls * 4;
  const yearlyGain  = monthlyLost * 12 * teamSize;
  const subscriptionAnnual = SUBSCRIPTION * 12;
  const roi = Math.round((yearlyGain - subscriptionAnnual) / subscriptionAnnual * 100);

  useEffect(() => {
    if (stage !== 'diag') return;
    setProgress(0);
    setDiagLine(0);

    const t1 = setTimeout(() => setDiagLine(1), 400);
    const t2 = setTimeout(() => setDiagLine(2), 900);

    let p = 0;
    const interval = setInterval(() => {
      p += 2.5;
      setProgress(Math.min(p, 100));
      if (p >= 100) clearInterval(interval);
    }, 50);

    const tEnd = setTimeout(() => setStage('bridge'), 2200);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(tEnd);
      clearInterval(interval);
    };
  }, [stage]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function handlePlugLeak() {
    setSent(false);
    setCompany('');
    setPhone('');
    setPain('');
    setStage('diag');
    // Re-anchor so the diagnostic view is never behind the navbar
    requestAnimationFrame(() => {
      const el = document.getElementById('roi-calculator');
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!company.trim() || !phone.trim() || !pain || pain === copy.painOptions.en[0] || pain === copy.painOptions.fr[0]) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  }

  const sliders = [
    { key: 'jobValue',    label: `${bi(copy.jobValue, l)}: ${formatDollar(jobValue, l)}`, value: jobValue, min: 100, max: 5000, step: 50,  onChange: (v: number) => setJobValue(v) },
    { key: 'missedCalls', label: `${bi(copy.missedCalls, l)}: ${missedCalls}`,            value: missedCalls, min: 1, max: 50, step: 1, onChange: (v: number) => setMissedCalls(v) },
    { key: 'teamSize',    label: `${bi(copy.teamSize, l)}: ${teamSize} ${teamSize === 1 ? bi(copy.person, l) : bi(copy.people, l)}`, value: teamSize, min: 1, max: 25, step: 1, onChange: (v: number) => setTeamSize(v) },
  ];

  return (
    <section id="roi-calculator" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        {/* ── CALCULATOR ── */}
        {stage === 'calc' && (
          <div style={{
            background: 'rgba(10,20,40,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(59,130,246,0.18)',
            borderRadius: '24px',
            padding: 'clamp(28px, 6vw, 52px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
            <div style={{ marginBottom: '36px' }}>
              <span style={{ display: 'inline-block', marginBottom: '12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '20px', padding: '4px 14px' }}>
                {bi(copy.badge, l)}
              </span>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 10px', background: 'linear-gradient(135deg, #93c5fd 0%, #bfdbfe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {bi(copy.heading, l)}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>{bi(copy.sub, l)}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '36px' }}>
              {sliders.map((s) => (
                <div key={s.key}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: '10px' }}>{s.label}</label>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={(e) => s.onChange(Number(e.target.value))} style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer', height: '4px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>
                    <span>{s.min}</span><span>{s.max}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '32px' }}>
              <div style={{ padding: '20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '16px' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f87171', margin: '0 0 8px' }}>{bi(copy.monthlyLost, l)}</p>
                <p style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: '#ef4444', margin: 0, letterSpacing: '-0.02em' }}>{formatDollar(monthlyLost, l)}</p>
              </div>
              <div style={{ padding: '20px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '16px' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ade80', margin: '0 0 8px' }}>{bi(copy.yearlyGain, l)}</p>
                <p style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: '#22c55e', margin: 0, letterSpacing: '-0.02em' }}>{formatDollar(yearlyGain, l)}</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '28px', background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)', borderRadius: '16px', boxShadow: '0 8px 32px rgba(59,130,246,0.35)', marginBottom: '24px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: '0 0 6px' }}>{bi(copy.roiLabel, l)}</p>
              <p style={{ fontSize: 'clamp(44px, 10vw, 64px)', fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {roi > 0 ? `${roi.toLocaleString(l === 'fr' ? 'fr-CA' : 'en-CA')} %` : '—'}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{bi(copy.roiNote, l)}</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handlePlugLeak}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 36px', fontSize: '14px', fontWeight: 700,
                  letterSpacing: '-0.01em', borderRadius: '12px', border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#fff',
                  boxShadow: '0 8px 28px rgba(239,68,68,0.38)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 36px rgba(239,68,68,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(239,68,68,0.38)'; }}
              >
                {bi(copy.plugBtn, l)}
              </button>
            </div>
          </div>
        )}

        {/* ── DIAGNOSTIC ANIMATION ── */}
        {stage === 'diag' && (
          <div style={{
            background: 'rgba(5,12,28,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: '24px',
            padding: 'clamp(40px, 8vw, 72px) clamp(28px, 6vw, 52px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,197,94,0.08)',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22c55e', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '4px 14px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse-dot 1s infinite' }} />
                {l === 'fr' ? 'Diagnostic en cours' : 'Running Diagnostic'}
              </div>

              <div style={{ fontFamily: "'Courier New', monospace", fontSize: '13px', lineHeight: 2, textAlign: 'left', maxWidth: '440px', margin: '0 auto', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '12px', padding: '20px 24px' }}>
                {diagLine >= 1 && (
                  <div style={{ color: '#94a3b8', animation: 'fade-in-line 0.4s ease' }}>
                    <span style={{ color: '#3b82f6' }}>{l === 'fr' ? '[SYSTÈME]' : '[SYSTEM]'}</span> {l === 'fr' ? 'Analyse des pertes de revenus...' : 'Analyzing Revenue Gaps...'}
                  </div>
                )}
                {diagLine >= 2 && (
                  <div style={{ color: '#94a3b8', animation: 'fade-in-line 0.4s ease' }}>
                    <span style={{ color: '#22c55e' }}>{l === 'fr' ? '[SUCCÈS]' : '[SUCCESS]'}</span> {l === 'fr' ? "Chemin d'optimisation trouvé." : 'Optimization Path Found.'}
                  </div>
                )}
                {diagLine < 2 && <div style={{ color: 'rgba(148,163,184,0.4)' }}>_</div>}
              </div>
            </div>

            <div style={{ maxWidth: '440px', margin: '0 auto' }}>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #22c55e)', borderRadius: '99px', transition: 'width 0.05s linear', boxShadow: '0 0 12px rgba(34,197,94,0.5)' }} />
              </div>
              <div style={{ marginTop: '10px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        )}

        {/* ── LEAD BRIDGE ── */}
        {stage === 'bridge' && (
          <div style={{
            background: 'rgba(8,15,35,0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(59,130,246,0.22)',
            borderRadius: '24px',
            padding: 'clamp(32px, 6vw, 56px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}>
            {!sent ? (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22c55e', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '4px 14px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    {l === 'fr' ? 'Résultat de l\'Audit' : 'Audit Result'}
                  </div>

                  <h2 style={{ fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 8px', color: '#fff', lineHeight: 1.2 }}>
                    {bi(copy.bridgeTitle, l)}{' '}
                    <span style={{ background: 'linear-gradient(135deg, #22c55e, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {formatDollar(monthlyLost, l)}
                    </span>
                    {' '}{bi(copy.bridgeOf, l)}
                  </h2>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(147,197,253,0.9)', margin: 0 }}>
                    {bi(copy.bridgeSub, l)}
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>
                      {bi(copy.fieldCompany, l)}
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder={l === 'fr' ? 'Votre entreprise' : 'Your company'}
                      required
                      style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>
                      {bi(copy.fieldPhone, l)}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (438) 000-0000"
                      required
                      style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>
                      {bi(copy.fieldPain, l)}
                    </label>
                    <select
                      value={pain}
                      onChange={e => setPain(e.target.value)}
                      required
                      style={{ width: '100%', padding: '12px 16px', background: 'rgba(10,20,40,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: pain && pain !== copy.painOptions.en[0] && pain !== copy.painOptions.fr[0] ? '#fff' : 'rgba(255,255,255,0.35)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    >
                      {copy.painOptions[l].map((opt, i) => (
                        <option key={i} value={i === 0 ? '' : opt} disabled={i === 0} style={{ background: '#0a1428', color: '#fff' }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        flex: 1, minWidth: '180px', padding: '14px 28px', fontSize: '14px', fontWeight: 700,
                        letterSpacing: '-0.01em', borderRadius: '12px', border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                        background: sending ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                        color: '#fff', boxShadow: sending ? 'none' : '0 8px 28px rgba(59,130,246,0.38)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {sending ? bi(copy.submitting, l) : bi(copy.submitBtn, l)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage('calc')}
                      style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)'; }}
                    >
                      {bi(copy.backBtn, l)}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px' }}>
                  ✓
                </div>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                  {bi(copy.successMsg, l)}
                </p>
                <button
                  onClick={() => { setStage('calc'); setSent(false); }}
                  style={{ marginTop: '20px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                >
                  {bi(copy.backBtn, l)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes fade-in-line {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
