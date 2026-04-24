import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const PROJECTS = [
  {
    img: `${BASE}/portfolio/proj-audreyrh-v3.webp`,
    category: { en: 'HR Consulting', fr: 'Conseil RH' },
    title: { en: 'AudreyRh.com', fr: 'AudreyRh.com' },
    tags: { en: ['HR Consultant', 'Personal Brand'], fr: ['Conseil RH', 'Image personnelle'] },
    result: { en: 'Launched in 11 days — bilingual, dual-audience architecture.', fr: 'Lancé en 11 jours — architecture bilingue, double audience.' },
    wide: true,
  },
  {
    img: `${BASE}/portfolio/proj-ecommerce.webp`,
    category: { en: 'E-Commerce', fr: 'E-Commerce' },
    title: { en: 'Maison Luxe Boutique', fr: 'Maison Luxe Boutique' },
    tags: { en: ['E-Commerce', 'Shopify'], fr: ['E-Commerce', 'Shopify'] },
    result: { en: 'Full e-commerce store, Shopify integrated.', fr: 'Boutique e-commerce complète, intégration Shopify.' },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-saas.webp`,
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
    img: `${BASE}/portfolio/proj-fitness.webp`,
    category: { en: 'Health & Fitness', fr: 'Santé & Fitness' },
    title: { en: 'Apex Fitness Studio', fr: 'Apex Fitness Studio' },
    tags: { en: ['Web Design', 'Booking'], fr: ['Web Design', 'Réservation'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-realestate.webp`,
    category: { en: 'Real Estate', fr: 'Immobilier' },
    title: { en: 'Prestige Realty Group', fr: 'Prestige Realty Group' },
    tags: { en: ['Real Estate', 'CMS'], fr: ['Immobilier', 'CMS'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-startup.webp`,
    category: { en: 'Tech Startup', fr: 'Startup Tech' },
    title: { en: 'Orion Launch Platform', fr: 'Plateforme Orion Launch' },
    tags: { en: ['Landing Page', 'SaaS'], fr: ['Page de lancement', 'SaaS'] },
    wide: true,
  },
  {
    img: `${BASE}/portfolio/proj-medical.webp`,
    category: { en: 'Healthcare', fr: 'Santé' },
    title: { en: 'Clinique Santé Moderne', fr: 'Clinique Santé Moderne' },
    tags: { en: ['Medical', 'Booking'], fr: ['Médical', 'Réservation'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-photography.webp`,
    category: { en: 'Photography', fr: 'Photographie' },
    title: { en: 'Lumière Studio Portfolio', fr: 'Portfolio Lumière Studio' },
    tags: { en: ['Portfolio', 'Gallery'], fr: ['Portfolio', 'Galerie'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-construction.webp`,
    category: { en: 'Construction', fr: 'Construction' },
    title: { en: 'Bâtisseurs Nordiques Inc.', fr: 'Bâtisseurs Nordiques Inc.' },
    tags: { en: ['Corporate', 'Web Design'], fr: ['Corporate', 'Web Design'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-restaurant.webp`,
    category: { en: 'Restaurant', fr: 'Restaurant' },
    title: { en: 'Le Quartier Brasserie', fr: 'Le Quartier Brasserie' },
    tags: { en: ['Brand Identity', 'Web Design'], fr: ['Image de marque', 'Web Design'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-law.webp`,
    category: { en: 'Legal Services', fr: 'Services Juridiques' },
    title: { en: 'Dubois Legal Group', fr: 'Cabinet Dubois' },
    tags: { en: ['Law Firm', 'Professional'], fr: ['Cabinet d\'avocats', 'Professionnel'] },
    wide: false,
  },
  {
    img: `${BASE}/portfolio/proj-wellness.webp`,
    category: { en: 'Wellness & Beauty', fr: 'Bien-être & Beauté' },
    title: { en: 'Éclat Beauty Studio', fr: 'Studio Beauté Éclat' },
    tags: { en: ['Booking System', 'Branding'], fr: ['Réservation', 'Image de marque'] },
    wide: false,
  },
];

/* ── Lightbox ─────────────────────────────────────────── */
function Lightbox({
  projects, index, onClose, onPrev, onNext,
}: {
  projects: typeof PROJECTS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { lang } = useLanguage();
  const p = projects[index];
  const l = lang as 'en' | 'fr';

  // Keyboard nav
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(2,6,18,0.92)',
        backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Panel */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '900px', width: '100%',
          background: '#0a1628',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 32px 100px rgba(0,0,0,0.9)',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', background: '#060d1a' }}>
          <img
            src={p.img}
            alt={p.title[l]}
            loading="lazy"
            style={{ width: '100%', display: 'block', maxHeight: '520px', objectFit: 'cover' }}
          />
          {/* Category badge */}
          <div style={{
            position: 'absolute', top: '14px', left: '14px',
            background: 'rgba(6,13,26,0.8)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(59,130,246,0.25)', borderRadius: '100px',
            padding: '4px 11px', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase', color: '#93c5fd',
          }}>
            {p.category[l]}
          </div>
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '14px', right: '14px',
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'rgba(6,13,26,0.75)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Footer row */}
        <div style={{
          padding: '18px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              {p.title[l]}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {p.tags[l].map(tag => (
                <span key={tag} style={{
                  fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.45)',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px', padding: '3px 9px', letterSpacing: '0.04em',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Prev / Next */}
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <button onClick={onPrev} style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)',
            }}><ChevronLeft size={17} /></button>
            <button onClick={onNext} style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#93c5fd',
            }}><ChevronRight size={17} /></button>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', paddingBottom: '16px' }}>
          {projects.map((_, i) => (
            <div key={i} style={{
              width: i === index ? '20px' : '6px', height: '6px',
              borderRadius: '3px',
              background: i === index ? '#3b82f6' : 'rgba(255,255,255,0.15)',
              transition: 'width 0.25s, background 0.25s',
            }} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project card ─────────────────────────────────────── */
function ProjectCard({
  project, index, onOpen,
}: {
  project: typeof PROJECTS[0];
  index: number;
  onOpen: () => void;
}) {
  const { lang } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      data-wide={project.wide ? 'true' : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
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
      <div className="portfolio-img" style={{ position: 'relative', overflow: 'hidden', aspectRatio: project.wide ? '21/9' : '16/9' }}>
        <img
          src={project.img}
          alt={project.title[lang as 'en' | 'fr']}
          loading="lazy"
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
            {(project as any).result && (
              <div style={{
                marginTop: '8px',
                fontSize: '11px',
                fontWeight: 500,
                color: '#67e8f9',
                opacity: 0.85,
                lineHeight: 1.4,
              }}>
                ✦ {(project as any).result[lang as 'en' | 'fr']}
              </div>
            )}
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevProject   = useCallback(() => setLightboxIndex(i => i === null ? null : (i - 1 + PROJECTS.length) % PROJECTS.length), []);
  const nextProject   = useCallback(() => setLightboxIndex(i => i === null ? null : (i + 1) % PROJECTS.length), []);

  const eyebrow = lang === 'fr' ? 'Notre Travail' : 'Our Work';
  const title   = lang === 'fr' ? 'Des projets qui parlent\nd\'eux-mêmes.' : 'Projects that speak\nfor themselves.';
  const sub     = lang === 'fr'
    ? 'Chaque site est conçu sur mesure — aucun template, aucun compromis.'
    : 'Every site is built custom — no templates, no shortcuts.';

  return (
    <section id="portfolio" style={{ width: '100%', padding: '120px 24px', position: 'relative' }}>
      {/* Ambient orb */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
            <ProjectCard key={p.title.en} project={p} index={i} onOpen={() => setLightboxIndex(i)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            projects={PROJECTS}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevProject}
            onNext={nextProject}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: repeat(2,1fr) !important; }
          .portfolio-grid > [data-wide="true"] { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid > [data-wide="true"] { grid-column: span 1 !important; }
          .portfolio-grid > [data-wide="true"] .portfolio-img { aspect-ratio: 16/9 !important; }
          .portfolio-grid img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
        }
      `}</style>
    </section>
  );
}
