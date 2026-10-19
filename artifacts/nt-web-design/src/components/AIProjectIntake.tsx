import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp, Mic, Globe, Smartphone, Bot, Shuffle, X, Check, Loader2, Plus, Layers, Paperclip,
  Briefcase, UtensilsCrossed, Stethoscope, ShoppingBag, Palette, Home, HelpCircle,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────── */
export type Lang = 'fr' | 'en';
export type ProjectKind = 'website' | 'mobile' | 'automation';
export type SiteType = 'business' | 'restaurant' | 'medical' | 'ecommerce' | 'portfolio' | 'realestate' | 'other';
export type Timeline = '72h' | '2weeks' | 'flexible';

export interface IntakeData {
  projectKind: ProjectKind;
  initialPrompt: string;
  siteType: SiteType | null;
  businessName: string;
  description: string;
  features: string[];
  timeline: Timeline | null;
  name: string;
  email: string;
  phone: string;
  plan?: string;
}

export interface AIProjectIntakeProps {
  lang?: Lang;
  plan?: string;
  parseEndpoint?: string;
  typeImages?: Partial<Record<SiteType, string>>;
  allowAttachments?: boolean;
  onSubmit: (data: IntakeData, files: File[]) => Promise<void>;
}

/* ─── Brand tokens ──────────────────────────────────────── */
const C = {
  // ntwebux.com palette — swap `accent` here to rebrand everything at once
  bg: '#060A14', panel: '#0B1526', panel2: '#0E1A2E', rim: '#14243F', tabOff: '#0A1322',
  border: 'rgba(0,140,255,0.16)', text: '#D8E8FF', heading: '#F2F7FF', muted: '#7E95BF',
  accent: '#1DCEA0', accentDim: 'rgba(29,206,160,0.12)', accentBorder: 'rgba(29,206,160,0.45)', onAccent: '#03241B',
  danger: '#F87171',
};

/* ─── Copy ──────────────────────────────────────────────── */
export const SITE_TYPES: { id: SiteType; icon: typeof Globe; fr: string; en: string }[] = [
  { id: 'business', icon: Briefcase, fr: 'Entreprise / Services', en: 'Business / Company' },
  { id: 'restaurant', icon: UtensilsCrossed, fr: 'Restaurant / Alimentation', en: 'Restaurant / Food' },
  { id: 'medical', icon: Stethoscope, fr: 'Médical / Santé', en: 'Medical / Health' },
  { id: 'ecommerce', icon: ShoppingBag, fr: 'Boutique en ligne', en: 'eCommerce / Store' },
  { id: 'portfolio', icon: Palette, fr: 'Portfolio / Créatif', en: 'Portfolio / Creative' },
  { id: 'realestate', icon: Home, fr: 'Immobilier', en: 'Real Estate' },
  { id: 'other', icon: HelpCircle, fr: 'Autre', en: 'Other' },
];

export const FEATURES: { id: string; fr: string; en: string }[] = [
  { id: 'booking', fr: 'Prise de rendez-vous', en: 'Online booking' },
  { id: 'payments', fr: 'Paiements en ligne', en: 'Online payments' },
  { id: 'bilingual', fr: 'Bilingue FR/EN', en: 'Bilingual FR/EN' },
  { id: 'ai_chat', fr: 'Chatbot IA 24/7', en: '24/7 AI chatbot' },
  { id: 'crm', fr: 'Capture de leads + CRM', en: 'Lead capture + CRM' },
  { id: 'sms', fr: 'Relances SMS', en: 'SMS follow-ups' },
  { id: 'blog', fr: 'Blogue / SEO', en: 'Blog / SEO' },
  { id: 'gallery', fr: 'Galerie photos', en: 'Photo gallery' },
];

export const TIMELINES: { id: Timeline; fr: string; en: string }[] = [
  { id: '72h', fr: 'Express — 72 h', en: 'Express — 72h' },
  { id: '2weeks', fr: 'D’ici 2 semaines', en: 'Within 2 weeks' },
  { id: 'flexible', fr: 'Flexible', en: 'Flexible' },
];

export const KINDS: { id: ProjectKind; icon: typeof Globe; fr: string; en: string }[] = [
  { id: 'website', icon: Layers, fr: 'Site web', en: 'Website' },
  { id: 'mobile', icon: Smartphone, fr: 'App mobile', en: 'Mobile app' },
  { id: 'automation', icon: Bot, fr: 'Agent IA', en: 'AI agent' },
];

