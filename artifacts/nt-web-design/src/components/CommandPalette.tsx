import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useLanguage } from '@/lib/i18n';
import {
  Search, ArrowRight, CornerDownLeft,
  Layout, Briefcase, Workflow, DollarSign, Cpu, Mail, Shield, Home, Globe,
} from 'lucide-react';

type Item = {
  id: string;
  label: string;
  desc: string;
  group: string;
  icon: typeof Search;
  href: string;
  isAnchor: boolean;
};

interface Props {
  open: boolean;
  onClose: () => void;
}

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function CommandPalette({ open, onClose }: Props) {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const en: Item[] = [
      { id: 'home',       label: 'Home',              desc: 'Go to the top of the homepage',       group: 'Navigate', icon: Home,      href: '/#',          isAnchor: true },
      { id: 'services',   label: 'Services',          desc: 'Web design, dev, eCommerce, AI',      group: 'Sections', icon: Layout,    href: '/#services',  isAnchor: true },
      { id: 'portfolio',  label: 'Portfolio',         desc: 'Selected client work',                group: 'Sections', icon: Briefcase, href: '/#portfolio', isAnchor: true },
      { id: 'process',    label: 'Process',           desc: 'How we deliver in 72 hours',          group: 'Sections', icon: Workflow,  href: '/#process',   isAnchor: true },
      { id: 'pricing',    label: 'Pricing',           desc: 'Plans & engagement options',          group: 'Pages',    icon: DollarSign,href: '/services',   isAnchor: false },
      { id: 'business',   label: 'Business Suite', desc: 'AI revenue engines & enterprise platforms', group: 'Pages',    icon: Cpu,       href: '/business-suite',   isAnchor: false },
      { id: 'toronto',    label: 'Toronto Real Estate', desc: 'Commission Recovery Engine for elite teams', group: 'Pages', icon: DollarSign, href: '/toronto', isAnchor: false },
      { id: 'roi',        label: 'ROI Audit',         desc: 'Calculate your revenue leak',         group: 'Pages',    icon: DollarSign,href: '/roi',              isAnchor: false },
      { id: 'global',     label: 'Global Reach',      desc: 'Operating across 3 continents',       group: 'Sections', icon: Globe,     href: '/#services',  isAnchor: true },
      { id: 'contact',    label: 'Contact',           desc: 'Start a project / get a quote',       group: 'Actions',  icon: Mail,      href: '/#contact',   isAnchor: true },
      { id: 'privacy',    label: 'Privacy Policy',    desc: 'How we handle your data',             group: 'Pages',    icon: Shield,    href: '/privacy',    isAnchor: false },
    ];
    const fr: Item[] = [
      { id: 'home',       label: 'Accueil',                 desc: "Retour en haut de la page",                  group: 'Naviguer', icon: Home,      href: '/#',          isAnchor: true },
      { id: 'services',   label: 'Services',                desc: 'Design web, dev, eCommerce, IA',             group: 'Sections', icon: Layout,    href: '/#services',  isAnchor: true },
      { id: 'portfolio',  label: 'Portfolio',               desc: 'Sélection de projets clients',               group: 'Sections', icon: Briefcase, href: '/#portfolio', isAnchor: true },
      { id: 'process',    label: 'Processus',               desc: 'Comment nous livrons en 72h',                group: 'Sections', icon: Workflow,  href: '/#process',   isAnchor: true },
      { id: 'pricing',    label: 'Tarifs',                  desc: "Forfaits et options d'engagement",           group: 'Pages',    icon: DollarSign,href: '/services',   isAnchor: false },
      { id: 'business',   label: 'Business Suite',          desc: 'Moteurs IA & plateformes entreprise',        group: 'Pages',    icon: Cpu,       href: '/business-suite', isAnchor: false },
      { id: 'toronto',    label: 'Toronto Immobilier',      desc: 'Moteur de récupération de commissions',      group: 'Pages',    icon: DollarSign, href: '/toronto', isAnchor: false },
      { id: 'roi',        label: 'Audit ROI',               desc: 'Calculez votre fuite de revenus',            group: 'Pages',    icon: DollarSign,href: '/roi',              isAnchor: false },
      { id: 'global',     label: 'Portée Mondiale',         desc: 'Opérations sur 3 continents',                group: 'Sections', icon: Globe,     href: '/#services',  isAnchor: true },
      { id: 'contact',    label: 'Contact',                 desc: 'Démarrer un projet / obtenir un devis',      group: 'Actions',  icon: Mail,      href: '/#contact',   isAnchor: true },
      { id: 'privacy',    label: 'Politique de Confidentialité', desc: 'Comment nous traitons vos données',     group: 'Pages',    icon: Shield,    href: '/privacy',    isAnchor: false },
    ];
    return lang === 'fr' ? fr : en;
  }, [lang]);

  /* Filter on label + desc + group */
  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const needle = q.toLowerCase();
    return items.filter(i =>
      i.label.toLowerCase().includes(needle) ||
      i.desc.toLowerCase().includes(needle) ||
      i.group.toLowerCase().includes(needle)
    );
  }, [items, q]);

  /* Group results for display */
  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach(it => {
      if (!map.has(it.group)) map.set(it.group, []);
      map.get(it.group)!.push(it);
    });
    return Array.from(map.entries());
  }, [filtered]);

  /* Reset when opening */
  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      // Defer focus until after the modal is mounted & animated in
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  /* Reset active index when filter changes */
  useEffect(() => { setActive(0); }, [q]);

  const runItem = useCallback((it: Item) => {
    onClose();
    if (it.isAnchor) {
      const targetId = it.href.replace('/#', '');
      // If we're not on home, navigate first then scroll
      if (window.location.pathname.replace(/\/$/, '') !== (import.meta.env.BASE_URL || '/').replace(/\/$/, '')) {
        navigate('/');
        setTimeout(() => smoothScrollTo(targetId || 'top'), 80);
      } else {
        if (targetId) smoothScrollTo(targetId);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(it.href);
    }
  }, [navigate, onClose]);

  /* Keyboard nav inside the palette */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(a => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(a => Math.max(a - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const it = filtered[active];
        if (it) runItem(it);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, active, onClose, runItem]);

  /* Build a flat index → grouped index map so highlight tracks correctly */
  let runningIndex = -1;

  const placeholder = lang === 'fr' ? 'Rechercher des sections, pages, actions…' : 'Search sections, pages, actions…';
  const emptyText   = lang === 'fr' ? 'Aucun résultat' : 'No results';
  const hintNav     = lang === 'fr' ? 'naviguer'   : 'to navigate';
  const hintSel     = lang === 'fr' ? 'sélectionner': 'to select';
  const hintClose   = lang === 'fr' ? 'fermer'     : 'to close';

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          />
          <div style={{
            position: 'fixed', inset: 0, zIndex: 301,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: '12vh', padding: '12vh 16px 16px',
            pointerEvents: 'none',
          }}>
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                pointerEvents: 'auto',
                width: '100%', maxWidth: '620px',
                background: 'rgba(10,14,24,0.92)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                boxShadow: '0 30px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.06)',
                overflow: 'hidden',
                backdropFilter: 'blur(28px) saturate(140%)',
                WebkitBackdropFilter: 'blur(28px) saturate(140%)',
              }}
            >
              {/* Search input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Search size={18} color="rgba(255,255,255,0.4)" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={placeholder}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    color: '#fff', fontSize: '15px', fontFamily: 'inherit',
                  }}
                />
                <kbd style={{
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
                  padding: '3px 7px', borderRadius: '6px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.5)', fontFamily: 'inherit',
                }}>ESC</kbd>
              </div>

              {/* Results */}
              <div style={{ maxHeight: '52vh', overflowY: 'auto', padding: '8px' }}>
                {filtered.length === 0 && (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                    {emptyText}
                  </div>
                )}
                {grouped.map(([group, list]) => (
                  <div key={group} style={{ marginBottom: '4px' }}>
                    <div style={{
                      padding: '10px 14px 6px',
                      fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.32)',
                    }}>{group}</div>
                    {list.map((it) => {
                      runningIndex += 1;
                      const isActive = runningIndex === active;
                      const idx = runningIndex;
                      return (
                        <button
                          key={it.id}
                          onMouseMove={() => setActive(idx)}
                          onClick={() => runItem(it)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '14px', width: '100%',
                            padding: '10px 14px', borderRadius: '10px', border: 'none',
                            background: isActive ? 'rgba(59,130,246,0.14)' : 'transparent',
                            color: '#fff', textAlign: 'left', cursor: 'pointer',
                            transition: 'background 0.12s',
                          }}
                        >
                          <div style={{
                            width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
                            background: isActive ? 'rgba(59,130,246,0.22)' : 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: isActive ? '#93c5fd' : 'rgba(255,255,255,0.6)',
                          }}>
                            <it.icon size={16} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{it.label}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.desc}</div>
                          </div>
                          {isActive && <ArrowRight size={14} color="rgba(147,197,253,0.8)" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer hints */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.06)',
                fontSize: '11px', color: 'rgba(255,255,255,0.4)', gap: '16px', flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <span style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                    <Kbd>↑</Kbd><Kbd>↓</Kbd> {hintNav}
                  </span>
                  <span style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                    <Kbd><CornerDownLeft size={10} /></Kbd> {hintSel}
                  </span>
                  <span style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                    <Kbd>esc</Kbd> {hintClose}
                  </span>
                </div>
                <span style={{ fontWeight: 600, letterSpacing: '0.04em', color: 'rgba(147,197,253,0.6)' }}>NT · ⌘K</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: '18px', height: '18px', padding: '0 5px',
      fontSize: '10px', fontWeight: 600, fontFamily: 'inherit',
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '4px', color: 'rgba(255,255,255,0.55)',
    }}>{children}</kbd>
  );
}
