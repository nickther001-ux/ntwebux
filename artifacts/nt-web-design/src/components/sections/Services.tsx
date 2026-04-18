import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Layout, ShoppingCart, Search, Wrench, Zap, Database, Bot, Building2, X, ArrowRight, Globe, Cpu } from 'lucide-react';

type Cluster = 'foundations' | 'ai';
type Span = 'sm' | 'md' | 'lg' | 'tall';

interface Service {
  icon: typeof Layout;
  title: string;
  short: string;
  desc: string;
  id: string;
  cluster: Cluster;
  span: Span;
}

const SERVICES_EN: Service[] = [
  { icon: Layout,       title: 'Website Design',        short: 'Modern, conversion-focused design tailored to your brand.', desc: 'Modern, user-focused design tailored to your brand. We focus on conversion and clean engineering — every pixel placed with purpose to turn visitors into paying clients.', id: '01', cluster: 'foundations', span: 'lg' },
  { icon: Zap,          title: 'Development',           short: 'Lightning-fast frameworks, scalable & secure.',              desc: 'Custom web development using modern, lightning-fast frameworks. Scalable architectures optimized for speed and security — built to perform flawlessly on every device.', id: '02', cluster: 'foundations', span: 'md' },
  { icon: ShoppingCart, title: 'eCommerce',             short: 'High-conversion stores with seamless payments.',             desc: 'Secure online stores with high-end payment integrations and inventory management. We build eCommerce solutions that make buying effortless and selling more profitable.', id: '03', cluster: 'foundations', span: 'sm' },
  { icon: Database,     title: 'CMS Integration',       short: 'Take full control — no code needed.',                        desc: 'Take full control of your website. Intuitive CMS integration lets you easily update text, manage blogs, and upload images without touching a single line of code.', id: '04', cluster: 'foundations', span: 'sm' },
  { icon: Search,       title: 'SEO & Marketing',       short: 'Rank where it matters. Be found.',                           desc: 'Ranking you where it matters. Technical SEO, keyword strategy, and performance optimization included — so the right people find you at exactly the right moment.', id: '05', cluster: 'foundations', span: 'md' },
  { icon: Wrench,       title: 'Maintenance & Support', short: 'Peace of mind — we handle the rest.',                        desc: 'Enjoy peace of mind with our dedicated support. Monthly security updates, daily cloud backups, bug fixes, and 24/7 uptime monitoring so your site never goes down.', id: '06', cluster: 'foundations', span: 'md' },
  { icon: Building2,    title: 'Enterprise SaaS',       short: 'Multi-tenant cloud apps at scale.',                          desc: 'Scalable, multi-tenant cloud applications engineered for high performance. We architect and build enterprise-grade SaaS platforms ready to handle thousands of concurrent users.', id: '07', cluster: 'ai',          span: 'tall' },
  { icon: Bot,          title: 'AI Integrations',       short: 'Smart automation that drives conversions.',                  desc: 'Supercharge your business with custom AI solutions. Smart chatbots, automated customer service workflows, and advanced AI agents tailored to save you time and drive conversions.', id: '08', cluster: 'ai',          span: 'tall' },
];

const SERVICES_FR: Service[] = [
  { icon: Layout,       title: 'Design Web',            short: 'Design moderne, centré sur la conversion.',  desc: 'Design moderne centré sur votre marque. Chaque pixel est placé avec intention pour transformer vos visiteurs en clients payants.', id: '01', cluster: 'foundations', span: 'lg' },
  { icon: Zap,          title: 'Développement',         short: 'Frameworks rapides, scalable et sécurisé.',  desc: 'Développement web sur mesure avec des frameworks modernes ultra-rapides. Architectures scalables optimisées pour la vitesse et la sécurité.', id: '02', cluster: 'foundations', span: 'md' },
  { icon: ShoppingCart, title: 'eCommerce',             short: 'Boutiques à haute conversion.',              desc: "Boutiques en ligne sécurisées avec intégrations de paiement haut de gamme et gestion des stocks. Nous construisons des solutions qui rendent l'achat facile.", id: '03', cluster: 'foundations', span: 'sm' },
  { icon: Database,     title: 'Intégration CMS',       short: 'Contrôle total, sans code.',                 desc: "Prenez le contrôle de votre site. L'intégration CMS intuitive vous permet de mettre à jour le contenu, gérer les blogs et télécharger des images sans toucher au code.", id: '04', cluster: 'foundations', span: 'sm' },
  { icon: Search,       title: 'SEO & Marketing',       short: 'Classez-vous là où ça compte.',              desc: 'Positionnement là où ça compte. SEO technique, stratégie de mots-clés et optimisation des performances inclus pour attirer exactement les bons clients.', id: '05', cluster: 'foundations', span: 'md' },
  { icon: Wrench,       title: 'Maintenance & Support', short: "Tranquillité d'esprit garantie.",            desc: "Tranquillité d'esprit avec notre support dédié. Mises à jour de sécurité mensuelles, sauvegardes quotidiennes, corrections de bugs et surveillance 24/7.", id: '06', cluster: 'foundations', span: 'md' },
  { icon: Building2,    title: 'SaaS Entreprise',       short: 'Applications cloud multi-tenant.',           desc: 'Applications cloud scalables et multi-tenant conçues pour la haute performance. Nous architecturons des plateformes SaaS de niveau entreprise.', id: '07', cluster: 'ai',          span: 'tall' },
  { icon: Bot,          title: 'Intégrations IA',       short: 'Automatisation intelligente.',               desc: 'Boostez votre entreprise avec des solutions IA sur mesure. Chatbots intelligents, workflows automatisés et agents IA avancés pour gagner du temps et augmenter les conversions.', id: '08', cluster: 'ai',          span: 'tall' },
];

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
  onClick: () => void;
}

function BentoCard({ s, i, learnMore, onClick }: BentoCardProps) {
  const isLarge = s.span === 'lg';
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isLarge ? '32px' : '20px', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: isLarge ? '56px' : '44px', height: isLarge ? '56px' : '44px',
          borderRadius: '12px', background: 'rgba(59,130,246,0.12)',
          border: '1px solid rgba(59,130,246,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd',
        }}>
          <s.icon size={isLarge ? 26 : 20} />
        </div>
        <span style={{ fontSize: isLarge ? '40px' : '28px', fontWeight: 800, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.id}</span>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
        <div style={{ fontSize: isLarge ? '24px' : '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>{s.title}</div>
        <div style={{ fontSize: isLarge ? '15px' : '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: '18px', maxWidth: isLarge ? '420px' : 'none' }}>{s.short}</div>
        <div style={{ fontSize: '12px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.02em' }}>{learnMore}</div>
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
              <BentoCard key={s.id} s={s} i={i} learnMore={learnMore} onClick={() => setActive(s)} />
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
      `}</style>
    </div>
    </section>
  );
}
