import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/* ── Mockup themes ──────────────────────────────────────── */
type Theme = {
  bg: string;
  hero: string;
  accent: string;
  bar: string;
  card: string;
};

const THEMES: Record<string, Theme> = {
  ecommerce: {
    bg: '#0f0a00',
    hero: 'linear-gradient(135deg,#c9a96e 0%,#7c4d28 60%,#3d1f0a 100%)',
    accent: '#d4a853',
    bar: '#1a1000',
    card: 'rgba(201,169,110,0.12)',
  },
  saas: {
    bg: '#02061a',
    hero: 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 55%,#1e0a4a 100%)',
    accent: '#38bdf8',
    bar: '#06101f',
    card: 'rgba(14,165,233,0.12)',
  },
  law: {
    bg: '#07100f',
    hero: 'linear-gradient(135deg,#1e3a5f 0%,#0f1f35 60%,#0a1522 100%)',
    accent: '#c5a028',
    bar: '#0a1825',
    card: 'rgba(197,160,40,0.10)',
  },
  fitness: {
    bg: '#160300',
    hero: 'linear-gradient(135deg,#ef4444 0%,#f97316 55%,#7f1d1d 100%)',
    accent: '#f97316',
    bar: '#1a0400',
    card: 'rgba(239,68,68,0.12)',
  },
  realestate: {
    bg: '#021008',
    hero: 'linear-gradient(135deg,#065f46 0%,#2d6a4f 55%,#014730 100%)',
    accent: '#34d399',
    bar: '#031a0d',
    card: 'rgba(52,211,153,0.10)',
  },
  startup: {
    bg: '#060214',
    hero: 'linear-gradient(135deg,#7c3aed 0%,#4f46e5 50%,#1e1b4b 100%)',
    accent: '#a78bfa',
    bar: '#0d0825',
    card: 'rgba(124,58,237,0.12)',
  },
  medical: {
    bg: '#001219',
    hero: 'linear-gradient(135deg,#0891b2 0%,#164e63 55%,#0a2533 100%)',
    accent: '#22d3ee',
    bar: '#001922',
    card: 'rgba(8,145,178,0.12)',
  },
  photography: {
    bg: '#0a0a0a',
    hero: 'linear-gradient(135deg,#27272a 0%,#18181b 60%,#09090b 100%)',
    accent: '#a1a1aa',
    bar: '#111111',
    card: 'rgba(161,161,170,0.08)',
  },
  construction: {
    bg: '#0f0700',
    hero: 'linear-gradient(135deg,#c2410c 0%,#92400e 55%,#431407 100%)',
    accent: '#fb923c',
    bar: '#1a0c00',
    card: 'rgba(194,65,12,0.12)',
  },
  restaurant: {
    bg: '#100209',
    hero: 'linear-gradient(135deg,#9f1239 0%,#7f1d1d 50%,#370617 100%)',
    accent: '#fb7185',
    bar: '#180309',
    card: 'rgba(159,18,57,0.12)',
  },
  beauty: {
    bg: '#100614',
    hero: 'linear-gradient(135deg,#be185d 0%,#9d174d 50%,#500724 100%)',
    accent: '#f472b6',
    bar: '#1a0820',
    card: 'rgba(190,24,93,0.12)',
  },
};

