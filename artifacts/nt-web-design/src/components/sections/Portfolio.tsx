import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { ArrowUpRight } from 'lucide-react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const PROJECTS = [
  {
    img: `${BASE}/portfolio/proj-restaurant.png`,
    category: { en: 'Restaurant', fr: 'Restaurant' },
    title: { en: 'Le Quartier Brasserie', fr: 'Le Quartier Brasserie' },
    tags: { en: ['Brand Identity', 'Web Design'], fr: ['Image de marque', 'Web Design'] },
    wide: true,
  },
  {
    img: `${BASE}/portfolio/proj-ecommerce.png`,
    category: { en: 'E-Commerce', fr: 'E-Commerce' },
    title: { en: 'Maison Luxe Boutique', fr: 'Maison Luxe Boutique' },
    tags: { en: ['E-Commerce', 'Shopify'], fr: ['E-Commerce', 'Shopify'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-saas.png`,
    category: { en: 'SaaS', fr: 'SaaS' },
    title: { en: 'Flux Analytics Platform', fr: 'Plateforme Flux Analytics' },
    tags: { en: ['Dashboard', 'SaaS UI'], fr: ['Tableau de bord', 'SaaS UI'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-law.png`,
    category: { en: 'Professional Services', fr: 'Services Professionnels' },
    title: { en: 'Beaumont & Associés', fr: 'Beaumont & Associés' },
    tags: { en: ['Web Design', 'SEO'], fr: ['Web Design', 'SEO'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-fitness.png`,
    category: { en: 'Health & Fitness', fr: 'Santé & Fitness' },
    title: { en: 'Apex Fitness Studio', fr: 'Apex Fitness Studio' },
    tags: { en: ['Web Design', 'Booking'], fr: ['Web Design', 'Réservation'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-realestate.png`,
    category: { en: 'Real Estate', fr: 'Immobilier' },
    title: { en: 'Prestige Realty Group', fr: 'Prestige Realty Group' },
    tags: { en: ['Real Estate', 'CMS'], fr: ['Immobilier', 'CMS'] },
    wide: false,
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { lang } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
        gridColumn: project.wide ? 'span 2' : 'span 1',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        borderColor: hovered ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? '0 0 0 1px rgba(59,130,246,0.1), 0 16px 48px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: project.wide ? '21/9' : '16/9' }}>
        <img
          src={project.img}
          alt={project.title[lang as 'en' | 'fr']}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(6,13,26,0.85) 0%, rgba(37,99,235,0.3) 100%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hovered ? 'scale(1)' : 'scale(0.7)',
            transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <ArrowUpRight size={18} color="#fff" />
          </div>
        </div>

        {/* Category pill — always visible */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: 'rgba(6,13,26,0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: '100px',
          padding: '4px 10px',
          fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#93c5fd',
        }}>
          {project.category[lang as 'en' | 'fr']}
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
              {project.title[lang as 'en' | 'fr']}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {project.tags[lang as 'en' | 'fr'].map(tag => (
                <span key={tag} style={{
                  fontSize: '10px', fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  letterSpacing: '0.04em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
            background: hovered ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hovered ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.08)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s, border-color 0.2s',
          }}>
            <ArrowUpRight size={14} color={hovered ? '#93c5fd' : 'rgba(255,255,255,0.3)'} style={{ transition: 'color 0.2s' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const { lang } = useLanguage();

  const eyebrow = lang === 'fr' ? 'Notre Travail' : 'Our Work';
  const title   = lang === 'fr' ? 'Des projets qui parlent\nd\'eux-mêmes.' : 'Projects that speak\nfor themselves.';
  const sub     = lang === 'fr'
    ? 'Chaque site est conçu sur mesure — aucun template, aucun compromis.'
    : 'Every site is built custom — no templates, no shortcuts.';

  return (
    <section id="portfolio" style={{ padding: '120px 24px', position: 'relative' }}>
      {/* Ambient orb */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <span className="pill-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>
            ✦ {eyebrow}
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 900, letterSpacing: '-0.03em',
            color: '#fff', lineHeight: 1.1, whiteSpace: 'pre-line',
            marginBottom: '16px',
          }}>
            {title.split('\n').map((line, i) =>
              i === 0 ? <span key={i}>{line}</span> : (
                <span key={i}><br /><span style={{ background: 'linear-gradient(135deg,#93c5fd,#bfdbfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{line}</span></span>
              )
            )}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            {sub}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
          className="portfolio-grid"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title.en} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: repeat(2,1fr) !important; }
          .portfolio-grid > *[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid > *[style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
