import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ROICalculator } from "@/components/ROICalculator";
import { SoftwareIntakeModal } from "@/components/SoftwareIntakeModal";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight, Zap, MessageSquare, CalendarCheck, Star } from "lucide-react";

/* ─── bilingual copy ──────────────────────────────────────── */
const copy = {
  hero: {
    badge:   { en: "Business Software",        fr: "Logiciels d'Affaires" },
    h1:      { en: "Scale Your Operations.\nStop Missing Leads.",
                fr: "Automatisez votre croissance.\nNe perdez plus un seul client." },
    sub:     { en: "The borderless AI operating system designed to automate lead acquisition and scale service operations for the next generation of global contractors.",
                fr: "Le système d'exploitation IA sans frontières conçu pour automatiser l'acquisition de leads et propulser les opérations des entrepreneurs de nouvelle génération à l'échelle mondiale." },
    cta:     { en: "Let's Build Your Software", fr: "Construisons votre logiciel" },
    ctaSec:  { en: "Talk to a Strategist",     fr: "Parler à un conseiller" },
  },
  features: {
    eyebrow: { en: "Anti-Missed-Call System",  fr: "Système Anti-Appels-Manqués" },
    title:   { en: "Three Features That Pay for Themselves",
                fr: "Trois fonctionnalités qui se rentabilisent seules" },
    /* tech-spec micro-badges (per-card top-right pills) */
    badges: {
      systemOnline:   { en: "SYSTEM ONLINE",       fr: "SYSTÈME EN LIGNE" },
      realTimeSync:   { en: "Real-Time Sync",      fr: "Sync Temps Réel" },
      revenueRecovered:{ en: "REVENUE RECOVERED",  fr: "REVENU RÉCUPÉRÉ" },
      verifiedRoi:    { en: "Verified ROI",        fr: "ROI Vérifié" },
    },
    cards: [
      {
        spec:  { en: "01 / Conversational AI",  fr: "01 / IA Conversationnelle" },
        title: { en: "AI Text-Back",            fr: "Réponse SMS Intelligente" },
        desc:  { en: "Stop lead leakage. Our AI instantly detects missed calls and initiates a conversational SMS sequence. It qualifies the prospect's needs and keeps them engaged so they don't call your competitor.",
                  fr: "Stoppez la fuite de prospects. Notre IA détecte instantanément les appels manqués et déclenche une séquence SMS conversationnelle. Elle qualifie les besoins du client et le garde engagé pour qu'il n'appelle pas votre concurrent." },
        roi:   { en: "Average recovery: +22% closed deals",
                  fr: "Récupération moyenne : +22 % de ventes conclues" },
      },
      {
        spec:  { en: "02 / Calendar Sync",      fr: "02 / Synchronisation Agenda" },
        title: { en: "Auto-Booking",            fr: "Prise de Rendez-vous Auto" },
        desc:  { en: "Direct calendar integration. Syncs with Google/Outlook to book qualified estimates in real-time, eliminating the back-and-forth.",
                  fr: "Intégration directe avec votre agenda. Se synchronise avec Google et Outlook pour réserver des estimations qualifiées en temps réel, en éliminant les allers-retours." },
        roi:   { en: "Saves 14 hours/week on admin",
                  fr: "Économise 14 h/semaine d'administratif" },
      },
      {
        spec:  { en: "03 / Local SEO Engine",   fr: "03 / Moteur SEO Local" },
        title: { en: "Review Engine",           fr: "Moteur d'Avis Google" },
        desc:  { en: "Dominate local search. Automated SMS review requests are triggered the moment a job is completed, boosting your Google ranking and authority on autopilot.",
                  fr: "Dominez la recherche locale. Des demandes d'avis SMS sont déclenchées dès qu'un contrat est terminé, propulsant votre classement Google et votre autorité en pilote automatique." },
      },
    ],
  },
  /* Bilingual log lines for the AI Text-Back live activity console */
  consoleLog: {
    en: [
      "[14:02:11] Missed call from +1 (514) 555-0142",
      "[14:02:12] AI Text-Back sequence initiated",
      "[14:02:14] SMS sent — qualifying prospect intent",
      "[14:02:47] Reply received: 'kitchen remodel quote'",
      "[14:02:48] Lead scored 87 / 100 — high intent",
      "[14:02:51] Calendar sync: 3 slots offered",
      "[14:03:09] Booking confirmed — Thu 10:30 AM",
      "[14:03:10] CRM record created · ID #LD-9241",
      "[14:03:11] Slack notification dispatched",
      "[14:03:12] Owner alerted via push",
      "[14:04:02] Missed call from +1 (438) 555-0188",
      "[14:04:03] AI Text-Back sequence initiated",
      "[14:04:18] Reply received: 'pricing for re-roof'",
      "[14:04:19] Lead scored 92 / 100 — high intent",
      "[14:04:22] Estimate auto-booked — Sat 9:00 AM",
      "[14:05:33] Review request queued (post-job)",
      "[14:05:34] Google review posted ★★★★★",
      "[14:06:01] Pipeline value updated: +$14,200",
    ],
    fr: [
      "[14:02:11] Appel manqué de +1 (514) 555-0142",
      "[14:02:12] Séquence Réponse SMS IA initiée",
      "[14:02:14] SMS envoyé — qualification du prospect",
      "[14:02:47] Réponse reçue : « devis rénovation cuisine »",
      "[14:02:48] Score du lead : 87 / 100 — fort intérêt",
      "[14:02:51] Sync agenda : 3 créneaux proposés",
      "[14:03:09] RDV confirmé — jeu. 10 h 30",
      "[14:03:10] Fiche CRM créée · ID #LD-9241",
      "[14:03:11] Notification Slack envoyée",
      "[14:03:12] Propriétaire alerté par notification",
      "[14:04:02] Appel manqué de +1 (438) 555-0188",
      "[14:04:03] Séquence Réponse SMS IA initiée",
      "[14:04:18] Réponse reçue : « tarifs pour toiture »",
      "[14:04:19] Score du lead : 92 / 100 — fort intérêt",
      "[14:04:22] Estimation auto-réservée — sam. 9 h 00",
      "[14:05:33] Demande d'avis en file (post-contrat)",
      "[14:05:34] Avis Google publié ★★★★★",
      "[14:06:01] Valeur du pipeline mise à jour : +14 200 $",
    ],
  },
  architecture: {
    eyebrow: { en: "The Architecture",        fr: "L'Architecture" },
    title:   { en: "Two systems. One outcome you actually want.",
                fr: "Deux systèmes. Un seul résultat qui compte vraiment." },
    old: {
      label:  { en: "The Old Way",             fr: "L'Ancienne Méthode" },
      caption:{ en: "Manual, reactive, leaky. Every missed call is gone.",
                fr: "Manuel, réactif, à fuites. Chaque appel manqué est perdu." },
      steps: [
        { en: "Missed Call",          fr: "Appel Manqué" },
        { en: "Voicemail",            fr: "Boîte Vocale" },
        { en: "Lost Lead",            fr: "Client Perdu" },
      ],
    },
    automated: {
      label:  { en: "The Automated System",    fr: "Le Système Automatisé" },
      caption:{ en: "Real-time, autonomous, always-on. Nothing slips through.",
                fr: "Temps réel, autonome, toujours actif. Rien ne passe entre les mailles." },
      steps: [
        { en: "Missed Call",            fr: "Appel Manqué" },
        { en: "Instant AI Text",        fr: "SMS IA Instantané" },
        { en: "Auto-Booked Appointment",fr: "RDV Réservé Auto" },
      ],
    },
  },
  calc: {
    heading: { en: "Calculate Your Lost Revenue",
                fr: "Calculez vos pertes de revenus" },
  },
  footer: {
    text:    { en: "Stop leaving money on the table. We set up your entire system in 72 hours.",
                fr: "Arrêtez de laisser de l'argent sur la table. Nous configurons votre système complet en 72 heures." },
    cta:     { en: "Let's Build Your Software", fr: "Construisons votre logiciel" },
  },
};

