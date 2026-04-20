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
    'We are technical architects — not just web designers. Every deployment is engineered with the same rigour as structural infrastructure: built to spec, built to last.',
    'Nous sommes des architectes techniques — pas juste des designers web. Chaque déploiement est conçu avec la même rigueur qu\'une infrastructure structurelle : conforme aux spécifications, conçu pour durer.',
    lang,
  );

  const manifestoLabel = bi('The Architect\'s Manifesto', 'Le Manifeste de l\'Architecte', lang);
  const manifestoLead  = bi(
    'Stop building websites. Start engineering revenue engines.',
    'Arrêtez de construire des sites web. Commencez à concevoir des moteurs de revenus.',
    lang,
  );
  const manifestoP1 = bi(
    'The digital industry is bloated with templates, slow code, and "designers" who don\'t understand how a business actually functions. I don\'t build brochures; I architect systems.',
    'L\'industrie numérique est saturée de modèles génériques, de code lent et de « designers » qui ne comprennent pas réellement le fonctionnement d\'une entreprise. Je ne construis pas des brochures ; j\'architecture des systèmes.',
    lang,
  );
  const manifestoP2 = bi(
    'Drawing from a foundation in Mechanical Engineering and Computer Science at Concordia University, I treat every line of code with the same rigour as a physical blueprint. If a system isn\'t recoverable, scalable, and revenue-positive, it shouldn\'t exist.',
    'Issu d\'une formation en génie mécanique et en informatique à l\'Université Concordia, je traite chaque ligne de code avec la même rigueur qu\'un plan physique. Si un système n\'est pas récupérable, scalable et générateur de revenus, il ne devrait pas exister.',
    lang,
  );
  const manifestoClosing = bi(
    'I am not here to hold your hand through a 30-minute discovery call. I am here to audit your systems, plug your revenue leaks, and expand your vision.',
    'Je ne suis pas là pour vous accompagner lors d\'un appel découverte de 30 minutes. Je suis là pour auditer vos systèmes, colmater vos fuites de revenus et élargir votre vision.',
    lang,
  );
  const manifestoCTA = bi('Submit your vision. Let\'s build the machine.', 'Soumettez votre vision. Construisons la machine.', lang);
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
      label: bi('NT/STANDARD/01', 'NT/STANDARD/01', lang),
      icon: <Cpu size={20} color={CARD_ACCENT[0]} strokeWidth={1.6} />,
      title: bi('Precision over Bloat', 'Précision avant tout', lang),
      desc:  bi(
        'No generic templates. We build custom, high-performance foundations using Next.js and Postgres — engineered to spec, zero shortcuts, zero bloat.',
        'Aucun modèle générique. Nous construisons des fondations sur mesure et hautes performances avec Next.js et Postgres — conçues avec précision, sans raccourcis, sans superflu.',
        lang,
      ),
    },
    {
      accentColor: CARD_ACCENT[1],
      label: bi('NT/STANDARD/02', 'NT/STANDARD/02', lang),
      icon: <BarChart2 size={20} color={CARD_ACCENT[1]} strokeWidth={1.6} />,
      title: bi('Logic over Aesthetics', 'Logique avant l\'esthétique', lang),
      desc:  bi(
        'We don\'t just "make it look good." We engineer AI-driven lead recovery systems that ensure you never miss a revenue opportunity.',
        'Nous ne nous contentons pas de « rendre ça beau ». Nous concevons des systèmes de récupération de leads pilotés par l\'IA pour que vous ne manquiez jamais une opportunité de revenus.',
        lang,
      ),
    },
    {
      accentColor: CARD_ACCENT[2],
      label: bi('NT/STANDARD/03', 'NT/STANDARD/03', lang),
      icon: <Globe size={20} color={CARD_ACCENT[2]} strokeWidth={1.6} />,
      title: bi('Borderless Infrastructure', 'Infrastructure Sans Frontières', lang),
      desc:  bi(
        'Bridging the gap between the North American market and emerging global hubs in Africa with a 24/7 technical presence.',
        'Combler le fossé entre le marché nord-américain et les pôles mondiaux émergents en Afrique avec une présence technique 24h/24 et 7j/7.',
        lang,
      ),
    },
  ];

  const closingEyebrow = bi('NT Digital Group', 'NT Digital Group', lang);

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

          {/* ── MANIFESTO CARD ──────────────────────────────────── */}
          <section style={{ padding: '0 24px 96px', maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                background: 'linear-gradient(160deg, rgba(2,8,20,0.96) 0%, rgba(5,15,35,0.94) 100%)',
                border: '1px solid rgba(59,130,246,0.18)',
                borderRadius: '24px',
                padding: 'clamp(40px,5.5vw,72px)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                overflow: 'hidden',
                boxShadow: '0 0 80px rgba(59,130,246,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <GridOverlay />
              <GearBlueprint />

              {/* Scanline overlay — subtle machine texture */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)',
                borderRadius: '24px',
              }} />

              {/* Left accent rail */}
              <div style={{
                position: 'absolute', top: '48px', bottom: '48px', left: 0,
                width: '3px',
                background: 'linear-gradient(180deg, transparent 0%, #3b82f6 20%, #06b6d4 80%, transparent 100%)',
                borderRadius: '0 2px 2px 0',
              }} />

              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: '48px',
                width: '120px', height: '2px',
                background: 'linear-gradient(90deg, #3b82f6, #06b6d4, transparent)',
              }} />

              {/* Doc label */}
              <div style={{
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#60a5fa',
                marginBottom: '36px',
                display: 'flex', alignItems: 'center', gap: '10px',
                position: 'relative', zIndex: 1,
              }}>
                <div style={{ width: 20, height: '1px', background: 'linear-gradient(90deg,#3b82f6,transparent)' }} />
                {manifestoLabel}
                <div style={{ width: 20, height: '1px', background: 'linear-gradient(270deg,#06b6d4,transparent)' }} />
              </div>

              <div style={{ maxWidth: '740px', position: 'relative', zIndex: 1 }}>

                {/* ── Lead quote — Playfair bold italic ── */}
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                  fontSize: 'clamp(24px,3.2vw,36px)',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  lineHeight: 1.28,
                  letterSpacing: '-0.01em',
                  marginBottom: '36px',
                  background: 'linear-gradient(135deg, #e2e8f0 0%, #60a5fa 55%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  "{manifestoLead}"
                </p>

                {/* ── Body paragraph 1 — left border accent ── */}
                <div style={{
                  borderLeft: '2px solid rgba(59,130,246,0.35)',
                  paddingLeft: '20px',
                  marginBottom: '20px',
                }}>
                  <p style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 'clamp(14px,1.55vw,16px)',
                    lineHeight: 1.84,
                    color: 'rgba(255,255,255,0.62)',
                  }}>
                    {manifestoP1}
                  </p>
                </div>

                {/* ── Body paragraph 2 — left border accent ── */}
                <div style={{
                  borderLeft: '2px solid rgba(6,182,212,0.3)',
                  paddingLeft: '20px',
                  marginBottom: '40px',
                }}>
                  <p style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 'clamp(14px,1.55vw,16px)',
                    lineHeight: 1.84,
                    color: 'rgba(255,255,255,0.62)',
                  }}>
                    {manifestoP2}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(59,130,246,0.25), rgba(6,182,212,0.15), transparent)', marginBottom: '36px' }} />

                {/* ── Closing statement — Playfair italic ── */}
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                  fontSize: 'clamp(16px,2vw,20px)',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  lineHeight: 1.68,
                  color: 'rgba(255,255,255,0.72)',
                  marginBottom: '36px',
                }}>
                  {manifestoClosing}
                </p>

                {/* ── Signature — Playfair centered ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12))' }} />
                  <span style={{
                    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                    fontSize: 'clamp(15px,1.8vw,19px)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.03em',
                    whiteSpace: 'nowrap',
                  }}>
                    — Nickson Thermidor —
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.12))' }} />
                </div>

                {/* ── Final CTA — monospace terminal ── */}
                <div style={{
                  background: 'rgba(6,182,212,0.05)',
                  border: '1px solid rgba(6,182,212,0.18)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span style={{ color: '#22d3ee', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, opacity: 0.6 }}>›_</span>
                  <p style={{
                    fontFamily: "'Courier New', ui-monospace, monospace",
                    fontSize: 'clamp(12px,1.3vw,14px)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: '#22d3ee',
                    margin: 0,
                  }}>
                    {manifestoCTA}
                  </p>
                </div>
              </div>

              {/* Bottom-right spec tag */}
              <div style={{
                position: 'absolute', bottom: '24px', right: '28px',
                fontSize: '9px', color: 'rgba(255,255,255,0.12)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                fontFamily: 'monospace', zIndex: 1,
              }}>
                NT/ARCH/001 · REV 2.5
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
                {bi('The NT Digital Group Standard', 'Le Standard NT Digital Group', lang)}
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.74,
                color: 'rgba(255,255,255,0.44)',
              }}>
                {bi(
                  'Precision over Bloat. Logic over Aesthetics. Borderless Infrastructure.',
                  'Précision avant le superflu. Logique avant l\'esthétique. Infrastructure sans frontières.',
                  lang,
                )}
              </p>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
