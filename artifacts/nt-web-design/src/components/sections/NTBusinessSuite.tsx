import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { MessageSquare, CalendarCheck, Star, ArrowRight, Check, Zap } from 'lucide-react';

/* ─── Copy ──────────────────────────────────────────────────── */
const copy = {
  badge:   { en: 'All-in-One Platform', fr: 'Plateforme tout-en-un' },
  eyebrow: { en: 'NT Business Suite',   fr: 'NT Business Suite' },
  h2:      {
    en: <>Everything you need to <span style={{ color: '#93c5fd' }}>scale.</span></>,
    fr: <>Tout ce qu'il faut pour <span style={{ color: '#93c5fd' }}>croître.</span></>,
  },
  sub: {
    en: "The AI operating system built for service businesses. Stop losing leads to voicemail. Automate your bookings, reviews, and follow-ups — all in one place.",
    fr: "Le système d'exploitation IA conçu pour les entreprises de services. Stoppez la fuite de prospects vers la messagerie. Automatisez vos réservations, avis et relances — en un seul endroit.",
  },
  cards: [
    {
      id: '01',
      spec: { en: 'Conversational AI', fr: 'IA Conversationnelle' },
      icon: MessageSquare,
      title: { en: 'AI Text-Back', fr: 'Réponse SMS Intelligente' },
      desc: {
        en: "Stop lead leakage. Our AI instantly detects missed calls and initiates a conversational SMS sequence — qualifying prospects before they call your competitor.",
        fr: "Stoppez la fuite de prospects. Notre IA détecte les appels manqués et déclenche une séquence SMS conversationnelle — qualifiant les leads avant qu'ils appellent votre concurrent.",
      },
      roi: { en: '+22% avg. closed deals recovered', fr: '+22 % de ventes récupérées en moyenne' },
      color: '34,211,238',
      colorHex: '#22d3ee',
    },
    {
      id: '02',
      spec: { en: 'Calendar Sync', fr: 'Synchronisation Agenda' },
      icon: CalendarCheck,
      title: { en: 'Auto-Booking', fr: 'Prise de Rendez-vous Auto' },
      desc: {
        en: "Direct calendar integration. Syncs with Google & Outlook to book qualified estimates in real-time — no back-and-forth, no dropped leads.",
        fr: "Intégration directe avec votre agenda. Synchronise Google et Outlook pour réserver des estimations qualifiées en temps réel — sans allers-retours ni prospects perdus.",
      },
      roi: { en: 'Saves 14 h/week on admin', fr: 'Économise 14 h/semaine d\'administratif' },
      color: '99,102,241',
      colorHex: '#818cf8',
    },
    {
      id: '03',
      spec: { en: 'Local SEO Engine', fr: 'Moteur SEO Local' },
      icon: Star,
      title: { en: 'Review Engine', fr: 'Moteur d\'Avis Google' },
      desc: {
        en: "Dominate local search. Automated SMS review requests fire the moment a job is complete — boosting your Google ranking on autopilot.",
        fr: "Dominez la recherche locale. Les demandes d'avis SMS s'enclenchent dès qu'un contrat est terminé — propulsant votre classement Google en pilote automatique.",
      },
      roi: { en: '+61% avg. Google traffic in 90 days', fr: '+61 % de trafic Google moyen en 90 jours' },
      color: '52,211,153',
      colorHex: '#34d399',
    },
  ],
  plans: {
    title: { en: 'Simple pricing.', fr: 'Tarification simple.' },
    subtitle: { en: 'No contracts. Cancel anytime.', fr: 'Sans engagement. Résiliez quand vous voulez.' },
    cta:   { en: 'Get Started',     fr: 'Démarrer' },
    ctaFeatured: { en: 'Claim Beta Spot', fr: 'Rejoindre le Bêta' },
    ctaCustom: { en: "Let's Talk", fr: 'Parlons-en' },
    popular: { en: 'Most Popular', fr: 'Plus Populaire' },
  },
  cta: {
    text: {
      en: 'Stop leaving money on the table. We set up your entire system in 72 hours.',
      fr: 'Arrêtez de laisser de l\'argent sur la table. Nous configurons votre système complet en 72 heures.',
    },
    btn:  { en: 'Get a Free Audit', fr: 'Obtenir un Audit Gratuit' },
    note: { en: 'Questions? Call (438) 806-7640', fr: 'Questions? Appelez le (438) 806-7640' },
  },
  consoleLog: {
    en: [
      "[14:02:11] Missed call from +1 (514) 555-0142",
      "[14:02:12] AI Text-Back sequence initiated",
      "[14:02:14] SMS sent — qualifying prospect intent",
      "[14:02:47] Reply received: 'kitchen remodel quote'",
      "[14:02:48] Lead scored 87/100 — high intent",
      "[14:02:51] Calendar sync: 3 slots offered",
      "[14:03:09] Booking confirmed — Thu 10:30 AM",
      "[14:03:10] CRM record created · ID #LD-9241",
      "[14:04:02] Missed call from +1 (438) 555-0188",
      "[14:04:19] Lead scored 92/100 — high intent",
      "[14:04:22] Estimate auto-booked — Sat 9:00 AM",
      "[14:05:34] Google review posted ★★★★★",
      "[14:06:01] Pipeline value updated: +$14,200",
    ],
    fr: [
      "[14:02:11] Appel manqué de +1 (514) 555-0142",
      "[14:02:12] Séquence Réponse SMS IA initiée",
      "[14:02:14] SMS envoyé — qualification du prospect",
      "[14:02:47] Réponse reçue : « devis rénovation cuisine »",
      "[14:02:48] Score du lead : 87/100 — fort intérêt",
      "[14:02:51] Sync agenda : 3 créneaux proposés",
      "[14:03:09] RDV confirmé — jeu. 10 h 30",
      "[14:03:10] Fiche CRM créée · ID #LD-9241",
      "[14:04:02] Appel manqué de +1 (438) 555-0188",
      "[14:04:19] Score du lead : 92/100 — fort intérêt",
      "[14:04:22] Estimation auto-réservée — sam. 9 h 00",
      "[14:05:34] Avis Google publié ★★★★★",
      "[14:06:01] Valeur du pipeline mise à jour : +14 200 $",
    ],
  },
};