/* ─── helpers ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0 },
};
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type LangKey = 'en' | 'fr';
function bi(obj: { en: string; fr: string }, lang: LangKey) { return obj[lang]; }

/* ─── Card visualizations ─────────────────────────────────── */

/* Live Activity Console (AI Text-Back card)
   Fast-scrolling vertical log of system actions, monospaced, blurred. */
function LiveActivityConsole({ lines }: { lines: string[] }) {
  return (
    <div className="live-console" aria-hidden="true">
      <div className="live-console__inner">
        {[...lines, ...lines].map((line, i) => (
          <div key={i} className="live-console__line">{line}</div>
        ))}
      </div>
      {/* Scanline overlay + edge fade for a CRT/terminal feel */}
      <div className="live-console__scanlines" />
      <div className="live-console__mask" />
    </div>
  );
}

/* Neural Map (Auto-Booking card)
   Dots connected by glowing lines with light pulses traveling between them. */
function NeuralMap() {
  /* Hand-tuned node positions inside a 200x140 viewBox */
  const nodes: Array<[number, number]> = [
    [22, 32], [78, 18], [140, 40], [188, 24],
    [40, 78], [100, 64], [160, 88],
    [60, 118], [124, 110], [186, 112],
  ];
  /* Edges between node indices */
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3],
    [0, 4], [1, 5], [2, 5], [3, 6],
    [4, 5], [5, 6],
    [4, 7], [5, 7], [5, 8], [6, 8], [6, 9], [8, 9],
    [7, 8],
  ];
  return (
    <div className="neural-map" aria-hidden="true">
      <svg
        viewBox="0 0 200 140"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="nm-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#67e8f9" stopOpacity="1" />
            <stop offset="60%" stopColor="#67e8f9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* edges */}
        {edges.map(([a, b], i) => {
          const [x1, y1] = nodes[a]; const [x2, y2] = nodes[b];
          return (
            <line key={`e${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(99,102,241,0.42)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* traveling pulses on selected edges */}
        {[
          { e: [0,1], dur: 2.6, delay: 0    },
          { e: [1,2], dur: 2.4, delay: 0.6  },
          { e: [4,5], dur: 2.2, delay: 1.1  },
          { e: [5,8], dur: 2.8, delay: 0.3  },
          { e: [3,6], dur: 2.5, delay: 1.4  },
          { e: [6,9], dur: 2.0, delay: 0.9  },
          { e: [7,8], dur: 2.3, delay: 1.7  },
        ].map((p, i) => {
          const [a, b] = p.e;
          const [x1, y1] = nodes[a]; const [x2, y2] = nodes[b];
          return (
            <circle key={`p${i}`} r="2.4" fill="url(#nm-pulse)">
              <animate attributeName="cx" from={x1} to={x2} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="cy" from={y1} to={y2} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            </circle>
          );
        })}

        {/* nodes */}
        {nodes.map(([x, y], i) => (
          <g key={`n${i}`}>
            <circle cx={x} cy={y} r="3.2" fill="rgba(99,102,241,0.18)" />
            <circle cx={x} cy={y} r="1.6" fill="#a5b4fc">
              <animate attributeName="opacity" values="0.5;1;0.5" dur={`${2 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* Ghost Analytics (Review Engine card)
   A blurred line graph that pulses upward with a glowing label. */
function GhostAnalytics({ label, value }: { label: string; value: string }) {
  return (
    <div className="ghost-analytics" aria-hidden="true">
      <svg
        viewBox="0 0 600 160"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="ga-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.0" />
            <stop offset="20%"  stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="ga-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* baseline grid */}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line key={i} x1="0" x2="600" y1={160 * t} y2={160 * t}
            stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 5" />
        ))}
        {/* filled area */}
        <path
          className="ga-area"
          d="M0,140 L40,128 L90,118 L150,124 L210,108 L270,96 L330,82 L390,72 L450,56 L510,42 L570,28 L600,18 L600,160 L0,160 Z"
          fill="url(#ga-fill)"
        />
        {/* line */}
        <path
          className="ga-line"
          d="M0,140 L40,128 L90,118 L150,124 L210,108 L270,96 L330,82 L390,72 L450,56 L510,42 L570,28 L600,18"
          fill="none"
          stroke="url(#ga-line)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* end-of-line glowing dot */}
        <circle cx="600" cy="18" r="3.5" fill="#67e8f9">
          <animate attributeName="r" values="3;5;3" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Glowing analytics label pinned top-right */}
      <div className="ghost-analytics__label">
        <span className="ghost-analytics__pulse" />
        <span className="ghost-analytics__label-text">{label}</span>
        <span className="ghost-analytics__value">{value}</span>
      </div>
    </div>
  );
}

/* ─── component ───────────────────────────────────────────── */
export default function BusinessSolutions() {
  const { lang } = useLanguage();
  const l = lang as LangKey;
  const [modalOpen, setModalOpen] = useState(false);

  const TITLE_TAG =
    l === 'fr'
      ? "Logiciels d'Affaires — FieldOps Pro | NT Web Design"
      : "Business Software — FieldOps Pro | NT Web Design";
  const DESC_TAG =
    l === 'fr'
      ? "Le système d'exploitation IA sans frontières pour les entrepreneurs internationaux : SMS automatique, prise de rendez-vous IA, moteur d'avis Google."
      : "The borderless AI operating system for global contractors: automated text-back, AI booking, and Google review automation.";

  return (
    <>
      <Helmet>
        <title>{TITLE_TAG}</title>
        <meta name="description" content={DESC_TAG} />
        <link rel="canonical" href="https://ntwebux.com/business" />
        <meta property="og:title"       content={TITLE_TAG} />
        <meta property="og:description" content={DESC_TAG} />
        <meta property="og:url"         content="https://ntwebux.com/business" />
        <meta property="og:site_name"   content="NT Web Design" />
        <meta property="og:image"       content="https://ntwebux.com/logo.png" />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />

        <main>
          {/* ══ HERO — Landio 4-layer composition ════════════════ */}
          {/* Layer 1: Dark canvas */}
          <section className="relative w-full overflow-hidden bg-[#0a0a0c] min-h-[80vh] flex flex-col items-center justify-center pt-32 pb-20 px-4">

            {/* Layer 2: Framer glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Layer 4: Glass top badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-blue-400 uppercase tracking-widest mb-8 backdrop-blur-sm z-10">
              <Zap className="w-4 h-4" />
              {bi(copy.hero.badge, l)}
            </div>

            {/* Layer 3: Hero typography */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-center leading-[1.1] z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                {bi(copy.hero.h1, l).split('\n')[0]}<br />
                {bi(copy.hero.h1, l).split('\n')[1]}
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-400 font-medium tracking-wide max-w-2xl text-center z-10">
              {bi(copy.hero.sub, l)}
            </p>

            {/* Buttons */}
            <div className="mt-10 z-10 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                {bi(copy.hero.cta, l)}
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="/#contact"
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm text-center"
              >
                {bi(copy.hero.ctaSec, l)}
              </a>
            </div>
          </section>

          {/* ══ ANTI-MISSED-CALL FEATURES ════════════════════ */}
          <section style={{ padding: '0 24px 96px' }}>
            <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
              <motion.div
                variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease }}
                style={{ textAlign: 'center', marginBottom: '52px' }}
              >
                <span style={{
                  display: 'inline-block', marginBottom: '12px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#3b82f6',
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.22)',
                  borderRadius: '20px', padding: '4px 14px',
                }}>
                  {bi(copy.features.eyebrow, l)}
                </span>
                <h2 style={{
                  fontSize: 'clamp(24px, 4vw, 40px)',
                  fontWeight: 800, letterSpacing: '-0.025em',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.72) 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  margin: 0,
                }}>
                  {bi(copy.features.title, l)}
                </h2>
              </motion.div>

              {/* Asymmetrical Bento Grid: 3-cols desktop, stacks on mobile */}
              <div className="bento-features-grid">
                {(() => {
                  const icons = [MessageSquare, CalendarCheck, Star];
                  const spans = [
                    { col: 'span 2', row: 'span 1' },  // AI Text-Back: wide top-left
                    { col: 'span 1', row: 'span 1' },  // Auto-Booking: small top-right
                    { col: 'span 3', row: 'span 1' },  // Review Engine: full-width bottom
                  ];
                  /* Per-card accent: cyan, indigo, cyan+indigo blend */
                  const accents: Array<{
                    glow: string; iconBg: string; iconBorder: string;
                    iconColor: string; dotColor: string; specColor: string;
                  }> = [
                    { /* card 0 — Electric Cyan */
                      glow: 'radial-gradient(60% 60% at 30% 30%, rgba(34,211,238,0.30), transparent 70%)',
                      iconBg: 'linear-gradient(135deg, rgba(34,211,238,0.20) 0%, rgba(34,211,238,0.04) 100%)',
                      iconBorder: 'rgba(34,211,238,0.32)',
                      iconColor: '#67e8f9',
                      dotColor: '#22d3ee',
                      specColor: 'rgba(165,243,252,0.78)',
                    },
                    { /* card 1 — Deep Indigo */
                      glow: 'radial-gradient(60% 60% at 30% 30%, rgba(99,102,241,0.32), transparent 70%)',
                      iconBg: 'linear-gradient(135deg, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.04) 100%)',
                      iconBorder: 'rgba(99,102,241,0.36)',
                      iconColor: '#a5b4fc',
                      dotColor: '#818cf8',
                      specColor: 'rgba(199,210,254,0.78)',
                    },
                    { /* card 2 — Cyan + Indigo blend */
                      glow: 'radial-gradient(60% 60% at 30% 30%, rgba(34,211,238,0.26), transparent 60%), radial-gradient(50% 50% at 75% 70%, rgba(99,102,241,0.24), transparent 65%)',
                      iconBg: 'linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(99,102,241,0.10) 100%)',
                      iconBorder: 'rgba(34,211,238,0.30)',
                      iconColor: '#67e8f9',
                      dotColor: '#22d3ee',
                      specColor: 'rgba(165,243,252,0.78)',
                    },
                  ];
                  return copy.features.cards.map((card, i) => {
                    const Icon = icons[i];
                    const accent = accents[i];
                    return (
                      <motion.article
                        key={i}
                        variants={fadeUp} initial="hidden"
                        whileInView="show" viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.52, delay: i * 0.08, ease }}
                        whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
                        className="bento-feature-card"
                        style={{
                          gridColumn: spans[i].col,
                          gridRow: spans[i].row,
                        }}
                      >
                        {/* ── Background visualization (per-card) ── */}
                        {i === 0 && <LiveActivityConsole lines={copy.consoleLog[l]} />}
                        {i === 1 && <NeuralMap />}
                        {i === 2 && <GhostAnalytics
                          label={bi(copy.features.badges.revenueRecovered, l)}
                          value="$14,200"
                        />}

                        {/* Ambient cyan/indigo radial glow behind the icon */}
                        <div aria-hidden="true" style={{
                          position: 'absolute',
                          left: '12px', top: '40px',
                          width: '220px', height: '220px',
                          background: accent.glow,
                          filter: 'blur(28px)',
                          opacity: 0.85,
                          pointerEvents: 'none',
                          zIndex: 0,
                        }} />

                        {/* ── Top row: spec eyebrow + tech badge ── */}
                        <div style={{
                          position: 'relative', zIndex: 2,
                          display: 'flex', alignItems: 'flex-start',
                          justifyContent: 'space-between', gap: '12px',
                        }}>
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: accent.specColor,
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          }}>
                            <span style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              background: accent.dotColor,
                              boxShadow: `0 0 8px ${accent.dotColor}b0`,
                            }} />
                            {bi(card.spec, l)}
                          </div>

                          {/* Per-card top-right badge */}
                          {i === 0 && (
                            <span className="status-badge status-badge--green">
                              <span className="status-dot status-dot--green" />
                              {bi(copy.features.badges.systemOnline, l)}
                            </span>
                          )}
                          {i === 1 && (
                            <span className="status-badge status-badge--indigo">
                              {bi(copy.features.badges.realTimeSync, l)}
                            </span>
                          )}
                        </div>

                        {/* ── Icon ── */}
                        <div style={{
                          position: 'relative', zIndex: 2,
                          width: '46px', height: '46px',
                          borderRadius: '12px',
                          background: accent.iconBg,
                          border: `1px solid ${accent.iconBorder}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: accent.iconColor,
                        }}>
                          <Icon size={20} strokeWidth={1.6} />
                        </div>

                        <h3 style={{
                          position: 'relative', zIndex: 2,
                          fontSize: 'clamp(20px, 2.4vw, 26px)',
                          fontWeight: 700,
                          color: '#fff', margin: 0,
                          letterSpacing: '-0.03em',
                          lineHeight: 1.15,
                        }}>
                          {bi(card.title, l)}
                        </h3>

                        <p style={{
                          position: 'relative', zIndex: 2,
                          fontSize: '15px',
                          color: 'rgb(156,163,175)', /* text-gray-400 */
                          lineHeight: 1.7, margin: 0,
                          maxWidth: '62ch',
                        }}>
                          {bi(card.desc, l)}
                        </p>

                        {/* ── Verified ROI badge (cards 0 & 1) ── */}
                        {(card as any).roi && (
                          <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '6px' }}>
                            <span className="roi-badge">
                              <span className="roi-badge__check" aria-hidden="true">✓</span>
                              <span className="roi-badge__label">
                                {bi(copy.features.badges.verifiedRoi, l)}
                              </span>
                              <span className="roi-badge__sep" aria-hidden="true">·</span>
                              <span className="roi-badge__value">{bi((card as any).roi, l)}</span>
                            </span>
                          </div>
                        )}
                      </motion.article>
                    );
                  });
                })()}
              </div>
            </div>

            <style>{`
              .bento-features-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 18px;
              }
              @media (min-width: 900px) {
                .bento-features-grid {
                  grid-template-columns: repeat(3, 1fr);
                  gap: 22px;
                }
              }
              .bento-feature-card {
                position: relative;
                padding: 32px;
                background-color: rgba(12,15,24,0.55);
                background-image: radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px);
                background-size: 20px 20px;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                overflow: hidden;
                transition: border-color 0.25s ease, background-color 0.25s ease;
              }
              .bento-feature-card::before {
                content: '';
                position: absolute; inset: 0;
                border-radius: inherit;
                pointer-events: none;
                background: radial-gradient(120% 80% at 0% 0%, rgba(59,130,246,0.08), transparent 55%);
                opacity: 0;
                transition: opacity 0.3s ease;
              }
              .bento-feature-card:hover {
                border-color: rgba(255,255,255,0.18);
                background-color: rgba(255,255,255,0.035);
              }
              .bento-feature-card:hover::before { opacity: 1; }
              /* On mobile, stack — all cards full-width */
              @media (max-width: 819px) {
                .bento-feature-card {
                  grid-column: span 1 !important;
                  padding: 28px 24px;
                }
              }

              /* ─── Status / tech badges (top-right corner) ─── */
              .status-badge {
                font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.10em;
                text-transform: uppercase;
                padding: 3px 9px;
                border-radius: 999px;
                white-space: nowrap;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                line-height: 1.4;
                position: relative;
                z-index: 2;
                flex-shrink: 0;
              }
              .status-badge--green {
                background: rgba(16,185,129,0.10);
                border: 1px solid rgba(16,185,129,0.40);
                color: #6ee7b7;
                box-shadow: 0 0 18px rgba(16,185,129,0.18);
              }
              .status-badge--indigo {
                background: rgba(99,102,241,0.10);
                border: 1px solid rgba(99,102,241,0.40);
                color: #c7d2fe;
                box-shadow: 0 0 16px rgba(99,102,241,0.16);
              }
              .status-dot {
                width: 6px; height: 6px; border-radius: 50%;
                animation: status-pulse 1.4s ease-in-out infinite;
              }
              .status-dot--green {
                background: #10b981;
                box-shadow: 0 0 8px #10b981, 0 0 14px rgba(16,185,129,0.6);
              }
              @keyframes status-pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50%      { opacity: 0.45; transform: scale(0.85); }
              }

              /* ─── Live Activity Console (card 0) ─── */
              .live-console {
                position: absolute;
                inset: 0;
                overflow: hidden;
                border-radius: inherit;
                z-index: 0;
                pointer-events: none;
              }
              .live-console__inner {
                font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                font-size: 11px;
                line-height: 1.65;
                color: #67e8f9;
                opacity: 0.10;
                filter: blur(0.9px);
                white-space: nowrap;
                padding: 14px 22px;
                will-change: transform;
                animation: console-scroll 14s linear infinite;
              }
              .live-console__line {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              @keyframes console-scroll {
                from { transform: translate3d(0, 0, 0); }
                to   { transform: translate3d(0, -50%, 0); }
              }
              .live-console__scanlines {
                position: absolute; inset: 0; z-index: 1;
                background-image: repeating-linear-gradient(
                  to bottom,
                  rgba(255,255,255,0)    0px,
                  rgba(255,255,255,0)    3px,
                  rgba(34,211,238,0.025) 3px,
                  rgba(34,211,238,0.025) 4px
                );
                mix-blend-mode: screen;
              }
              .live-console__mask {
                position: absolute; inset: 0; z-index: 1;
                background:
                  linear-gradient(180deg,
                    rgba(10,10,12,0.55) 0%,
                    rgba(10,10,12,0.20) 30%,
                    rgba(10,10,12,0.55) 70%,
                    rgba(10,10,12,0.92) 100%
                  ),
                  radial-gradient(ellipse at 0% 100%, rgba(10,10,12,0.85), transparent 55%);
              }

              /* ─── Neural Map (card 1) ─── */
              .neural-map {
                position: absolute;
                inset: 0;
                overflow: hidden;
                border-radius: inherit;
                z-index: 0;
                pointer-events: none;
                opacity: 0.55;
                filter: blur(0.6px);
                mix-blend-mode: screen;
                mask-image: radial-gradient(120% 110% at 60% 50%, #000 50%, transparent 100%);
                -webkit-mask-image: radial-gradient(120% 110% at 60% 50%, #000 50%, transparent 100%);
              }

              /* ─── Ghost Analytics (card 2) ─── */
              .ghost-analytics {
                position: absolute;
                inset: 0;
                overflow: hidden;
                border-radius: inherit;
                z-index: 0;
                pointer-events: none;
              }
              .ghost-analytics svg {
                opacity: 0.55;
                filter: blur(1px);
                mix-blend-mode: screen;
              }
              .ghost-analytics .ga-line {
                stroke-dasharray: 1500;
                stroke-dashoffset: 0;
                animation: ga-pulse 3.6s ease-in-out infinite;
              }
              .ghost-analytics .ga-area {
                animation: ga-area-pulse 3.6s ease-in-out infinite;
              }
              @keyframes ga-pulse {
                0%, 100% { filter: drop-shadow(0 0 6px rgba(34,211,238,0.5)); }
                50%      { filter: drop-shadow(0 0 14px rgba(34,211,238,0.9)); }
              }
              @keyframes ga-area-pulse {
                0%, 100% { opacity: 0.7; transform: translateY(2px); }
                50%      { opacity: 1;   transform: translateY(0); }
              }
              .ghost-analytics__label {
                position: absolute;
                top: 22px; right: 22px;
                z-index: 2;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 6px 12px;
                border-radius: 999px;
                background: rgba(34,211,238,0.10);
                border: 1px solid rgba(34,211,238,0.36);
                box-shadow: 0 0 22px rgba(34,211,238,0.22);
                font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                font-size: 10.5px;
                font-weight: 700;
                letter-spacing: 0.09em;
                text-transform: uppercase;
                white-space: nowrap;
              }
              .ghost-analytics__pulse {
                width: 7px; height: 7px; border-radius: 50%;
                background: #22d3ee;
                box-shadow: 0 0 10px #22d3ee, 0 0 18px rgba(34,211,238,0.7);
                animation: status-pulse 1.4s ease-in-out infinite;
              }
              .ghost-analytics__label-text { color: rgba(165,243,252,0.85); }
              .ghost-analytics__value      { color: #67e8f9; font-weight: 800; letter-spacing: 0.04em; }

              @media (max-width: 819px) {
                .ghost-analytics__label {
                  top: auto; bottom: 18px; right: 18px;
                  font-size: 10px;
                  padding: 5px 10px;
                }
              }

              @media (prefers-reduced-motion: reduce) {
                .live-console__inner,
                .ghost-analytics .ga-line,
                .ghost-analytics .ga-area,
                .status-dot,
                .ghost-analytics__pulse {
                  animation: none !important;
                }
              }
            `}</style>
          </section>

          {/* ══ THE ARCHITECTURE — old vs automated ═══════════ */}
          <section style={{ padding: '20px 24px 100px', position: 'relative' }}>
            <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
              <motion.div
                variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease }}
                style={{ textAlign: 'center', marginBottom: '52px' }}
              >
                <span style={{
                  display: 'inline-block', marginBottom: '12px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#3b82f6',
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.22)',
                  borderRadius: '20px', padding: '4px 14px',
                }}>
                  {bi(copy.architecture.eyebrow, l)}
                </span>
                <h2 style={{
                  fontSize: 'clamp(24px, 4vw, 40px)',
                  fontWeight: 800, letterSpacing: '-0.025em',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.72) 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  margin: '14px 0 0',
                }}>
                  {bi(copy.architecture.title, l)}
                </h2>
              </motion.div>

              <div className="arch-grid">
                {(['old', 'automated'] as const).map((key, ci) => {
                  const block = copy.architecture[key];
                  const isOld = key === 'old';
                  return (
                    <motion.div
                      key={key}
                      variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.55, delay: ci * 0.1, ease }}
                      className={`arch-card ${isOld ? 'arch-card--old' : 'arch-card--auto'}`}
                    >
                      <div className="arch-card__head">
                        <span className={`arch-pill ${isOld ? 'arch-pill--old' : 'arch-pill--auto'}`}>
                          {isOld ? '✕' : '✓'} {bi(block.label, l)}
                        </span>
                        <p className="arch-caption">{bi(block.caption, l)}</p>
                      </div>

                      <div className="arch-flow">
                        {block.steps.map((step, si) => (
                          <div key={si} className="arch-step-wrap">
                            <div className={`arch-node ${isOld ? 'arch-node--old' : 'arch-node--auto'}`}>
                              <span className="arch-node__num">{String(si + 1).padStart(2, '0')}</span>
                              <span className="arch-node__label">{bi(step, l)}</span>
                            </div>
                            {si < block.steps.length - 1 && (
                              <div className={`arch-line ${isOld ? 'arch-line--old' : 'arch-line--auto'}`} aria-hidden="true">
                                <span className="arch-line__pulse" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <style>{`
              /* ─── Verified ROI badge (cards 0 & 1) ─── */
              .roi-badge {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                padding: 6px 12px;
                border-radius: 999px;
                background: rgba(16,185,129,0.08);
                border: 1px solid rgba(16,185,129,0.32);
                box-shadow: 0 0 18px rgba(16,185,129,0.18), inset 0 0 12px rgba(16,185,129,0.05);
                font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 0.02em;
                white-space: nowrap;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .roi-badge__check {
                display: inline-flex; align-items: center; justify-content: center;
                width: 14px; height: 14px;
                border-radius: 50%;
                background: rgba(16,185,129,0.22);
                color: #6ee7b7;
                font-size: 9px; font-weight: 800;
                box-shadow: 0 0 6px rgba(16,185,129,0.5);
              }
              .roi-badge__label {
                color: #6ee7b7;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                font-size: 10px;
                font-weight: 700;
              }
              .roi-badge__sep { color: rgba(110,231,183,0.35); }
              .roi-badge__value {
                color: #a7f3d0;
                font-weight: 600;
                letter-spacing: 0.01em;
              }

              /* ─── Architecture grid ─── */
              .arch-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 22px;
              }
              @media (min-width: 900px) {
                .arch-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
              }

              .arch-card {
                position: relative;
                padding: 32px 28px;
                background-color: rgba(12,15,24,0.55);
                border-radius: 20px;
                overflow: hidden;
                display: flex; flex-direction: column; gap: 28px;
                min-height: 380px;
              }
              .arch-card--old {
                border: 1px solid rgba(248,113,113,0.22);
                box-shadow: inset 0 0 60px rgba(248,113,113,0.04);
              }
              .arch-card--old::before {
                content: '';
                position: absolute; inset: 0;
                background: radial-gradient(70% 60% at 30% 20%, rgba(248,113,113,0.10), transparent 70%);
                pointer-events: none;
              }
              .arch-card--auto {
                border: 1px solid rgba(59,130,246,0.32);
                box-shadow: inset 0 0 60px rgba(59,130,246,0.05), 0 0 40px rgba(59,130,246,0.10);
              }
              .arch-card--auto::before {
                content: '';
                position: absolute; inset: 0;
                background: radial-gradient(70% 60% at 30% 20%, rgba(59,130,246,0.14), transparent 70%);
                pointer-events: none;
              }

              .arch-card__head { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 12px; }
              .arch-pill {
                align-self: flex-start;
                font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                font-size: 11px; font-weight: 700;
                letter-spacing: 0.12em; text-transform: uppercase;
                padding: 5px 12px;
                border-radius: 999px;
                display: inline-flex; align-items: center; gap: 7px;
              }
              .arch-pill--old {
                color: #fca5a5;
                background: rgba(248,113,113,0.10);
                border: 1px solid rgba(248,113,113,0.36);
                box-shadow: 0 0 16px rgba(248,113,113,0.14);
              }
              .arch-pill--auto {
                color: #93c5fd;
                background: rgba(59,130,246,0.12);
                border: 1px solid rgba(59,130,246,0.42);
                box-shadow: 0 0 18px rgba(59,130,246,0.22);
              }
              .arch-caption {
                margin: 0;
                font-size: 14px;
                color: rgba(255,255,255,0.55);
                line-height: 1.6;
              }

              /* ─── Flow ─── */
              .arch-flow {
                position: relative; z-index: 2;
                display: flex;
                flex-direction: column;
                align-items: stretch;
                gap: 0;
                margin-top: auto;
              }
              .arch-step-wrap { display: flex; flex-direction: column; align-items: stretch; }

              .arch-node {
                display: flex; align-items: center; gap: 14px;
                padding: 14px 18px;
                border-radius: 14px;
                background: rgba(2,4,10,0.85);
                font-weight: 600;
                position: relative;
                transition: transform 0.25s ease;
              }
              .arch-node__num {
                font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                font-size: 11px;
                letter-spacing: 0.1em;
                padding: 3px 8px;
                border-radius: 6px;
                font-weight: 700;
              }
              .arch-node__label { font-size: 15px; letter-spacing: -0.01em; }

              .arch-node--old {
                border: 1px solid rgba(248,113,113,0.30);
                color: rgba(254,202,202,0.92);
                box-shadow: 0 0 18px rgba(248,113,113,0.10), inset 0 0 12px rgba(248,113,113,0.04);
              }
              .arch-node--old .arch-node__num {
                background: rgba(248,113,113,0.12);
                color: #fca5a5;
                border: 1px solid rgba(248,113,113,0.30);
              }

              .arch-node--auto {
                border: 1px solid rgba(59,130,246,0.45);
                color: #e0ecff;
                box-shadow: 0 0 24px rgba(59,130,246,0.18), inset 0 0 14px rgba(59,130,246,0.06);
              }
              .arch-node--auto .arch-node__num {
                background: rgba(59,130,246,0.16);
                color: #93c5fd;
                border: 1px solid rgba(59,130,246,0.42);
              }

              /* ─── Connector lines ─── */
              .arch-line {
                position: relative;
                width: 2px;
                height: 38px;
                margin-left: 36px;
                overflow: hidden;
              }
              .arch-line--old {
                background: linear-gradient(to bottom, rgba(248,113,113,0.50), rgba(248,113,113,0.10));
                opacity: 0.45;
              }
              .arch-line--auto {
                background: linear-gradient(to bottom, rgba(59,130,246,0.55), rgba(59,130,246,0.10));
              }
              .arch-line__pulse {
                position: absolute;
                left: -3px; top: -8px;
                width: 8px; height: 8px;
                border-radius: 50%;
                background: #3b82f6;
                box-shadow: 0 0 12px #3b82f6, 0 0 24px rgba(59,130,246,0.7);
                animation: arch-pulse-down 2.2s ease-in-out infinite;
              }
              .arch-line--old .arch-line__pulse {
                background: rgba(248,113,113,0.5);
                box-shadow: 0 0 8px rgba(248,113,113,0.4);
                animation: arch-pulse-stutter 4s ease-in-out infinite;
              }
              @keyframes arch-pulse-down {
                0%   { top: -8px;  opacity: 0; }
                15%  { opacity: 1; }
                85%  { opacity: 1; }
                100% { top: 100%;  opacity: 0; }
              }
              @keyframes arch-pulse-stutter {
                0%, 60%, 100% { top: -8px;  opacity: 0; }
                70%           { opacity: 0.6; }
                80%           { top: 50%;  opacity: 0.3; }
                90%           { top: 70%;  opacity: 0; }
              }

              @media (prefers-reduced-motion: reduce) {
                .arch-line__pulse { animation: none !important; opacity: 0.4; }
              }
            `}</style>
          </section>

          {/* ══ ROI CALCULATOR ═══════════════════════════════ */}
          <div style={{
            background: 'rgba(4,10,22,0.55)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ textAlign: 'center', padding: '72px 24px 0' }}>
              <motion.h2
                variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.52, ease }}
                style={{
                  fontSize: 'clamp(24px, 4vw, 38px)',
                  fontWeight: 800, letterSpacing: '-0.025em',
                  background: 'linear-gradient(135deg, #93c5fd 0%, #bfdbfe 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  margin: 0,
                }}
              >
                {bi(copy.calc.heading, l)}
              </motion.h2>
            </div>
            <ROICalculator />
          </div>

          {/* ══ FOOTER CTA ════════════════════════════════════ */}
          <section id="cta" style={{ padding: '100px 24px', textAlign: 'center' }}>
            <motion.div
              variants={fadeUp} initial="hidden"
              whileInView="show" viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease }}
              style={{
                maxWidth: '700px', margin: '0 auto',
                padding: 'clamp(40px, 8vw, 68px)',
                background: 'linear-gradient(135deg, rgba(29,78,216,0.22) 0%, rgba(59,130,246,0.07) 100%)',
                border: '1px solid rgba(59,130,246,0.24)',
                borderRadius: '28px',
                boxShadow: '0 0 80px rgba(59,130,246,0.1)',
              }}
            >
              <span style={{
                display: 'inline-block', marginBottom: '16px',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#3b82f6',
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: '20px', padding: '4px 14px',
              }}>
                {l === 'fr' ? 'Configuration en 72 heures' : '72-Hour Setup'}
              </span>

              <p style={{
                fontSize: 'clamp(17px, 3vw, 22px)',
                fontWeight: 600, color: 'rgba(255,255,255,0.88)',
                margin: '0 0 36px',
                lineHeight: 1.55,
              }}>
                {bi(copy.footer.text, l)}
              </p>

              <button
                onClick={() => setModalOpen(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  padding: '16px 36px', borderRadius: '14px',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(59,130,246,0.42)',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 42px rgba(59,130,246,0.55)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.42)'; }}
              >
                {bi(copy.footer.cta, l)} <ArrowRight size={16} />
              </button>

              <p style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.22)' }}>
                {l === 'fr'
                  ? 'Des questions ? Écrivez-nous à '
                  : 'Questions? Email us at '}
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>info@ntwebux.com</span>
                {l === 'fr' ? ' ou appelez ' : ' or call '}
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>(438) 806-7640</span>
              </p>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>

      <SoftwareIntakeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
