import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Layout, ShoppingCart, Search, Wrench, Zap, Database, Bot, Building2, X, ArrowRight, Globe, Cpu } from 'lucide-react';

type Cluster = 'foundations' | 'ai';
type Span = 'sm' | 'md' | 'lg' | 'tall';

type GlowColor = 'blue' | 'purple' | 'cyan' | 'amber' | 'emerald' | 'rose';

interface Service {
  icon: typeof Layout;
  title: string;
  short: string;
  desc: string;
  id: string;
  cluster: Cluster;
  span: Span;
  badges?: string[];
  glow?: GlowColor;
}

const SERVICES_EN: Service[] = [
  { icon: Layout,       title: 'Website Design',        short: 'High-performance, bespoke digital experiences engineered for conversion. We combine world-class aesthetics with the technical precision of a Silicon Valley startup to ensure your brand stands out in any market.',
                                                          desc: 'High-performance, bespoke digital experiences engineered for conversion. We combine world-class aesthetics with the technical precision of a Silicon Valley startup to ensure your brand stands out in any market — from Montréal to Manhattan to Singapore.', id: '01', cluster: 'foundations', span: 'lg', glow: 'blue',     badges: ['Figma', 'Framer Motion', 'Conversion-First'] },
  { icon: Zap,          title: 'Development',           short: 'Lightning-fast frameworks, scalable & secure.',              desc: 'Custom web development using modern, lightning-fast frameworks. Scalable architectures optimized for speed and security — built to perform flawlessly on every device.', id: '02', cluster: 'foundations', span: 'md', glow: 'blue',     badges: ['Next.js', 'Tailwind'] },
  { icon: ShoppingCart, title: 'eCommerce',             short: 'High-conversion stores with seamless payments.',             desc: 'Secure online stores with high-end payment integrations and inventory management. We build eCommerce solutions that make buying effortless and selling more profitable.', id: '03', cluster: 'foundations', span: 'sm', glow: 'purple',   badges: ['Stripe', 'Shopify'] },
  { icon: Database,     title: 'CMS Integration',       short: 'Take full control — no code needed.',                        desc: 'Take full control of your website. Intuitive CMS integration lets you easily update text, manage blogs, and upload images without touching a single line of code.', id: '04', cluster: 'foundations', span: 'sm', glow: 'cyan',     badges: ['Headless', 'Sanity'] },
  { icon: Search,       title: 'SEO & Marketing',       short: 'Rank where it matters. Be found.',                           desc: 'Ranking you where it matters. Technical SEO, keyword strategy, and performance optimization included — so the right people find you at exactly the right moment.', id: '05', cluster: 'foundations', span: 'md', glow: 'emerald',  badges: ['Google Core Web Vitals'] },
  { icon: Wrench,       title: 'Maintenance & Support', short: 'Peace of mind — we handle the rest.',                        desc: 'Enjoy peace of mind with our dedicated support. Monthly security updates, daily cloud backups, bug fixes, and 24/7 uptime monitoring so your site never goes down.', id: '06', cluster: 'foundations', span: 'md', glow: 'amber',    badges: ['24/7 Uptime', 'Daily Backups'] },
  { icon: Building2,    title: 'Enterprise SaaS',       short: 'Multi-tenant cloud apps at scale.',                          desc: 'Scalable, multi-tenant cloud applications engineered for high performance. We architect and build enterprise-grade SaaS platforms ready to handle thousands of concurrent users.', id: '07', cluster: 'ai',          span: 'tall', glow: 'blue',   badges: ['Multi-tenant', 'Postgres'] },
  { icon: Bot,          title: 'AI Integrations',       short: 'Smart automation that drives conversions.',                  desc: 'Supercharge your business with custom AI solutions. Smart chatbots, automated customer service workflows, and advanced AI agents tailored to save you time and drive conversions.', id: '08', cluster: 'ai',          span: 'tall', glow: 'purple', badges: ['GPT-4', 'Claude', 'Gemini'] },
];

