import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, CalendarCheck, Star, ArrowRight, Check, Zap, BarChart2, Users, ChevronDown, PhoneCall, AlertCircle, TrendingUp } from 'lucide-react';
import { BSuiteIntakeModal } from '@/components/BSuiteIntakeModal';

type Lang = 'en' | 'fr';
type Tier = 'starter' | 'pro' | 'full' | '';
function bi<T>(obj: { en: T; fr: T }, lang: Lang): T { return obj[lang]; }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.58, ease: [0.22, 1, 0.36, 1] } }),
};

/* ─── Reusable CTA button ─────────────────────────────────── */
function PrimaryCTA({ lang, onClick }: { lang: Lang; onClick: () => void }) {
  const label = lang === 'fr' ? 'Commencer — 2 minutes →' : 'Get Started — 2 Minutes →';
  return (
    <button onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: '#fff', boxShadow: '0 8px 32px rgba(59,130,246,0.42)', transition: 'transform 0.18s, box-shadow 0.18s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 40px rgba(59,130,246,0.55)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(59,130,246,0.42)'; }}>
      {label}
    </button>
  );
}

/* ─── Live console ────────────────────────────────────────── */
const CONSOLE_EN = ["[14:02:11] Missed call from +1 (514) 555-0142","[14:02:12] AI Text-Back sequence initiated","[14:02:14] SMS sent — qualifying prospect intent","[14:02:47] Reply: 'kitchen remodel quote'","[14:02:48] Lead scored 87/100 — high intent","[14:02:51] Calendar sync: 3 slots offered","[14:03:09] Booking confirmed — Thu 10:30 AM","[14:03:10] CRM record created · ID #LD-9241","[14:04:02] Missed call from +1 (438) 555-0188","[14:04:19] Lead scored 92/100 — high intent","[14:04:22] Estimate auto-booked — Sat 9:00 AM","[14:05:34] Google review posted ★★★★★","[14:06:01] Pipeline value updated: +$14,200"];
const CONSOLE_FR = ["[14:02:11] Appel manqué de +1 (514) 555-0142","[14:02:12] Séquence Réponse SMS IA initiée","[14:02:14] SMS envoyé — qualification du prospect","[14:02:47] Réponse : « devis rénovation cuisine »","[14:02:48] Score : 87/100 — fort intérêt","[14:02:51] Sync agenda : 3 créneaux proposés","[14:03:09] RDV confirmé — jeu. 10 h 30","[14:03:10] Fiche CRM créée · ID #LD-9241","[14:04:02] Appel manqué de +1 (438) 555-0188","[14:04:19] Score : 92/100 — fort intérêt","[14:04:22] Estimation auto-réservée — sam. 9 h 00","[14:05:34] Avis Google publié ★★★★★","[14:06:01] Valeur du pipeline mise à jour : +14 200 $"];

function LiveConsole({ lines }: { lines: string[] }) {
  return (
    <div className="bs-console" aria-hidden="true">
      <div className="bs-console__inner">
        {[...lines, ...lines].map((l, i) => <div key={i} className="bs-console__line">{l}</div>)}
      </div>
      <div className="bs-console__scanlines" />
      <div className="bs-console__mask" />
    </div>
  );
}

/* ─── Ghost analytics chart ───────────────────────────────── */
function GhostAnalytics({ label }: { label: string }) {
  return (
    <div className="bs-analytics" aria-hidden="true">
      <svg viewBox="0 0 600 150" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="bsga-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0"/>
            <stop offset="20%" stopColor="#22d3ee" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#34d399" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="bsga-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0.25,0.5,0.75].map((t,i) => <line key={i} x1="0" x2="600" y1={150*t} y2={150*t} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 5"/>)}
        <path d="M0,132 L40,120 L90,110 L150,116 L210,100 L270,88 L330,74 L390,64 L450,48 L510,34 L570,20 L600,12 L600,150 L0,150 Z" fill="url(#bsga-fill)"/>
        <path d="M0,132 L40,120 L90,110 L150,116 L210,100 L270,88 L330,74 L390,64 L450,48 L510,34 L570,20 L600,12" fill="none" stroke="url(#bsga-line)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="600" cy="12" r="3" fill="#34d399"><animate attributeName="r" values="3;5;3" dur="1.6s" repeatCount="indefinite"/></circle>
      </svg>
      <div className="bs-analytics__label">
        <span className="bs-analytics__dot"/>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{label}</span>
        <span style={{ fontSize: '15px', fontWeight: 800, color: '#34d399', marginLeft: 'auto' }}>+61%</span>
      </div>
    </div>
  );
}

