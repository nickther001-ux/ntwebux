import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Cpu, BarChart2, Globe } from 'lucide-react';

const bi = <T,>(en: T, fr: T, lang: string): T => (lang === 'fr' ? fr : en);

/* ── Faint geometric dot-grid ───────────────────────────────── */
function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

/* ── Gear SVG blueprint watermark ───────────────────────────── */
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
        opacity: 0.04,
        pointerEvents: 'none',
        filter: 'blur(1.5px)',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="88" fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="4 3" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#60a5fa" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="28" fill="none" stroke="#60a5fa" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="12" fill="none" stroke="#60a5fa" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="4"  fill="#60a5fa" opacity="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return <line key={i}
          x1={100 + 80 * Math.cos(angle)} y1={100 + 80 * Math.sin(angle)}
          x2={100 + 92 * Math.cos(angle)} y2={100 + 92 * Math.sin(angle)}
          stroke="#60a5fa" strokeWidth="7" strokeLinecap="square" />;
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        return <line key={i}
          x1={100 + 28 * Math.cos(angle)} y1={100 + 28 * Math.sin(angle)}
          x2={100 + 78 * Math.cos(angle)} y2={100 + 78 * Math.sin(angle)}
          stroke="#60a5fa" strokeWidth="0.6" />;
      })}
      <line x1="10" y1="100" x2="30"  y2="100" stroke="#60a5fa" strokeWidth="0.4" />
      <line x1="170" y1="100" x2="190" y2="100" stroke="#60a5fa" strokeWidth="0.4" />
      <line x1="100" y1="10"  x2="100" y2="30"  stroke="#60a5fa" strokeWidth="0.4" />
      <line x1="100" y1="170" x2="100" y2="190" stroke="#60a5fa" strokeWidth="0.4" />
      <text x="16" y="97" fontSize="4" fill="#60a5fa" fontFamily="monospace">Ø176</text>
      <text x="96" y="18" fontSize="4" fill="#60a5fa" fontFamily="monospace">R88</text>
    </svg>
  );
}

/* ── Philosophy card ────────────────────────────────────────── */
const CARD_ACCENT = ['#3b82f6', '#06b6d4', '#a78bfa'] as const;