const T = {
  fr: {
    hero: 'Commencez par une idée. Vous pourrez tout changer ensuite.',
    placeholder: 'Décrivez votre idée, on lui donne vie…',
    tryThese: 'Pas sûr par où commencer ? Essayez',
    examples: [
      'Site bilingue pour ma clinique dentaire avec rendez-vous',
      'Boutique en ligne pour mes bijoux faits main',
      'Site pour mon restaurant avec réservations',
      'Site pour mon cabinet comptable avec capture de leads',
      'Site vitrine pour un courtier immobilier',
    ],
    thinking: 'Analyse de votre projet…',
    noted: 'Bien reçu. J’ai déjà noté :',
    ask: {
      type: 'Quel type de site recherchez-vous ?',
      business: 'Quel est le nom de votre entreprise ? Dites-moi aussi en une ligne ce que vous faites.',
      features: 'Quelles fonctionnalités voulez-vous ? Choisissez-en autant que nécessaire.',
      timeline: 'Pour quand en avez-vous besoin ?',
      contact: 'Parfait. Où devons-nous envoyer votre proposition ?',
      review: 'Voici le résumé de votre projet. Tout est correct ?',
    },
    bizName: 'Nom de l’entreprise', bizDesc: 'Votre activité (optionnel)',
    name: 'Votre nom', email: 'Courriel', phone: 'Téléphone (optionnel)',
    next: 'Continuer', send: 'Envoyer ma demande', sending: 'Envoi…', edit: 'Modifier',
    required: 'Champ requis', badEmail: 'Courriel invalide',
    errSubmit: 'L’envoi a échoué. Réessayez dans un instant.',
    done: (n: string) => `Merci ${n} ! Votre demande est reçue. Nous vous contactons d’ici 2 heures pour démarrer votre projet.`,
    close: 'Fermer', newProject: 'Nouveau projet', attach: 'Joindre un logo ou une image', mic: 'Dicter', sendAria: 'Envoyer', back: '← Recommencer',
    rows: { kind: 'Projet', type: 'Type', biz: 'Entreprise', features: 'Fonctionnalités', timeline: 'Délai', contact: 'Contact' },
    none: '—',
  },
  en: {
    hero: 'Start with one prompt. You can change everything later.',
    placeholder: 'Describe your idea, we will bring it to life…',
    tryThese: 'Not sure where to start? Try these',
    examples: [
      'Bilingual site for my dental clinic with booking',
      'Online store for my handmade jewelry',
      'Restaurant website with reservations',
      'Accounting firm site with lead capture',
      'Listing site for a real estate agent',
    ],
    thinking: 'Analyzing your project…',
    noted: 'Got it. I already noted:',
    ask: {
      type: 'What type of website are you looking for?',
      business: 'What’s your business name? Tell me in one line what you do.',
      features: 'Which features do you need? Pick as many as you like.',
      timeline: 'When do you need it?',
      contact: 'Perfect. Where should we send your proposal?',
      review: 'Here’s your project summary. Does everything look right?',
    },
    bizName: 'Business name', bizDesc: 'What you do (optional)',
    name: 'Your name', email: 'Email', phone: 'Phone (optional)',
    next: 'Continue', send: 'Send my request', sending: 'Sending…', edit: 'Edit',
    required: 'Required', badEmail: 'Invalid email',
    errSubmit: 'Sending failed. Please try again in a moment.',
    done: (n: string) => `Thanks ${n}! Your request is in. We’ll reach out within 2 hours to kick off your project.`,
    close: 'Close', newProject: 'New project', attach: 'Attach a logo or image', mic: 'Dictate', sendAria: 'Send', back: '← Start over',
    rows: { kind: 'Project', type: 'Type', biz: 'Business', features: 'Features', timeline: 'Timeline', contact: 'Contact' },
    none: '—',
  },
};

/* ─── Prompt parsing (keyword fallback; AI endpoint preferred) ─ */
type Parsed = Partial<Pick<IntakeData, 'siteType' | 'businessName' | 'description' | 'features' | 'timeline' | 'email' | 'name' | 'phone'>>;

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/;