const SERVICES_FR: Service[] = [
  { icon: Layout,       title: 'Design Web',            short: 'Expériences numériques sur mesure, hautes performances, conçues pour la conversion. Nous allions une esthétique de calibre mondial à la précision technique d\'une startup de la Silicon Valley pour que votre marque se démarque sur n\'importe quel marché.',
                                                          desc: 'Expériences numériques sur mesure, hautes performances, conçues pour la conversion. Nous allions une esthétique de calibre mondial à la précision technique d\'une startup de la Silicon Valley pour que votre marque se démarque sur n\'importe quel marché — de Montréal à Manhattan en passant par Singapour.', id: '01', cluster: 'foundations', span: 'lg', glow: 'blue',     badges: ['Figma', 'Framer Motion', 'Axé Conversion'] },
  { icon: Zap,          title: 'Développement',         short: 'Frameworks rapides, scalable et sécurisé.',  desc: 'Développement web sur mesure avec des frameworks modernes ultra-rapides. Architectures scalables optimisées pour la vitesse et la sécurité.', id: '02', cluster: 'foundations', span: 'md', glow: 'blue',     badges: ['Next.js', 'Tailwind'] },
  { icon: ShoppingCart, title: 'eCommerce',             short: 'Boutiques à haute conversion.',              desc: "Boutiques en ligne sécurisées avec intégrations de paiement haut de gamme et gestion des stocks. Nous construisons des solutions qui rendent l'achat facile.", id: '03', cluster: 'foundations', span: 'sm', glow: 'purple',   badges: ['Stripe', 'Shopify'] },
  { icon: Database,     title: 'Intégration CMS',       short: 'Contrôle total, sans code.',                 desc: "Prenez le contrôle de votre site. L'intégration CMS intuitive vous permet de mettre à jour le contenu, gérer les blogs et télécharger des images sans toucher au code.", id: '04', cluster: 'foundations', span: 'sm', glow: 'cyan',     badges: ['Headless', 'Sanity'] },
  { icon: Search,       title: 'SEO & Marketing',       short: 'Classez-vous là où ça compte.',              desc: 'Positionnement là où ça compte. SEO technique, stratégie de mots-clés et optimisation des performances inclus pour attirer exactement les bons clients.', id: '05', cluster: 'foundations', span: 'md', glow: 'emerald',  badges: ['Google Core Web Vitals'] },
  { icon: Wrench,       title: 'Maintenance & Support', short: "Tranquillité d'esprit garantie.",            desc: "Tranquillité d'esprit avec notre support dédié. Mises à jour de sécurité mensuelles, sauvegardes quotidiennes, corrections de bugs et surveillance 24/7.", id: '06', cluster: 'foundations', span: 'md', glow: 'amber',    badges: ['Surveillance 24/7', 'Sauvegardes'] },
  { icon: Building2,    title: 'SaaS Entreprise',       short: 'Applications cloud multi-tenant.',           desc: 'Applications cloud scalables et multi-tenant conçues pour la haute performance. Nous architecturons des plateformes SaaS de niveau entreprise.', id: '07', cluster: 'ai',          span: 'tall', glow: 'blue',   badges: ['Multi-tenant', 'Postgres'] },
  { icon: Bot,          title: 'Intégrations IA',       short: 'Automatisation intelligente.',               desc: 'Boostez votre entreprise avec des solutions IA sur mesure. Chatbots intelligents, workflows automatisés et agents IA avancés pour gagner du temps et augmenter les conversions.', id: '08', cluster: 'ai',          span: 'tall', glow: 'purple', badges: ['GPT-4', 'Claude', 'Gemini'] },
];

const GLOW_RGB: Record<GlowColor, string> = {
  blue:    '59,130,246',
  purple:  '167,139,250',
  cyan:    '34,211,238',
  amber:   '251,191,36',
  emerald: '52,211,153',
  rose:    '244,114,182',
};

const SPAN_STYLE: Record<Span, React.CSSProperties> = {
  sm:   { gridColumn: 'span 3', minHeight: '220px' },
  md:   { gridColumn: 'span 3', minHeight: '220px' },
  lg:   { gridColumn: 'span 6', gridRow: 'span 2', minHeight: '460px' },
  tall: { gridColumn: 'span 6', minHeight: '300px' },
};

interface BentoCardProps {
  s: Service;
  i: number;
  learnMore: string;
  liveBadge: string;
  onClick: () => void;
}

/* ─── Mini-site thumbnail presets ────────────────────────── */
type ThumbKind = 'ecom' | 'saas' | 'consult' | 'brand' | 'agency' | 'editorial';