/* ─── Pipeline viz ────────────────────────────────────────── */
function PipelineViz({ lang }: { lang: Lang }) {
  const stages = lang === 'fr'
    ? ['Nouveau lead','Qualifié','Devis envoyé','Gagné']
    : ['New Lead','Qualified','Quote Sent','Won'];
  const counts = [12, 8, 5, 4];
  const colors = ['rgba(59,130,246,0.7)','rgba(99,102,241,0.7)','rgba(167,139,250,0.7)','rgba(34,197,94,0.7)'];
  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }} aria-hidden="true">
      {stages.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)', width: '80px', flexShrink: 0 }}>{s}</div>
          <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(counts[i] / 12) * 100}%`, background: colors[i], borderRadius: '4px', boxShadow: `0 0 8px ${colors[i]}` }} />
          </div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', width: '20px', textAlign: 'right' }}>{counts[i]}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── SMS chat viz ────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.55)' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function ChatViz({ lang }: { lang: Lang }) {
  type MsgItem = { role: 'user' | 'ai'; t: string };

  const msgs: MsgItem[] = lang === 'fr'
    ? [
        { role: 'user', t: "J'ai manqué un appel pendant mon chantier." },
        { role: 'ai',   t: "Déjà géré — SMS envoyé en 12 s. Client cherche un devis peinture." },
        { role: 'user', t: "Il a réservé ?" },
        { role: 'ai',   t: "Oui. Jeudi 10 h 30 — confirmé dans votre agenda Google." },
      ]
    : [
        { role: 'user', t: "Got a missed call while I was on a job site." },
        { role: 'ai',   t: "Handled — texted them back in 12 s. They need a painting quote." },
        { role: 'user', t: "Did they book?" },
        { role: 'ai',   t: "Yes. Thursday 10:30 AM — confirmed in your Google Calendar." },
      ];

  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    let active = true;
    const tids: ReturnType<typeof setTimeout>[] = [];
    function enq(fn: () => void, ms: number) { tids.push(setTimeout(fn, ms)); }

    function runCycle() {
      if (!active) return;
      setVisibleCount(0);
      setShowTyping(false);

      let t = 0;
      // user msg 0
      enq(() => { if (active) setVisibleCount(1); },                            t += 350);
      // AI typing, then AI msg 1
      enq(() => { if (active) setShowTyping(true); },                           t += 650);
      enq(() => { if (active) { setShowTyping(false); setVisibleCount(2); } },  t += 1050);
      // user msg 2
      enq(() => { if (active) setVisibleCount(3); },                            t += 750);
      // AI typing, then AI msg 3
      enq(() => { if (active) setShowTyping(true); },                           t += 650);
      enq(() => { if (active) { setShowTyping(false); setVisibleCount(4); } },  t += 1050);
      // pause then loop
      enq(runCycle,                                                              t += 2400);
    }

    runCycle();
    return () => { active = false; tids.forEach(clearTimeout); };
  }, []);

  const agentLabel = lang === 'fr' ? 'Agent IA' : 'AI Agent';

  return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '9px', justifyContent: 'flex-end', height: '100%', overflow: 'hidden' }} aria-hidden="true">
      <AnimatePresence mode="popLayout">
        {msgs.slice(0, visibleCount).map((m, i) =>
          m.role === 'user' ? (
            /* ── User: right-side pill bubble ── */
            <motion.div
              key={`u-${i}`}
              initial={{ opacity: 0, x: 10, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <div style={{
                maxWidth: '80%', padding: '8px 13px',
                borderRadius: '18px 18px 4px 18px',
                background: 'rgba(255,255,255,0.09)',
                border: '1px solid rgba(255,255,255,0.14)',
                fontSize: '11px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.45,
              }}>{m.t}</div>
            </motion.div>
          ) : (
            /* ── AI: label + plain text, no bubble ── */
            <motion.div
              key={`a-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 700, color: 'rgba(167,139,250,0.95)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <span>✦</span><span>{agentLabel}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>{m.t}</div>
            </motion.div>
          )
        )}

        {/* ── AI typing indicator ── */}
        {showTyping && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 700, color: 'rgba(167,139,250,0.95)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              <span>✦</span><span>{agentLabel}</span>
            </div>
            <TypingDots />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Voice agent viz ─────────────────────────────────────── */
function VoiceViz({ lang }: { lang: Lang }) {
  type Line = { who: 'client' | 'agent'; name?: string; t: string };
  const lines: Line[] = lang === 'fr'
    ? [
        { who: 'client', name: 'Marie D.', t: "Bonjour, j'ai besoin d'un devis — rénovation cuisine." },
        { who: 'agent',                    t: "Bien sûr ! Matins ou après-midis pour l'estimation ?" },
        { who: 'client', name: 'Marie D.', t: "Les matins, de préférence." },
        { who: 'agent',                    t: "Parfait — jeudi 9 h confirmé. Rappel envoyé ✓" },
      ]
    : [
        { who: 'client', name: 'Sean K.',  t: "Hi, I need a quote for a kitchen renovation." },
        { who: 'agent',                    t: "Of course! Morning or afternoon for the estimate?" },
        { who: 'client', name: 'Sean K.',  t: "Mornings work best for me." },
        { who: 'agent',                    t: "Perfect — Thursday 9 AM confirmed. Reminder sent ✓" },
      ];

  const agentLabel  = lang === 'fr' ? 'Agent Vocal' : 'Voice Agent';
  const listeningTx = lang === 'fr' ? 'EN ÉCOUTE'  : 'LISTENING';
  const endedTx     = lang === 'fr' ? 'TERMINÉ'    : 'ENDED';
  const transcriptTx = lang === 'fr' ? 'Transcription' : 'Call Transcript';
  const continueTx  = lang === 'fr' ? "Continuer l'appel" : 'Continue call';

  const [visibleCount, setVisibleCount] = useState(0);
  const [listening, setListening]       = useState(true);

  useEffect(() => {
    let active = true;
    const tids: ReturnType<typeof setTimeout>[] = [];
    function enq(fn: () => void, ms: number) { tids.push(setTimeout(fn, ms)); }

    function runCycle() {
      if (!active) return;
      setVisibleCount(0);
      setListening(true);

      let t = 0;
      enq(() => { if (active) setVisibleCount(1); },                  t += 800);
      enq(() => { if (active) setVisibleCount(2); },                  t += 1050);
      enq(() => { if (active) setVisibleCount(3); },                  t += 900);
      enq(() => { if (active) { setVisibleCount(4); setListening(false); } }, t += 1050);
      enq(runCycle,                                                    t += 2400);
    }

    runCycle();
    return () => { active = false; tids.forEach(clearTimeout); };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(8,12,28,0.92)', overflow: 'hidden' }} aria-hidden="true">

      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 12px 5px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <span style={{ fontSize: '8.5px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <motion.div
            animate={listening ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.25 }}
            transition={listening ? { duration: 1.1, repeat: Infinity } : { duration: 0.3 }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: listening ? 'rgba(52,211,153,1)' : 'rgba(255,255,255,0.3)' }}
          />
          <span style={{ fontSize: '8.5px', fontWeight: 700, color: listening ? 'rgba(52,211,153,0.95)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.07em' }}>
            {listening ? listeningTx : endedTx}
          </span>
        </div>
        <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.05em' }}>▮▮▮</span>
      </div>

      {/* Pulsing orb */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '7px 0 4px', flexShrink: 0 }}>
        <motion.div
          animate={listening
            ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }
            : { scale: 1, opacity: 0.2 }}
          transition={listening
            ? { duration: 1.3, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.4 }}
          style={{ fontSize: '20px', color: 'rgba(139,92,246,0.95)', lineHeight: 1, userSelect: 'none' }}
        >✳</motion.div>
      </div>

      {/* Transcript */}
      <div style={{ flex: 1, padding: '0 10px 4px', display: 'flex', flexDirection: 'column', gap: '5px', overflow: 'hidden', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: '7.5px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '1px' }}>
          ← {transcriptTx}
        </div>
        <AnimatePresence mode="popLayout">
          {lines.slice(0, visibleCount).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {l.who === 'client' ? (
                <div>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{l.name}: </span>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.58)' }}>"{l.t}"</span>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(139,92,246,1)' }}>{agentLabel}: </span>
                  <span style={{ fontSize: '8px', color: 'rgba(139,92,246,0.78)' }}>"{l.t}"</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.2)' }}>{continueTx}</span>
        <span style={{ fontSize: '12px', opacity: 0.25 }}>🎙</span>
      </div>
    </div>
  );
}

/* ─── Stars rating viz ────────────────────────────────────── */
function StarsViz() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px', justifyContent: 'center', height: '100%' }} aria-hidden="true">
      {[5,5,5,4,5].map((r, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>{[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: '11px', color: s <= r ? '#fbbf24' : 'rgba(255,255,255,0.15)' }}>★</span>)}</div>
          <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(r/5)*100}%`, background: 'rgba(251,191,36,0.6)', borderRadius: '3px' }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: '6px', fontSize: '11px', fontWeight: 700, color: '#fbbf24' }}>4.9 ★ · 87 {Math.random() > 0.5 ? 'reviews' : 'reviews'}</div>
    </div>
  );
}

/* ─── Analytics bars viz ──────────────────────────────────── */
function AnalyticsViz() {
  const bars = [35, 48, 55, 42, 68, 72, 88];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '20px', height: '100%', justifyContent: 'center' }} aria-hidden="true">
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '100%', height: `${h}%`, background: `rgba(${i === 6 ? '34,197,94' : '59,130,246'},${0.4 + i * 0.06})`, borderRadius: '4px 4px 0 0', boxShadow: i === 6 ? '0 0 10px rgba(34,197,94,0.4)' : 'none', maxHeight: '80px' }} />
        </div>
      ))}
    </div>
  );
}

/* ─── Features data ───────────────────────────────────────── */
const FEATURES_EN = [
  { icon: MessageSquare, color: '34,211,238', title: 'AI Text-Back', sub: 'Every missed call becomes a conversation',     desc: "Our AI detects missed calls in seconds and fires a conversational SMS — qualifying the lead before they call your competitor.", roi: '+22% avg. closed deals recovered',     viz: 'console' },
  { icon: CalendarCheck, color: '99,102,241',  title: 'Auto-Booking', sub: 'Fill your calendar without lifting a finger',  desc: "Syncs directly with Google & Outlook. Qualified leads book their own estimate in real-time — no back-and-forth, no dropped leads.", roi: 'Saves 14 h/week on admin',               viz: 'analytics' },
  { icon: Star,          color: '52,211,153',  title: 'Review Engine', sub: 'Dominate Google in 90 days',                  desc: "Automated SMS review requests fire the moment a job is complete. Most clients see a 3× increase in Google reviews within 60 days.", roi: '+61% avg. organic traffic in 90 days', viz: 'stars' },
  { icon: Users,         color: '59,130,246',  title: 'CRM & Pipeline', sub: 'Know exactly where every lead stands',       desc: "Visual pipeline management that shows every lead at every stage. Never lose track of a follow-up — the system prompts you automatically.", roi: 'Zero leads fall through the cracks',    viz: 'pipeline' },
  { icon: MessageSquare, color: '167,139,250', title: 'Two-Way SMS & Email', sub: 'Have real conversations, at scale',     desc: "Full two-way communication hub. Reply to leads via SMS or email from one dashboard — the AI drafts responses so you just approve and send.", roi: '4× faster lead response time',          viz: 'chat' },
  { icon: TrendingUp,    color: '34,211,153',  title: 'Analytics & Reporting', sub: "Know what's working, every single day", desc: "Daily performance reports delivered to your inbox. Track leads by source, conversion rates, revenue attributed, and team response times.", roi: 'Full pipeline visibility, daily',       viz: 'analytics' },
  { icon: PhoneCall,     color: '139,92,246',  title: 'AI Voice Agent', sub: 'Never miss an inbound call again',           desc: "Our AI voice agent answers every call 24/7 — qualifying leads, booking estimates, and answering FAQs in natural conversation. Full call transcript delivered to your dashboard.", roi: '100% of inbound calls answered',       viz: 'voice' },
];
const FEATURES_FR = [
  { icon: MessageSquare, color: '34,211,238', title: 'Réponse SMS IA', sub: 'Chaque appel manqué devient une conversation', desc: "Notre IA détecte les appels manqués en quelques secondes et déclenche un SMS conversationnel — qualifiant le lead avant qu'il appelle votre concurrent.", roi: '+22 % de ventes récupérées en moyenne', viz: 'console' },
  { icon: CalendarCheck, color: '99,102,241', title: 'Prise de RDV Auto', sub: 'Remplissez votre agenda sans lever le doigt', desc: "Synchronise directement Google & Outlook. Les leads qualifiés réservent leur estimation en temps réel — sans allers-retours, sans prospects perdus.", roi: 'Économise 14 h/semaine d\'admin', viz: 'analytics' },
  { icon: Star,          color: '52,211,153', title: 'Moteur d\'Avis', sub: 'Dominez Google en 90 jours', desc: "Les demandes d'avis SMS s'enclenchent dès qu'un contrat est terminé. La plupart des clients voient leurs avis Google tripler en 60 jours.", roi: '+61 % de trafic organique en 90 jours', viz: 'stars' },
  { icon: Users,         color: '59,130,246', title: 'CRM & Pipeline', sub: 'Sachez exactement où en est chaque lead', desc: "Pipeline visuel qui montre chaque lead à chaque étape. N'oubliez plus jamais un suivi — le système vous le rappelle automatiquement.", roi: 'Zéro lead perdu dans les mailles', viz: 'pipeline' },
  { icon: MessageSquare, color: '167,139,250', title: 'SMS & Email Bidirectionnel', sub: 'De vraies conversations, à grande échelle', desc: "Hub de communication bilingue complet. Répondez aux leads par SMS ou email depuis un seul tableau de bord — l\'IA rédige les réponses.", roi: 'Temps de réponse 4× plus rapide', viz: 'chat' },
  { icon: TrendingUp,    color: '34,211,153',  title: 'Analytique & Rapports', sub: 'Sachez ce qui fonctionne chaque jour', desc: "Rapports de performance quotidiens livrés dans votre boîte mail. Suivez les leads par source, les taux de conversion et les revenus attribués.", roi: 'Visibilité complète du pipeline, chaque jour', viz: 'analytics' },
  { icon: PhoneCall,     color: '139,92,246',  title: 'Agent Vocal IA', sub: 'Ne manquez plus jamais un appel entrant',  desc: "Notre agent vocal IA répond à chaque appel 24h/24 — qualifie les leads, réserve des estimations et répond aux FAQ en conversation naturelle. Transcription complète livrée dans votre tableau de bord.", roi: '100 % des appels entrants répondus', viz: 'voice' },
];

function FeatureViz({ type, lang, color }: { type: string; lang: Lang; color: string }) {
  const lines = lang === 'fr' ? CONSOLE_FR : CONSOLE_EN;
  const accent = `rgb(${color})`;
  const wrapStyle: React.CSSProperties = { position: 'relative', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(${color},0.2)`, height: '180px', flexShrink: 0 };
  if (type === 'console') return <div style={wrapStyle}><LiveConsole lines={lines} /></div>;
  if (type === 'analytics') return <div style={wrapStyle}><GhostAnalytics label={lang === 'fr' ? 'Trafic Organique' : 'Organic Traffic'} /></div>;
  if (type === 'stars')    return <div style={wrapStyle}><StarsViz /></div>;
  if (type === 'pipeline') return <div style={wrapStyle}><PipelineViz lang={lang} /></div>;
  if (type === 'chat')     return <div style={wrapStyle}><ChatViz lang={lang} /></div>;
  if (type === 'voice')    return <div style={wrapStyle}><VoiceViz lang={lang} /></div>;

  return <div style={{ ...wrapStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AnalyticsViz /></div>;
}

/* ─── Pricing plans ───────────────────────────────────────── */
const PLANS_EN = [
  { id: 'starter' as Tier, name: 'Starter',      price: '297', badge: null,          popular: false, features: ['CRM & contact management','AI web chat widget','Missed-call text-back (SMS)','Lead capture forms','1 pipeline · Up to 500 contacts'] },
  { id: 'pro'     as Tier, name: 'Professional', price: '497', badge: 'Most Popular', popular: true,  features: ['Everything in Starter','Full AI text & email automation','Auto-booking & calendar integration','Google review request engine','Two-way SMS & email conversations','Unlimited pipelines · Up to 2,500 contacts','Reputation dashboard'] },
  { id: 'full'    as Tier, name: 'Full Scope',   price: '899', badge: null,          popular: false, features: ['Everything in Professional','Custom AI voice agent (inbound)','WhatsApp automation','Multi-location setup','Advanced analytics dashboard','Unlimited contacts','White-glove support + strategy call'] },
];
const PLANS_FR = [
  { id: 'starter' as Tier, name: 'Démarrage',    price: '297', badge: null,             popular: false, features: ['CRM & gestion des contacts','Widget chat IA','Réponse SMS aux appels manqués','Formulaires de capture de leads','1 pipeline · Jusqu\'à 500 contacts'] },
  { id: 'pro'     as Tier, name: 'Professionnel',price: '497', badge: 'Plus Populaire', popular: true,  features: ['Tout du Démarrage','Automatisation IA SMS & email','Réservation auto & agenda','Moteur d\'avis Google','SMS & email bidirectionnel','Pipelines illimités · 2 500 contacts','Tableau de bord réputation'] },
  { id: 'full'    as Tier, name: 'Full Scope',   price: '899', badge: null,             popular: false, features: ['Tout du Professionnel','Agent vocal IA (entrant)','Automatisation WhatsApp','Multi-adresses','Tableau de bord analytique avancé','Contacts illimités','Support blanc-gant + appel stratégie'] },
];

/* ─── FAQ ─────────────────────────────────────────────────── */
const FAQ_EN = [
  { q: 'How long does setup take?', a: 'Our team configures your entire system within 72 hours of signup. You get a dedicated onboarding call and we handle all technical setup.' },
  { q: 'Do I need to install any software?', a: 'No. NT Business Suite is fully cloud-based. You access everything through a web browser — nothing to install.' },
  { q: 'Does it work for my industry?', a: 'Yes. We serve construction, HVAC, plumbing, legal, real estate, dental, medical, restaurants, auto services, and more. If you take phone calls and book appointments, it works for you.' },
  { q: 'What if I want to cancel?', a: 'No contracts, no lock-in. Cancel anytime with 30 days notice. We\'ll export all your data so you own everything.' },
  { q: 'Is it bilingual (EN/FR)?', a: 'Yes. NT Business Suite is fully bilingual — English and French — natively. No machine translation. Ideal for Quebec-based businesses.' },
  { q: 'Is it Law 25 compliant?', a: 'Yes. All data is stored on Canadian servers and the platform is built to meet Quebec\'s Law 25 privacy requirements from day one.' },
];
const FAQ_FR = [
  { q: 'Combien de temps dure la configuration ?', a: 'Notre équipe configure votre système complet dans les 72 heures suivant l\'inscription. Vous bénéficiez d\'un appel d\'intégration dédié et nous gérons toute la configuration technique.' },
  { q: 'Dois-je installer un logiciel ?', a: 'Non. NT Business Suite est entièrement en nuage. Vous accédez à tout via un navigateur web — rien à installer.' },
  { q: 'Fonctionne-t-il pour mon secteur ?', a: 'Oui. Nous servons la construction, le CVAC, la plomberie, le juridique, l\'immobilier, les soins dentaires, médicaux, les restaurants, les services automobiles et plus. Si vous prenez des appels et prenez des rendez-vous, ça fonctionne.' },
  { q: 'Et si je veux annuler ?', a: 'Sans contrat, sans engagement. Annulez n\'importe quand avec 30 jours de préavis. Nous exporterons toutes vos données — vous êtes propriétaire de tout.' },
  { q: 'Est-il bilingue (EN/FR) ?', a: 'Oui. NT Business Suite est entièrement bilingue — anglais et français — nativement. Pas de traduction automatique. Idéal pour les entreprises basées au Québec.' },
  { q: 'Est-il conforme à la Loi 25 ?', a: 'Oui. Toutes les données sont stockées sur des serveurs canadiens et la plateforme est conçue pour répondre aux exigences de confidentialité de la Loi 25 dès le premier jour.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
      <button onClick={() => setOpen(!open)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '18px 20px', background: 'rgba(255,255,255,0.02)', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={16} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 20px 18px', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Comparison table ────────────────────────────────────── */
const COMP_EN = { you: 'NT Business Suite', them: 'Typical Tools', rows: [
  { label: 'Monthly cost',      you: '$297–$899/mo',    them: '$2,000+/mo combined' },
  { label: 'Setup time',        you: '72 hours',         them: '2–4 weeks' },
  { label: 'Apps to manage',    you: '1 login',          them: '5–8 separate apps' },
  { label: 'Bilingual EN/FR',   you: '✓ Native',         them: 'Rarely' },
  { label: 'Law 25 compliant',  you: '✓ Built-in',       them: 'You figure it out' },
  { label: 'Canadian support',  you: '✓ Montreal team',  them: 'US-based, time zone lag' },
  { label: 'AI automation',     you: '✓ Included',       them: 'Add-on, extra cost' },
  { label: 'Contract required', you: 'None',             them: 'Usually 12 months' },
]};
const COMP_FR = { you: 'NT Business Suite', them: 'Outils Séparés', rows: [
  { label: 'Coût mensuel',      you: '297–899 $/mois',  them: '2 000 $+/mois combiné' },
  { label: 'Temps de config',   you: '72 heures',        them: '2 à 4 semaines' },
  { label: 'Applications',      you: '1 connexion',      them: '5 à 8 applications' },
  { label: 'Bilingue EN/FR',    you: '✓ Natif',          them: 'Rarement' },
  { label: 'Conforme Loi 25',   you: '✓ Intégré',        them: 'À vos frais' },
  { label: 'Support canadien',  you: '✓ Équipe Montréal', them: 'Américain, décalage horaire' },
  { label: 'Automatisation IA', you: '✓ Incluse',        them: 'Option payante' },
  { label: 'Contrat requis',    you: 'Aucun',            them: 'Généralement 12 mois' },
]};

/* ─── Main export ─────────────────────────────────────────── */
export function NTBusinessSuite() {
  const { lang } = useLanguage();
  const l = lang as Lang;
  const [modalOpen, setModalOpen]       = useState(false);
  const [selectedTier, setSelectedTier] = useState<Tier>('');

  function openModal(tier: Tier = '') { setSelectedTier(tier); setModalOpen(true); }

  const features = l === 'fr' ? FEATURES_FR : FEATURES_EN;
  const plans    = l === 'fr' ? PLANS_FR    : PLANS_EN;
  const faq      = l === 'fr' ? FAQ_FR      : FAQ_EN;
  const comp     = l === 'fr' ? COMP_FR     : COMP_EN;

  const s = {
    ctaSubtext: { en: 'Fill out the form. We\'ll call you within 24 hours with a custom demo.', fr: 'Remplissez le formulaire. On vous rappelle sous 24h avec une démo personnalisée.' },
    secondaryCta: { en: 'See How It Works', fr: 'Voir comment ça fonctionne' },
    heroBadge: { en: 'AI Operating System', fr: 'Système d\'Exploitation IA' },
    heroH1: { en: <>The AI Operating System for<br /><span style={{ background: 'linear-gradient(135deg,#60a5fa,#a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Service Businesses</span></>, fr: <>Le Système d'Exploitation IA pour<br /><span style={{ background: 'linear-gradient(135deg,#60a5fa,#a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>les Entreprises de Services</span></> },
    heroSub: { en: 'Stop losing leads to voicemail. Automate your follow-ups, bookings, and Google reviews — all from one platform, set up in 72 hours.', fr: 'Stoppez la fuite de prospects vers la messagerie. Automatisez vos relances, réservations et avis Google — depuis une seule plateforme, configurée en 72 heures.' },
    problemBadge: { en: 'The Problem', fr: 'Le Problème' },
    problemH: { en: 'Running a service business is hard enough.', fr: 'Gérer une entreprise de services est déjà assez difficile.' },
    problemS: { en: "You shouldn't also be losing revenue every time a call goes unanswered.", fr: "Vous ne devriez pas en plus perdre des revenus chaque fois qu'un appel reste sans réponse." },
    pain1T: { en: 'Every Missed Call = Lost Revenue', fr: 'Chaque Appel Manqué = Revenu Perdu' },
    pain1D: { en: '62% of callers who reach voicemail hang up and call your competitor. That\'s revenue walking out the door, every single day.', fr: '62 % des appelants qui tombent sur la messagerie raccrochent et appellent votre concurrent. Du revenu qui part à la concurrence, chaque jour.' },
    pain2T: { en: 'No Follow-Up = Dead Leads', fr: 'Pas de Suivi = Leads Morts' },
    pain2D: { en: 'Most leads need 5+ touchpoints before they book. Most service teams only follow up once. The gap is where your revenue disappears.', fr: 'La plupart des leads nécessitent 5+ points de contact avant de réserver. La plupart des équipes ne suivent qu\'une fois. C\'est là que disparaît votre revenu.' },
    pain3T: { en: 'No Reviews = No Traffic', fr: 'Pas d\'Avis = Pas de Trafic' },
    pain3D: { en: '87% of buyers read Google reviews before choosing a service provider. Without a consistent review engine, you\'re invisible to new customers.', fr: '87 % des acheteurs lisent les avis Google avant de choisir un prestataire. Sans un moteur d\'avis constant, vous êtes invisible aux nouveaux clients.' },
    solutionBadge: { en: 'The Solution', fr: 'La Solution' },
    solutionH: { en: 'One system. Eight engines. Zero leads lost.', fr: 'Un système. Huit moteurs. Zéro lead perdu.' },
    solutionS: { en: 'NT Business Suite replaces 6–8 separate tools with one AI-powered platform built specifically for service businesses.', fr: 'NT Business Suite remplace 6 à 8 outils séparés avec une plateforme IA conçue spécifiquement pour les entreprises de services.' },
    howBadge: { en: 'How It Works', fr: 'Comment ça fonctionne' },
    howH: { en: 'Up and running in 72 hours.', fr: 'Opérationnel en 72 heures.' },
    step1T: { en: 'You Sign Up', fr: 'Vous vous inscrivez' },
    step1D: { en: 'Fill out the 2-minute form. Our team reviews your business and schedules a dedicated onboarding call — usually within the same day.', fr: 'Remplissez le formulaire de 2 minutes. Notre équipe examine votre entreprise et planifie un appel d\'intégration dédié — généralement le même jour.' },
    step2T: { en: 'We Build Your System', fr: 'On construit votre système' },
    step2D: { en: 'Our team configures your CRM, automations, review engine, and booking calendar. We connect to your existing tools and test everything — all within 72 hours.', fr: 'Notre équipe configure votre CRM, automatisations, moteur d\'avis et agenda de réservation. Nous connectons vos outils existants et testons tout — dans les 72 heures.' },
    step3T: { en: 'Leads Flow In Automatically', fr: 'Les leads arrivent automatiquement' },
    step3D: { en: 'Your system is live. Missed calls get followed up, leads get booked, reviews get requested — you just close more business and we handle the rest.', fr: 'Votre système est en ligne. Les appels manqués sont suivis, les leads réservés, les avis demandés — vous fermez plus de contrats et on s\'occupe du reste.' },
    pricingBadge: { en: 'Simple Pricing', fr: 'Tarification Simple' },
    pricingH: { en: 'No contracts. Cancel anytime.', fr: 'Sans engagement. Résiliez quand vous voulez.' },
    mo: { en: '/mo', fr: '/mois' },
    faqBadge: { en: 'FAQ', fr: 'Questions fréquentes' },
    faqH: { en: 'Everything you need to know.', fr: 'Tout ce que vous devez savoir.' },
    compBadge: { en: 'Why NT Business Suite', fr: 'Pourquoi NT Business Suite' },
    compH: { en: 'One platform vs. eight separate tools.', fr: 'Une plateforme vs. huit outils séparés.' },
    trustBadge: { en: 'Built in Montréal', fr: 'Fondé à Montréal' },
    trustH: { en: 'Built in Montréal. Deployed in every market.', fr: 'Fondé à Montréal. Déployé partout dans le monde.' },
    trustS: { en: "We're a Montréal-based team with deep market knowledge across Canada, the USA, Africa, and Asia. We understand bilingual operations, Law 25 compliance, and the unique dynamics of service businesses whether you operate in Québec, New York, Abidjan, or Tokyo.", fr: "Nous sommes une équipe basée à Montréal avec une connaissance approfondie des marchés canadien, américain, africain et asiatique. Nous comprenons les opérations bilingues, la conformité à la Loi 25, et les dynamiques uniques des entreprises de services — que vous opériez au Québec, à New York, à Abidjan ou à Tokyo." },
    trust1: { en: 'Canadian Data Storage', fr: 'Données stockées au Canada' },
    trust2: { en: 'Law 25 Compliant', fr: 'Conforme à la Loi 25' },
    trust3: { en: 'Bilingual EN/FR Native', fr: 'Bilingue EN/FR natif' },
    trust4: { en: '72h Setup Guarantee', fr: 'Garantie de config en 72h' },
    finalBadge: { en: 'Get Started', fr: 'Commencer' },
    finalH: { en: 'Stop leaving revenue on the table.', fr: 'Arrêtez de laisser du revenu sur la table.' },
    finalS: { en: 'Every day you wait is another missed call, another lost lead, another competitor getting the job. Set up takes 72 hours. Fill out the 2-minute form and we\'ll call you within 24 hours.', fr: 'Chaque jour d\'attente est un appel manqué de plus, un lead perdu de plus, un concurrent qui décroche le contrat. La configuration prend 72 heures. Remplissez le formulaire de 2 minutes et on vous rappelle sous 24h.' },
  };

  const ROI_STATS_EN = [{ v: '22%', l: 'avg. leads recovered from missed calls' }, { v: '72h', l: 'average system setup time' }, { v: '61%', l: 'avg. organic traffic lift in 90 days' }, { v: '14h', l: 'saved per week on admin tasks' }];
  const ROI_STATS_FR = [{ v: '22 %', l: 'de leads récupérés des appels manqués' }, { v: '72h', l: 'pour configurer votre système' }, { v: '61 %', l: 'de trafic organique en plus en 90 jours' }, { v: '14h', l: 'économisées par semaine en admin' }];
  const stats = l === 'fr' ? ROI_STATS_FR : ROI_STATS_EN;

  const sec = (id?: string): React.CSSProperties => ({ padding: '96px 24px', ...(id ? {} : {}) });
  const inner: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto' };
  const pill: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', marginBottom: '20px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '999px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#93c5fd' };

  return (
    <>
      <BSuiteIntakeModal open={modalOpen} onClose={() => setModalOpen(false)} preselectedTier={selectedTier} lang={l} />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section id="bs-hero" style={{ padding: '140px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ ...inner, textAlign: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}>
            <span style={pill}><Zap size={11} />{bi(s.heroBadge, l)}</span>
            <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 24px' }}>
              {bi(s.heroH1, l)}
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, maxWidth: '620px', margin: '0 auto 36px' }}>
              {bi(s.heroSub, l)}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <PrimaryCTA lang={l} onClick={() => openModal()} />
                <a href="#bs-how" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '14px', fontWeight: 600, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)'; }}>
                  {bi(s.secondaryCta, l)} <ArrowRight size={15} />
                </a>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{bi(s.ctaSubtext, l)}</p>
            </div>
          </motion.div>

          {/* Hero stats bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', marginTop: '72px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }} className="bs-stats-grid">
            {stats.map((st, i) => (
              <div key={i} style={{ padding: '24px 16px', background: 'rgba(255,255,255,0.015)', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 900, color: '#60a5fa', letterSpacing: '-0.03em', lineHeight: 1 }}>{st.v}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, marginTop: '6px' }}>{st.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Problem ───────────────────────────────────────────── */}
      <section style={{ ...sec(), borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={inner}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ ...pill, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>{bi(s.problemBadge, l)}</span>
            <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 12px' }}>{bi(s.problemH, l)}</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto' }}>{bi(s.problemS, l)}</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="bs-3col">
            {([
              { Icon: PhoneCall, color: '239,68,68', title: bi(s.pain1T, l), desc: bi(s.pain1D, l) },
              { Icon: AlertCircle, color: '245,158,11', title: bi(s.pain2T, l), desc: bi(s.pain2D, l) },
              { Icon: Star, color: '99,102,241', title: bi(s.pain3T, l), desc: bi(s.pain3D, l) },
            ] as const).map((p, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
                style={{ padding: '28px', borderRadius: '18px', background: `rgba(${p.color},0.05)`, border: `1px solid rgba(${p.color},0.18)` }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `rgba(${p.color},0.12)`, border: `1px solid rgba(${p.color},0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <p.Icon size={18} color={`rgb(${p.color})`} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '10px', letterSpacing: '-0.015em' }}>{p.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Solution / Features ───────────────────────────────── */}
      <section id="bs-features" style={{ ...sec(), borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={inner}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span style={pill}>{bi(s.solutionBadge, l)}</span>
            <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 12px' }}>{bi(s.solutionH, l)}</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto' }}>{bi(s.solutionS, l)}</p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {features.map((f, i) => {
              const reverse = i % 2 === 1;
              return (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className={`bs-feature-row${reverse ? ' bs-feature-reverse' : ''}`}>
                  {/* Text */}
                  <div style={{ order: reverse ? 2 : 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '4px 12px', marginBottom: '16px', background: `rgba(${f.color},0.1)`, border: `1px solid rgba(${f.color},0.25)`, borderRadius: '999px' }}>
                      <f.icon size={11} color={`rgb(${f.color})`} />
                      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: `rgba(${f.color},0.9)` }}>{f.title}</span>
                    </div>
                    <h3 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '12px', lineHeight: 1.25 }}>{f.sub}</h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '20px' }}>{f.desc}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '8px', background: `rgba(${f.color},0.08)`, border: `1px solid rgba(${f.color},0.2)` }}>
                      <Check size={12} color={`rgb(${f.color})`} strokeWidth={3} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: `rgb(${f.color})` }}>{f.roi}</span>
                    </div>
                  </div>
                  {/* Viz */}
                  <div style={{ order: reverse ? 1 : 2 }}>
                    <FeatureViz type={f.viz} lang={l} color={f.color} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────── */}
      <section id="bs-how" style={{ ...sec(), borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(4,10,22,0.4)' }}>
        <div style={inner}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={pill}>{bi(s.howBadge, l)}</span>
            <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>{bi(s.howH, l)}</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="bs-3col">
            {[
              { n: '01', t: bi(s.step1T, l), d: bi(s.step1D, l) },
              { n: '02', t: bi(s.step2T, l), d: bi(s.step2D, l) },
              { n: '03', t: bi(s.step3T, l), d: bi(s.step3D, l) },
            ].map((step, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
                style={{ padding: '32px 28px', borderRadius: '18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
                <div style={{ fontSize: '48px', fontWeight: 900, color: 'rgba(59,130,246,0.15)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '16px' }}>{step.n}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>{step.t}</h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ───────────────────────────────────────────── */}
      <section id="bs-pricing" style={{ ...sec(), borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={inner}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={pill}>{bi(s.pricingBadge, l)}</span>
            <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 8px' }}>{bi(s.pricingH, l)}</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', alignItems: 'start' }} className="bs-3col">
            {plans.map((plan, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
                style={{ padding: '32px 28px', borderRadius: '20px', background: plan.popular ? 'linear-gradient(160deg,rgba(59,130,246,0.14),rgba(99,102,241,0.08))' : 'rgba(255,255,255,0.02)', border: plan.popular ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.07)', position: 'relative', boxShadow: plan.popular ? '0 0 40px rgba(99,102,241,0.15)' : 'none' }}>
                {plan.badge && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 14px', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: '999px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>{plan.badge}</div>}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{ fontSize: '40px', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>${plan.price}</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', paddingBottom: '4px' }}>{bi(s.mo, l)}</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                      <Check size={13} color={plan.popular ? '#818cf8' : '#60a5fa'} strokeWidth={3} style={{ flexShrink: 0, marginTop: '2px' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => openModal(plan.id)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '13px', fontSize: '13px', fontWeight: 700, borderRadius: '11px', cursor: 'pointer', background: plan.popular ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : 'rgba(59,130,246,0.15)', color: plan.popular ? '#fff' : '#93c5fd', border: plan.popular ? 'none' : '1px solid rgba(59,130,246,0.3)', boxShadow: plan.popular ? '0 8px 24px rgba(79,70,229,0.4)' : 'none', transition: 'all 0.2s' }}>
                  {l === 'fr' ? 'Commencer — 2 minutes →' : 'Get Started — 2 Minutes →'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} style={{ marginTop: '64px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '24px', letterSpacing: '-0.02em', textAlign: 'center' }}>{bi(s.faqH, l)}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '720px', margin: '0 auto' }}>
              {faq.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Comparison table ──────────────────────────────────── */}
      <section style={{ ...sec(), borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(4,10,22,0.4)' }}>
        <div style={inner}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={pill}>{bi(s.compBadge, l)}</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>{bi(s.compH, l)}</h2>
          </motion.div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}></th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: '#60a5fa', borderBottom: '1px solid rgba(59,130,246,0.25)', background: 'rgba(59,130,246,0.06)', borderRadius: '8px 8px 0 0' }}>{comp.you}</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{comp.them}</th>
                </tr>
              </thead>
              <tbody>
                {comp.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{row.label}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: row.you.startsWith('✓') ? '#34d399' : '#fff', background: 'rgba(59,130,246,0.04)' }}>{row.you}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Trust ─────────────────────────────────────────────── */}
      <section style={{ ...sec(), borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={inner}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="bs-2col">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
              <span style={pill}>{bi(s.trustBadge, l)}</span>
              <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px' }}>{bi(s.trustH, l)}</h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '32px' }}>{bi(s.trustS, l)}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[bi(s.trust1, l), bi(s.trust2, l), bi(s.trust3, l), bi(s.trust4, l)].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <Check size={13} color="#34d399" strokeWidth={3} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
              <div style={{ padding: '32px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                  {l === 'fr' ? 'Questions ? Appelez directement.' : 'Questions? Call us directly.'}
                </div>
                <div style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: '#60a5fa', letterSpacing: '-0.02em', marginBottom: '8px' }}>(438) 806-7640</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                  {l === 'fr' ? 'Lun–ven, 9h–18h (EST)' : 'Mon–Fri, 9am–6pm EST'}
                </div>
                <PrimaryCTA lang={l} onClick={() => openModal()} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section style={{ ...sec(), borderTop: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(4,10,22,0.4) 0%, rgba(10,20,50,0.5) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ ...inner, textAlign: 'center', position: 'relative' }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <span style={pill}>{bi(s.finalBadge, l)}</span>
            <h2 style={{ fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>{bi(s.finalH, l)}</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.65 }}>{bi(s.finalS, l)}</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <PrimaryCTA lang={l} onClick={() => openModal()} />
                <a href="#bs-how" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '14px', fontWeight: 600, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                  {bi(s.secondaryCta, l)} <ArrowRight size={15} />
                </a>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{bi(s.ctaSubtext, l)}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .bs-stats-grid { grid-template-columns: repeat(4,1fr) !important; }
        @media (max-width: 640px) {
          .bs-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        .bs-3col { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 860px) {
          .bs-3col { grid-template-columns: 1fr !important; }
        }
        .bs-2col { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 768px) {
          .bs-2col { grid-template-columns: 1fr !important; }
        }
        .bs-feature-row { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 768px) {
          .bs-feature-row { grid-template-columns: 1fr !important; }
          .bs-feature-row > * { order: unset !important; }
        }
        /* ── Shared console styles ── */
        .bs-console {
          position: absolute; inset: 0; overflow: hidden; border-radius: 16px;
          background: rgba(2,6,14,0.92); pointer-events: none;
        }
        .bs-console__inner {
          display: flex; flex-direction: column; gap: 0;
          animation: bs-console-scroll 18s linear infinite;
          will-change: transform; transform: translateZ(0);
        }
        @keyframes bs-console-scroll {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(0,-50%,0); }
        }
        .bs-console__line {
          font-family: 'Courier New', monospace; font-size: 9.5px; line-height: 2;
          padding: 0 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          opacity: 0.75; color: #94a3b8;
        }
        .bs-console__line:nth-child(odd)  { color: #7dd3fc; }
        .bs-console__line:nth-child(3n)   { color: #86efac; }
        .bs-console__scanlines {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(to bottom, rgba(255,255,255,0) 0, rgba(255,255,255,0) 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px);
        }
        .bs-console__mask {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to bottom, rgba(2,6,14,0.2) 0%, rgba(2,6,14,0.0) 20%, rgba(2,6,14,0.0) 50%, rgba(2,6,14,0.92) 100%);
        }
        /* ── Analytics chart styles ── */
        .bs-analytics {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none;
        }
        .bs-analytics__label {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px;
          display: flex; align-items: center; gap: 8px;
          background: rgba(2,6,14,0.75); border-top: 1px solid rgba(255,255,255,0.06);
        }
        .bs-analytics__dot {
          width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0;
          box-shadow: 0 0 6px rgba(52,211,153,0.6);
          animation: bs-dot-pulse 1.6s ease-in-out infinite;
        }
        @keyframes bs-dot-pulse {
          0%,100% { opacity:1; transform: scale(1); }
          50%      { opacity:.5; transform: scale(.7); }
        }
        /* ── Neural map ── */
        .bs-neural {
          position: absolute; inset: 0; overflow: hidden; border-radius: 16px; pointer-events: none;
        }
      `}</style>
    </>
  );
}
