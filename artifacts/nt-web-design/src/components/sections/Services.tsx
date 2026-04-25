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
      'Propriété totale de votre code et de vos données.',
    ],
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
      'Full ownership of your code and your data.',
    ],
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
          <div className="ai-schema-nodes" aria-hidden="true" />
        </>
      )}

      {/* Neural mesh for pillar 02 */}
      {pillar.neuralMesh && (
        <>
          <div className="ai-neural-mesh" aria-hidden="true" />
          <svg className="ai-neural-svg" viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g stroke="rgba(167,139,250,0.18)" strokeWidth="0.6" fill="none">
              <line x1="60"  y1="80"  x2="200" y2="160" />
              <line x1="200" y1="160" x2="340" y2="90" />
              <line x1="200" y1="160" x2="100" y2="280" />
              <line x1="200" y1="160" x2="300" y2="280" />
              <line x1="100" y1="280" x2="300" y2="280" />
              <line x1="100" y1="280" x2="80"  y2="400" />
              <line x1="300" y1="280" x2="320" y2="400" />
            </g>
            <g fill="rgba(167,139,250,0.8)">
              <circle cx="60"  cy="80"  r="2.5" className="ai-neural-node" style={{ animationDelay: '0s'   }} />
              <circle cx="200" cy="160" r="3"   className="ai-neural-node" style={{ animationDelay: '0.5s' }} />
              <circle cx="340" cy="90"  r="2.5" className="ai-neural-node" style={{ animationDelay: '1s'   }} />
              <circle cx="100" cy="280" r="2.5" className="ai-neural-node" style={{ animationDelay: '1.5s' }} />
              <circle cx="300" cy="280" r="2.5" className="ai-neural-node" style={{ animationDelay: '2s'   }} />
              <circle cx="80"  cy="400" r="2"   className="ai-neural-node" style={{ animationDelay: '2.5s' }} />
              <circle cx="320" cy="400" r="2"   className="ai-neural-node" style={{ animationDelay: '3s'   }} />
            </g>
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
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 200 }}
          />
          <div style={{ position: 'fixed', inset: 0, zIndex: 201, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', padding: '24px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                pointerEvents: 'all', width: '90vw', maxWidth: '480px',
                background: '#111', border: `1px solid rgba(${pillar.glowA},0.25)`,
                borderRadius: '24px', padding: '40px 36px',
                boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(${pillar.glowA},0.1)`,
                position: 'relative',
              }}
            >
              <button onClick={onClose} style={{ position: 'absolute', top: '18px', right: '22px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                <X size={20} />
              </button>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                  background: `rgba(${pillar.glowA},0.14)`, border: `1px solid rgba(${pillar.glowA},0.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: `rgb(${pillar.glowA})`,
                }}>
                  <pillar.icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `rgba(${pillar.glowA},0.65)`, marginBottom: '5px' }}>
                    {lang === 'fr' ? 'PILIER' : 'PILLAR'} {pillar.id}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em' }}>{pillar.title}</div>
                </div>
              </div>

              {/* Hook */}
              <p style={{ fontSize: '15px', color: `rgba(${pillar.glowA},0.85)`, fontStyle: 'italic', fontWeight: 500, marginBottom: '24px', lineHeight: 1.6 }}>
                {pillar.hook}
              </p>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pillar.bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
                      background: `rgba(${pillar.glowA},0.15)`, border: `1px solid rgba(${pillar.glowA},0.35)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={10} color={`rgb(${pillar.glowA})`} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Line */}
              <div style={{ padding: '14px 18px', borderRadius: '10px', background: `rgba(${pillar.glowA},0.08)`, border: `1px solid rgba(${pillar.glowA},0.18)`, marginBottom: '28px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `rgba(${pillar.glowA},0.6)`, marginBottom: '5px' }}>
                  {pillar.bottomLineLabel}
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: 0 }}>{pillar.bottomLine}</p>
              </div>

              <a href="#contact" onClick={onClose} className="btn-violet"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px 0', fontSize: '14px', fontWeight: 600, borderRadius: '12px', textDecoration: 'none' }}>
                {ctaLabel} <ArrowRight size={15} />
              </a>
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
          z-index: 1;
          filter: blur(2.4px) saturate(1.1); opacity: 0.78;
          transform: perspective(1000px) rotateX(2deg);
          mix-blend-mode: lighten;
        }
        .showreel-col {
          display: flex; flex-direction: column; gap: 10px;
          will-change: transform;
          animation-name: showreel-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .showreel-col:nth-child(2) { margin-top: -28px; }
        @keyframes showreel-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, -50%, 0); }
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
            linear-gradient(rgba(52,211,153,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,0.07) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.45; pointer-events: none; z-index: 0;
          animation: ai-grid-scroll 28s linear infinite;
          mask-image: radial-gradient(ellipse at 50% 60%, #000 30%, transparent 95%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 60%, #000 30%, transparent 95%);
        }
        @keyframes ai-grid-scroll {
          from { background-position: 0 0; }
          to   { background-position: 0 -560px; }
        }
        .ai-schema-nodes {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 14% 22%, rgba(52,211,153,0.55) 0 1.4px, transparent 2px),
            radial-gradient(circle at 78% 18%, rgba(52,211,153,0.55) 0 1.4px, transparent 2px),
            radial-gradient(circle at 30% 64%, rgba(52,211,153,0.55) 0 1.4px, transparent 2px),
            radial-gradient(circle at 70% 78%, rgba(52,211,153,0.55) 0 1.4px, transparent 2px),
            radial-gradient(circle at 50% 42%, rgba(52,211,153,0.55) 0 1.4px, transparent 2px);
          opacity: 0.05; pointer-events: none; z-index: 0;
          animation: ai-grid-scroll 28s linear infinite;
        }

        /* ─── Neural mesh (pillar 02) ───────────────────────── */
        .ai-neural-mesh {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(167,139,250,0.16) 1px, transparent 1.5px);
          background-size: 22px 22px; opacity: 0.55; pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse at 50% 50%, #000 40%, transparent 92%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000 40%, transparent 92%);
        }
        .ai-neural-svg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 0; opacity: 0.8;
        }
        .ai-neural-node {
          transform-box: fill-box; transform-origin: center;
          animation: ai-node-pulse 2.6s ease-in-out infinite;
          filter: drop-shadow(0 0 4px rgba(167,139,250,0.7));
        }
        @keyframes ai-node-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%      { opacity: 1;   transform: scale(1.5); }
        }

        @media (prefers-reduced-motion: reduce) {
          .showreel-col, .showreel-speedlines, .ai-schema-grid, .ai-schema-nodes, .ai-neural-node {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
