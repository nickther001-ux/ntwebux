import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Globe, Cpu, Code2, X, ArrowRight, Check } from 'lucide-react';

/* ─── Showreel image set ─────────────────────────────────── */
import showcase1 from '@assets/image_1776497221120.png';
import showcase2 from '@assets/image_1776497233864.png';
import showcase3 from '@assets/image_1776497254763.png';

const GENERIC_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=520&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=520&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=520&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=520&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=520&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=520&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=520&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=520&q=70&auto=format&fit=crop',
];

const SHOWREEL_IMAGES: string[] = [showcase1, showcase2, showcase3, ...GENERIC_IMAGES];

function pickImages(offset: number, count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(SHOWREEL_IMAGES[(offset + i) % SHOWREEL_IMAGES.length]);
  }
  return out;
}

function ShowreelThumb({ src }: { src: string }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '16 / 10', borderRadius: '6px', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
      flexShrink: 0, background: '#0b1220',
    }}>
      <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none', pointerEvents: 'none' }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }} />
    </div>
  );
}

function ShowreelBackground() {
  const colA = pickImages(0, 6);
  const colB = pickImages(1, 6);
  const colC = pickImages(2, 6);
  const Col = ({ items, dur, delay = 0 }: { items: string[]; dur: number; delay?: number }) => (
    <div className="showreel-col" style={{ animationDuration: `${dur}s`, animationDelay: `${-delay}s` }}>
      {[...items, ...items].map((src, i) => <ShowreelThumb key={i} src={src} />)}
    </div>
  );
  return (
    <div className="showreel" aria-hidden="true">
      <div className="showreel-ambient" />
      <div className="showreel-grid">
        <Col items={colA} dur={5.05} />
        <Col items={colB} dur={3.9} delay={1.2} />
        <Col items={colC} dur={5.85} delay={0.6} />
      </div>
      <div className="showreel-speedlines" />
      <div className="showreel-mask" />
    </div>
  );
}

/* ─── Pillar data types ───────────────────────────────────── */
interface Pillar {
  id: string;
  icon: typeof Globe;
  tag: string;
  title: string;
  hook: string;
  bullets: string[];
  details: string[];           // extra bullets shown only in modal
  deliverableLabel: string;
  deliverables: string[];      // "What's Included" list
  stat: string;                // headline metric
  statLabel: string;
  bottomLine: string;
  bottomLineLabel: string;
  glowA: string;
  glowB: string;
  showreel?: boolean;
  schemaGrid?: boolean;
  neuralMesh?: boolean;
}