type Lang = 'en' | 'fr';
function bi<T>(obj: { en: T; fr: T }, lang: Lang): T { return obj[lang]; }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.09, duration: 0.58, ease: [0.22, 1, 0.36, 1] } }),
};

/* ─── Live console visualization ─────────────────────────── */
function LiveConsole({ lines }: { lines: string[] }) {
  return (
    <div className="bs-console" aria-hidden="true">
      <div className="bs-console__inner">
        {[...lines, ...lines].map((l, i) => (
          <div key={i} className="bs-console__line">{l}</div>
        ))}
      </div>
      <div className="bs-console__scanlines" />
      <div className="bs-console__mask" />
    </div>
  );
}

/* ─── Neural map visualization ───────────────────────────── */
function NeuralMap() {
  const nodes: [number, number][] = [
    [22, 28], [80, 16], [138, 36], [188, 22],
    [38, 72], [100, 58], [160, 82],
    [58, 112], [124, 104], [186, 108],
  ];
  const edges: [number, number][] = [
    [0,1],[1,2],[2,3],[0,4],[1,5],[2,5],[3,6],
    [4,5],[5,6],[4,7],[5,7],[5,8],[6,8],[6,9],[8,9],[7,8],
  ];
  return (
    <div className="bs-neural" aria-hidden="true">
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <radialGradient id="bsnm-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#a5b4fc" stopOpacity="1" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
          </radialGradient>
        </defs>
        {edges.map(([a,b],i) => {
          const [x1,y1]=nodes[a]; const [x2,y2]=nodes[b];
          return <line key={`e${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(99,102,241,0.38)" strokeWidth="0.5"/>;
        })}
        {[[0,1],[1,2],[4,5],[5,8],[3,6],[6,9],[7,8]].map(([a,b],i) => {
          const [x1,y1]=nodes[a]; const [x2,y2]=nodes[b]; const durs=[2.6,2.4,2.2,2.8,2.5,2.0,2.3];
          return (
            <circle key={`p${i}`} r="2.2" fill="url(#bsnm-pulse)">
              <animate attributeName="cx" from={x1} to={x2} dur={`${durs[i]}s`} begin={`${i*0.4}s`} repeatCount="indefinite"/>
              <animate attributeName="cy" from={y1} to={y2} dur={`${durs[i]}s`} begin={`${i*0.4}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;1;0" dur={`${durs[i]}s`} begin={`${i*0.4}s`} repeatCount="indefinite"/>
            </circle>
          );
        })}
        {nodes.map(([x,y],i) => (
          <g key={`n${i}`}>
            <circle cx={x} cy={y} r="3" fill="rgba(99,102,241,0.15)"/>
            <circle cx={x} cy={y} r="1.5" fill="#a5b4fc">
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2+(i%3)*0.4}s`} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── Ghost analytics visualization ─────────────────────── */
function GhostAnalytics({ label }: { label: string }) {
  return (
    <div className="bs-analytics" aria-hidden="true">
      <svg viewBox="0 0 600 150" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="bsga-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0"/>
            <stop offset="20%"  stopColor="#22d3ee" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#34d399" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="bsga-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0.25,0.5,0.75].map((t,i) => (
          <line key={i} x1="0" x2="600" y1={150*t} y2={150*t} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 5"/>
        ))}
        <path className="bsga-area" d="M0,132 L40,120 L90,110 L150,116 L210,100 L270,88 L330,74 L390,64 L450,48 L510,34 L570,20 L600,12 L600,150 L0,150 Z" fill="url(#bsga-fill)"/>
        <path className="bsga-line" d="M0,132 L40,120 L90,110 L150,116 L210,100 L270,88 L330,74 L390,64 L450,48 L510,34 L570,20 L600,12" fill="none" stroke="url(#bsga-line)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="600" cy="12" r="3" fill="#34d399">
          <animate attributeName="r" values="3;5;3" dur="1.6s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <div className="bs-analytics__label">
        <span className="bs-analytics__dot"/>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{label}</span>
        <span style={{ fontSize: '15px', fontWeight: 800, color: '#34d399', marginLeft: 'auto' }}>+61%</span>
      </div>
    </div>
  );
}

/* ─── Pricing plans ──────────────────────────────────────── */
const AI_PLANS_EN = [
  { name: 'Starter', price: '297', badge: null, features: ['CRM & contact management','AI web chat widget','Missed-call text-back (SMS)','Lead capture forms','1 pipeline · Up to 500 contacts','Mobile app access'], cta: 'Get Started', featured: false },
  { name: 'Professional', price: '497', badge: 'Most Popular', features: ['Everything in Starter','Full AI text & email automation','Auto-booking & calendar integration','Google review request engine','2-way SMS & email conversations','Unlimited pipelines · Up to 2,500 contacts','Reputation dashboard'], cta: 'Claim Beta Spot', featured: true },
  { name: 'Full Scope', price: '899', badge: null, features: ['Everything in Professional','Custom AI voice agent (inbound)','WhatsApp automation','Multi-location setup','Advanced analytics dashboard','Unlimited contacts','White-glove support + strategy call'], cta: "Let's Talk", featured: false },
];
const AI_PLANS_FR = [
  { name: 'Démarrage', price: '297', badge: null, features: ['CRM & gestion des contacts','Widget chat IA','Réponse SMS aux appels manqués','Formulaires de capture de leads','1 pipeline · Jusqu\'à 500 contacts','Application mobile'], cta: 'Démarrer', featured: false },
  { name: 'Professionnel', price: '497', badge: 'Plus Populaire', features: ['Tout du Démarrage','Automatisation IA SMS & email','Réservation auto & agenda','Moteur d\'avis Google','SMS & email 2 voies','Pipelines illimités · 2 500 contacts','Tableau de bord réputation'], cta: 'Rejoindre le Bêta', featured: true },
  { name: 'Full Scope', price: '899', badge: null, features: ['Tout du Professionnel','Agent vocal IA (entrant)','Automatisation WhatsApp','Multi-adresses','Tableau de bord analytique avancé','Contacts illimités','Support blanc-gant + appel stratégie'], cta: 'Parlons-en', featured: false },
];

/* ─── Main section ───────────────────────────────────────── */
export function NTBusinessSuite() {
  const { lang } = useLanguage();
  const l = lang as Lang;
  const plans = l === 'fr' ? AI_PLANS_FR : AI_PLANS_EN;
  const consoleLine = bi(copy.consoleLog, l);

  const vizForCard = (i: number) => {
    if (i === 0) return <LiveConsole lines={consoleLine} />;
    if (i === 1) return <NeuralMap />;
    return <GhostAnalytics label={l === 'fr' ? 'Trafic Organique' : 'Organic Traffic'} />;
  };

  return (
    <section id="business-suite" style={{ padding: '120px 24px', background: 'rgba(4,10,22,0.65)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-60px' }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '5px 16px', marginBottom: '20px',
            background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.28)',
            borderRadius: '999px', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#93c5fd',
          }}>
            <Zap size={11} style={{ flexShrink: 0 }} />
            {bi(copy.badge, l)}
          </span>

          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '18px', letterSpacing: '-0.03em' }}>
            NT Business Suite<br />{bi(copy.h2, l)}
          </h2>

          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.52)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
            {bi(copy.sub, l)}
          </p>
        </motion.div>

        {/* ── Feature cards ── */}
        <div className="bs-cards-grid" style={{ marginBottom: '100px' }}>
          {copy.cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                custom={i + 1} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-40px' }}
                className="bs-feature-card"
                style={{
                  position: 'relative', overflow: 'hidden',
                  padding: '28px 28px 24px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  minHeight: '280px',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Background visualization */}
                {vizForCard(i)}

                {/* Ambient glow */}
                <div aria-hidden="true" style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '220px', height: '220px',
                  background: `radial-gradient(circle, rgba(${card.color},0.22) 0%, rgba(${card.color},0) 65%)`,
                  filter: 'blur(32px)', pointerEvents: 'none', zIndex: 0,
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                      background: `rgba(${card.color},0.14)`, border: `1px solid rgba(${card.color},0.30)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} color={card.colorHex} />
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `rgba(${card.color},0.75)` }}>
                      {card.id} / {bi(card.spec, l)}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                    {bi(card.title, l)}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 'auto' }}>
                    {bi(card.desc, l)}
                  </p>

                  <div style={{
                    marginTop: '20px', padding: '9px 12px',
                    background: `rgba(${card.color},0.08)`, border: `1px solid rgba(${card.color},0.20)`,
                    borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                    color: card.colorHex,
                  }}>
                    {bi(card.roi, l)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Pricing ── */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-60px' }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h3 style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 800, color: '#fff', marginBottom: '8px', letterSpacing: '-0.025em' }}>
            {bi(copy.plans.title, l)}
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.38)' }}>{bi(copy.plans.subtitle, l)}</p>
        </motion.div>

        <div className="bs-plans-grid" style={{ marginBottom: '80px' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              custom={i + 6} variants={fadeUp} initial="hidden"
              whileInView="show" viewport={{ once: true, margin: '-40px' }}
              className={`bs-plan-card${plan.featured ? ' bs-plan-featured' : ''}`}
              style={{
                position: 'relative',
                padding: '32px 28px',
                background: plan.featured ? 'linear-gradient(135deg, rgba(29,78,216,0.30) 0%, rgba(59,130,246,0.12) 100%)' : 'rgba(255,255,255,0.025)',
                border: plan.featured ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  padding: '3px 14px', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                  borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
                  whiteSpace: 'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: plan.featured ? '#93c5fd' : 'rgba(255,255,255,0.55)', marginBottom: '8px' }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>$</span>
                  <span style={{ fontSize: '40px', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>/mo</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {plan.features.map((f, fi) => (
                  <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '13px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>
                    <Check size={13} color={plan.featured ? '#93c5fd' : 'rgba(255,255,255,0.35)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                  padding: '12px 0', borderRadius: '10px', textDecoration: 'none',
                  fontSize: '13px', fontWeight: 700, letterSpacing: '0.02em',
                  background: plan.featured ? 'linear-gradient(135deg, #1d4ed8, #3b82f6)' : 'rgba(255,255,255,0.07)',
                  border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.10)',
                  color: '#fff',
                  boxShadow: plan.featured ? '0 6px 24px rgba(59,130,246,0.38)' : 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {plan.cta} <ArrowRight size={13} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          custom={10} variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-40px' }}
          style={{
            textAlign: 'center', padding: 'clamp(36px,6vw,56px)',
            background: 'linear-gradient(135deg, rgba(29,78,216,0.18) 0%, rgba(59,130,246,0.06) 100%)',
            border: '1px solid rgba(59,130,246,0.22)', borderRadius: '24px',
            boxShadow: '0 0 60px rgba(59,130,246,0.08)',
          }}
        >
          <p style={{ fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '28px', lineHeight: 1.55, maxWidth: '600px', margin: '0 auto 28px' }}>
            {bi(copy.cta.text, l)}
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              padding: '15px 36px', borderRadius: '12px', textDecoration: 'none',
              background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
              color: '#fff', fontSize: '14px', fontWeight: 700, letterSpacing: '0.03em',
              boxShadow: '0 8px 32px rgba(59,130,246,0.38)',
              transition: 'transform 0.18s, box-shadow 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(59,130,246,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.38)'; }}
          >
            {bi(copy.cta.btn, l)} <ArrowRight size={15} />
          </a>
          <p style={{ marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            {bi(copy.cta.note, l)}
          </p>
        </motion.div>
      </div>

      <style>{`
        /* ─── Feature cards grid ─── */
        .bs-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) { .bs-cards-grid { grid-template-columns: 1fr; } }

        /* ─── Pricing grid ─── */
        .bs-plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: stretch;
        }
        @media (max-width: 900px) { .bs-plans-grid { grid-template-columns: 1fr; } }

        /* ─── Card hover ─── */
        .bs-feature-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .bs-feature-card:hover { transform: translateY(-4px); }
        .bs-plan-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .bs-plan-card:hover { transform: translateY(-3px); }

        /* ─── Live console ─── */
        .bs-console {
          position: absolute; inset: 0; overflow: hidden;
          border-radius: 20px; pointer-events: none; z-index: 0;
        }
        .bs-console__inner {
          display: flex; flex-direction: column; gap: 6px; padding: 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 9.5px; line-height: 1.5; color: #22d3ee;
          animation: bs-console-scroll 18s linear infinite;
        }
        .bs-console__line { white-space: nowrap; opacity: 0.85; }
        @keyframes bs-console-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        .bs-console__scanlines {
          position: absolute; inset: 0; pointer-events: none;
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px,
            rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 4px
          );
          opacity: 0.4;
        }
        .bs-console__mask {
          position: absolute; inset: 0;
          background: linear-gradient(180deg,
            rgba(4,10,22,0.88) 0%, rgba(4,10,22,0.15) 25%,
            rgba(4,10,22,0.15) 75%, rgba(4,10,22,0.92) 100%
          );
        }

        /* ─── Neural map ─── */
        .bs-neural {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          opacity: 0.65;
          mask-image: radial-gradient(ellipse at 50% 50%, #000 40%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000 40%, transparent 90%);
        }

        /* ─── Ghost analytics ─── */
        .bs-analytics {
          position: absolute; inset: 0; overflow: hidden;
          border-radius: 20px; pointer-events: none; z-index: 0;
        }
        .bsga-area  { animation: bsga-breathe 3.5s ease-in-out infinite; }
        @keyframes bsga-breathe {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        .bsga-line  { animation: bsga-breathe 3.5s ease-in-out infinite; }
        .bs-analytics__label {
          position: absolute; top: 14px; right: 14px;
          display: flex; align-items: center; gap: 8px;
          padding: 6px 10px;
          background: rgba(4,10,22,0.7);
          border: 1px solid rgba(52,211,153,0.25);
          border-radius: 8px; backdrop-filter: blur(8px);
        }
        .bs-analytics__dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 8px #34d399;
          animation: bs-dot-pulse 1.5s ease-in-out infinite;
        }
        @keyframes bs-dot-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bs-console__inner, .bs-analytics__dot, .bsga-area, .bsga-line {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
