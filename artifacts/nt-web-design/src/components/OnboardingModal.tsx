import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import AIProjectIntake, { SITE_TYPES, FEATURES, TIMELINES, KINDS, type IntakeData } from './AIProjectIntake';

interface Plan { name: string; price: string | number }

interface Props {
  plan: Plan | null;
  onClose: () => void;
  [extra: string]: unknown;
}

const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, '');

const en = (list: { id: string; en: string }[], id: string | null) => (id ? list.find(x => x.id === id)?.en ?? id : '');

export function OnboardingModal({ plan, onClose }: Props) {
  const { lang } = useLanguage();
  const l = lang === 'fr' ? 'fr' : 'en';

  useEffect(() => {
    if (!plan) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [plan, onClose]);

  if (!plan) return null;

  const submit = async (d: IntakeData) => {
    const type = en(SITE_TYPES, d.siteType);
    const notes = [
      `AI intake prompt: "${d.initialPrompt || '—'}"`,
      `Project kind: ${en(KINDS, d.projectKind)}`,
      `Timeline: ${en(TIMELINES, d.timeline) || '—'}`,
    ].join('\n');

    const res = await fetch(`${API_BASE}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan,
        siteType: type,
        style: 'custom',
        name: d.name,
        business: d.businessName,
        industry: type,
        description: d.description || d.initialPrompt,
        city: '',
        goals: d.features.map(f => en(FEATURES, f)),
        hasLogo: '',
        hasContent: '',
        hasExistingSite: 'no',
        existingUrl: '',
        email: d.email,
        phone: d.phone,
        bestTime: en(TIMELINES, d.timeline),
        method: '',
        notes,
        lang: l,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body as { error?: string }).error || 'Server error');
    }
  };

  return (
    <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 1000, overflowY: 'auto', background: '#060A14' }}>
      <button
        onClick={onClose}
        aria-label={l === 'fr' ? 'Fermer' : 'Close'}
        style={{
          position: 'fixed', top: 18, right: 18, zIndex: 2, width: 44, height: 44, borderRadius: 12,
          border: '1px solid rgba(0,140,255,0.2)', background: 'rgba(11,21,38,0.85)', color: '#D8E8FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        <X size={20} />
      </button>
      <AIProjectIntake
        lang={l}
        plan={plan.name}
        parseEndpoint={`${API_BASE}/api/intake/parse`}
        allowAttachments={false}
        onSubmit={submit}
      />
    </div>
  );
}

export default OnboardingModal;