const PILLARS_FR: Pillar[] = [
  {
    id: '01',
    icon: Globe,
    tag: 'Fondations Numériques',
    title: 'FONDATIONS NUMÉRIQUES',
    hook: 'Une présence web conçue pour la vitesse et l\'acquisition.',
    bullets: [
      'Vitesse de chargement ultra-rapide (sous la seconde).',
      'Architecture technique optimisée pour dominer le SEO.',
      'Design UX calibré pour convertir les visiteurs en clients.',
    ],
    details: [
      'Design responsive mobile-first sur tous les appareils et résolutions.',
      'Bilingue EN/FR 100 % natif — aucune traduction automatique.',
      'Infrastructure de confidentialité conforme à la Loi 25, incluse dès le départ.',
      'Balisage de données structurées pour les résultats enrichis Google.',
    ],
    deliverableLabel: 'Ce qui est inclus',
    deliverables: [
      'Configuration du domaine personnalisé + DNS',
      'Google Search Console, Analytics & sitemap',
      'Politique de confidentialité + bannière de cookies',
      'Support post-lancement de 30 jours inclus',
    ],
    stat: '72h',
    statLabel: 'délai de livraison moyen',
    bottomLine: 'Pour les entreprises exigeant une vitrine numérique de classe mondiale.',
    bottomLineLabel: 'Pour qui',
    glowA: '34,211,238',
    glowB: '59,130,246',
    showreel: true,
  },
  {
    id: '02',
    icon: Cpu,
    tag: 'Moteurs de Revenus IA',
    title: 'MOTEURS DE REVENUS IA',
    hook: 'Ne perdez plus jamais un lead qualifié.',
    bullets: [
      'Capture et qualification de prospects 24h/7j.',
      'Relances SMS et prise de rendez-vous en moins de 60 secondes.',
      'Automatisation des suivis pour stopper les fuites de revenus.',
    ],
    details: [
      'Moteur d\'avis Google automatique déclenché à la fin de chaque contrat.',
      'Conversations SMS & email bidirectionnelles en temps réel.',
      'CRM multi-pipelines avec score et priorisation des leads.',
      'Séquences de relance WhatsApp et multicanal.',
    ],
    deliverableLabel: 'Ce qui est inclus',
    deliverables: [
      'Onboarding complet du système en moins de 72h',
      'Appel de configuration dédié avec votre équipe',
      'Rapport mensuel de performance et pipeline',
      'Accès à l\'application mobile inclus',
    ],
    stat: '+22 %',
    statLabel: 'de ventes récupérées en moyenne',
    bottomLine: 'Pour les équipes à forte commission (Immobilier, Juridique, Construction).',
    bottomLineLabel: 'Pour qui',
    glowA: '167,139,250',
    glowB: '99,102,241',
    neuralMesh: true,
  },
  {
    id: '03',
    icon: Code2,
    tag: 'SaaS & Systèmes Sur Mesure',
    title: 'SAAS & SYSTÈMES SUR MESURE',
    hook: 'Transformez vos opérations internes en actifs logiciels.',
    bullets: [
      'Développement de plateformes et d\'outils métiers propriétaires.',
      'Infrastructure logicielle privée, sécurisée et hautement évolutive.',
    ],
    details: [
      'Intégrations API avec votre stack technologique existant.',
      'Contrôle d\'accès basé sur les rôles et gestion des utilisateurs.',
      'Infrastructure cloud scalable (AWS / GCP / Vercel).',
      'Maintenance continue et sprints de fonctionnalités disponibles.',
    ],
    deliverableLabel: 'Ce qui est inclus',
    deliverables: [
      'Code source livré dans votre dépôt',
      'Documentation technique complète',
      'Garantie de 90 jours post-lancement',
      'Formation de votre équipe sur la prise en main',
    ],
    stat: '100 %',
    statLabel: 'propriété du code — aucun vendor lock-in',
    bottomLine: 'Pour les startups et PME nécessitant une logique d\'affaires unique.',
    bottomLineLabel: 'Pour qui',
    glowA: '52,211,153',
    glowB: '16,185,129',
    schemaGrid: true,
  },
];

const PILLARS_EN: Pillar[] = [
  {
    id: '01',
    icon: Globe,
    tag: 'Digital Foundations',
    title: 'DIGITAL FOUNDATIONS',
    hook: 'A web presence engineered for speed and acquisition.',
    bullets: [
      'Ultra-fast load times — under one second.',
      'Technical architecture optimized to dominate SEO.',
      'UX design calibrated to convert visitors into clients.',
    ],
    details: [
      'Mobile-first responsive design across every device and resolution.',
      'Bilingual EN/FR built natively — zero machine translation.',
      'Law 25 compliant privacy infrastructure included from day one.',
      'Structured data markup for Google rich snippets and AI overviews.',
    ],
    deliverableLabel: "What's Included",
    deliverables: [
      'Custom domain + DNS configuration',
      'Google Search Console, Analytics & sitemap setup',
      'Privacy policy + cookie consent banner',
      '30-day post-launch support included',
    ],
    stat: '72h',
    statLabel: 'average delivery turnaround',
    bottomLine: 'For businesses demanding a world-class digital storefront.',
    bottomLineLabel: 'Built for',
    glowA: '34,211,238',
    glowB: '59,130,246',
    showreel: true,
  },
  {
    id: '02',
    icon: Cpu,
    tag: 'AI Revenue Engines',
    title: 'AI REVENUE ENGINES',
    hook: 'Never lose a qualified lead again.',
    bullets: [
      '24/7 prospect capture and qualification.',
      'SMS follow-ups and appointment booking in under 60 seconds.',
      'Automated nurture sequences to stop revenue leaks.',
    ],
    details: [
      'Google review request engine triggered at job completion.',
      'Two-way SMS & email conversations in real time.',
      'Multi-pipeline CRM with lead scoring and prioritization.',
      'WhatsApp and multi-channel follow-up sequences.',
    ],
    deliverableLabel: "What's Included",
    deliverables: [
      'Full system onboarded in under 72 hours',
      'Dedicated setup call with your team',
      'Monthly performance & pipeline report',
      'Mobile app access included',
    ],
    stat: '+22%',
    statLabel: 'avg. closed deals recovered',
    bottomLine: 'For high-commission teams — Real Estate, Legal, Construction.',
    bottomLineLabel: 'Built for',
    glowA: '167,139,250',
    glowB: '99,102,241',
    neuralMesh: true,
  },
  {
    id: '03',
    icon: Code2,
    tag: 'SaaS & Custom Systems',
    title: 'SAAS & CUSTOM SYSTEMS',
    hook: 'Turn your internal operations into software assets.',
    bullets: [
      'Development of proprietary platforms and business tools.',
      'Private, secure, and highly scalable software infrastructure.',
    ],
    details: [
      'API integrations with your existing technology stack.',
      'Role-based access control and user management.',
      'Scalable cloud infrastructure (AWS / GCP / Vercel).',
      'Ongoing maintenance retainer and feature sprints available.',
    ],
    deliverableLabel: "What's Included",
    deliverables: [
      'Source code delivered to your repository',
      'Full technical documentation',
      '90-day post-launch warranty on all custom builds',
      'Team onboarding and handover session',
    ],
    stat: '100%',
    statLabel: 'code ownership — zero vendor lock-in',
    bottomLine: 'For startups and SMEs requiring unique business logic.',
    bottomLineLabel: 'Built for',
    glowA: '52,211,153',
    glowB: '16,185,129',
    schemaGrid: true,
  },
];

