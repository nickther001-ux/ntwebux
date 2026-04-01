import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Globe, Wrench, Package, Building2, Bot } from 'lucide-react';

const css = `
  .sp-root {
    background: #060A14;
    color: #D8E8FF;
    overflow-x: hidden;
    min-height: 100vh;
  }
  .sp-section { position: relative; z-index: 1; }

  .sp-label {
    font-size: 0.7rem; letter-spacing: 0.3em; color: #00AADD;
    text-transform: uppercase; display: flex; align-items: center;
    gap: 12px; margin-bottom: 16px; font-weight: 700;
  }
  .sp-label::before { content:''; width:32px; height:2px; background:#00AADD; flex-shrink:0; }

  .sp-title {
    font-size: clamp(2rem,5vw,3.5rem); font-weight:800;
    line-height:1.05; letter-spacing:-0.02em; color:#D8E8FF;
  }
  .sp-title span { color:#00AADD; }

  /* ── PRICING ── */
  #sp-services { padding: 140px 5% 120px; background:#060A14; }
  .sp-svc-header { max-width:600px; margin-bottom:80px; animation:spUp .7s ease both; }
  .sp-svc-header p { margin-top:20px; color:#5A7DB5; font-size:1rem; line-height:1.7; }

  .sp-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
    gap:1px; max-width:1100px; background:rgba(0,140,255,.12);
    animation:spUp .7s ease .15s both;
  }

  .sp-plan {
    background:#07101F; padding:48px 40px; position:relative;
    transition:border-color .3s,transform .3s,background .3s;
    overflow:hidden; display:flex; flex-direction:column;
  }
  .sp-plan::before {
    content:''; position:absolute; top:0;left:0;right:0; height:2px;
    background:linear-gradient(90deg,transparent,#00AADD,transparent);
    opacity:0; transition:opacity .3s;
  }
  .sp-plan:hover { transform:translateY(-4px); background:#0A1628; }
  .sp-plan:hover::before, .sp-plan.featured::before { opacity:1; }
  .sp-plan.featured { background:#0A1628; }

  .sp-badge {
    display:inline-block; font-size:.65rem; letter-spacing:.2em;
    background:#00AADD; color:#060A14; padding:4px 12px;
    text-transform:uppercase; margin-bottom:24px; font-weight:800;
    align-self:flex-start;
  }
  .sp-plan-icon {
    width:44px; height:44px; border-radius:8px;
    background:rgba(0,170,221,.1); border:1px solid rgba(0,170,221,.2);
    display:flex; align-items:center; justify-content:center;
    color:#00AADD; margin-bottom:20px;
  }
  .sp-plan-name { font-size:1.1rem; font-weight:700; letter-spacing:.08em; color:#5A7DB5; text-transform:uppercase; margin-bottom:8px; }
  .sp-plan-price { font-size:3rem; font-weight:800; color:#D8E8FF; line-height:1; margin-bottom:4px; }
  .sp-plan-price sup { font-size:1.2rem; vertical-align:super; color:#00AADD; }
  .sp-plan-cycle { font-size:.8rem; color:#5A7DB5; margin-bottom:32px; letter-spacing:.05em; }

  .sp-features { list-style:none; margin-bottom:auto; padding-bottom:32px; }
  .sp-features li {
    padding:10px 0; border-bottom:1px solid rgba(0,140,255,.1);
    font-size:.9rem; color:#A8C4E0; display:flex; align-items:center; gap:12px;
  }
  .sp-features li::before { content:'→'; color:#00AADD; font-size:.8rem; flex-shrink:0; }

  .sp-btn-row { display:flex; flex-direction:column; gap:10px; margin-top:8px; }

  .sp-btn-contact {
    display:block; text-align:center; padding:13px 0;
    border:1px solid rgba(0,170,221,.4); color:#00AADD;
    font-size:.75rem; letter-spacing:.15em; text-transform:uppercase;
    text-decoration:none; transition:background .2s,color .2s,border-color .2s;
    cursor:pointer; background:transparent; width:100%; font-weight:700;
  }
  .sp-btn-contact:hover { background:rgba(0,170,221,.1); border-color:#00AADD; }

  .sp-btn-buy {
    display:block; text-align:center; padding:13px 0;
    background:#00AADD; color:#060A14; border:1px solid #00AADD;
    font-size:.75rem; letter-spacing:.15em; text-transform:uppercase;
    text-decoration:none; font-weight:800; cursor:pointer;
    transition:background .2s,box-shadow .2s;
  }
  .sp-btn-buy:hover { background:#00C4FF; box-shadow:0 4px 20px rgba(0,170,221,.35); }

  /* ── PORTFOLIO ── */
  #sp-portfolio {
    padding:120px 5% 140px; background:#07101F;
    border-top:1px solid rgba(0,140,255,.12);
  }
  .sp-port-header { max-width:600px; margin-bottom:80px; animation:spUp .7s ease both; }
  .sp-port-header p { margin-top:20px; color:#5A7DB5; font-size:1rem; line-height:1.7; }

  .sp-port-grid {
    display:grid; grid-template-columns:1.6fr 1fr;
    gap:1px; max-width:1100px; background:rgba(0,140,255,.12);
    animation:spUp .7s ease .15s both;
  }
  .sp-port-item:first-child { grid-row:span 2; }

  .sp-port-item {
    background:#0A1628; padding:48px 40px;
    position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:space-between;
    min-height:260px;
    transition:background .3s;
  }
  .sp-port-item:hover { background:#0D1E38; }
  .sp-port-item::after {
    content:''; position:absolute; bottom:0; left:0;
    width:0; height:2px; background:#00AADD;
    transition:width .4s ease;
  }
  .sp-port-item:hover::after { width:100%; }

  .sp-port-num {
    position:absolute; top:32px; right:32px;
    font-size:5rem; font-weight:800; line-height:1;
    color:rgba(0,170,221,.06); pointer-events:none; letter-spacing:-.04em;
    user-select:none;
  }

  .sp-port-top { position:relative; z-index:1; }
  .sp-port-tag {
    display:inline-block; font-size:.65rem; letter-spacing:.2em;
    color:#00AADD; text-transform:uppercase; font-weight:700;
    border:1px solid rgba(0,170,221,.25); padding:3px 10px;
    margin-bottom:20px; background:rgba(0,170,221,.05);
  }
  .sp-port-title { font-size:1.5rem; font-weight:800; color:#D8E8FF; margin-bottom:12px; line-height:1.2; }
  .sp-port-desc { font-size:.9rem; color:#5A7DB5; line-height:1.65; }

  .sp-port-arrow {
    position:absolute; bottom:32px; right:32px;
    width:34px; height:34px; border:1px solid rgba(0,170,221,.3);
    display:flex; align-items:center; justify-content:center;
    color:#00AADD; font-size:1rem;
    transition:background .2s,border-color .2s;
  }
  .sp-port-item:hover .sp-port-arrow { background:#00AADD; color:#060A14; border-color:#00AADD; }

  .sp-port-cta { margin-top:48px; display:flex; align-items:center; gap:24px; }
  .sp-port-cta-txt { font-size:.9rem; color:#5A7DB5; }
  .sp-btn-cta {
    display:inline-flex; align-items:center; gap:12px; padding:14px 28px;
    background:transparent; border:1px solid rgba(0,170,221,.4); color:#00AADD;
    font-size:.72rem; letter-spacing:.15em; font-weight:700;
    text-transform:uppercase; text-decoration:none; transition:all .2s;
  }
  .sp-btn-cta:hover { background:#00AADD; color:#060A14; border-color:#00AADD; }

  @media(max-width:768px){
    .sp-port-grid { grid-template-columns:1fr; }
    .sp-port-item:first-child { grid-row:span 1; }
    .sp-grid { grid-template-columns:1fr; }
  }
  @keyframes spUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;

const PLAN_ICONS = [Globe, Wrench, Package, Building2, Bot];

export default function ServicesPortfolio() {
  const { t } = useLanguage();
  const svc  = t('portfolio.services') as any;
  const work = t('portfolio.work')     as any;
  const plans: any[]  = svc.plans;
  const items: any[]  = work.items;

  return (
    <>
      <style>{css}</style>
      <div className="sp-root">
        <Navbar />

        {/* ── PRICING ── */}
        <section className="sp-section" id="sp-services">
          <div className="sp-svc-header">
            <div className="sp-label">{svc.eyebrow}</div>
            <h2 className="sp-title">{svc.title1}<br /><span>{svc.title2}</span></h2>
            <p>{svc.desc}</p>
          </div>

          <div className="sp-grid">
            {plans.map((plan, i) => {
              const Icon = PLAN_ICONS[i];
              return (
                <div key={plan.name} className={`sp-plan${plan.featured ? ' featured' : ''}`}>
                  {plan.badge && <div className="sp-badge">{plan.badge}</div>}
                  <div className="sp-plan-icon"><Icon size={20} strokeWidth={1.5} /></div>
                  <div className="sp-plan-name">{plan.name}</div>
                  <div className="sp-plan-price"><sup>$</sup>{plan.price}</div>
                  <div className="sp-plan-cycle">{plan.cycle}</div>
                  <ul className="sp-features">
                    {plan.features.map((f: string) => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="sp-btn-row">
                    <a href="/#contact" className="sp-btn-contact">{plan.ctaContact}</a>
                    <a href="#" className="sp-btn-buy">{plan.ctaBuy}</a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="sp-section" id="sp-portfolio">
          <div className="sp-port-header">
            <div className="sp-label">{work.eyebrow}</div>
            <h2 className="sp-title">{work.title1}<br /><span>{work.title2}</span></h2>
            <p>{work.desc}</p>
          </div>

          <div className="sp-port-grid">
            {items.map((item, i) => (
              <div key={item.title} className="sp-port-item">
                <div className="sp-port-num">0{i + 1}</div>
                <div className="sp-port-top">
                  <div className="sp-port-tag">{item.tag}</div>
                  <div className="sp-port-title">{item.title}</div>
                  <div className="sp-port-desc">{item.desc}</div>
                </div>
                <div className="sp-port-arrow">→</div>
              </div>
            ))}
          </div>

          <div className="sp-port-cta">
            <p className="sp-port-cta-txt">{work.ctaText}</p>
            <a href="/#contact" className="sp-btn-cta">{work.ctaBtn}</a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
