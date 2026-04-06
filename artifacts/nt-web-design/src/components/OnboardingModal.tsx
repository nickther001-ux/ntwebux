import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const BASE     = import.meta.env.BASE_URL.replace(/\/$/, '');
const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, '');

/* ─── Website type options ─────────────────────────────────────── */
const SITE_TYPES = [
  { id: 'business',   en: 'Business / Company',    fr: 'Entreprise / Compagnie',    img: 'proj-startup.png',      emoji: '🏢' },
  { id: 'restaurant', en: 'Restaurant / Food',      fr: 'Restaurant / Alimentation', img: 'proj-restaurant.png',   emoji: '🍽️' },
  { id: 'medical',    en: 'Medical / Health',       fr: 'Médical / Santé',           img: 'proj-medical.png',      emoji: '🏥' },
  { id: 'ecommerce',  en: 'eCommerce / Store',      fr: 'Boutique en ligne',         img: 'proj-ecommerce.png',    emoji: '🛒' },
  { id: 'portfolio',  en: 'Portfolio / Creative',   fr: 'Portfolio / Créatif',       img: 'proj-photography.png',  emoji: '🎨' },
  { id: 'realestate', en: 'Real Estate',            fr: 'Immobilier',                img: 'proj-realestate.png',   emoji: '🏠' },
  { id: 'fitness',    en: 'Fitness / Wellness',     fr: 'Fitness / Bien-être',       img: 'proj-fitness.png',      emoji: '💪' },
  { id: 'saas',       en: 'SaaS / Tech App',        fr: 'SaaS / Application Tech',  img: 'proj-saas.png',         emoji: '💻' },
  { id: 'law',        en: 'Law / Professional',     fr: 'Droit / Professionnel',     img: 'proj-law.png',          emoji: '⚖️' },
  { id: 'custom',     en: 'Custom / Other',         fr: 'Personnalisé / Autre',      img: '',                      emoji: '✨' },
];

const GOALS_EN = [
  'Generate leads & calls', 'Sell products online', 'Online booking / reservations',
  'Showcase portfolio', 'Brand awareness', 'Replace an old website', 'Other',
];
const GOALS_FR = [
  'Générer des leads et appels', 'Vendre des produits en ligne', 'Réservations en ligne',
  'Mettre en valeur mon portfolio', 'Notoriété de marque', 'Remplacer un ancien site', 'Autre',
];

const TIMES_EN = ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–9pm)', 'Anytime'];
const TIMES_FR = ['Matin (8h–12h)', 'Après-midi (12h–17h)', 'Soir (17h–21h)', "N'importe quand"];

const METHODS_EN = ['WhatsApp', 'Email', 'Phone call', 'Video call'];
const METHODS_FR = ['WhatsApp', 'Email', 'Appel téléphonique', 'Appel vidéo'];