/* ─── Pillar Card ─────────────────────────────────────────── */
function PillarCard({ pillar, index, ctaLabel, onClick }: {
  pillar: Pillar;
  index: number;
  ctaLabel: string;
  onClick: () => void;
}) {
  const isFirst = index === 0;
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="pillar-card"
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: '0',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        minHeight: isFirst ? '520px' : '460px',
        width: '100%',
      }}
    >
      {/* Showreel background for pillar 01 */}
      {pillar.showreel && <ShowreelBackground />}

      {/* Schema grid background for pillar 03 */}
      {pillar.schemaGrid && (
        <>
          <div className="ai-schema-grid" aria-hidden="true" />
          <svg className="ai-schema-svg" viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="sg-line-h" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%"   stopColor="#34d399" stopOpacity="0"/>
                <stop offset="40%"  stopColor="#34d399" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg-line-v" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%"   stopColor="#34d399" stopOpacity="0"/>
                <stop offset="40%"  stopColor="#34d399" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
              </linearGradient>
              <filter id="sg-glow"><feGaussianBlur stdDeviation="3"/></filter>
            </defs>

            {/* Horizontal scan lines that sweep down */}
            <rect x="0" y="0" width="400" height="1.5" fill="url(#sg-line-h)" className="ai-schema-scan-h" />
            <rect x="0" y="0" width="400" height="1.5" fill="url(#sg-line-h)" className="ai-schema-scan-h" style={{ animationDelay: '-1.6s' }} />

            {/* Vertical scan line sweeping right */}
            <rect x="0" y="0" width="1.5" height="460" fill="url(#sg-line-v)" className="ai-schema-scan-v" />

            {/* Connection nodes — glowing dots at grid intersections */}
            {([
              [84,92],[168,92],[252,92],[336,92],
              [84,184],[252,184],
              [168,276],[336,276],
              [84,368],[252,368],
            ] as [number,number][]).map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="8" fill="rgba(52,211,153,0.06)" filter="url(#sg-glow)" className="ai-schema-node-ring" style={{ animationDelay: `${i * 0.3}s` }} />
                <circle cx={cx} cy={cy} r="2.5" fill="#34d399" className="ai-schema-node-dot" style={{ animationDelay: `${i * 0.3}s` }} />
              </g>
            ))}

            {/* Horizontal connector lines */}
            <line x1="84"  y1="92"  x2="336" y2="92"  stroke="rgba(52,211,153,0.18)" strokeWidth="0.6" strokeDasharray="4 8" />
            <line x1="84"  y1="184" x2="252" y2="184" stroke="rgba(52,211,153,0.18)" strokeWidth="0.6" strokeDasharray="4 8" />
            <line x1="168" y1="276" x2="336" y2="276" stroke="rgba(52,211,153,0.18)" strokeWidth="0.6" strokeDasharray="4 8" />
            <line x1="84"  y1="368" x2="252" y2="368" stroke="rgba(52,211,153,0.18)" strokeWidth="0.6" strokeDasharray="4 8" />
            {/* Vertical connector lines */}
            <line x1="84"  y1="92"  x2="84"  y2="368" stroke="rgba(52,211,153,0.12)" strokeWidth="0.6" strokeDasharray="4 12" />
            <line x1="252" y1="92"  x2="252" y2="368" stroke="rgba(52,211,153,0.12)" strokeWidth="0.6" strokeDasharray="4 12" />
            <line x1="168" y1="92"  x2="168" y2="276" stroke="rgba(52,211,153,0.12)" strokeWidth="0.6" strokeDasharray="4 12" />
            <line x1="336" y1="92"  x2="336" y2="276" stroke="rgba(52,211,153,0.12)" strokeWidth="0.6" strokeDasharray="4 12" />
          </svg>
        </>
      )}

      {/* Neural mesh for pillar 02 */}
      {pillar.neuralMesh && (
        <>
          <div className="ai-neural-mesh" aria-hidden="true" />
          <svg className="ai-neural-svg" viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="nm-node-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#a78bfa" stopOpacity="1" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </radialGradient>
              <filter id="nm-blur"><feGaussianBlur stdDeviation="2.5"/></filter>
            </defs>

            {/* Edges */}
            <g stroke="rgba(167,139,250,0.30)" strokeWidth="0.8" fill="none">
              <line x1="60"  y1="80"  x2="200" y2="160" />
              <line x1="200" y1="160" x2="340" y2="90"  />
              <line x1="200" y1="160" x2="100" y2="280" />
              <line x1="200" y1="160" x2="300" y2="280" />
              <line x1="100" y1="280" x2="300" y2="280" />
              <line x1="100" y1="280" x2="80"  y2="400" />
              <line x1="300" y1="280" x2="320" y2="400" />
              <line x1="60"  y1="80"  x2="340" y2="90"  />
              <line x1="80"  y1="400" x2="320" y2="400" />
            </g>

            {/* Animated data packets along edges */}
            <circle r="3" fill="#c4b5fd">
              <animateMotion dur="2.4s" repeatCount="indefinite" begin="0s">
                <mpath xlinkHref="#nm-path-1"/>
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" begin="0s"/>
            </circle>
            <circle r="3" fill="#818cf8">
              <animateMotion dur="2.0s" repeatCount="indefinite" begin="0.8s">
                <mpath xlinkHref="#nm-path-2"/>
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.0s" repeatCount="indefinite" begin="0.8s"/>
            </circle>
            <circle r="2.5" fill="#a78bfa">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s">
                <mpath xlinkHref="#nm-path-3"/>
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" begin="1.4s"/>
            </circle>
            <circle r="2.5" fill="#c4b5fd">
              <animateMotion dur="1.9s" repeatCount="indefinite" begin="0.3s">
                <mpath xlinkHref="#nm-path-4"/>
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.9s" repeatCount="indefinite" begin="0.3s"/>
            </circle>

            {/* Hidden paths for packet motion */}
            <path id="nm-path-1" d="M60,80 L200,160 L300,280" fill="none" />
            <path id="nm-path-2" d="M340,90 L200,160 L100,280 L80,400" fill="none" />
            <path id="nm-path-3" d="M200,160 L300,280 L320,400" fill="none" />
            <path id="nm-path-4" d="M100,280 L300,280 L320,400" fill="none" />

            {/* Node glow rings */}
            <circle cx="200" cy="160" r="14" fill="rgba(167,139,250,0.08)" className="ai-neural-ring" style={{ animationDelay: '0s' }} />
            <circle cx="100" cy="280" r="10" fill="rgba(167,139,250,0.08)" className="ai-neural-ring" style={{ animationDelay: '0.7s' }} />
            <circle cx="300" cy="280" r="10" fill="rgba(167,139,250,0.08)" className="ai-neural-ring" style={{ animationDelay: '1.4s' }} />

            {/* Nodes */}
            <circle cx="60"  cy="80"  r="3"   fill="#a78bfa" className="ai-neural-node" style={{ animationDelay: '0s'   }} />
            <circle cx="200" cy="160" r="4.5" fill="#c4b5fd" className="ai-neural-node" style={{ animationDelay: '0.4s' }} />
            <circle cx="340" cy="90"  r="3"   fill="#a78bfa" className="ai-neural-node" style={{ animationDelay: '0.9s' }} />
            <circle cx="100" cy="280" r="3.5" fill="#a78bfa" className="ai-neural-node" style={{ animationDelay: '1.3s' }} />
            <circle cx="300" cy="280" r="3.5" fill="#a78bfa" className="ai-neural-node" style={{ animationDelay: '1.8s' }} />
            <circle cx="80"  cy="400" r="2.5" fill="#818cf8" className="ai-neural-node" style={{ animationDelay: '2.2s' }} />
            <circle cx="320" cy="400" r="2.5" fill="#818cf8" className="ai-neural-node" style={{ animationDelay: '2.7s' }} />

            {/* Node halos (blur layer) */}
            <circle cx="200" cy="160" r="6" fill="url(#nm-node-glow)" filter="url(#nm-blur)" opacity="0.7" />
            <circle cx="100" cy="280" r="5" fill="url(#nm-node-glow)" filter="url(#nm-blur)" opacity="0.5" />
            <circle cx="300" cy="280" r="5" fill="url(#nm-node-glow)" filter="url(#nm-blur)" opacity="0.5" />
          </svg>
        </>
      )}

      {/* Ambient radial glow top-left */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0,
        width: '260px', height: '260px',
        background: `radial-gradient(circle, rgba(${pillar.glowA},0.22) 0%, rgba(${pillar.glowA},0) 65%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 36px 36px' }}>

        {/* Top row: number + icon + tag */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
              background: `rgba(${pillar.glowA},0.12)`,
              border: `1px solid rgba(${pillar.glowA},0.25)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: `rgb(${pillar.glowA})`,
            }}>
              <pillar.icon size={22} />
            </div>
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: `rgba(${pillar.glowA},0.8)`,
            }}>{pillar.tag}</span>
          </div>
          <span style={{
            fontSize: '52px', fontWeight: 800,
            color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em', lineHeight: 1,
          }}>{pillar.id}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '14px',
        }}>{pillar.title}</h3>

        {/* Hook */}
        <p style={{
          fontSize: '15px',
          color: `rgba(${pillar.glowA},0.9)`,
          fontWeight: 500,
          lineHeight: 1.6,
          marginBottom: '28px',
          fontStyle: 'italic',
        }}>{pillar.hook}</p>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pillar.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                background: `rgba(${pillar.glowA},0.15)`,
                border: `1px solid rgba(${pillar.glowA},0.35)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={10} color={`rgb(${pillar.glowA})`} strokeWidth={3} />
              </div>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{b}</span>
            </li>
          ))}
        </ul>

        {/* Bottom Line */}
        <div style={{
          marginTop: '32px',
          padding: '16px 20px',
          borderRadius: '12px',
          background: `rgba(${pillar.glowA},0.07)`,
          border: `1px solid rgba(${pillar.glowA},0.18)`,
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `rgba(${pillar.glowA},0.6)`, marginBottom: '6px' }}>
            {pillar.bottomLineLabel}
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: 0 }}>
            {pillar.bottomLine}
          </p>
        </div>

        {/* Learn more */}
        <div style={{ marginTop: '24px', fontSize: '13px', color: `rgb(${pillar.glowA})`, fontWeight: 600, letterSpacing: '0.02em', opacity: 0.85 }}>
          {ctaLabel}
        </div>
      </div>
    </motion.button>
  );
}

/* ─── Modal ───────────────────────────────────────────────── */
function BulletItem({ text, color }: { text: string; color: string }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
        background: `rgba(${color},0.15)`, border: `1px solid rgba(${color},0.35)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Check size={10} color={`rgb(${color})`} strokeWidth={3} />
      </div>
      <span style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>{text}</span>
    </li>
  );
}

