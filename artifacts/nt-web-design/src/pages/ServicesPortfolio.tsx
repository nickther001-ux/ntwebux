import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

  .sp-root {
    --gold: #C9A84C;
    --gold-light: #E8C96B;
    --gold-dim: #7a6230;
    --bg: #080808;
    --bg2: #0e0e0e;
    --bg3: #141414;
    --text: #e8e0cc;
    --text-dim: #7a7060;
    --border: rgba(201,168,76,0.15);
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
  }

  .sp-noise::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .sp-section { position: relative; z-index: 1; }

  .sp-section-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    color: var(--gold);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .sp-section-label::before {
    content: '';
    width: 32px;
    height: 1px;
    background: var(--gold);
  }

  .sp-section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }
  .sp-section-title span { color: var(--gold); }

  /* SERVICES */
  #sp-services {
    padding: 140px 5% 140px;
    background: var(--bg);
  }

  .sp-services-header { max-width: 600px; margin-bottom: 80px; }
  .sp-services-header p { margin-top: 20px; color: var(--text-dim); font-size: 1rem; line-height: 1.7; }

  .sp-pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2px;
    max-width: 1100px;
    animation: spFadeUp 0.8s ease both;
    animation-delay: 0.2s;
  }

  .sp-plan {
    background: var(--bg2);
    border: 1px solid var(--border);
    padding: 48px 40px;
    position: relative;
    transition: border-color 0.3s, transform 0.3s;
    overflow: hidden;
  }
  .sp-plan::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .sp-plan:hover { border-color: var(--gold-dim); transform: translateY(-4px); }
  .sp-plan:hover::before { opacity: 1; }

  .sp-plan.featured { background: var(--bg3); border-color: var(--gold-dim); }
  .sp-plan.featured::before { opacity: 1; }

  .sp-plan-badge {
    display: inline-block;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    background: var(--gold);
    color: #000;
    padding: 4px 12px;
    text-transform: uppercase;
    margin-bottom: 24px;
    font-weight: 700;
  }

  .sp-plan-name {
    font-size: 1.1rem; font-weight: 700; letter-spacing: 0.05em;
    color: var(--text-dim); text-transform: uppercase; margin-bottom: 8px;
  }
  .sp-plan-price {
    font-family: 'Space Mono', monospace;
    font-size: 3rem; font-weight: 700;
    color: var(--gold-light); line-height: 1; margin-bottom: 4px;
  }
  .sp-plan-price sup { font-size: 1.2rem; vertical-align: super; }
  .sp-plan-cycle {
    font-size: 0.8rem; color: var(--text-dim);
    font-family: 'Space Mono', monospace; margin-bottom: 32px;
  }

  .sp-plan-features { list-style: none; margin-bottom: 40px; }
  .sp-plan-features li {
    padding: 10px 0; border-bottom: 1px solid var(--border);
    font-size: 0.9rem; color: var(--text);
    display: flex; align-items: center; gap: 12px;
  }
  .sp-plan-features li::before {
    content: '→'; color: var(--gold);
    font-family: 'Space Mono', monospace; font-size: 0.8rem; flex-shrink: 0;
  }

  .sp-btn-plan {
    display: block; text-align: center; padding: 14px 0;
    border: 1px solid var(--gold-dim); color: var(--gold-light);
    font-family: 'Space Mono', monospace; font-size: 0.75rem;
    letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none;
    transition: background 0.2s, color 0.2s; cursor: pointer; background: transparent;
    width: 100%;
  }
  .sp-btn-plan:hover, .sp-plan.featured .sp-btn-plan {
    background: var(--gold); color: #000; border-color: var(--gold);
  }

  /* PORTFOLIO */
  #sp-portfolio {
    padding: 120px 5% 140px;
    background: var(--bg2);
    border-top: 1px solid var(--border);
  }

  .sp-portfolio-header { max-width: 600px; margin-bottom: 80px; }
  .sp-portfolio-header p { margin-top: 20px; color: var(--text-dim); font-size: 1rem; line-height: 1.7; }

  .sp-portfolio-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 2px;
    max-width: 1100px;
    animation: spFadeUp 0.8s ease both;
    animation-delay: 0.2s;
  }

  .sp-portfolio-item {
    position: relative; overflow: hidden;
    background: var(--bg3); border: 1px solid var(--border);
    cursor: pointer;
  }
  .sp-portfolio-item:first-child { grid-row: span 2; }

  .sp-portfolio-visual {
    width: 100%; height: 100%; min-height: 240px;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }

  .sp-mock-site {
    width: 100%; height: 100%; padding: 24px;
    display: flex; flex-direction: column; gap: 8px; position: relative;
  }
  .sp-mock-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .sp-mock-logo-bar { width: 60px; height: 8px; border-radius: 2px; }
  .sp-mock-nav-links { display: flex; gap: 8px; }
  .sp-mock-nav-links span { width: 24px; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.15); }
  .sp-mock-hero-txt { margin-top: 16px; display: flex; flex-direction: column; gap: 6px; }
  .sp-mock-h1 { height: 12px; width: 70%; border-radius: 2px; }
  .sp-mock-h1-2 { height: 12px; width: 50%; border-radius: 2px; }
  .sp-mock-p { height: 6px; width: 85%; border-radius: 2px; background: rgba(255,255,255,0.08); margin-top: 6px; }
  .sp-mock-p2 { height: 6px; width: 65%; border-radius: 2px; background: rgba(255,255,255,0.06); }
  .sp-mock-btn { width: 64px; height: 20px; border-radius: 2px; margin-top: 12px; }
  .sp-mock-cards { display: flex; gap: 8px; margin-top: 16px; }
  .sp-mock-card { flex: 1; height: 48px; border-radius: 4px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }

  .sp-theme-dark-gold { background: #0a0a0a; }
  .sp-theme-dark-gold .sp-mock-logo-bar { background: #C9A84C; }
  .sp-theme-dark-gold .sp-mock-h1 { background: #E8C96B; }
  .sp-theme-dark-gold .sp-mock-h1-2 { background: #7a6230; }
  .sp-theme-dark-gold .sp-mock-btn { background: #C9A84C; }

  .sp-theme-blue { background: #08101a; }
  .sp-theme-blue .sp-mock-logo-bar { background: #4A9EFF; }
  .sp-theme-blue .sp-mock-h1 { background: #4A9EFF; }
  .sp-theme-blue .sp-mock-h1-2 { background: #1a5fa8; }
  .sp-theme-blue .sp-mock-btn { background: #4A9EFF; }

  .sp-theme-clean { background: #f8f6f1; }
  .sp-theme-clean .sp-mock-logo-bar { background: #1a1a1a; }
  .sp-theme-clean .sp-mock-h1 { background: #1a1a1a; }
  .sp-theme-clean .sp-mock-h1-2 { background: #555; }
  .sp-theme-clean .sp-mock-btn { background: #222; }
  .sp-theme-clean .sp-mock-nav { border-color: rgba(0,0,0,0.1); }
  .sp-theme-clean .sp-mock-p { background: rgba(0,0,0,0.08); }
  .sp-theme-clean .sp-mock-p2 { background: rgba(0,0,0,0.05); }
  .sp-theme-clean .sp-mock-card { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.08); }
  .sp-theme-clean .sp-mock-nav-links span { background: rgba(0,0,0,0.15); }

  .sp-portfolio-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.85);
    display: flex; flex-direction: column;
    justify-content: flex-end; padding: 32px;
    opacity: 0; transition: opacity 0.35s;
  }
  .sp-portfolio-item:hover .sp-portfolio-overlay { opacity: 1; }

  .sp-portfolio-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem; letter-spacing: 0.2em;
    color: #C9A84C; text-transform: uppercase; margin-bottom: 8px;
  }
  .sp-portfolio-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; color: #fff; }
  .sp-portfolio-desc { font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.5; }

  .sp-portfolio-arrow {
    position: absolute; top: 24px; right: 24px;
    width: 36px; height: 36px;
    border: 1px solid #7a6230;
    display: flex; align-items: center; justify-content: center;
    color: #C9A84C; font-size: 1rem; transition: background 0.2s;
  }
  .sp-portfolio-item:hover .sp-portfolio-arrow {
    background: #C9A84C; color: #000; border-color: #C9A84C;
  }

  .sp-portfolio-cta { margin-top: 48px; display: flex; align-items: center; gap: 24px; }
  .sp-cta-text { font-size: 0.9rem; color: var(--text-dim); }

  .sp-btn-cta {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 14px 28px; background: transparent;
    border: 1px solid var(--gold-dim); color: var(--gold-light);
    font-family: 'Space Mono', monospace; font-size: 0.72rem;
    letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none;
    transition: all 0.2s; cursor: pointer;
  }
  .sp-btn-cta:hover { background: var(--gold); color: #000; border-color: var(--gold); }

  @media (max-width: 768px) {
    .sp-portfolio-grid { grid-template-columns: 1fr; }
    .sp-portfolio-item:first-child { grid-row: span 1; }
    .sp-pricing-grid { grid-template-columns: 1fr; }
    .sp-portfolio-overlay {
      opacity: 1;
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%);
    }
  }

  @keyframes spFadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .sp-services-header { animation: spFadeUp 0.8s ease both; }
  .sp-portfolio-header { animation: spFadeUp 0.8s ease both; }
`;

const plans = [
  {
    name: 'Lancement',
    price: '1 500',
    cycle: 'Paiement unique',
    features: [
      'Site 5 pages responsive',
      'Design personnalisé',
      'SEO de base intégré',
      'Formulaire de contact',
      'Déploiement inclus',
      'Formation 1h incluse',
    ],
    cta: 'Démarrer',
    featured: false,
  },
  {
    name: 'Maintenance',
    price: '500',
    cycle: '/ mois',
    badge: 'Le plus populaire',
    features: [
      'Hébergement & domaine géré',
      'Mises à jour illimitées',
      'Sécurité & backups',
      'Support prioritaire 48h',
      'Rapport mensuel Analytics',
      'Optimisation continue',
    ],
    cta: 'Commencer',
    featured: true,
  },
  {
    name: 'Pack Complet',
    price: '997',
    cycle: '+ $500 / mois',
    features: [
      'Site complet (Lancement)',
      'Maintenance mensuelle incluse',
      'SEO avancé & Google Ads setup',
      'Contenu mensuel (2 articles)',
      'Support WhatsApp direct',
      'Révisions illimitées (1re année)',
    ],
    cta: 'Obtenir ce pack',
    featured: false,
  },
];

const portfolioItems = [
  {
    theme: 'sp-theme-dark-gold',
    tag: 'Excavation & Construction',
    title: 'Excavation Tremblay Inc.',
    desc: 'Site vitrine bilingue avec formulaire de soumission et galerie de projets.',
    large: true,
  },
  {
    theme: 'sp-theme-blue',
    tag: 'Clinique Santé',
    title: 'Physio Optimal',
    desc: 'Prise de rendez-vous en ligne intégrée et SEO local optimisé.',
    large: false,
  },
  {
    theme: 'sp-theme-clean',
    tag: 'Restaurant & Traiteur',
    title: "Saveurs d'Haïti MTL",
    desc: 'Menu en ligne, réservations et commandes à emporter intégrés.',
    large: false,
  },
];

export default function ServicesPortfolio() {
  const { lang } = useLanguage();

  return (
    <>
      <style>{css}</style>
      <div className="sp-root sp-noise">
        <Navbar />

        {/* ── SERVICES & PRICING ── */}
        <section className="sp-section" id="sp-services">
          <div className="sp-services-header">
            <div className="sp-section-label">Services &amp; Tarifs</div>
            <h2 className="sp-section-title">
              Des offres claires,<br /><span>sans surprise</span>
            </h2>
            <p>Chaque forfait inclut l'hébergement, la maintenance et le support. Vous payez une fois, on s'occupe du reste.</p>
          </div>

          <div className="sp-pricing-grid">
            {plans.map((plan) => (
              <div key={plan.name} className={`sp-plan${plan.featured ? ' featured' : ''}`}>
                {plan.badge && <div className="sp-plan-badge">{plan.badge}</div>}
                <div className="sp-plan-name">{plan.name}</div>
                <div className="sp-plan-price"><sup>$</sup>{plan.price}</div>
                <div className="sp-plan-cycle">{plan.cycle}</div>
                <ul className="sp-plan-features">
                  {plan.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a href="/#contact" className="sp-btn-plan">{plan.cta}</a>
              </div>
            ))}
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="sp-section" id="sp-portfolio">
          <div className="sp-portfolio-header">
            <div className="sp-section-label">Réalisations</div>
            <h2 className="sp-section-title">
              Ce qu'on a<br /><span>construit</span>
            </h2>
            <p>Chaque projet est unique, conçu pour refléter l'identité du client et convertir les visiteurs en clients.</p>
          </div>

          <div className="sp-portfolio-grid">
            {portfolioItems.map((item) => (
              <div key={item.title} className="sp-portfolio-item">
                <div className="sp-portfolio-visual">
                  <div className={`sp-mock-site ${item.theme}`}>
                    <div className="sp-mock-nav">
                      <div className="sp-mock-logo-bar"></div>
                      <div className="sp-mock-nav-links">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                    <div className="sp-mock-hero-txt">
                      <div className="sp-mock-h1"></div>
                      <div className="sp-mock-h1-2"></div>
                      <div className="sp-mock-p"></div>
                      <div className="sp-mock-p2"></div>
                      <div className="sp-mock-btn"></div>
                    </div>
                    {item.large && (
                      <div className="sp-mock-cards">
                        <div className="sp-mock-card"></div>
                        <div className="sp-mock-card"></div>
                        <div className="sp-mock-card"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="sp-portfolio-overlay">
                  <div className="sp-portfolio-arrow">→</div>
                  <div className="sp-portfolio-tag">{item.tag}</div>
                  <div className="sp-portfolio-title">{item.title}</div>
                  <div className="sp-portfolio-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sp-portfolio-cta">
            <p className="sp-cta-text">Un projet en tête ?</p>
            <a href="/#contact" className="sp-btn-cta">Discutons-en →</a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