export function localParse(text: string): Parsed {
  const t = text.toLowerCase();
  const out: Parsed = {};
  const typeRules: [SiteType, RegExp][] = [
    ['restaurant', /restau|resto\b|food|café|cafe\b|traiteur|cuisine|boulangerie|bakery|pizz|bar\b/],
    ['medical', /clini|dentist|dentaire|médic|medic|santé|health|physio|chiro|pharma|optom|psycho|massoth/],
    ['ecommerce', /boutique en ligne|e-?commerce|online store|\bstore\b|\bshop\b|vendre|sell|bijou|jewel|merch/],
    ['realestate', /immobili|real estate|courtier|realtor|broker|propriét|listing/],
    ['portfolio', /portfolio|artiste|artist|photograph|musici|creative|créati|designer/],
    ['business', /entreprise|business|company|compagnie|consult|agence|agency|cabinet|comptab|account|avocat|law|construction|plomb|électric|services?\b/],
  ];
  for (const [id, re] of typeRules) if (re.test(t)) { out.siteType = id; break; }

  const featRules: [string, RegExp][] = [
    ['booking', /rendez-vous|rdv|réserv|booking|appointment|reservation/],
    ['payments', /paiement|payment|stripe|checkout|payer/],
    ['bilingual', /bilingu|français et anglais|french and english|fr\/en/],
    ['ai_chat', /chatbot|\bia\b|\bai\b|assistant/],
    ['crm', /\bcrm\b|lead|prospect/],
    ['sms', /\bsms\b|texto|text message/],
    ['blog', /blog|seo|référencement/],
    ['gallery', /galerie|gallery|photos?\b/],
  ];
  const feats = featRules.filter(([, re]) => re.test(t)).map(([id]) => id);
  if (feats.length) out.features = feats;

  if (/72 ?h|urgent|asap|rapidement|cette semaine|this week/.test(t)) out.timeline = '72h';
  const em = text.match(EMAIL_RE);
  if (em) out.email = em[0];
  return out;
}

async function parsePrompt(text: string, lang: Lang, endpoint: string): Promise<Parsed> {
  const local = localParse(text);
  if (!endpoint) return local;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text, lang }), signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return local;
    const ai = (await res.json()) as Parsed;
    return {
      ...local, ...Object.fromEntries(Object.entries(ai).filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && !v.length))),
      features: Array.from(new Set([...(local.features ?? []), ...(ai.features ?? [])])),
    };
  } catch {
    return local;
  }
}

/* ─── Component ─────────────────────────────────────────── */
type Step = 'home' | 'thinking' | 'type' | 'business' | 'features' | 'timeline' | 'contact' | 'review' | 'done';
const FLOW: Step[] = ['type', 'business', 'features', 'timeline', 'contact'];
interface Msg { id: number; role: 'ai' | 'user'; text: string; }

const EMPTY: IntakeData = {
  projectKind: 'website', initialPrompt: '', siteType: null, businessName: '', description: '',
  features: [], timeline: null, name: '', email: '', phone: '',
};

const ORBS = [
  'conic-gradient(from 200deg, #0044DD, #00AAEE, #00FF77, #0044DD)',
  'conic-gradient(from 90deg, #00AAEE, #1DCEA0, #0077FF, #00AAEE)',
  'conic-gradient(from 300deg, #0033CC, #1DCEA0, #00FFAA, #0033CC)',
  'conic-gradient(from 20deg, #1DCEA0, #0077FF, #00AAEE, #1DCEA0)',
];

function starShadows(count: number, seed: number) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: count }, () =>
    `${Math.round(rnd() * 2000)}px ${Math.round(rnd() * 1400)}px rgba(255,255,255,${(0.25 + rnd() * 0.6).toFixed(2)})`).join(',');
}
const STARS_SM = starShadows(140, 7);
const STARS_MD = starShadows(40, 13);