/* ── SiteMockup: CSS-only browser-window preview ───────── */
function SiteMockup({ theme, wide }: { theme: Theme; wide: boolean }) {
  const { bg, hero, accent, bar, card } = theme;
  return (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Browser chrome */}
      <div style={{ flexShrink: 0, height: '28px', background: bar, borderBottom: `1px solid rgba(255,255,255,0.06)`, display: 'flex', alignItems: 'center', padding: '0 10px', gap: '6px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
        <div style={{ flex: 1, height: '13px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', margin: '0 8px', maxWidth: '160px' }} />
      </div>

      {/* Nav */}
      <div style={{ flexShrink: 0, height: '22px', background: bar, borderBottom: `1px solid ${accent}22`, display: 'flex', alignItems: 'center', padding: '0 12px', gap: '14px' }}>
        <div style={{ width: '22px', height: '8px', borderRadius: '2px', background: accent, opacity: 0.85 }} />
        {[40, 30, 35, 28].map((w, i) => (
          <div key={i} style={{ width: `${w}px`, height: '6px', borderRadius: '2px', background: 'rgba(255,255,255,0.13)' }} />
        ))}
        <div style={{ marginLeft: 'auto', width: '44px', height: '13px', borderRadius: '4px', background: accent, opacity: 0.9 }} />
      </div>

      {/* Hero section */}
      <div style={{ flexShrink: 0, height: wide ? '45%' : '42%', background: hero, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0 16px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
        <div style={{ width: wide ? '55%' : '60%', height: '10px', borderRadius: '3px', background: 'rgba(255,255,255,0.75)', position: 'relative' }} />
        <div style={{ width: wide ? '40%' : '45%', height: '7px', borderRadius: '3px', background: 'rgba(255,255,255,0.45)', position: 'relative' }} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '6px', position: 'relative' }}>
          <div style={{ width: '52px', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.9)' }} />
          <div style={{ width: '44px', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' }} />
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, height: '30px', borderRadius: '6px', background: card, border: `1px solid ${accent}20`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
              <div style={{ width: '30px', height: '5px', borderRadius: '2px', background: accent, opacity: 0.7 }} />
              <div style={{ width: '22px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)' }} />
            </div>
          ))}
        </div>

        {/* Content blocks */}
        {wide ? (
          <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
            <div style={{ flex: 2, borderRadius: '6px', background: card, border: `1px solid ${accent}15` }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ flex: 1, borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
              <div style={{ flex: 1, borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '6px', flex: 1 }}>
            {[1, 2].map(i => (
              <div key={i} style={{ flex: 1, borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Project data ───────────────────────────────────────── */
const PROJECTS = [
  {
    img:   `${BASE}/portfolio/proj-audreyrh-v3.png`,
    theme: null,
    category: { en: 'HR Consulting', fr: 'Conseil RH' },
    title:    { en: 'AudreyRh.com', fr: 'AudreyRh.com' },
    tags:     { en: ['HR Consultant', 'Personal Brand'], fr: ['Conseil RH', 'Image personnelle'] },
    wide: true,
  },
  {
    img:   null,
    theme: THEMES.ecommerce,
    category: { en: 'E-Commerce', fr: 'E-Commerce' },
    title:    { en: 'Maison Luxe Boutique', fr: 'Maison Luxe Boutique' },
    tags:     { en: ['E-Commerce', 'Shopify'], fr: ['E-Commerce', 'Shopify'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.saas,
    category: { en: 'SaaS', fr: 'SaaS' },
    title:    { en: 'Flux Analytics Platform', fr: 'Plateforme Flux Analytics' },
    tags:     { en: ['Dashboard', 'SaaS UI'], fr: ['Tableau de bord', 'SaaS UI'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.law,
    category: { en: 'Professional Services', fr: 'Services Professionnels' },
    title:    { en: 'Beaumont & Associés', fr: 'Beaumont & Associés' },
    tags:     { en: ['Web Design', 'SEO'], fr: ['Web Design', 'SEO'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.fitness,
    category: { en: 'Health & Fitness', fr: 'Santé & Fitness' },
    title:    { en: 'Apex Fitness Studio', fr: 'Apex Fitness Studio' },
    tags:     { en: ['Web Design', 'Booking'], fr: ['Web Design', 'Réservation'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.realestate,
    category: { en: 'Real Estate', fr: 'Immobilier' },
    title:    { en: 'Prestige Realty Group', fr: 'Prestige Realty Group' },
    tags:     { en: ['Real Estate', 'CMS'], fr: ['Immobilier', 'CMS'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.startup,
    category: { en: 'Tech Startup', fr: 'Startup Tech' },
    title:    { en: 'Orion Launch Platform', fr: 'Plateforme Orion Launch' },
    tags:     { en: ['Landing Page', 'SaaS'], fr: ['Page de lancement', 'SaaS'] },
    wide: true,
  },
  {
    img:   null,
    theme: THEMES.medical,
    category: { en: 'Healthcare', fr: 'Santé' },
    title:    { en: 'Clinique Santé Moderne', fr: 'Clinique Santé Moderne' },
    tags:     { en: ['Medical', 'Booking'], fr: ['Médical', 'Réservation'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.photography,
    category: { en: 'Photography', fr: 'Photographie' },
    title:    { en: 'Lumière Studio Portfolio', fr: 'Portfolio Lumière Studio' },
    tags:     { en: ['Portfolio', 'Gallery'], fr: ['Portfolio', 'Galerie'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.construction,
    category: { en: 'Construction', fr: 'Construction' },
    title:    { en: 'Bâtisseurs Nordiques Inc.', fr: 'Bâtisseurs Nordiques Inc.' },
    tags:     { en: ['Corporate', 'Web Design'], fr: ['Corporate', 'Web Design'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.restaurant,
    category: { en: 'Restaurant', fr: 'Restaurant' },
    title:    { en: 'Le Quartier Brasserie', fr: 'Le Quartier Brasserie' },
    tags:     { en: ['Brand Identity', 'Web Design'], fr: ['Image de marque', 'Web Design'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.law,
    category: { en: 'Legal Services', fr: 'Services Juridiques' },
    title:    { en: 'Dubois Legal Group', fr: 'Cabinet Dubois' },
    tags:     { en: ['Law Firm', 'Professional'], fr: ['Cabinet d\'avocats', 'Professionnel'] },
    wide: false,
  },
  {
    img:   null,
    theme: THEMES.beauty,
    category: { en: 'Wellness & Beauty', fr: 'Bien-être & Beauté' },
    title:    { en: 'Éclat Beauty Studio', fr: 'Studio Beauté Éclat' },
    tags:     { en: ['Booking System', 'Branding'], fr: ['Réservation', 'Image de marque'] },
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
        {/* Preview area */}
        <div style={{ position: 'relative', background: '#060d1a', height: '460px', overflow: 'hidden' }}>
          {p.img ? (
            <img src={p.img} alt={p.title[l]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <SiteMockup theme={p.theme!} wide={p.wide} />
          )}
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
        <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
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
              width: i === index ? '20px' : '6px', height: '6px', borderRadius: '3px',
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
function ProjectCard({ project, index, onOpen }: { project: typeof PROJECTS[0]; index: number; onOpen: () => void }) {
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
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
        gridColumn: project.wide ? 'span 2' : 'span 1',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        borderColor: hovered ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? '0 0 0 1px rgba(59,130,246,0.1), 0 16px 48px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      {/* Preview */}
      <div className="portfolio-img" style={{ position: 'relative', overflow: 'hidden', aspectRatio: project.wide ? '21/9' : '16/9' }}>
        {project.img ? (
          <img
            src={project.img}
            alt={project.title[lang as 'en' | 'fr']}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}>
            <SiteMockup theme={project.theme!} wide={project.wide} />
          </div>
        )}

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(6,13,26,0.75) 0%, rgba(37,99,235,0.25) 100%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hovered ? 'scale(1)' : 'scale(0.7)',
            transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <ArrowUpRight size={18} color="#fff" />
          </div>
        </div>

        {/* Category pill */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: 'rgba(6,13,26,0.75)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(59,130,246,0.2)', borderRadius: '100px',
          padding: '4px 10px', fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase', color: '#93c5fd',
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
                  fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px', padding: '3px 8px', letterSpacing: '0.04em',
                }}>{tag}</span>
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

/* ── Section ──────────────────────────────────────────── */
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
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <span className="pill-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>✦ {eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, whiteSpace: 'pre-line', marginBottom: '16px' }}>
            {title.split('\n').map((line, i) =>
              i === 0 ? <span key={i}>{line}</span> : (
                <span key={i}><br /><span style={{ background: 'linear-gradient(135deg,#93c5fd,#bfdbfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{line}</span></span>
              )
            )}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>{sub}</p>
        </motion.div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="portfolio-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title.en} project={p} index={i} onOpen={() => setLightboxIndex(i)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox projects={PROJECTS} index={lightboxIndex} onClose={closeLightbox} onPrev={prevProject} onNext={nextProject} />
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
        }
      `}</style>
    </section>
  );
}