function PillarModal({ pillar, ctaLabel, onClose, lang }: {
  pillar: Pillar;
  ctaLabel: string;
  onClose: () => void;
  lang: string;
}) {
  return (
    <AnimatePresence>
      {pillar && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(10px)', zIndex: 200 }}
          />
          <div style={{ position: 'fixed', inset: 0, zIndex: 201, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', padding: '20px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                pointerEvents: 'all', width: '90vw', maxWidth: '560px',
                maxHeight: '90vh', overflowY: 'auto',
                background: 'linear-gradient(160deg, #0e1422 0%, #0a0f1a 100%)',
                border: `1px solid rgba(${pillar.glowA},0.28)`,
                borderRadius: '24px',
                boxShadow: `0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(${pillar.glowA},0.1), inset 0 1px 0 rgba(255,255,255,0.05)`,
                position: 'relative',
                scrollbarWidth: 'none',
              }}
            >
              {/* Ambient glow top-left */}
              <div aria-hidden style={{
                position: 'absolute', top: 0, left: 0, width: '280px', height: '280px', pointerEvents: 'none', borderRadius: '24px',
                background: `radial-gradient(circle, rgba(${pillar.glowA},0.14) 0%, rgba(${pillar.glowA},0) 70%)`,
                filter: 'blur(32px)',
              }} />

              <div style={{ padding: '36px 36px 32px', position: 'relative' }}>

                {/* Close */}
                <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '24px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}>
                  <X size={16} />
                </button>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                    background: `rgba(${pillar.glowA},0.14)`, border: `1px solid rgba(${pillar.glowA},0.3)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: `rgb(${pillar.glowA})`,
                  }}>
                    <pillar.icon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `rgba(${pillar.glowA},0.65)`, marginBottom: '4px' }}>
                      {lang === 'fr' ? 'PILIER' : 'PILLAR'} {pillar.id}
                    </div>
                    <div style={{ fontSize: '19px', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.2 }}>{pillar.title}</div>
                  </div>
                </div>

                {/* Hook */}
                <p style={{ fontSize: '14.5px', color: `rgba(${pillar.glowA},0.85)`, fontStyle: 'italic', fontWeight: 500, marginBottom: '22px', lineHeight: 1.6 }}>
                  {pillar.hook}
                </p>

                {/* All bullets (core + details) */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[...pillar.bullets, ...pillar.details].map((b, i) => (
                    <BulletItem key={i} text={b} color={pillar.glowA} />
                  ))}
                </ul>

                {/* Divider */}
                <div style={{ height: '1px', background: `rgba(${pillar.glowA},0.12)`, margin: '22px 0' }} />

                {/* Stat badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
                  <span style={{
                    fontSize: '28px', fontWeight: 800, color: `rgb(${pillar.glowA})`,
                    letterSpacing: '-0.04em', lineHeight: 1,
                    textShadow: `0 0 24px rgba(${pillar.glowA},0.5)`,
                  }}>{pillar.stat}</span>
                  <span style={{ fontSize: '12px', color: `rgba(${pillar.glowA},0.65)`, fontWeight: 600, lineHeight: 1.4 }}>
                    {pillar.statLabel}
                  </span>
                </div>

                {/* What's Included */}
                <div style={{ padding: '18px 20px', borderRadius: '14px', background: `rgba(${pillar.glowA},0.06)`, border: `1px solid rgba(${pillar.glowA},0.16)`, marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `rgba(${pillar.glowA},0.7)`, marginBottom: '12px' }}>
                    {pillar.deliverableLabel}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pillar.deliverables.map((d, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0, background: `rgb(${pillar.glowA})`, opacity: 0.7 }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Built for */}
                <div style={{ padding: '14px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '24px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '5px' }}>
                    {pillar.bottomLineLabel}
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, margin: 0 }}>{pillar.bottomLine}</p>
                </div>

                <a href="#contact" onClick={onClose} className="btn-violet"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px 0', fontSize: '14px', fontWeight: 600, borderRadius: '12px', textDecoration: 'none' }}>
                  {ctaLabel} <ArrowRight size={15} />
                </a>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */
export function Services() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<Pillar | null>(null);
  const pillars = lang === 'fr' ? PILLARS_FR : PILLARS_EN;

  const eyebrow  = lang === 'fr' ? 'Notre Expertise'       : 'Our Expertise';
  const ctaQuote = lang === 'fr' ? 'Obtenir un Devis Gratuit' : 'Get a Free Quote';
  const learnMore = lang === 'fr' ? 'En savoir plus →'     : 'Learn more →';
  const notSure   = lang === 'fr' ? 'Pas sûr de ce dont vous avez besoin ?' : 'Not sure what you need?';
  const heading   = lang === 'fr'
    ? <><span className="gradient-text">Trois piliers.</span><br />Une infrastructure revenue.</>
    : <><span className="gradient-text">Three pillars.</span><br />One revenue infrastructure.</>;

  return (
    <section id="services" style={{ width: '100%', padding: '0 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>{eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.15, marginTop: '16px', letterSpacing: '-0.03em' }}>
            {heading}
          </h2>
        </motion.div>

        {/* Three-pillar grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }} className="pillars-grid">
          {pillars.map((pillar, i) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={i}
              ctaLabel={learnMore}
              onClick={() => setActive(pillar)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>{notSure}</p>
          <a href="#contact" className="btn-violet"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', fontSize: '14px', fontWeight: 600, borderRadius: '10px', textDecoration: 'none' }}>
            {ctaQuote} <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Modal */}
      {active && (
        <PillarModal pillar={active} ctaLabel={ctaQuote} onClose={() => setActive(null)} lang={lang} />
      )}

      <style>{`
        /* ─── Pillar card hover ─────────────────────────────── */
        .pillar-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s; }
        .pillar-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(96,165,250,0.55), rgba(167,139,250,0.35) 40%, rgba(96,165,250,0) 80%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease-out;
          pointer-events: none;
        }
        .pillar-card:hover { transform: translateY(-4px); }
        .pillar-card:hover::before { opacity: 1; }

        /* ─── Responsive: tablet → stack 2, mobile → 1 ─────── */
        @media (max-width: 960px) {
          .pillars-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }

        /* ─── Mobile: lift compositing constraints ───────────
           backdrop-filter on the card creates a stacking context
           that traps children and prevents GPU layer promotion.
           Remove it on mobile so animations can run freely.    */
        @media (max-width: 768px) {
          .pillar-card {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        }

        /* ─── Digital Showreel ──────────────────────────────── */
        .showreel {
          position: absolute; inset: 0; overflow: hidden; border-radius: 24px; z-index: 0; pointer-events: none;
        }
        .showreel-ambient {
          position: absolute; inset: -10%;
          background:
            radial-gradient(60% 50% at 30% 30%, rgba(34,211,238,0.18), transparent 70%),
            radial-gradient(55% 55% at 75% 65%, rgba(59,130,246,0.20), transparent 70%);
          filter: blur(36px); z-index: 0;
        }
        .showreel-grid {
          position: absolute; inset: 0;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 12px;
          z-index: 1; opacity: 0.78;
          /* Desktop only: decorative 3D + blend — omitted on mobile to
             avoid trapping child GPU layers in a shared compositing surface */
        }
        @media (min-width: 769px) {
          .showreel-grid {
            filter: blur(2px) saturate(1.1);
            mix-blend-mode: lighten;
            transform: perspective(1000px) rotateX(2deg);
          }
        }
        .showreel-col {
          display: flex; flex-direction: column; gap: 10px;
          /* translateZ(0) promotes each column to its own GPU layer
             so the browser doesn't need to rasterize all three together */
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          animation-name: showreel-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          -webkit-animation-name: showreel-scroll;
          -webkit-animation-timing-function: linear;
          -webkit-animation-iteration-count: infinite;
        }
        .showreel-col:nth-child(2) { margin-top: -28px; }
        @keyframes showreel-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, -50%, 0); }
        }
        @-webkit-keyframes showreel-scroll {
          from { -webkit-transform: translate3d(0, 0, 0); }
          to   { -webkit-transform: translate3d(0, -50%, 0); }
        }
        .showreel-speedlines {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0) 0px, rgba(255,255,255,0) 14px,
            rgba(255,255,255,0.045) 14px, rgba(255,255,255,0.045) 16px
          );
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.7) 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.7) 70%, transparent 100%);
          animation: showreel-streaks 0.47s linear infinite;
        }
        @keyframes showreel-streaks {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, -16px, 0); }
        }
        .showreel-mask {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background:
            linear-gradient(180deg,
              rgba(2,4,10,0.55) 0%, rgba(2,4,10,0.20) 30%,
              rgba(2,4,10,0.65) 70%, rgba(2,4,10,0.95) 100%
            ),
            radial-gradient(ellipse at 0% 100%, rgba(2,4,10,0.85), transparent 55%);
        }

        /* ─── Schema grid (pillar 03) ───────────────────────── */
        .ai-schema-grid {
          position: absolute; inset: -2px;
          background-image:
            linear-gradient(rgba(52,211,153,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,0.10) 1px, transparent 1px);
          background-size: 84px 92px; opacity: 0.6; pointer-events: none; z-index: 0;
          will-change: background-position;
          animation: ai-grid-scroll 24s linear infinite;
          mask-image: radial-gradient(ellipse at 50% 45%, #000 50%, transparent 95%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 45%, #000 50%, transparent 95%);
        }
        @keyframes ai-grid-scroll {
          from { background-position: 0 0; }
          to   { background-position: 0 -368px; }
        }
        .ai-schema-svg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 1; opacity: 0.9;
          transform: translateZ(0); -webkit-transform: translateZ(0);
        }
        .ai-schema-scan-h {
          animation: sg-sweep-down 3.2s ease-in-out infinite;
          -webkit-animation: sg-sweep-down 3.2s ease-in-out infinite;
        }
        @keyframes sg-sweep-down {
          0%   { transform: translateY(0);     opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(460px); opacity: 0; }
        }
        @-webkit-keyframes sg-sweep-down {
          0%   { -webkit-transform: translateY(0);     opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { -webkit-transform: translateY(460px); opacity: 0; }
        }
        .ai-schema-scan-v {
          animation: sg-sweep-right 4.5s ease-in-out infinite;
          -webkit-animation: sg-sweep-right 4.5s ease-in-out infinite;
        }
        @keyframes sg-sweep-right {
          0%   { transform: translateX(0);     opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(400px); opacity: 0; }
        }
        @-webkit-keyframes sg-sweep-right {
          0%   { -webkit-transform: translateX(0);     opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { -webkit-transform: translateX(400px); opacity: 0; }
        }
        .ai-schema-node-ring {
          transform-box: fill-box; -webkit-transform-box: fill-box;
          transform-origin: center;
          animation: sg-ring-pulse 2.8s ease-in-out infinite;
          -webkit-animation: sg-ring-pulse 2.8s ease-in-out infinite;
        }
        .ai-schema-node-dot {
          transform-box: fill-box; -webkit-transform-box: fill-box;
          transform-origin: center;
          animation: sg-dot-pulse 2.8s ease-in-out infinite;
          -webkit-animation: sg-dot-pulse 2.8s ease-in-out infinite;
          filter: drop-shadow(0 0 5px rgba(52,211,153,0.9));
        }
        @keyframes sg-ring-pulse {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%      { opacity: 0.5;  transform: scale(1.6); }
        }
        @-webkit-keyframes sg-ring-pulse {
          0%, 100% { opacity: 0.15; -webkit-transform: scale(0.8); }
          50%      { opacity: 0.5;  -webkit-transform: scale(1.6); }
        }
        @keyframes sg-dot-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.75); }
          50%      { opacity: 1;    transform: scale(1.3); }
        }
        @-webkit-keyframes sg-dot-pulse {
          0%, 100% { opacity: 0.35; -webkit-transform: scale(0.75); }
          50%      { opacity: 1;    -webkit-transform: scale(1.3); }
        }

        /* ─── Neural mesh (pillar 02) ───────────────────────── */
        .ai-neural-mesh {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(167,139,250,0.20) 1px, transparent 1.5px);
          background-size: 22px 22px; opacity: 0.65; pointer-events: none; z-index: 0;
          will-change: background-position;
          animation: nm-mesh-drift 12s ease-in-out infinite alternate;
          -webkit-animation: nm-mesh-drift 12s ease-in-out infinite alternate;
          mask-image: radial-gradient(ellipse at 50% 50%, #000 55%, transparent 95%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000 55%, transparent 95%);
        }
        @keyframes nm-mesh-drift {
          from { background-position: 0 0; }
          to   { background-position: 22px 22px; }
        }
        @-webkit-keyframes nm-mesh-drift {
          from { background-position: 0 0; }
          to   { background-position: 22px 22px; }
        }
        .ai-neural-svg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 1; opacity: 1;
          transform: translateZ(0); -webkit-transform: translateZ(0);
        }
        .ai-neural-node {
          transform-box: fill-box; -webkit-transform-box: fill-box;
          transform-origin: center;
          animation: ai-node-pulse 2.6s ease-in-out infinite;
          -webkit-animation: ai-node-pulse 2.6s ease-in-out infinite;
          filter: drop-shadow(0 0 6px rgba(167,139,250,0.9));
        }
        @keyframes ai-node-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50%      { opacity: 1;   transform: scale(1.5); }
        }
        @-webkit-keyframes ai-node-pulse {
          0%, 100% { opacity: 0.4; -webkit-transform: scale(0.85); }
          50%      { opacity: 1;   -webkit-transform: scale(1.5); }
        }
        .ai-neural-ring {
          transform-box: fill-box; -webkit-transform-box: fill-box;
          transform-origin: center;
          animation: nm-ring-expand 2.8s ease-out infinite;
          -webkit-animation: nm-ring-expand 2.8s ease-out infinite;
        }
        @keyframes nm-ring-expand {
          0%   { opacity: 0.5; transform: scale(0.8); }
          70%  { opacity: 0;   transform: scale(2.4); }
          100% { opacity: 0;   transform: scale(2.4); }
        }
        @-webkit-keyframes nm-ring-expand {
          0%   { opacity: 0.5; -webkit-transform: scale(0.8); }
          70%  { opacity: 0;   -webkit-transform: scale(2.4); }
          100% { opacity: 0;   -webkit-transform: scale(2.4); }
        }

        @media (prefers-reduced-motion: reduce) {
          .showreel-col, .showreel-speedlines,
          .ai-schema-grid, .ai-schema-scan-h, .ai-schema-scan-v,
          .ai-schema-node-ring, .ai-schema-node-dot,
          .ai-neural-mesh, .ai-neural-node, .ai-neural-ring {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
