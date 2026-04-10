import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ROICalculator } from "@/components/ROICalculator";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  PhoneCall,
  MessageSquare,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: PhoneCall,
    title: "Automated Lead Capture",
    description:
      "Never miss a lead again. Our AI-powered system captures every inbound call, web form, and chat inquiry — then routes and logs it instantly in your CRM.",
    bullets: [
      "24/7 call answering & transcription",
      "Instant SMS follow-up on missed calls",
      "Auto-assign leads to the right team member",
    ],
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.18)",
  },
  {
    icon: MessageSquare,
    title: "Unified Communication",
    description:
      "All your channels — SMS, email, and voice — in one shared inbox. Your whole team sees every conversation in real time, no more dropped messages.",
    bullets: [
      "Single inbox for SMS, email & calls",
      "Team-wide read receipts & notes",
      "Automated follow-up sequences",
    ],
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.18)",
  },
  {
    icon: Globe,
    title: "Bilingual CRM",
    description:
      "Built for Québec and the Canadian market. Full French/English interface and templated communications so you can serve every client in their preferred language.",
    bullets: [
      "Full FR / EN interface switching",
      "Bilingual email & SMS templates",
      "Regional compliance built-in",
    ],
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.18)",
  },
];

const TITLE = "FieldOps Pro — Business Solutions | NT Web Design";
const DESC =
  "FieldOps Pro: the all-in-one business engine for field-service teams. Automated lead capture, unified communication, and a bilingual CRM built for Canadian SMBs.";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0 },
};

export default function BusinessSolutions() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://ntwebux.com/business" />
        <meta property="og:title"       content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url"         content="https://ntwebux.com/business" />
        <meta property="og:site_name"   content="NT Web Design" />
        <meta property="og:image"       content="https://ntwebux.com/logo.png" />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />

        <main>
          {/* ── Hero ── */}
          <section
            style={{
              minHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '120px 24px 80px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Accent ring */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-55%)',
              width: '640px',
              height: '640px',
              borderRadius: '50%',
              border: '1px solid rgba(59,130,246,0.1)',
              pointerEvents: 'none',
            }} />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#3b82f6',
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.22)',
                borderRadius: '20px',
                padding: '5px 16px',
              }}>
                <Zap size={11} /> Business Solutions
              </span>

              <h1 style={{
                fontSize: 'clamp(36px, 7vw, 72px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: '0 0 24px',
                maxWidth: '820px',
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  The Business Engine Built for
                </span>
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 60%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Field-Service Teams
                </span>
              </h1>

              <p style={{
                fontSize: 'clamp(16px, 2.5vw, 19px)',
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '580px',
                margin: '0 auto 36px',
                lineHeight: 1.65,
              }}>
                FieldOps Pro brings together automated lead capture, unified team communication,
                and a fully bilingual CRM — so your crew can focus on the job, not the paperwork.
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="#trial"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('trial')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '15px',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 28px rgba(59,130,246,0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(59,130,246,0.5)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,130,246,0.4)'; }}
                >
                  Start Free 14-Day Trial <ArrowRight size={15} />
                </a>
                <Link
                  href="/#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 600,
                    fontSize: '15px',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                >
                  Talk to a Strategist
                </Link>
              </div>
            </motion.div>
          </section>

          {/* ── Feature Cards ── */}
          <section style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: '52px' }}
            >
              <h2 style={{
                fontSize: 'clamp(26px, 4vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 12px',
              }}>
                The Core Business Engine
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', maxWidth: '480px', margin: '0 auto' }}>
                Three pillars that turn missed opportunities into booked jobs.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: '32px',
                      background: `linear-gradient(145deg, rgba(10,20,40,0.7) 0%, ${f.glow} 100%)`,
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: `1px solid ${f.color}22`,
                      borderRadius: '20px',
                      boxShadow: `0 0 0 1px ${f.color}11, 0 24px 48px rgba(0,0,0,0.3)`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${f.color}18`,
                      border: `1px solid ${f.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={22} color={f.color} />
                    </div>

                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.015em' }}>
                        {f.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>
                        {f.description}
                      </p>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {f.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                          <CheckCircle2 size={14} color={f.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── ROI Calculator ── */}
          <div style={{ background: 'rgba(5,12,25,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <ROICalculator />
          </div>

          {/* ── CTA ── */}
          <section id="trial" style={{ padding: '100px 24px', textAlign: 'center' }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth: '680px',
                margin: '0 auto',
                padding: 'clamp(40px, 8vw, 64px)',
                background: 'linear-gradient(135deg, rgba(29,78,216,0.2) 0%, rgba(59,130,246,0.08) 100%)',
                border: '1px solid rgba(59,130,246,0.22)',
                borderRadius: '28px',
                boxShadow: '0 0 80px rgba(59,130,246,0.12)',
              }}
            >
              <span style={{
                display: 'inline-block',
                marginBottom: '16px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#3b82f6',
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: '20px',
                padding: '4px 14px',
              }}>No credit card required</span>

              <h2 style={{
                fontSize: 'clamp(26px, 5vw, 40px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 16px',
                lineHeight: 1.1,
              }}>
                Start Your Free 14-Day Trial
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', margin: '0 0 36px', lineHeight: 1.6 }}>
                Full access to every FieldOps Pro feature. Cancel any time.
                Setup takes less than 10 minutes.
              </p>

              <a
                href="mailto:info@ntwebux.com?subject=FieldOps%20Pro%20Free%20Trial"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '16px',
                  padding: '16px 36px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(59,130,246,0.45)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(59,130,246,0.55)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.45)'; }}
              >
                Start Your Free 14-Day Trial <ArrowRight size={16} />
              </a>

              <p style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
                Questions? Email us at <span style={{ color: 'rgba(255,255,255,0.4)' }}>info@ntwebux.com</span> or call <span style={{ color: 'rgba(255,255,255,0.4)' }}>(438) 806-7640</span>
              </p>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