/* ─── Slide transition ─────────────────────────────────────────── */
const slide = (dir: number) => ({
  initial: { opacity: 0, x: dir * 40 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: dir * -40 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Input style helper ───────────────────────────────────────── */
const inp: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#fff',
  outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
};

/* ─── Types ─────────────────────────────────────────────────────── */
interface Plan { name: string; price: string | number; }

interface FormData {
  siteType: string;
  style: string; // 'sample' | 'custom'
  name: string;
  business: string;
  industry: string;
  description: string;
  city: string;
  goals: string[];
  hasLogo: string;
  hasContent: string;
  hasExistingSite: string;
  existingUrl: string;
  email: string;
  phone: string;
  bestTime: string;
  method: string;
  notes: string;
}

const EMPTY: FormData = {
  siteType: '', style: '', name: '', business: '', industry: '', description: '',
  city: '', goals: [], hasLogo: '', hasContent: '', hasExistingSite: '',
  existingUrl: '', email: '', phone: '', bestTime: '', method: '', notes: '',
};

/* ─── Component ─────────────────────────────────────────────────── */
interface Props { plan: Plan | null; onClose: () => void; }

export function OnboardingModal({ plan, onClose }: Props) {
  const { lang } = useLanguage();
  const [step, setStep]   = useState(0);
  const [dir, setDir]     = useState(1);
  const [data, setData]   = useState<FormData>(EMPTY);
  const [done, setDone]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const fr = lang === 'fr';

  if (!plan) return null;

  const totalSteps = 4;
  const progress   = ((step) / totalSteps) * 100;

  /* helpers */
  const set = (k: keyof FormData, v: string) => setData(p => ({ ...p, [k]: v }));
  const toggleGoal = (g: string) => setData(p => ({
    ...p,
    goals: p.goals.includes(g) ? p.goals.filter(x => x !== g) : [...p.goals, g],
  }));

  const goNext = () => { setDir(1); setStep(s => s + 1); };
  const goPrev = () => { setDir(-1); setStep(s => s - 1); };

  /* step validation */
  const canNext = () => {
    if (step === 0) return !!data.siteType;
    if (step === 1) return !!(data.name && data.email);
    if (step === 2) return data.goals.length > 0;
    return true;
  };

  /* Submit — send emails via API */
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, plan, lang }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as any).error || 'Server error');
      }
      setDone(true);
    } catch (e: any) {
      setError(e.message || (fr ? 'Erreur réseau. Veuillez réessayer.' : 'Network error. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  /* ── Pill select helper ── */
  const Pill = ({ val, cur, onSel, label }: { val: string; cur: string; onSel: () => void; label: string }) => (
    <button
      onClick={onSel}
      style={{
        padding: '8px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.18s', border: '1px solid',
        borderColor: cur === val ? '#3b82f6' : 'rgba(255,255,255,0.1)',
        background: cur === val ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
        color: cur === val ? '#93c5fd' : 'rgba(255,255,255,0.6)',
      }}
    >{label}</button>
  );

  /* ── Step content ── */
  const steps = [
    /* ── STEP 0: Website Type ── */
    <motion.div key="s0" {...slide(dir)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
          {fr ? 'Quel type de site web souhaitez-vous?' : 'What type of website do you need?'}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
          {fr ? 'Choisissez le plus proche de votre vision — vous pourrez personnaliser ensuite.' : 'Pick the closest match — you can customize everything after.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {SITE_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() => set('siteType', type.id)}
            style={{
              borderRadius: '12px', overflow: 'hidden', border: '2px solid',
              borderColor: data.siteType === type.id ? '#3b82f6' : 'rgba(255,255,255,0.07)',
              background: data.siteType === type.id ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', padding: 0,
              boxShadow: data.siteType === type.id ? '0 0 0 1px rgba(59,130,246,0.3)' : 'none',
            }}
          >
            {/* Mini image preview */}
            {type.img ? (
              <div style={{ position: 'relative', height: '72px', overflow: 'hidden' }}>
                <img
                  src={`${BASE}/portfolio/${type.img}`}
                  alt={type.en}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,4,10,0.3), rgba(2,4,10,0.7))' }} />
                {data.siteType === type.id && (
                  <div style={{ position: 'absolute', top: '6px', right: '6px', width: '20px', height: '20px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={11} color="#fff" />
                  </div>
                )}
              </div>
            ) : (
              <div style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', background: 'rgba(59,130,246,0.06)' }}>
                {type.emoji}
              </div>
            )}
            <div style={{ padding: '8px 10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: data.siteType === type.id ? '#93c5fd' : 'rgba(255,255,255,0.8)' }}>
                {fr ? type.fr : type.en}
              </div>
            </div>
          </button>
        ))}
      </div>

      {data.siteType && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
            {fr ? 'Voulez-vous utiliser un de nos modèles ou une création 100% personnalisée?' : 'Would you prefer a template-based design or a fully custom creation?'}
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Pill val="sample" cur={data.style} onSel={() => set('style', 'sample')} label={fr ? '🎨 À partir d\'un modèle' : '🎨 Based on a sample'} />
            <Pill val="custom" cur={data.style} onSel={() => set('style', 'custom')} label={fr ? '✨ 100% personnalisé' : '✨ Fully custom'} />
          </div>
        </motion.div>
      )}
    </motion.div>,

    /* ── STEP 1: About You ── */
    <motion.div key="s1" {...slide(dir)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
          {fr ? 'Parlez-nous de vous' : 'Tell us about yourself'}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          {fr ? 'Ces informations nous permettent de personnaliser votre site dès le départ.' : 'This helps us personalize your site from day one.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
            {fr ? 'Votre prénom *' : 'Your first name *'}
          </label>
          <input value={data.name} onChange={e => set('name', e.target.value)} placeholder={fr ? 'Ex: Marie' : 'e.g. John'} style={inp} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
            Email *
          </label>
          <input value={data.email} onChange={e => set('email', e.target.value)} type="email" placeholder="you@example.com" style={inp} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
          {fr ? 'Nom de votre entreprise' : 'Business name'}
        </label>
        <input value={data.business} onChange={e => set('business', e.target.value)} placeholder={fr ? 'Ex: Tremblay Excavation Inc.' : 'e.g. Physio Optimal'} style={inp} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
          {fr ? 'Décrivez votre activité en quelques mots' : 'What does your business do?'}
        </label>
        <textarea
          value={data.description}
          onChange={e => set('description', e.target.value)}
          rows={3}
          placeholder={fr ? 'Ex: Nous offrons des services de terrassement résidentiel et commercial en Montérégie.' : 'e.g. We offer physiotherapy services for athletes and post-surgery recovery in Laval.'}
          style={{ ...inp, resize: 'none', lineHeight: 1.6 }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
            {fr ? 'Industrie (précise)' : 'Industry (specific)'}
          </label>
          <input value={data.industry} onChange={e => set('industry', e.target.value)} placeholder={fr ? 'Ex: Excavation résidentielle' : 'e.g. Residential excavation'} style={inp} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
            {fr ? 'Ville / Province' : 'City / Province'}
          </label>
          <input value={data.city} onChange={e => set('city', e.target.value)} placeholder={fr ? 'Ex: Montréal, QC' : 'e.g. Montreal, QC'} style={inp} />
        </div>
      </div>
    </motion.div>,

    /* ── STEP 2: Goals & Assets ── */
    <motion.div key="s2" {...slide(dir)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
          {fr ? 'Vos objectifs & ressources' : 'Your goals & assets'}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          {fr ? 'Cela nous aide à prioriser les fonctionnalités clés de votre site.' : 'This helps us prioritize the right features for your site.'}
        </p>
      </div>

      {/* Goals */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {fr ? 'Objectif principal du site (cochez tout ce qui s\'applique) *' : 'Main goal of the website (check all that apply) *'}
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(fr ? GOALS_FR : GOALS_EN).map((g, i) => {
            const key = GOALS_EN[i]; // store in EN for consistent WhatsApp msg
            const selected = data.goals.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleGoal(key)}
                style={{
                  padding: '8px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.18s', border: '1px solid',
                  borderColor: selected ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  background: selected ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                  color: selected ? '#93c5fd' : 'rgba(255,255,255,0.6)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                {selected && <Check size={12} />}
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Assets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {fr ? 'Avez-vous un logo?' : 'Do you have a logo?'}
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(fr ? ['✅ Oui', '❌ Non', '🎨 À faire'] : ['✅ Yes', '❌ No', '🎨 Need one']).map((opt, i) => {
              const val = ['yes', 'no', 'needed'][i];
              return (
                <button key={val} onClick={() => set('hasLogo', val)} style={{
                  flex: 1, padding: '9px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: 600,
                  cursor: 'pointer', border: '1px solid', textAlign: 'center', transition: 'all 0.18s',
                  borderColor: data.hasLogo === val ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  background: data.hasLogo === val ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                  color: data.hasLogo === val ? '#93c5fd' : 'rgba(255,255,255,0.55)',
                }}>{opt}</button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {fr ? 'Contenu (textes / photos)?' : 'Content ready (text / photos)?'}
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(fr ? ['✅ Prêt', '🔄 Partiel', '❌ Non'] : ['✅ Ready', '🔄 Partial', '❌ No']).map((opt, i) => {
              const val = ['Ready', 'Partial', 'No'][i];
              return (
                <button key={val} onClick={() => set('hasContent', val)} style={{
                  flex: 1, padding: '9px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: 600,
                  cursor: 'pointer', border: '1px solid', textAlign: 'center', transition: 'all 0.18s',
                  borderColor: data.hasContent === val ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  background: data.hasContent === val ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                  color: data.hasContent === val ? '#93c5fd' : 'rgba(255,255,255,0.55)',
                }}>{opt}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Existing site */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {fr ? 'Avez-vous déjà un site web?' : 'Do you have an existing website?'}
        </label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          {(fr ? ['Oui', 'Non'] : ['Yes', 'No']).map((opt, i) => {
            const val = ['yes', 'no'][i];
            return (
              <button key={val} onClick={() => set('hasExistingSite', val)} style={{
                padding: '9px 24px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', border: '1px solid', transition: 'all 0.18s',
                borderColor: data.hasExistingSite === val ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                background: data.hasExistingSite === val ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                color: data.hasExistingSite === val ? '#93c5fd' : 'rgba(255,255,255,0.55)',
              }}>{opt}</button>
            );
          })}
        </div>
        {data.hasExistingSite === 'yes' && (
          <motion.input
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            value={data.existingUrl} onChange={e => set('existingUrl', e.target.value)}
            placeholder="https://yoursite.com"
            style={{ ...inp }}
          />
        )}
      </div>
    </motion.div>,

    /* ── STEP 3: How to Reach You ── */
    <motion.div key="s3" {...slide(dir)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
          {fr ? 'Comment vous joindre?' : 'How can we reach you?'}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          {fr ? 'Nous vous contacterons dans les 2 heures pour démarrer votre projet.' : "We'll reach out within 2 hours to kick off your project."}
        </p>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
          {fr ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}
        </label>
        <input value={data.phone} onChange={e => set('phone', e.target.value)} type="tel" placeholder="+1 (514) 000-0000" style={inp} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {fr ? 'Meilleur moment pour vous joindre' : 'Best time to reach you'}
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(fr ? TIMES_FR : TIMES_EN).map((t, i) => {
            const val = TIMES_EN[i];
            return (
              <button key={val} onClick={() => set('bestTime', val)} style={{
                padding: '8px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', border: '1px solid', transition: 'all 0.18s',
                borderColor: data.bestTime === val ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                background: data.bestTime === val ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                color: data.bestTime === val ? '#93c5fd' : 'rgba(255,255,255,0.6)',
              }}>{t}</button>
            );
          })}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {fr ? 'Méthode de contact préférée' : 'Preferred contact method'}
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(fr ? METHODS_FR : METHODS_EN).map((m, i) => {
            const val = METHODS_EN[i];
            return (
              <button key={val} onClick={() => set('method', val)} style={{
                padding: '8px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', border: '1px solid', transition: 'all 0.18s',
                borderColor: data.method === val ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                background: data.method === val ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                color: data.method === val ? '#93c5fd' : 'rgba(255,255,255,0.6)',
              }}>{m}</button>
            );
          })}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
          {fr ? 'Questions ou informations supplémentaires' : 'Anything else we should know?'}
        </label>
        <textarea
          value={data.notes}
          onChange={e => set('notes', e.target.value)}
          rows={3}
          placeholder={fr ? 'Ex: référence de style, couleurs préférées, délai souhaité...' : 'e.g. style references, preferred colors, special deadline...'}
          style={{ ...inp, resize: 'none', lineHeight: 1.6 }}
        />
      </div>
    </motion.div>,
  ];

  /* ── Labels ── */
  const L = {
    step:  fr ? 'Étape'    : 'Step',
    of:    fr ? 'sur'      : 'of',
    back:  fr ? 'Retour'   : 'Back',
    next:  fr ? 'Continuer' : 'Next',
    send:  fr ? 'Envoyer ma demande' : 'Submit my request',
    close: fr ? 'Fermer'  : 'Close',
    plan:  fr ? 'Forfait sélectionné' : 'Selected plan',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%', maxWidth: '640px', maxHeight: '90vh',
            background: 'rgba(8,12,26,0.98)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px', display: 'flex', flexDirection: 'column',
            overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div style={{ padding: '20px 24px 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '2px' }}>
                  {L.plan}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#93c5fd' }}>
                  {plan.name} {plan.price !== '—' ? `— $${plan.price}/mo` : '— Custom'}
                </div>
              </div>
              <button
                onClick={onClose}
                style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Progress */}
            {!done && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {L.step} {step + 1} {L.of} {totalSteps}
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{Math.round(progress + 25)}%</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '99px', overflow: 'hidden', marginBottom: '4px' }}>
                  <motion.div
                    style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #93c5fd)', borderRadius: '99px' }}
                    animate={{ width: `${progress + 25}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', textAlign: 'center', gap: '16px' }}
              >
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={36} color="#93c5fd" />
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800 }}>
                  {fr ? '🎉 Demande envoyée!' : '🎉 Request sent!'}
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', maxWidth: '380px', lineHeight: 1.7 }}>
                  {fr
                    ? `Un email de confirmation a été envoyé à ${data.email}. Nous vous contacterons dans les 2 heures pour démarrer votre projet.`
                    : `A confirmation email was sent to ${data.email}. We'll reach out within 2 hours to kick off your project.`}
                </p>
                <button
                  onClick={onClose}
                  style={{ marginTop: '8px', padding: '11px 28px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none', background: '#3b82f6', color: '#fff' }}
                >
                  {fr ? 'Fermer' : 'Close'}
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                {steps[step]}
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          {!done && (
            <div style={{ padding: '12px 24px 20px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {error && (
                <p style={{ fontSize: '13px', color: '#f87171', margin: '0 0 10px', textAlign: 'center' }}>
                  ⚠ {error}
                </p>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={step === 0 ? onClose : goPrev}
                  disabled={loading}
                  style={{
                    padding: '11px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer', border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)',
                    display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.18s',
                  }}
                >
                  {step === 0 ? <><X size={14} /> {L.close}</> : <><ArrowLeft size={14} /> {L.back}</>}
                </button>

                {step < totalSteps - 1 ? (
                  <button
                    onClick={goNext}
                    disabled={!canNext()}
                    style={{
                      padding: '11px 24px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                      cursor: canNext() ? 'pointer' : 'not-allowed', border: 'none',
                      background: canNext() ? '#3b82f6' : 'rgba(59,130,246,0.2)',
                      color: canNext() ? '#fff' : 'rgba(255,255,255,0.3)',
                      display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.18s',
                    }}
                  >
                    {L.next} <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      padding: '11px 24px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer', border: 'none',
                      background: loading ? 'rgba(59,130,246,0.4)' : '#3b82f6',
                      color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.18s',
                    }}
                  >
                    {loading
                      ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> {fr ? 'Envoi...' : 'Sending...'}</>
                      : <><Send size={15} /> {L.send}</>
                    }
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
