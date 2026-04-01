import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Layout, ShoppingCart, Search, Wrench, Zap, Database, Bot, Building2, X, ArrowRight } from 'lucide-react';

const SERVICES_EN = [
  { icon: Layout, title: 'Website Design', short: 'Modern, conversion-focused design tailored to your brand.', desc: 'Modern, user-focused design tailored to your brand. We focus on conversion and clean engineering — every pixel placed with purpose to turn visitors into paying clients.', id: '01' },
  { icon: Zap, title: 'Development', short: 'Lightning-fast frameworks, scalable & secure.', desc: 'Custom web development using modern, lightning-fast frameworks. Scalable architectures optimized for speed and security — built to perform flawlessly on every device.', id: '02' },
  { icon: ShoppingCart, title: 'eCommerce', short: 'High-conversion stores with seamless payments.', desc: 'Secure online stores with high-end payment integrations and inventory management. We build eCommerce solutions that make buying effortless and selling more profitable.', id: '03' },
  { icon: Database, title: 'CMS Integration', short: 'Take full control — no code needed.', desc: 'Take full control of your website. Intuitive CMS integration lets you easily update text, manage blogs, and upload images without touching a single line of code.', id: '04' },
  { icon: Search, title: 'SEO & Marketing', short: 'Rank where it matters. Be found.', desc: 'Ranking you where it matters. Technical SEO, keyword strategy, and performance optimization included — so the right people find you at exactly the right moment.', id: '05' },
  { icon: Wrench, title: 'Maintenance & Support', short: 'Peace of mind — we handle the rest.', desc: 'Enjoy peace of mind with our dedicated support. Monthly security updates, daily cloud backups, bug fixes, and 24/7 uptime monitoring so your site never goes down.', id: '06' },
  { icon: Building2, title: 'Enterprise SaaS', short: 'Multi-tenant cloud apps at scale.', desc: 'Scalable, multi-tenant cloud applications engineered for high performance. We architect and build enterprise-grade SaaS platforms ready to handle thousands of concurrent users.', id: '07' },
  { icon: Bot, title: 'AI Integrations', short: 'Smart automation that drives conversions.', desc: 'Supercharge your business with custom AI solutions. Smart chatbots, automated customer service workflows, and advanced AI agents tailored to save you time and drive conversions.', id: '08' },
];

const SERVICES_FR = [
  { icon: Layout, title: 'Design Web', short: 'Design moderne, centré sur la conversion.', desc: 'Design moderne centré sur votre marque. Chaque pixel est placé avec intention pour transformer vos visiteurs en clients payants.', id: '01' },
  { icon: Zap, title: 'Développement', short: 'Frameworks rapides, scalable et sécurisé.', desc: 'Développement web sur mesure avec des frameworks modernes ultra-rapides. Architectures scalables optimisées pour la vitesse et la sécurité.', id: '02' },
  { icon: ShoppingCart, title: 'eCommerce', short: 'Boutiques à haute conversion.', desc: "Boutiques en ligne sécurisées avec intégrations de paiement haut de gamme et gestion des stocks. Nous construisons des solutions qui rendent l'achat facile.", id: '03' },
  { icon: Database, title: 'Intégration CMS', short: 'Contrôle total, sans code.', desc: "Prenez le contrôle de votre site. L'intégration CMS intuitive vous permet de mettre à jour le contenu, gérer les blogs et télécharger des images sans toucher au code.", id: '04' },
  { icon: Search, title: 'SEO & Marketing', short: 'Classez-vous là où ça compte.', desc: 'Positionnement là où ça compte. SEO technique, stratégie de mots-clés et optimisation des performances inclus pour attirer exactement les bons clients.', id: '05' },
  { icon: Wrench, title: 'Maintenance & Support', short: 'Tranquillité d\'esprit garantie.', desc: 'Tranquillité d\'esprit avec notre support dédié. Mises à jour de sécurité mensuelles, sauvegardes quotidiennes, corrections de bugs et surveillance 24/7.', id: '06' },
  { icon: Building2, title: 'SaaS Entreprise', short: 'Applications cloud multi-tenant.', desc: 'Applications cloud scalables et multi-tenant conçues pour la haute performance. Nous architecturons des plateformes SaaS de niveau entreprise.', id: '07' },
  { icon: Bot, title: 'Intégrations IA', short: 'Automatisation intelligente.', desc: 'Boostez votre entreprise avec des solutions IA sur mesure. Chatbots intelligents, workflows automatisés et agents IA avancés pour gagner du temps et augmenter les conversions.', id: '08' },
];

type Service = typeof SERVICES_EN[0];

export function Services() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<Service | null>(null);
  const services = lang === 'fr' ? SERVICES_FR : SERVICES_EN;
  const ctaLabel = lang === 'fr' ? 'Obtenir un Devis Gratuit' : 'Get a Free Quote';
  const learnMore = lang === 'fr' ? 'En savoir plus →' : 'Learn more →';
  const eyebrow = lang === 'fr' ? 'Notre Expertise' : 'Our Expertise';
  const heading = lang === 'fr' ? <>Tout ce dont vous avez besoin pour<br /><span className="gradient-text">dominer votre marché.</span></> : <>Everything you need to<br /><span className="gradient-text">dominate your market.</span></>;

  return (
    <section id="services" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="pill-label" style={{ marginBottom: '24px', display: 'inline-flex' }}>{eyebrow}</span>
        <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: '16px' }}>
          {heading}
        </h2>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }} className="services-grid">
        {services.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => setActive(s)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="glass-hover"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: 'none',
              padding: '32px 28px',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                <s.icon size={20} />
              </div>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.04em' }}>{s.id}</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{s.title}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '16px' }}>{s.short}</div>
            <div style={{ fontSize: '12px', color: '#a78bfa', fontWeight: 600, marginTop: 'auto' }}>{learnMore}</div>
          </motion.button>
        ))}
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: 201,
                width: '90vw',
                maxWidth: '440px',
                background: '#111',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: '20px',
                padding: '36px 32px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.1)',
              }}
            >
              <button
                onClick={() => setActive(null)}
                style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(124,58,237,0.14)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', flexShrink: 0 }}>
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
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:900px){ .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:500px){ .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