export default function AIProjectIntake({
  lang = 'fr', plan, parseEndpoint = '/api/intake/parse', typeImages, allowAttachments = true, onSubmit,
}: AIProjectIntakeProps) {
  const t = T[lang];
  const [data, setData] = useState<IntakeData>({ ...EMPTY, plan });
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<Step>('home');
  const [answered, setAnswered] = useState<Set<Step>>(new Set());
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [exampleOffset, setExampleOffset] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [listening, setListening] = useState(false);

  const idRef = useRef(0);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const recogRef = useRef<any>(null);

  const SpeechRecognition: any =
    typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;

  useEffect(() => () => { timers.current.forEach(clearTimeout); recogRef.current?.stop?.(); }, []);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [msgs, typing, step]);

  const label = (list: { id: string; fr: string; en: string }[], id: string) => list.find(x => x.id === id)?.[lang] ?? id;
  const push = (role: Msg['role'], text: string) => setMsgs(m => [...m, { id: ++idRef.current, role, text }]);

  const aiSay = (lines: string[], then?: Step) => {
    setTyping(true);
    lines.forEach((line, i) => {
      timers.current.push(window.setTimeout(() => {
        push('ai', line);
        if (i === lines.length - 1) { setTyping(false); if (then) setStep(then); }
      }, 550 * (i + 1)));
    });
  };

  const nextStep = (ans: Set<Step>): Step => FLOW.find(s => !ans.has(s)) ?? 'review';
  const ask = (s: Step, prefix: string[] = []) => {
    setStep('thinking');
    const q = s === 'review' ? t.ask.review : (t.ask as Record<string, string>)[s];
    aiSay([...prefix, q], s);
  };
  const complete = (s: Step, userText: string, patch: Partial<IntakeData> = {}) => {
    const ans = new Set(answered); ans.add(s);
    setAnswered(ans);
    setData(d => ({ ...d, ...patch }));
    push('user', userText);
    setErrors({});
    ask(nextStep(ans));
  };

  const startFromPrompt = async (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    recogRef.current?.stop?.();
    push('user', clean + (files.length ? `  📎 ${files.map(f => f.name).join(', ')}` : ''));
    setPrompt('');
    setStep('thinking');
    setTyping(true);
    const parsed = await parsePrompt(clean, lang, parseEndpoint);
    setTyping(false);
    const merged: IntakeData = { ...data, ...parsed, initialPrompt: clean, features: parsed.features ?? [] };
    setData(merged);

    const ans = new Set<Step>();
    const notes: string[] = [];
    if (merged.siteType) { ans.add('type'); notes.push(label(SITE_TYPES, merged.siteType)); }
    if (merged.businessName) { ans.add('business'); notes.push(merged.businessName); }
    if (merged.timeline) { ans.add('timeline'); notes.push(label(TIMELINES, merged.timeline)); }
    if (merged.features.length) notes.push(merged.features.map(f => label(FEATURES, f)).join(', '));
    setAnswered(ans);
    ask(nextStep(ans), notes.length ? [`${t.noted} ${notes.join(' · ')}.`] : []);
  };

  const toggleMic = () => {
    if (!SpeechRecognition) return;
    if (listening) { recogRef.current?.stop(); return; }
    const r = new SpeechRecognition();
    r.lang = lang === 'fr' ? 'fr-CA' : 'en-CA';
    r.interimResults = true;
    r.onresult = (e: any) => setPrompt(Array.from(e.results).map((x: any) => x[0].transcript).join(' '));
    r.onend = () => setListening(false);
    recogRef.current = r; r.start(); setListening(true);
  };

  const submit = async () => {
    setSubmitting(true); setSubmitError('');
    try {
      await onSubmit({ ...data, plan }, files);
      setStep('thinking');
      aiSay([t.done(data.name.split(' ')[0] || '')], 'done');
    } catch {
      setSubmitError(t.errSubmit);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setData({ ...EMPTY, plan }); setFiles([]); setAnswered(new Set()); setMsgs([]); setStep('home'); setTyping(false);
  };

  const progress = step === 'done' ? 100 : Math.round((answered.size / FLOW.length) * 100);
  const examples = [0, 1, 2, 3].map(i => t.examples[(exampleOffset + i) % t.examples.length]);
  const canSend = !!prompt.trim();

  return (
    <section style={S.page}>
      {/* Night sky */}
      <div aria-hidden style={S.sky}>
        <div style={{ ...S.stars, boxShadow: STARS_SM }} />
        <div style={{ ...S.stars, width: 2, height: 2, boxShadow: STARS_MD }} />
        <div style={{ ...S.cloud, left: '28%', top: -60, width: 420, height: 160 }} />
        <div style={{ ...S.cloud, left: '52%', top: -30, width: 360, height: 140 }} />
        <div style={{ ...S.cloud, right: '-4%', top: -50, width: 380, height: 150 }} />
        <div style={{ ...S.cloud, left: '-6%', top: -40, width: 300, height: 120, opacity: .6 }} />
      </div>

      {step === 'home' ? (
        <div style={S.homeWrap}>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} style={S.hero}>{t.hero}</motion.h1>

          <div style={S.composerWrap}>
            <div style={S.tabs} role="tablist">
              {KINDS.map(k => {
                const active = data.projectKind === k.id;
                return (
                  <button key={k.id} role="tab" aria-selected={active}
                    onClick={() => setData(d => ({ ...d, projectKind: k.id }))}
                    style={{ ...S.tab, ...(active ? S.tabActive : {}) }}>
                    <k.icon size={20} strokeWidth={1.8} color={active ? C.accent : C.muted} />
                    <span>{k[lang]}</span>
                    {k.id === 'automation' && <span style={S.newBadge}>NEW</span>}
                  </button>
                );
              })}
            </div>

            <div style={S.rim}>
              <div style={S.box}>
                <textarea
                  autoFocus value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={t.placeholder} rows={4}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); startFromPrompt(prompt); } }}
                  style={S.textarea} aria-label={t.placeholder}
                />
                {files.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    {files.map((f, i) => (
                      <span key={f.name + i} style={S.fileChip}>
                        <Paperclip size={13} /> {f.name}
                        <button aria-label="Retirer" style={S.fileX} onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))}><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                )}
                <div style={S.boxActions}>
                  {allowAttachments ? (
                    <button aria-label={t.attach} title={t.attach} onClick={() => fileRef.current?.click()} style={S.plusBtn}>
                      <Plus size={24} strokeWidth={1.8} />
                    </button>
                  ) : <span />}
                  <input ref={fileRef} type="file" multiple accept="image/*,.pdf" hidden
                    onChange={e => { setFiles(fs => [...fs, ...Array.from(e.target.files ?? [])].slice(0, 5)); e.target.value = ''; }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {SpeechRecognition && (
                      <button aria-label={t.mic} title={t.mic} onClick={toggleMic}
                        style={{ ...S.micBtn, color: listening ? C.accent : C.text }}>
                        <Mic size={24} strokeWidth={2} />
                      </button>
                    )}
                    <button aria-label={t.sendAria} disabled={!canSend} onClick={() => startFromPrompt(prompt)}
                      style={{ ...S.sendBtn, ...(canSend ? S.sendOn : {}) }}>
                      <ArrowUp size={26} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', width: '100%' }}>
            <button onClick={() => setExampleOffset(o => o + 1)} style={S.tryBtn}>
              {t.tryThese} <Shuffle size={16} />
            </button>
            <div style={S.chips}>
              {examples.map((ex, i) => (
                <button key={ex} onClick={() => setPrompt(ex)} style={S.chip}>
                  <span style={{ ...S.orb, background: ORBS[(i + exampleOffset) % ORBS.length] }} /> {ex}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={S.chatWrap}>
          <div style={S.chatTop}>
            <button onClick={reset} style={S.tryBtn}>{t.back}</button>
            <div style={S.progressTrack}><motion.div style={S.progressBar} animate={{ width: `${progress}%` }} /></div>
          </div>

          <div ref={scrollRef} style={S.chat}>
            {msgs.map(m => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 12 }}>
                {m.role === 'ai' && <span style={{ ...S.orb, width: 28, height: 28, marginTop: 4, background: ORBS[0] }} />}
                <div style={m.role === 'user' ? S.bubbleUser : S.bubbleAi}>{m.text}</div>
              </motion.div>
            ))}
            {typing && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ ...S.orb, width: 28, height: 28, background: ORBS[0] }} />
                <div style={{ ...S.bubbleAi, display: 'flex', gap: 5 }}>
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} style={S.dot} animate={{ opacity: [.3, 1, .3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * .15 }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={S.rim}>
            <div style={{ ...S.box, minHeight: 0, padding: 20 }}>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {step === 'thinking' && <div style={{ color: C.muted, fontSize: 15, padding: '6px 2px' }}>{t.thinking}</div>}

                  {step === 'type' && (
                    <div style={S.grid2}>
                      {SITE_TYPES.map(st => (
                        <button key={st.id} style={{ ...S.typeCard, ...(data.siteType === st.id ? S.selected : {}) }}
                          onClick={() => complete('type', st[lang], { siteType: st.id })}>
                          {typeImages?.[st.id]
                            ? <img src={typeImages[st.id]} alt="" style={S.typeImg} />
                            : <st.icon size={18} color={C.accent} />}
                          <span>{st[lang]}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'business' && (
                    <form onSubmit={e => {
                      e.preventDefault();
                      if (!data.businessName.trim()) { setErrors({ businessName: t.required }); return; }
                      complete('business', [data.businessName, data.description].filter(Boolean).join(' — '));
                    }}>
                      <div style={S.grid2}>
                        <Field label={t.bizName} value={data.businessName} error={errors.businessName} autoFocus
                          onChange={v => { setData(d => ({ ...d, businessName: v })); setErrors({}); }} />
                        <Field label={t.bizDesc} value={data.description} onChange={v => setData(d => ({ ...d, description: v }))} />
                      </div>
                      <PrimaryBtn label={t.next} />
                    </form>
                  )}

                  {step === 'features' && (
                    <div>
                      <div style={S.chipsLeft}>
                        {FEATURES.map(f => {
                          const on = data.features.includes(f.id);
                          return (
                            <button key={f.id} style={{ ...S.featChip, ...(on ? S.selected : {}) }}
                              onClick={() => setData(d => ({ ...d, features: on ? d.features.filter(x => x !== f.id) : [...d.features, f.id] }))}>
                              {on && <Check size={14} color={C.accent} />} {f[lang]}
                            </button>
                          );
                        })}
                      </div>
                      <PrimaryBtn label={t.next} onClick={() =>
                        complete('features', data.features.length ? data.features.map(f => label(FEATURES, f)).join(', ') : t.none)} />
                    </div>
                  )}

                  {step === 'timeline' && (
                    <div style={{ ...S.chipsLeft, marginBottom: 0 }}>
                      {TIMELINES.map(tl => (
                        <button key={tl.id} style={{ ...S.featChip, ...(data.timeline === tl.id ? S.selected : {}) }}
                          onClick={() => complete('timeline', tl[lang], { timeline: tl.id })}>{tl[lang]}</button>
                      ))}
                    </div>
                  )}

                  {step === 'contact' && (
                    <form onSubmit={e => {
                      e.preventDefault();
                      const errs: Record<string, string> = {};
                      if (!data.name.trim()) errs.name = t.required;
                      if (!data.email.trim()) errs.email = t.required;
                      else if (!EMAIL_RE.test(data.email)) errs.email = t.badEmail;
                      if (Object.keys(errs).length) { setErrors(errs); return; }
                      complete('contact', [data.name, data.email, data.phone].filter(Boolean).join(' · '));
                    }}>
                      <div style={S.grid3}>
                        <Field label={t.name} value={data.name} error={errors.name} autoFocus
                          onChange={v => { setData(d => ({ ...d, name: v })); setErrors(x => ({ ...x, name: '' })); }} />
                        <Field label={t.email} type="email" value={data.email} error={errors.email}
                          onChange={v => { setData(d => ({ ...d, email: v })); setErrors(x => ({ ...x, email: '' })); }} />
                        <Field label={t.phone} type="tel" value={data.phone} onChange={v => setData(d => ({ ...d, phone: v }))} />
                      </div>
                      <PrimaryBtn label={t.next} />
                    </form>
                  )}

                  {step === 'review' && (
                    <div>
                      <div style={S.summary}>
                        {([
                          [t.rows.kind, label(KINDS, data.projectKind), null],
                          [t.rows.type, data.siteType ? label(SITE_TYPES, data.siteType) : t.none, 'type'],
                          [t.rows.biz, [data.businessName, data.description].filter(Boolean).join(' — ') || t.none, 'business'],
                          [t.rows.features, data.features.map(f => label(FEATURES, f)).join(', ') || t.none, 'features'],
                          [t.rows.timeline, data.timeline ? label(TIMELINES, data.timeline) : t.none, 'timeline'],
                          [t.rows.contact, [data.name, data.email, data.phone].filter(Boolean).join(' · '), 'contact'],
                        ] as [string, string, Step | null][]).map(([k, v, s], i, arr) => (
                          <div key={k} style={{ ...S.summaryRow, borderBottom: i === arr.length - 1 ? 'none' : S.summaryRow.borderBottom }}>
                            <span style={{ color: C.muted, minWidth: 120 }}>{k}</span>
                            <span style={{ flex: 1 }}>{v}</span>
                            {s && <button style={S.editBtn} onClick={() => setStep(s)}>{t.edit}</button>}
                          </div>
                        ))}
                      </div>
                      {submitError && <p style={S.error}>{submitError}</p>}
                      <PrimaryBtn label={submitting ? t.sending : t.send} disabled={submitting} onClick={submit}
                        icon={submitting ? <Loader2 size={18} /> : <ArrowUp size={18} />} />
                    </div>
                  )}

                  {step === 'done' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <PrimaryBtn label={t.newProject} onClick={reset} inline />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Small pieces ──────────────────────────────────────── */
function Field({ label, value, onChange, error, type = 'text', autoFocus }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; autoFocus?: boolean;
}) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ display: 'block', fontSize: 13, color: C.muted, marginBottom: 6, fontWeight: 600 }}>{label}</span>
      <input type={type} value={value} autoFocus={autoFocus} onChange={e => onChange(e.target.value)}
        style={{ ...S.input, borderColor: error ? C.danger : C.border }} />
      {error && <span style={S.error}>{error}</span>}
    </label>
  );
}

function PrimaryBtn({ label, onClick, disabled, icon, inline }: {
  label: string; onClick?: () => void; disabled?: boolean; icon?: ReactNode; inline?: boolean;
}) {
  return (
    <button type={onClick ? 'button' : 'submit'} onClick={onClick} disabled={disabled}
      style={{ ...S.primary, width: inline ? 'auto' : '100%', opacity: disabled ? .6 : 1 }}>
      {label} {icon ?? <ArrowUp size={18} style={{ transform: 'rotate(90deg)' }} />}
    </button>
  );
}

/* ─── Styles ────────────────────────────────────────────── */
const FONT = '"Inter", "SF Pro Display", ui-sans-serif, system-ui, -apple-system, sans-serif';

const S: Record<string, CSSProperties> = {
  page: { position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', color: C.text, fontFamily: FONT,
    background: `radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,100,255,0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 100%, rgba(29,206,160,0.08) 0%, transparent 70%), ${C.bg}`, boxSizing: 'border-box' },
  sky: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  stars: { position: 'absolute', top: 0, left: 0, width: 1, height: 1, borderRadius: '50%', background: 'transparent' },
  cloud: { position: 'absolute', borderRadius: '50%', background: 'rgba(90,140,230,0.12)', filter: 'blur(40px)' },

  homeWrap: { position: 'relative', zIndex: 1, maxWidth: 1460, margin: '0 auto', minHeight: '100vh', boxSizing: 'border-box',
    padding: 'clamp(64px, 10vh, 110px) clamp(16px, 5vw, 64px) 64px', display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 'clamp(28px, 4vh, 44px)' },
  hero: { margin: 0, textAlign: 'center', fontSize: 'clamp(30px, 4.2vw, 52px)', fontWeight: 600, letterSpacing: '-0.055em',
    lineHeight: 1.08, color: C.heading },

  composerWrap: { width: '100%', maxWidth: 1440 },
  tabs: { display: 'flex', gap: 'clamp(6px, 1vw, 12px)', paddingLeft: 'clamp(10px, 2.5vw, 40px)', overflowX: 'auto', scrollbarWidth: 'none' },
  tab: { display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 12px)', height: 'clamp(46px, 6vw, 68px)', padding: '0 clamp(12px, 3vw, 54px)', border: 'none', flexShrink: 0, whiteSpace: 'nowrap',
    borderRadius: '16px 16px 0 0', background: C.tabOff, color: C.muted, fontSize: 'clamp(15px, 1.3vw, 21px)', fontWeight: 600,
    fontFamily: FONT, cursor: 'pointer', marginBottom: -1 },
  tabActive: { background: C.rim, color: C.heading },
  newBadge: { background: '#E11D2E', color: '#fff', fontSize: 'clamp(11px, .95vw, 15px)', fontWeight: 900, letterSpacing: '.04em',
    padding: '3px 10px', borderRadius: 7, border: '2px solid #fff', transform: 'rotate(-6deg)', fontStyle: 'italic', lineHeight: 1.2 },

  rim: { background: C.rim, borderRadius: 30, padding: 7, boxShadow: '0 0 0 1px rgba(0,140,255,0.18), 0 30px 80px rgba(0,40,120,0.35)' },
  box: { background: C.panel, borderRadius: 24, padding: 'clamp(18px, 2.2vw, 30px)', minHeight: 'clamp(200px, 26vh, 300px)',
    display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  textarea: { flex: 1, width: '100%', resize: 'none', background: 'transparent', border: 'none', outline: 'none', color: C.text,
    fontSize: 'clamp(17px, 1.5vw, 25px)', lineHeight: 1.5, fontFamily: FONT, minHeight: 110 },
  boxActions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  plusBtn: { width: 48, height: 48, borderRadius: 12, border: 'none', background: 'transparent', color: C.text, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center' },
  micBtn: { width: 44, height: 44, border: 'none', background: 'transparent', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center' },
  sendBtn: { width: 90, height: 60, borderRadius: 30, border: 'none', background: '#1B2A45', color: '#5A7DB5',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'not-allowed', transition: 'background .2s, color .2s' },
  sendOn: { background: C.accent, color: C.onAccent, cursor: 'pointer', boxShadow: '0 6px 24px rgba(29,206,160,0.35)' },
  fileChip: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, background: C.rim,
    fontSize: 13, color: C.text },
  fileX: { background: 'none', border: 'none', color: C.muted, cursor: 'pointer', display: 'flex', padding: 0 },

  tryBtn: { display: 'inline-flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', color: C.muted,
    fontSize: 'clamp(14px, 1.1vw, 18px)', fontWeight: 600, cursor: 'pointer', fontFamily: FONT, padding: 4 },
  chips: { display: 'flex', flexWrap: 'wrap', gap: '16px 20px', justifyContent: 'center', marginTop: 20 },
  chip: { display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 20px 10px 12px', borderRadius: 999,
    border: `1px solid ${C.border}`, background: 'rgba(11,21,38,0.85)', color: C.text, fontSize: 'clamp(15px, 1.35vw, 22px)', cursor: 'pointer',
    fontFamily: FONT },
  orb: { width: 30, height: 30, borderRadius: '50%', flexShrink: 0, display: 'inline-block', boxShadow: '0 0 12px rgba(0,170,238,0.35)' },

  chatWrap: { position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', height: '100vh', boxSizing: 'border-box',
    padding: 'clamp(20px, 4vh, 40px) clamp(16px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: 16 },
  chatTop: { display: 'flex', alignItems: 'center', gap: 16 },
  progressTrack: { flex: 1, height: 4, background: C.rim, borderRadius: 2, overflow: 'hidden' },
  progressBar: { height: '100%', background: C.accent, borderRadius: 2 },
  chat: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, padding: '8px 4px' },
  bubbleAi: { maxWidth: '78%', background: C.panel, border: `1px solid ${C.border}`, padding: '14px 18px',
    borderRadius: '6px 20px 20px 20px', fontSize: 17, lineHeight: 1.55 },
  bubbleUser: { maxWidth: '78%', background: C.accentDim, border: `1px solid ${C.accentBorder}`, padding: '14px 18px', borderRadius: '20px 6px 20px 20px', fontSize: 17, lineHeight: 1.55 },
  dot: { width: 7, height: 7, borderRadius: '50%', background: C.accent, display: 'inline-block' },

  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 },
  typeCard: { display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, border: `1px solid ${C.border}`,
    background: C.panel2, color: C.text, fontSize: 15, fontWeight: 600, cursor: 'pointer', textAlign: 'left', fontFamily: FONT },
  typeImg: { width: 60, height: 38, objectFit: 'cover', borderRadius: 7, flexShrink: 0 },
  chipsLeft: { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  featChip: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 999, border: `1px solid ${C.border}`,
    background: C.panel2, color: C.text, fontSize: 15, cursor: 'pointer', fontFamily: FONT },
  selected: { borderColor: C.accentBorder, background: C.accentDim },
  input: { width: '100%', padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.border}`, background: C.panel2,
    color: C.text, fontSize: 16, outline: 'none', fontFamily: FONT, boxSizing: 'border-box' },
  error: { display: 'block', color: C.danger, fontSize: 13, marginTop: 6 },
  primary: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 22px', borderRadius: 999,
    border: 'none', background: C.accent, color: C.onAccent, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: FONT },
  editBtn: { background: 'none', border: 'none', color: C.muted, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT },
  summary: { border: `1px solid ${C.border}`, borderRadius: 14, background: C.panel2, marginBottom: 14 },
  summaryRow: { display: 'flex', gap: 12, alignItems: 'center', padding: '11px 16px', borderBottom: `1px solid ${C.border}`, fontSize: 15 },
};
