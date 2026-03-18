import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const css = `
  .sp-root {
    background: #060A14;
    color: #D8E8FF;
    overflow-x: hidden;
    min-height: 100vh;
  }

  .sp-section { position: relative; z-index: 1; }

  .sp-section-label {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    color: #00AADD;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    font-weight: 700;
  }
  .sp-section-label::before {
    content: '';
    width: 32px;
    height: 2px;
    background: #00AADD;
    flex-shrink: 0;
  }

  .sp-section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: #D8E8FF;
  }
  .sp-section-title span { color: #00AADD; }

  /* ── SERVICES & PRICING ── */
  #sp-services {
    padding: 140px 5% 120px;
    background: #060A14;
  }

  .sp-services-header { max-width: 600px; margin-bottom: 80px; animation: spFadeUp 0.7s ease both; }
  .sp-services-header p { margin-top: 20px; color: #5A7DB5; font-size: 1rem; line-height: 1.7; }

  .sp-pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1px;
    max-width: 1100px;
    background: rgba(0,140,255,0.12);
    animation: spFadeUp 0.7s ease both;
    animation-delay: 0.15s;
  }

  .sp-plan {
    background: #07101F;
    border: 1px solid rgba(0,140,255,0.12);
    padding: 48px 40px;
    position: relative;
    transition: border-color 0.3s, transform 0.3s, background 0.3s;
    overflow: hidden;
  }
  .sp-plan::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00AADD, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .sp-plan:hover { border-color: rgba(0,170,221,0.4); transform: translateY(-4px); background: #0A1628; }
  .sp-plan:hover::before { opacity: 1; }

  .sp-plan.featured { background: #0A1628; border-color: rgba(0,170,221,0.35); }
  .sp-plan.featured::before { opacity: 1; }

  .sp-plan-badge {
    display: inline-block;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    background: #00AADD;
    color: #060A14;
    padding: 4px 12px;
    text-transform: uppercase;
    margin-bottom: 24px;
    font-weight: 800;
  }

  .sp-plan-name {
    font-size: 1.1rem; font-weight: 700; letter-spacing: 0.08em;
    color: #5A7DB5; text-transform: uppercase; margin-bottom: 8px;
  }
  .sp-plan-price {
    font-size: 3rem; font-weight: 800;
    color: #D8E8FF; line-height: 1; margin-bottom: 4px;
  }
  .sp-plan-price sup { font-size: 1.2rem; vertical-align: super; color: #00AADD; }
  .sp-plan-cycle {
    font-size: 0.8rem; color: #5A7DB5;
    margin-bottom: 32px; letter-spacing: 0.05em;
  }

  .sp-plan-features { list-style: none; margin-bottom: 40px; }
  .sp-plan-features li {
    padding: 10px 0; border-bottom: 1px solid rgba(0,140,255,0.1);
    font-size: 0.9rem; color: #A8C4E0;
    display: flex; align-items: center; gap: 12px;
  }
  .sp-plan-features li::before {
    content: '→'; color: #00AADD;
    font-size: 0.8rem; flex-shrink: 0;
  }

  .sp-btn-plan {
    display: block; text-align: center; padding: 14px 0;
    border: 1px solid rgba(0,170,221,0.4); color: #00AADD;
    font-size: 0.75rem; letter-spacing: 0.15em;
    text-transform: uppercase; text-decoration: none;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    cursor: pointer; background: transparent; width: 100%; font-weight: 700;
  }
  .sp-btn-plan:hover, .sp-plan.featured .sp-btn-plan {
    background: #00AADD; color: #060A14; border-color: #00AADD;
  }

  /* ── PORTFOLIO ── */
  #sp-portfolio {
    padding: 120px 5% 140px;
    background: #07101F;
    border-top: 1px solid rgba(0,140,255,0.12);
  }

  .sp-portfolio-header { max-width: 600px; margin-bottom: 80px; animation: spFadeUp 0.7s ease both; }
  .sp-portfolio-header p { margin-top: 20px; color: #5A7DB5; font-size: 1rem; line-height: 1.7; }

  .sp-portfolio-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 1px;
    max-width: 1100px;
    background: rgba(0,140,255,0.12);
    animation: spFadeUp 0.7s ease both;
    animation-delay: 0.15s;
  }

  .sp-portfolio-item {
    position: relative; overflow: hidden;
    background: #0A1628; border: 1px solid rgba(0,140,255,0.1);
    cursor: pointer;
  }
  .sp-portfolio-item:first-child { grid-row: span 2; }

  .sp-portfolio-visual {
    width: 100%; height: 100%; min-height: 240px;
    display: flex; align-items: stretch;
    position: relative; overflow: hidden;
  }

  .sp-mock-site {
    width: 100%; height: 100%; padding: 24px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .sp-mock-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .sp-mock-logo-bar { width: 60px; height: 8px; border-radius: 2px; }
  .sp-mock-nav-links { display: flex; gap: 8px; }
  .sp-mock-nav-links span { width: 24px; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.1); }
  .sp-mock-hero-txt { margin-top: 16px; display: flex; flex-direction: column; gap: 6px; }
  .sp-mock-h1 { height: 12px; width: 70%; border-radius: 2px; }
  .sp-mock-h1-2 { height: 12px; width: 50%; border-radius: 2px; }
  .sp-mock-p { height: 6px; width: 85%; border-radius: 2px; background: rgba(255,255,255,0.06); margin-top: 6px; }
  .sp-mock-p2 { height: 6px; width: 65%; border-radius: 2px; background: rgba(255,255,255,0.04); }
  .sp-mock-btn { width: 64px; height: 20px; border-radius: 2px; margin-top: 12px; }
  .sp-mock-cards { display: flex; gap: 8px; margin-top: 16px; }
  .sp-mock-card { flex: 1; height: 48px; border-radius: 4px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); }

  /* Mock site colour themes */
  .sp-theme-cyan { background: #060e16; }
  .sp-theme-cyan .sp-mock-logo-bar { background: #00AADD; }
  .sp-theme-cyan .sp-mock-h1 { background: #00AADD; }
  .sp-theme-cyan .sp-mock-h1-2 { background: #005FA3; }
  .sp-theme-cyan .sp-mock-btn { background: #00AADD; }

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
  .sp-theme-clean .sp-mock-p { background: rgba(0,0,0,0.07); }
  .sp-theme-clean .sp-mock-p2 { background: rgba(0,0,0,0.04); }
  .sp-theme-clean .sp-mock-card { background: rgba(0,0,0,0.03); border-color: rgba(0,0,0,0.07); }
  .sp-theme-clean .sp-mock-nav-links span { background: rgba(0,0,0,0.12); }

  /* Hover overlay */
  .sp-portfolio-overlay {
    position: absolute; inset: 0;
    background: rgba(6,10,20,0.88);
    display: flex; flex-direction: column;
    justify-content: flex-end; padding: 32px;
    opacity: 0; transition: opacity 0.35s;
    border-top: 2px solid #00AADD;
  }
  .sp-portfolio-item:hover .sp-portfolio-overlay { opacity: 1; }

  .sp-portfolio-tag {
    font-size: 0.65rem; letter-spacing: 0.2em;
    color: #00AADD; text-transform: uppercase; margin-bottom: 8px; font-weight: 700;
  }
  .sp-portfolio-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; color: #D8E8FF; }
  .sp-portfolio-desc { font-size: 0.85rem; color: #5A7DB5; line-height: 1.5; }

  .sp-portfolio-arrow {
    position: absolute; top: 24px; right: 24px;
    width: 36px; height: 36px;
    border: 1px solid rgba(0,170,221,0.35);
    display: flex; align-items: center; justify-content: center;
    color: #00AADD; font-size: 1rem; transition: background 0.2s;
  }
  .sp-portfolio-item:hover .sp-portfolio-arrow {
    background: #00AADD; color: #060A14; border-color: #00AADD;
  }

  /* CTA bar */
  .sp-portfolio-cta { margin-top: 48px; display: flex; align-items: center; gap: 24px; }
  .sp-cta-text { font-size: 0.9rem; color: #5A7DB5; }

  .sp-btn-cta {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 14px 28px; background: transparent;
    border: 1px solid rgba(0,170,221,0.4); color: #00AADD;
    font-size: 0.72rem; letter-spacing: 0.15em; font-weight: 700;
    text-transform: uppercase; text-decoration: none;
    transition: all 0.2s; cursor: pointer;
  }
  .sp-btn-cta:hover { background: #00AADD; color: #060A14; border-color: #00AADD; }

  @media (max-width: 768px) {
    .sp-portfolio-grid { grid-template-columns: 1fr; }
    .sp-portfolio-item:first-child { grid-row: span 1; }
    .sp-pricing-grid { grid-template-columns: 1fr; }
    .sp-portfolio-overlay {
      opacity: 1;
      background: linear-gradient(to top, rgba(6,10,20,0.95) 0%, transparent 60%);
      border-top: none;
    }
  }

  @keyframes spFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const THEMES = ['sp-theme-cyan', 'sp-theme-blue', 'sp-theme-clean'];

export default function ServicesPortfolio() {
  const { t } = useLanguage();

  const svc = t('portfolio.services') as any;
  const work = t('portfolio.work') as any;
  const plans: any[] = svc.plans;
  const items: any[] = work.items;

  return (
    <>
      <style>{css}</style>
      <div className="sp-root">
        <Navbar />

        {/* ── SERVICES & PRICING ── */}
        <section className="sp-section" id="sp-services">
          <div className="sp-services-header">
            <div className="sp-section-label">{svc.eyebrow}</div>
            <h2 className="sp-section-title">
              {svc.title1}<br /><span>{svc.title2}</span>
            </h2>
            <p>{svc.desc}</p>
          </div>

          <div className="sp-pricing-grid">
            {plans.map((plan) => (
              <div key={plan.name} className={`sp-plan${plan.featured ? ' featured' : ''}`}>
                {plan.badge && <div className="sp-plan-badge">{plan.badge}</div>}
                <div className="sp-plan-name">{plan.name}</div>
                <div className="sp-plan-price"><sup>$</sup>{plan.price}</div>
                <div className="sp-plan-cycle">{plan.cycle}</div>
                <ul className="sp-plan-features">
                  {plan.features.map((f: string) => <li key={f}>{f}</li>)}
                </ul>
                <a href="/#contact" className="sp-btn-plan">{plan.cta}</a>
              </div>
            ))}
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="sp-section" id="sp-portfolio">
          <div className="sp-portfolio-header">
            <div className="sp-section-label">{work.eyebrow}</div>
            <h2 className="sp-section-title">
              {work.title1}<br /><span>{work.title2}</span>
            </h2>
            <p>{work.desc}</p>
          </div>

          <div className="sp-portfolio-grid">
            {items.map((item, i) => (
              <div key={item.title} className="sp-portfolio-item">
                <div className="sp-portfolio-visual">
                  <div className={`sp-mock-site ${THEMES[i]}`}>
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
            <p className="sp-cta-text">{work.ctaText}</p>
            <a href="/#contact" className="sp-btn-cta">{work.ctaBtn}</a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
