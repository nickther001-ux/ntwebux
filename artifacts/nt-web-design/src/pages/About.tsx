import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Cpu, BarChart2, Globe } from 'lucide-react';

const bi = <T,>(en: T, fr: T, lang: string): T => (lang === 'fr' ? fr : en);

/* ── Gear SVG blueprint — faint background watermark ────────── */
function GearBlueprint() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        right: '-60px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '420px',
        height: '420px',
        opacity: 0.045,
        pointerEvents: 'none',
        filter: 'blur(1.5px)',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="100" cy="100" r="88" fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="4 3" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#60a5fa" strokeWidth="0.4" />
      {/* Inner hub */}
      <circle cx="100" cy="100" r="28" fill="none" stroke="#60a5fa" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="12" fill="none" stroke="#60a5fa" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="4"  fill="#60a5fa" opacity="0.6" />
      {/* Gear teeth — 12 rectangular teeth */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 80 * Math.cos(angle);
        const y1 = 100 + 80 * Math.sin(angle);
        const x2 = 100 + 92 * Math.cos(angle);
        const y2 = 100 + 92 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="7" strokeLinecap="square" />;
      })}
      {/* Spokes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const x1 = 100 + 28 * Math.cos(angle);
        const y1 = 100 + 28 * Math.sin(angle);
        const x2 = 100 + 78 * Math.cos(angle);
        const y2 = 100 + 78 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="0.6" />;
      })}
      {/* Cross-hair dimensions */}
      <line x1="10" y1="100" x2="30" y2="100" stroke="#60a5fa" strokeWidth="0.4" />
      <line x1="170" y1="100" x2="190" y2="100" stroke="#60a5fa" strokeWidth="0.4" />
      <line x1="100" y1="10" x2="100" y2="30" stroke="#60a5fa" strokeWidth="0.4" />
      <line x1="100" y1="170" x2="100" y2="190" stroke="#60a5fa" strokeWidth="0.4" />
      {/* Blueprint annotation ticks */}
      <text x="16" y="97" fontSize="4" fill="#60a5fa" fontFamily="monospace">Ø176</text>
      <text x="96" y="18" fontSize="4" fill="#60a5fa" fontFamily="monospace">R88</text>
    </svg>
  );
}

/* ── Methodology card ───────────────────────────────────────── */
function MethodCard({
  icon, title, desc, delay,
}: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      style={{
        flex: '1 1 260px',
        background: 'rgba(255,255,255,0.028)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '16px',
        padding: '32px 28px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top-left accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '28px',
        width: '40px', height: '2px',
        background: 'linear-gradient(90deg,#3b82f6,#06b6d4)',
        borderRadius: '0 0 2px 2px',
      }} />
      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        background: 'rgba(59,130,246,0.12)',
        border: '1px solid rgba(59,130,246,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '20px',
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: '15px', fontWeight: 600,
        color: 'rgba(255,255,255,0.92)',
        letterSpacing: '-0.01em',
        marginBottom: '10px',
      }}>{title}</div>
      <div style={{
        fontSize: '13.5px', lineHeight: 1.65,
        color: 'rgba(255,255,255,0.48)',
      }}>{desc}</div>
    </motion.div>
  );
}