function MiniSite({ kind }: { kind: ThumbKind }) {
  const wrap: React.CSSProperties = {
    width: '100%',
    aspectRatio: '4 / 3',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  };

  switch (kind) {
    case 'ecom':
      return (
        <div style={{ ...wrap, background: '#fafaf9' }}>
          <div style={{ height: '14%', background: '#1c1917', display: 'flex', alignItems: 'center', padding: '0 5px', gap: '3px' }}>
            <div style={{ width: 14, height: 4, background: '#fff', borderRadius: 1 }} />
            <div style={{ marginLeft: 'auto', width: 16, height: 4, background: '#f97316', borderRadius: 1 }} />
          </div>
          <div style={{ flex: 1, padding: '5px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '4px' }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{ background: i % 2 ? '#e7e5e4' : '#d6d3d1', borderRadius: 3 }} />
            ))}
          </div>
        </div>
      );
    case 'saas':
      return (
        <div style={{ ...wrap, background: '#0b1220' }}>
          <div style={{ height: '12%', background: '#0f172a', display: 'flex', alignItems: 'center', padding: '0 5px', gap: '3px' }}>
            <div style={{ width: 5, height: 5, background: '#3b82f6', borderRadius: '50%' }} />
            <div style={{ width: 18, height: 3, background: '#475569', borderRadius: 1 }} />
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: '22%', background: '#0f172a', borderRight: '1px solid #1e293b', padding: '4px 3px', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 3, background: '#334155', borderRadius: 1 }} />
              <div style={{ height: 3, background: '#1e40af', borderRadius: 1 }} />
              <div style={{ height: 3, background: '#334155', borderRadius: 1 }} />
              <div style={{ height: 3, background: '#334155', borderRadius: 1 }} />
            </div>
            <div style={{ flex: 1, padding: '5px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                <div style={{ flex: 1, height: 8, background: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', borderRadius: 2 }} />
                <div style={{ flex: 1, height: 8, background: 'linear-gradient(135deg,#5b21b6,#8b5cf6)', borderRadius: 2 }} />
              </div>
              <div style={{ flex: 1, background: '#0f172a', borderRadius: 2, display: 'flex', alignItems: 'flex-end', padding: '0 3px 3px', gap: 2 }}>
                {[6,9,4,11,7,5,10,8].map((h,i) => (
                  <div key={i} style={{ flex: 1, height: `${h*4}%`, background: i === 3 ? '#3b82f6' : '#1e40af', borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case 'consult':
      return (
        <div style={{ ...wrap, background: '#fffbeb' }}>
          <div style={{ height: '50%', padding: '6px 7px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
            <div style={{ height: 8, width: '70%', background: '#1c1917', borderRadius: 2 }} />
            <div style={{ height: 4, width: '50%', background: '#78716c', borderRadius: 1 }} />
            <div style={{ marginTop: 4, height: 8, width: '38%', background: '#a16207', borderRadius: 3 }} />
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(135deg,#fde68a,#fcd34d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '60%', height: '60%', background: 'rgba(0,0,0,0.08)', borderRadius: 4 }} />
          </div>
        </div>
      );
    case 'brand':
      return (
        <div style={{ ...wrap, background: 'linear-gradient(135deg,#0f0f23,#312e81)', position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: '15% 15% auto 15%',
            height: '34%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.5), rgba(167,139,250,0))',
          }} />
          <div style={{ marginTop: 'auto', padding: '6px 7px', position: 'relative', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 6, width: '55%', background: '#fff', borderRadius: 1 }} />
            <div style={{ height: 3, width: '40%', background: 'rgba(255,255,255,0.5)', borderRadius: 1 }} />
            <div style={{ height: 3, width: '70%', background: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
          </div>
        </div>
      );
    case 'agency':
      return (
        <div style={{ ...wrap, background: '#fff' }}>
          <div style={{ height: '14%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px' }}>
            <div style={{ width: 6, height: 6, background: '#000', borderRadius: '50%' }} />
            <div style={{ width: 26, height: 3, background: '#000', borderRadius: 1 }} />
          </div>
          <div style={{ flex: 1, padding: '6px 7px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
            <div style={{ height: 11, width: '85%', background: '#000', borderRadius: 1 }} />
            <div style={{ height: 11, width: '60%', background: '#000', borderRadius: 1 }} />
            <div style={{ marginTop: 4, height: 4, width: '90%', background: '#9ca3af', borderRadius: 1 }} />
          </div>
        </div>
      );
    case 'editorial':
      return (
        <div style={{ ...wrap, background: '#0a0a0a' }}>
          <div style={{ height: '52%', background: 'linear-gradient(135deg,#dc2626,#7f1d1d)', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: 4, left: 6, right: 6, height: 4, background: '#fff', borderRadius: 1 }} />
          </div>
          <div style={{ flex: 1, padding: '5px 6px', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <div style={{ height: 3, width: '88%', background: '#e5e5e5', borderRadius: 1 }} />
            <div style={{ height: 3, width: '70%', background: '#e5e5e5', borderRadius: 1 }} />
            <div style={{ height: 3, width: '55%', background: '#737373', borderRadius: 1 }} />
          </div>
        </div>
      );
  }
}

/* Three columns of mini-sites scrolling at different speeds. */
function ShowreelBackground() {
  const colA: ThumbKind[] = ['ecom', 'saas', 'consult', 'brand', 'agency', 'editorial'];
  const colB: ThumbKind[] = ['saas', 'brand', 'editorial', 'consult', 'ecom', 'agency'];
  const colC: ThumbKind[] = ['consult', 'agency', 'ecom', 'editorial', 'saas', 'brand'];

  const Col = ({ items, dur, delay = 0 }: { items: ThumbKind[]; dur: number; delay?: number }) => (
    <div className="showreel-col" style={{ animationDuration: `${dur}s`, animationDelay: `${-delay}s` }}>
      {/* Duplicate the list twice for seamless loop */}
      {[...items, ...items].map((k, i) => (
        <MiniSite key={i} kind={k} />
      ))}
    </div>
  );

  return (
    <div className="showreel" aria-hidden="true">
      {/* Cool cyan/blue ambient glow behind the entire assembly */}
      <div className="showreel-ambient" />

      {/* Three parallax columns */}
      <div className="showreel-grid">
        <Col items={colA} dur={6.5} />
        <Col items={colB} dur={5}   delay={1.2} />
        <Col items={colC} dur={7.5} delay={0.6} />
      </div>

      {/* Vertical speed-line streaks */}
      <div className="showreel-speedlines" />

      {/* Edge fade so thumbs don't hard-cut at top/bottom */}
      <div className="showreel-mask" />
    </div>
  );
}

function BentoCard({ s, i, learnMore, liveBadge, onClick }: BentoCardProps) {
  const isLarge = s.span === 'lg';
  const glow = GLOW_RGB[s.glow ?? 'blue'];
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bento-card"
      style={{
        ...SPAN_STYLE[s.span],
        position: 'relative',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: isLarge ? '40px 36px' : '28px 26px',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Digital Showreel: multi-layer scrolling portfolio grid (large card only) */}
      {isLarge && <ShowreelBackground />}

      {/* Ambient radial glow behind icon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: isLarge ? '20px' : '10px',
          left: isLarge ? '20px' : '10px',
          width: isLarge ? '180px' : '140px',
          height: isLarge ? '180px' : '140px',
          background: `radial-gradient(circle, rgba(${glow},0.18) 0%, rgba(${glow},0) 65%)`,
          filter: 'blur(28px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isLarge ? '32px' : '20px', position: 'relative', zIndex: 2, gap: '12px' }}>
        <div style={{
          width: isLarge ? '56px' : '44px', height: isLarge ? '56px' : '44px',
          borderRadius: '12px',
          background: `rgba(${glow},0.12)`,
          border: `1px solid rgba(${glow},0.22)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: `rgb(${glow})`,
          flexShrink: 0,
        }}>
          <s.icon size={isLarge ? 26 : 20} />
        </div>

        {/* Tech-spec badges (top-right) */}
        {s.badges && s.badges.length > 0 ? (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '5px',
            justifyContent: 'flex-end',
            maxWidth: isLarge ? '70%' : '70%',
          }}>
            {/* Live Portfolio Feed badge — only on the large Website Design card */}
            {isLarge && (
              <span className="live-feed-badge" style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                padding: '3px 9px 3px 7px',
                borderRadius: '999px',
                background: 'rgba(34,211,238,0.08)',
                border: '1px solid rgba(34,211,238,0.35)',
                color: '#67e8f9',
                whiteSpace: 'nowrap',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                lineHeight: 1.4,
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 0 18px rgba(34,211,238,0.18)',
                textTransform: 'uppercase',
              }}>
                <span className="live-dot" />
                {liveBadge}
              </span>
            )}
            {s.badges.map((b) => (
              <span key={b} style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em',
                padding: '3px 8px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.62)',
                whiteSpace: 'nowrap',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                lineHeight: 1.4,
              }}>{b}</span>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: isLarge ? '40px' : '28px', fontWeight: 800, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.id}</span>
        )}
      </div>

      <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
        <div style={{ fontSize: isLarge ? '24px' : '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>{s.title}</div>
        <div style={{ fontSize: isLarge ? '15px' : '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: '18px', maxWidth: isLarge ? '480px' : 'none' }}>{s.short}</div>
        <div style={{ fontSize: '12px', color: `rgb(${glow})`, fontWeight: 600, letterSpacing: '0.02em', opacity: 0.9 }}>{learnMore}</div>
      </div>
    </motion.button>
  );
}

export function Services() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<Service | null>(null);
  const services = lang === 'fr' ? SERVICES_FR : SERVICES_EN;
  const ctaLabel  = lang === 'fr' ? 'Obtenir un Devis Gratuit' : 'Get a Free Quote';
  const learnMore = lang === 'fr' ? 'En savoir plus →'         : 'Learn more →';
  const eyebrow   = lang === 'fr' ? 'Notre Expertise'          : 'Our Expertise';
  const liveBadge = lang === 'fr' ? 'Flux Portfolio Live · 3.5×' : 'Live Portfolio Feed · 3.5×';
  const heading   = lang === 'fr'
    ? <>Tout ce dont vous avez besoin pour<br /><span className="gradient-text">dominer votre marché.</span></>
    : <>Everything you need to<br /><span className="gradient-text">dominate your market.</span></>;

  const foundations = services.filter(s => s.cluster === 'foundations');
  const ai          = services.filter(s => s.cluster === 'ai');

  const clusters = [
    {
      icon: Globe,
      eyebrow: lang === 'fr' ? 'International' : 'International',
      title:   lang === 'fr' ? 'Fondations Numériques' : 'Digital Foundations',
      desc:    lang === 'fr' ? 'Tout pour bâtir et faire croître votre présence en ligne — partout dans le monde.'
                              : 'Everything to build and grow your online presence — anywhere in the world.',
      items: foundations,
    },
    {
      icon: Cpu,
      eyebrow: lang === 'fr' ? 'Automatisation' : 'Automation',
      title:   lang === 'fr' ? 'IA pour Entreprise' : 'Enterprise AI',
      desc:    lang === 'fr' ? "Plateformes scalables et automatisations intelligentes qui font le travail pour vous."
                              : 'Scalable platforms and intelligent automations that do the work for you.',
      items: ai,
    },
  ];

  return (
    <section id="services" style={{ width: '100%', padding: '0 24px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>{eyebrow}</span>
        <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.1, marginTop: '16px' }}>
          {heading}
        </h2>
      </motion.div>

      {/* Bento clusters */}
      {clusters.map((cluster, ci) => (
        <div key={ci} style={{ marginBottom: ci === 0 ? '88px' : '0' }}>
          {/* Cluster header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(167,139,250,0.12))',
              border: '1px solid rgba(59,130,246,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#93c5fd',
            }}>
              <cluster.icon size={22} />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.7)', marginBottom: '6px' }}>
                {cluster.eyebrow}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '6px', letterSpacing: '-0.02em' }}>
                {cluster.title}
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '560px' }}>
                {cluster.desc}
              </div>
            </div>
          </motion.div>

          {/* Bento grid */}
          <div className="bento-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: '220px',
            gap: '14px',
          }}>
            {cluster.items.map((s, i) => (
              <BentoCard key={s.id} s={s} i={i} learnMore={learnMore} liveBadge={liveBadge} onClick={() => setActive(s)} />
            ))}
          </div>
        </div>
      ))}

      {/* Bottom CTA */}
      <div style={{ marginTop: '80px', textAlign: 'center' }}>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
          {lang === 'fr' ? 'Pas sûr de ce dont vous avez besoin ?' : "Not sure what you need?"}
        </p>
        <a href="#contact" className="btn-violet" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', fontSize: '14px', fontWeight: 600, borderRadius: '10px', textDecoration: 'none' }}>
          {ctaLabel} <ArrowRight size={15} />
        </a>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 200 }}
            />
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 201,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                pointerEvents: 'all',
                width: '90vw',
                maxWidth: '440px',
                background: '#111',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: '20px',
                padding: '36px 32px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.1)',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setActive(null)}
                style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(59,130,246,0.14)', border: '1px solid rgba(59,130,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd', flexShrink: 0 }}>
                  <active.icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.6)', marginBottom: '4px' }}>{active.id}</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>{active.title}</div>
                </div>
              </div>

              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '28px' }}>
                {active.desc}
              </p>

              <a
                href="#contact"
                onClick={() => setActive(null)}
                className="btn-violet"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '13px 0', fontSize: '14px', fontWeight: 600, borderRadius: '10px', textDecoration: 'none' }}
              >
                {ctaLabel} <ArrowRight size={15} />
              </a>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* Bento card: hover gradient border + faint noise overlay */
        .bento-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s; }
        .bento-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(96,165,250,0.55), rgba(167,139,250,0.35) 40%, rgba(96,165,250,0) 80%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease-out;
          pointer-events: none;
        }
        .bento-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
          opacity: 0;
          transition: opacity 0.35s ease-out;
          pointer-events: none;
          mix-blend-mode: overlay;
        }
        .bento-card:hover { transform: translateY(-3px); }
        .bento-card:hover::before { opacity: 1; }
        .bento-card:hover::after  { opacity: 0.06; }

        /* Tablet: collapse the 12-col grid into 6 */
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: repeat(6,1fr) !important; grid-auto-rows: auto !important; }
          .bento-card { grid-column: span 6 !important; grid-row: auto !important; min-height: 200px !important; }
        }

        /* ─── Digital Showreel ────────────────────────────── */
        .showreel {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 20px;
          z-index: 0;
          pointer-events: none;
        }
        .showreel-ambient {
          position: absolute;
          inset: -10%;
          background:
            radial-gradient(60% 50% at 30% 30%, rgba(34,211,238,0.18), transparent 70%),
            radial-gradient(55% 55% at 75% 65%, rgba(59,130,246,0.20), transparent 70%);
          filter: blur(36px);
          z-index: 0;
        }
        .showreel-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 12px;
          z-index: 1;
          /* Motion blur baked into the entire grid */
          filter: blur(2.4px) saturate(1.1);
          opacity: 0.78;
          transform: perspective(1000px) rotateX(2deg);
          mix-blend-mode: lighten;
        }
        .showreel-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
          will-change: transform;
          animation-name: showreel-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .showreel-col:nth-child(2) {
          margin-top: -28px; /* offset for parallax depth */
        }
        @keyframes showreel-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, -50%, 0); }
        }
        /* Vertical white speed-line streaks */
        .showreel-speedlines {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0)        0px,
            rgba(255,255,255,0)        14px,
            rgba(255,255,255,0.045)    14px,
            rgba(255,255,255,0.045)    16px
          );
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.7) 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.7) 70%, transparent 100%);
          animation: showreel-streaks 0.6s linear infinite;
        }
        @keyframes showreel-streaks {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, -16px, 0); }
        }
        /* Edge fade + dark gradient to keep foreground text legible */
        .showreel-mask {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background:
            linear-gradient(180deg,
              rgba(2,4,10,0.55) 0%,
              rgba(2,4,10,0.20) 30%,
              rgba(2,4,10,0.65) 70%,
              rgba(2,4,10,0.95) 100%
            ),
            radial-gradient(ellipse at 0% 100%, rgba(2,4,10,0.85), transparent 55%);
        }

        /* Live feed badge dot */
        .live-feed-badge .live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 8px #22d3ee, 0 0 14px rgba(34,211,238,0.6);
          animation: live-pulse 1.4s ease-in-out infinite;
        }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(0.85); }
        }

        @media (prefers-reduced-motion: reduce) {
          .showreel-col, .showreel-speedlines, .live-feed-badge .live-dot {
            animation: none !important;
          }
        }
      `}</style>
    </div>
    </section>
  );
}