function PhilosophyCard({
  icon, accentColor, label, title, desc, delay,
}: {
  icon: React.ReactNode;
  accentColor: string;
  label: string;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      style={{
        flex: '1 1 280px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '18px',
        padding: '36px 30px 32px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* top colour bar */}
      <div style={{
        position: 'absolute', top: 0, left: '30px',
        width: '48px', height: '2px',
        background: accentColor,
        borderRadius: '0 0 3px 3px',
      }} />

      {/* mono spec label */}
      <div style={{
        fontSize: '9px', fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: accentColor, opacity: 0.7,
        fontFamily: 'monospace',
        marginBottom: '18px',
      }}>{label}</div>

      {/* icon */}
      <div style={{
        width: '46px', height: '46px', borderRadius: '12px',
        background: `${accentColor}18`,
        border: `1px solid ${accentColor}38`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '22px',
      }}>
        {icon}
      </div>

      <div style={{
        fontSize: '16px', fontWeight: 700,
        color: 'rgba(255,255,255,0.92)',
        letterSpacing: '-0.02em',
        marginBottom: '12px',
      }}>{title}</div>

      <div style={{
        fontSize: '13.5px', lineHeight: 1.68,
        color: 'rgba(255,255,255,0.46)',
      }}>{desc}</div>
    </motion.div>
  );
}

export default function About() {
  const { lang } = useLanguage();

  /* ── copy ─────────────────────────────────────────────────── */
  const metaTitle = bi('About — NT Digital Group', 'À Propos — NT Digital Group', lang);
  const metaDesc  = bi(
    'NT Digital Group is a technical architecture studio — applying engineering precision from Concordia University to AI, SaaS, and global digital infrastructure.',
    'NT Digital Group est un studio d\'architecture technique — appliquant la rigueur de l\'ingénierie de l\'Université Concordia à l\'IA, au SaaS et aux infrastructures numériques mondiales.',
    lang,
  );

  const eyebrow  = bi('Technical Architecture Studio', 'Studio d\'Architecture Technique', lang);
  const heroH1a  = bi('Engineering the', 'Ingénierie du', lang);
  const heroH1b  = bi('Digital Borderless.', 'Numérique Sans Frontières.', lang);
  const heroSub  = bi(
    'We are technical architects — not web designers. Every deployment is engineered with the same rigour as structural infrastructure: built to spec, built to last.',
    'Nous sommes des architectes techniques — pas des designers web. Chaque déploiement est conçu avec la même rigueur qu\'une infrastructure structurelle : conforme aux spécifications, conçu pour durer.',
    lang,
  );

  const founderLabel = bi('The Architect', 'L\'Architecte', lang);
  const founderTitle = bi('Founder & Technical Director', 'Fondateur & Directeur Technique', lang);
  const founderBody  = bi(
    'A technical architect driven by the rigour of Mechanical Engineering and Computer Science from Concordia University. Jean applies a systems-engineering approach to digital infrastructure, ensuring that every NT Digital Group deployment is built for high-performance, scalability, and technical longevity.',
    'Un architecte technique porté par la rigueur du génie mécanique et de l\'informatique de l\'Université Concordia. Jean applique une approche d\'ingénierie systèmes à l\'infrastructure numérique, garantissant que chaque déploiement de NT Digital Group est conçu pour la haute performance, la scalabilité et la longévité technique.',
    lang,
  );
  const badges = [
    bi('Mechanical Engineering', 'Génie Mécanique', lang),
    bi('Computer Science', 'Informatique', lang),
    bi('Concordia University', 'Université Concordia', lang),
  ];

  const philoEyebrow = bi('Our Philosophy', 'Notre Philosophie', lang);
  const philoTitle   = bi('Three pillars of technical architecture.', 'Trois piliers de l\'architecture technique.', lang);
  const philoSub     = bi(
    'Every decision we make is grounded in engineering discipline, not trend cycles.',
    'Chaque décision que nous prenons est fondée sur la discipline de l\'ingénierie, non sur des tendances éphémères.',
    lang,
  );

  const pillars = [
    {
      accentColor: CARD_ACCENT[0],
      label: bi('NT/PILLAR/01', 'NT/PILIER/01', lang),
      icon: <Cpu size={20} color={CARD_ACCENT[0]} strokeWidth={1.6} />,
      title: bi('Structural Integrity', 'Intégrité Structurelle', lang),
      desc:  bi(
        'We build custom codebases using Next.js and Postgres, treated with the same precision as physical blueprints — zero shortcuts, zero bloat.',
        'Nous construisons des bases de code sur mesure avec Next.js et Postgres, traités avec la même précision que des plans physiques — aucun raccourci, aucun superflu.',
        lang,
      ),
    },
    {
      accentColor: CARD_ACCENT[1],
      label: bi('NT/PILLAR/02', 'NT/PILIER/02', lang),
      icon: <BarChart2 size={20} color={CARD_ACCENT[1]} strokeWidth={1.6} />,
      title: bi('Automated Logic', 'Logique Automatisée', lang),
      desc:  bi(
        'Our AI systems are designed as Revenue Engines — operating with mathematical predictability. Every automation has a defined input, output, and measurable ROI.',
        'Nos systèmes IA sont conçus comme des moteurs de revenus — fonctionnant avec une prévisibilité mathématique. Chaque automatisation a une entrée, une sortie et un ROI mesurable définis.',
        lang,
      ),
    },
    {
      accentColor: CARD_ACCENT[2],
      label: bi('NT/PILLAR/03', 'NT/PILIER/03', lang),
      icon: <Globe size={20} color={CARD_ACCENT[2]} strokeWidth={1.6} />,
      title: bi('Global Sync', 'Synchronisation Mondiale', lang),
      desc:  bi(
        'Bridging Montreal, Japan, and the world with one unified, bilingual technical standard: Quality. EST · JST · GMT — one architecture, no compromises.',
        'Connecter Montréal, le Japon et le monde entier grâce à un seul standard technique bilingue unifié : la Qualité. EST · JST · GMT — une architecture, sans compromis.',
        lang,
      ),
    },
  ];

  const closingEyebrow = bi('Our Standard', 'Notre Standard', lang);
  const closingTitle   = bi(
    'Enterprise-grade infrastructure. Independent-operator price.',
    'Infrastructure de niveau entreprise. Tarif pour opérateur indépendant.',
    lang,
  );
  const closingBody = bi(
    'NT Digital Group exists to give the next generation of borderless operators access to the same technical stack that global enterprises rely on — without the complexity or the price tag.',
    'NT Digital Group existe pour donner à la prochaine génération d\'opérateurs sans frontières accès à la même infrastructure technique que les grandes entreprises mondiales — sans la complexité ni le prix.',
    lang,
  );

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      <div style={{ background: '#020617', minHeight: '100vh', color: '#fff' }}>
        <Navbar />

        <main>
          {/* ── HERO ──────────────────────────────────────────── */}
          <section style={{
            position: 'relative',
            padding: '140px 24px 100px',
            textAlign: 'center',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '700px', height: '360px',
              background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.16) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(59,130,246,0.09)',
                border: '1px solid rgba(59,130,246,0.24)',
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#93c5fd',
                marginBottom: '32px',
                position: 'relative', zIndex: 1,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
              {eyebrow}
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
                position: 'relative', zIndex: 1,
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              style={{
                fontSize: 'clamp(15px, 2vw, 17px)',
                lineHeight: 1.72,
                color: 'rgba(255,255,255,0.50)',
                maxWidth: '600px',
                margin: '0 auto',
                position: 'relative', zIndex: 1,
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
                background: 'rgba(255,255,255,0.026)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '24px',
                padding: 'clamp(36px,5vw,64px)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                overflow: 'hidden',
              }}
            >
              <GridOverlay />
              <GearBlueprint />

              {/* top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: '48px',
                width: '80px', height: '2px',
                background: 'linear-gradient(90deg,#3b82f6,#06b6d4)',
              }} />

              {/* label */}
              <div style={{
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#60a5fa',
                marginBottom: '28px',
                display: 'flex', alignItems: 'center', gap: '8px',
                position: 'relative', zIndex: 1,
              }}>
                <div style={{ width: 16, height: '1px', background: '#3b82f6' }} />
                {founderLabel}
              </div>

              <div style={{ maxWidth: '680px', position: 'relative', zIndex: 1 }}>
                <h2 style={{
                  fontSize: 'clamp(26px,4vw,42px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: '6px',
                }}>
                  Nickson Thermidor
                </h2>
                <div style={{
                  fontSize: '13px', fontWeight: 500,
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.04em',
                  marginBottom: '28px',
                }}>
                  {founderTitle}
                </div>

                <p style={{
                  fontSize: 'clamp(14px,1.6vw,16px)',
                  lineHeight: 1.78,
                  color: 'rgba(255,255,255,0.60)',
                  marginBottom: '36px',
                }}>
                  {founderBody}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {badges.map((b) => (
                    <span key={b} style={{
                      padding: '6px 14px',
                      background: 'rgba(59,130,246,0.09)',
                      border: '1px solid rgba(59,130,246,0.22)',
                      borderRadius: '999px',
                      fontSize: '12px', fontWeight: 500,
                      color: '#93c5fd',
                      letterSpacing: '0.02em',
                    }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* monospace spec tag */}
              <div style={{
                position: 'absolute', bottom: '26px', right: '30px',
                fontSize: '10px', color: 'rgba(255,255,255,0.15)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: 'monospace', zIndex: 1,
              }}>
                NT/ARCH/001 · REV 2.4
              </div>
            </motion.div>
          </section>

          {/* ── PHILOSOPHY ────────────────────────────────────── */}
          <section style={{ padding: '0 24px 112px', maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{ marginBottom: '52px' }}
            >
              <div style={{
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#06b6d4',
                marginBottom: '14px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ width: 16, height: '1px', background: '#06b6d4' }} />
                {philoEyebrow}
              </div>
              <h2 style={{
                fontSize: 'clamp(28px,4vw,48px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'rgba(255,255,255,0.93)',
                marginBottom: '14px',
              }}>
                {philoTitle}
              </h2>
              <p style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.42)',
                lineHeight: 1.67,
                maxWidth: '500px',
              }}>
                {philoSub}
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {pillars.map((p, i) => (
                <PhilosophyCard key={i} delay={i * 0.12} {...p} />
              ))}
            </div>
          </section>

          {/* ── CLOSING ───────────────────────────────────────── */}
          <section style={{
            position: 'relative',
            padding: '80px 24px 120px',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{
              position: 'absolute', bottom: '-60px', left: '50%',
              transform: 'translateX(-50%)',
              width: '600px', height: '300px',
              background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.11) 0%, transparent 70%)',
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
                lineHeight: 1.22,
                color: 'rgba(255,255,255,0.90)',
                marginBottom: '20px',
              }}>
                {closingTitle}
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.74,
                color: 'rgba(255,255,255,0.44)',
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