export default function About() {
  const { lang } = useLanguage();

  const title     = bi('About NT Digital Group', 'À Propos de NT Digital Group', lang);
  const heroH1a   = bi('Engineering the', 'Ingénierie du', lang);
  const heroH1b   = bi('Digital Borderless.', 'Numérique Sans Frontières.', lang);
  const heroSub   = bi(
    'We are technical architects — not web designers. Every line of code, every system we deploy, is engineered with the same rigour as industrial infrastructure.',
    'Nous sommes des architectes techniques — pas des designers web. Chaque ligne de code, chaque système que nous déployons, est conçu avec la même rigueur qu\'une infrastructure industrielle.',
    lang,
  );

  const founderLabel  = bi('The Architect', 'L\'Architecte', lang);
  const founderName   = 'Jean Nickson Thermidor';
  const founderTitle  = bi('Founder & Technical Director', 'Fondateur & Directeur Technique', lang);
  const founderBody   = bi(
    'Applying the precision of mechanical engineering and computer science to the world of AI and SaaS. Nickson Thermidor\'s background in data analysis and technical infrastructure for major Canadian enterprises drives the high-performance DNA of NT Digital Group.',
    'Appliquant la précision du génie mécanique et de l\'informatique au monde de l\'IA et du SaaS. Le parcours de Nickson Thermidor en analyse de données et en infrastructure technique pour de grandes entreprises canadiennes est le moteur de l\'ADN haute performance de NT Digital Group.',
    lang,
  );
  const founderBadge1 = bi('Mechanical Engineering', 'Génie Mécanique', lang);
  const founderBadge2 = bi('Computer Science', 'Informatique', lang);
  const founderBadge3 = bi('Data Analysis', 'Analyse de Données', lang);

  const methodEyebrow = bi('How We Work', 'Notre Méthodologie', lang);
  const methodTitle   = bi('The NT Methodology', 'La Méthodologie NT', lang);
  const methodSub     = bi(
    'Three engineering principles that separate architecture from decoration.',
    'Trois principes d\'ingénierie qui distinguent l\'architecture de la décoration.',
    lang,
  );

  const methods = [
    {
      icon: <Cpu size={20} color="#3b82f6" strokeWidth={1.6} />,
      title: bi('Precision Engineering', 'Ingénierie de Précision', lang),
      desc:  bi(
        'Custom code over templates — every foundation is bespoke, built with Next.js and high-performance stacks that scale without compromise.',
        'Code sur mesure plutôt que des templates — chaque fondation est unique, construite avec Next.js et des stacks haute performance qui évoluent sans compromis.',
        lang,
      ),
    },
    {
      icon: <BarChart2 size={20} color="#06b6d4" strokeWidth={1.6} />,
      title: bi('Data-Driven Logic', 'Logique Axée sur les Données', lang),
      desc:  bi(
        'AI that produces measurable ROI. We deploy automations with defined KPIs — Text-Back recovery rates, booking conversion, review velocity.',
        'Une IA qui produit un ROI mesurable. Nous déployons des automatisations avec des KPIs définis — taux de récupération Text-Back, conversion de réservations, vélocité d\'avis.',
        lang,
      ),
    },
    {
      icon: <Globe size={20} color="#a78bfa" strokeWidth={1.6} />,
      title: bi('Global Connectivity', 'Connectivité Mondiale', lang),
      desc:  bi(
        'Montreal-based, Japan-connected, Abidjan-rooted. Our borderless model gives clients 24/7 coverage across time zones — EST, JST, GMT.',
        'Basé à Montréal, connecté au Japon, ancré à Abidjan. Notre modèle sans frontières offre une couverture 24h/24 sur tous les fuseaux horaires — EST, JST, GMT.',
        lang,
      ),
    },
  ];

  const closingEyebrow = bi('Our Commitment', 'Notre Engagement', lang);
  const closingTitle   = bi('Built for the next generation of borderless operators.', 'Conçu pour la prochaine génération d\'opérateurs sans frontières.', lang);
  const closingBody    = bi(
    'NT Digital Group exists to give independent operators access to the same technical infrastructure that Fortune 500 companies rely on — without the enterprise price tag.',
    'NT Digital Group existe pour donner aux opérateurs indépendants accès à la même infrastructure technique que les entreprises Fortune 500 — sans le prix entreprise.',
    lang,
  );

  return (
    <>
      <Helmet>
        <title>{title} | NT Digital Group</title>
        <meta name="description" content={bi(
          'Meet the team behind NT Digital Group — technical architects applying engineering precision to AI, SaaS, and web infrastructure.',
          'Découvrez l\'équipe derrière NT Digital Group — des architectes techniques appliquant la précision de l\'ingénierie à l\'IA, au SaaS et aux infrastructures web.',
          lang,
        )} />
      </Helmet>

      <div style={{ background: '#020617', minHeight: '100vh', color: '#fff' }}>
        <Navbar />

        <main>
          {/* ── HERO ──────────────────────────────────────────── */}
          <section style={{
            position: 'relative',
            padding: '140px 24px 100px',
            textAlign: 'center',
            overflow: 'hidden',
          }}>
            {/* Radial glow */}
            <div style={{
              position: 'absolute', top: '0', left: '50%',
              transform: 'translateX(-50%)',
              width: '700px', height: '340px',
              background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(59,130,246,0.10)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#93c5fd',
                marginBottom: '32px',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
              {bi('Technical Architecture Studio', 'Studio d\'Architecture Technique', lang)}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              style={{
                fontSize: 'clamp(42px, 7vw, 88px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.04,
                maxWidth: '900px',
                margin: '0 auto 28px',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.93)' }}>{heroH1a} </span>
              <span style={{
                background: 'linear-gradient(135deg,#60a5fa 0%,#22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{heroH1b}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.52)',
                maxWidth: '620px',
                margin: '0 auto',
              }}
            >
              {heroSub}
            </motion.p>
          </section>

          {/* ── FOUNDER BENTO CARD ────────────────────────────── */}
          <section style={{ padding: '0 24px 96px', maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.028)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '24px',
                padding: 'clamp(36px,5vw,64px)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                overflow: 'hidden',
              }}
            >
              {/* Blueprint gear watermark */}
              <GearBlueprint />

              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: '48px',
                width: '80px', height: '2px',
                background: 'linear-gradient(90deg,#3b82f6,#06b6d4)',
              }} />

              {/* Label */}
              <div style={{
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#60a5fa',
                marginBottom: '28px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ width: 16, height: '1px', background: '#3b82f6' }} />
                {founderLabel}
              </div>

              {/* Name + title */}
              <div style={{ maxWidth: '680px' }}>
                <h2 style={{
                  fontSize: 'clamp(26px,4vw,42px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: '6px',
                }}>
                  {founderName}
                </h2>
                <div style={{
                  fontSize: '13px', fontWeight: 500,
                  color: 'rgba(255,255,255,0.40)',
                  letterSpacing: '0.04em',
                  marginBottom: '28px',
                }}>
                  {founderTitle}
                </div>

                <p style={{
                  fontSize: 'clamp(14px,1.6vw,16px)',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.62)',
                  marginBottom: '36px',
                }}>
                  {founderBody}
                </p>

                {/* Skill badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[founderBadge1, founderBadge2, founderBadge3].map((badge) => (
                    <span key={badge} style={{
                      padding: '6px 14px',
                      background: 'rgba(59,130,246,0.10)',
                      border: '1px solid rgba(59,130,246,0.22)',
                      borderRadius: '999px',
                      fontSize: '12px', fontWeight: 500,
                      color: '#93c5fd',
                      letterSpacing: '0.02em',
                    }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom-right spec block */}
              <div style={{
                position: 'absolute', bottom: '32px', right: '40px',
                textAlign: 'right',
                display: 'none',
              }}
                className="about-spec-block"
              >
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  NT/ARCH/001
                </div>
              </div>

              {/* Spec tag — always shown */}
              <div style={{
                position: 'absolute', bottom: '28px', right: '32px',
                fontSize: '10px', color: 'rgba(255,255,255,0.18)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}>
                NT/ARCH/001 · REV 2.4
              </div>
            </motion.div>
          </section>

          {/* ── METHODOLOGY ───────────────────────────────────── */}
          <section style={{ padding: '0 24px 112px', maxWidth: '1100px', margin: '0 auto' }}>
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{ marginBottom: '48px' }}
            >
              <div style={{
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#06b6d4',
                marginBottom: '14px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ width: 16, height: '1px', background: '#06b6d4' }} />
                {methodEyebrow}
              </div>
              <h2 style={{
                fontSize: 'clamp(28px,4vw,48px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'rgba(255,255,255,0.93)',
                marginBottom: '14px',
              }}>
                {methodTitle}
              </h2>
              <p style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.44)',
                lineHeight: 1.65,
                maxWidth: '480px',
              }}>
                {methodSub}
              </p>
            </motion.div>

            {/* Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {methods.map((m, i) => (
                <MethodCard key={i} delay={i * 0.12} {...m} />
              ))}
            </div>
          </section>

          {/* ── CLOSING STATEMENT ─────────────────────────────── */}
          <section style={{
            position: 'relative',
            padding: '80px 24px 120px',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: '-80px', left: '50%',
              transform: 'translateX(-50%)',
              width: '600px', height: '300px',
              background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}
            >
              <div style={{
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#a78bfa',
                marginBottom: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                <div style={{ width: 16, height: '1px', background: '#a78bfa' }} />
                {closingEyebrow}
                <div style={{ width: 16, height: '1px', background: '#a78bfa' }} />
              </div>
              <h2 style={{
                fontSize: 'clamp(24px,3.5vw,40px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: 'rgba(255,255,255,0.90)',
                marginBottom: '20px',
              }}>
                {closingTitle}
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.72,
                color: 'rgba(255,255,255,0.46)',
              }}>
                {closingBody}
              </p>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
