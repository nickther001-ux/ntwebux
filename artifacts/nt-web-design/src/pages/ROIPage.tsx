import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { PhoneMissed, Clock, TrendingUp, ArrowRight, Zap } from "lucide-react";

/* ─── Copy ──────────────────────────────────────────────────── */
const copy = {
  badge:    { en: "Financial Intelligence", fr: "Intelligence Financière" },
  h1:       { en: "The Math Behind the Infrastructure", fr: "Les Chiffres Derrière l'Infrastructure" },
  sub:      {
    en: "Software is an expense. Custom automation is an asset. Here is exactly how NT Digital Group systems pay for themselves within the first 90 days.",
    fr: "Un logiciel est une dépense. Une automatisation sur mesure est un actif. Voici exactement comment les systèmes de NT Digital Group s'autofinancent dans les 90 premiers jours.",
  },
  cards: [
    {
      icon: PhoneMissed,
      color: "34,211,238",
      colorHex: "#22d3ee",
      num: "01",
      title: { en: "Lead Leakage Recovery", fr: "Récupération des Leads Perdus" },
      problem: {
        en: "The average service business misses 20% of inbound calls.",
        fr: "L'entreprise de services typique manque 20 % de ses appels entrants.",
      },
      engine: {
        en: "Our AI Text-Back system engages missed calls in under 60 seconds.",
        fr: "Notre système IA Text-Back contacte les appels manqués en moins de 60 secondes.",
      },
      roi: {
        en: "If your average client lifetime value is $2,000, recovering just 3 lost leads a month adds $72,000 to your annual bottom line.",
        fr: "Si la valeur vie client moyenne est de 2 000 $, récupérer seulement 3 leads perdus par mois ajoute 72 000 $ à votre revenu annuel.",
      },
      stat: "+$72K",
      statLabel: { en: "annual recovery potential", fr: "potentiel de récupération annuel" },
    },
    {
      icon: Clock,
      color: "99,102,241",
      colorHex: "#818cf8",
      num: "02",
      title: { en: "Operational Efficiency", fr: "Efficacité Opérationnelle" },
      problem: {
        en: "Your team wastes 15+ hours a week on manual follow-ups, scheduling, and data entry.",
        fr: "Votre équipe perd plus de 15 heures par semaine en relances manuelles, planification et saisie de données.",
      },
      engine: {
        en: "Custom CRM integrations and Auto-Booking pipelines eliminate the manual layer entirely.",
        fr: "Nos intégrations CRM sur mesure et nos pipelines Auto-Booking éliminent entièrement la couche manuelle.",
      },
      roi: {
        en: "Reclaim 60 hours a month per employee. Redirect that time toward closing deals instead of administrative maintenance.",
        fr: "Récupérez 60 heures par mois et par employé. Redirigez ce temps vers la conclusion de ventes plutôt que vers la gestion administrative.",
      },
      stat: "60h",
      statLabel: { en: "reclaimed per employee/month", fr: "récupérées par employé / mois" },
    },
    {
      icon: TrendingUp,
      color: "52,211,153",
      colorHex: "#34d399",
      num: "03",
      title: { en: "Acquisition Cost Reduction", fr: "Réduction du Coût d'Acquisition" },
      problem: {
        en: "Paying for ads is renting traffic. You stop paying, the traffic stops.",
        fr: "Payer pour la publicité, c'est louer du trafic. Vous arrêtez de payer, le trafic s'arrête.",
      },
      engine: {
        en: "Sub-second load times and automated Review Engines that compound rankings over time.",
        fr: "Des temps de chargement inférieurs à la seconde et des Moteurs d'Avis automatisés qui font croître votre classement de façon exponentielle.",
      },
      roi: {
        en: "Dominate local search organically. Lower your Customer Acquisition Cost (CAC) by converting traffic you already own through elite technical SEO.",
        fr: "Dominez la recherche locale de façon organique. Réduisez votre Coût d'Acquisition Client (CAC) en convertissant le trafic que vous possédez déjà grâce à un SEO technique d'élite.",
      },
      stat: "↓ CAC",
      statLabel: { en: "through organic compounding", fr: "par accumulation organique" },
    },
  ],
  cta: {
    en: "Calculate Your Potential ROI",
    fr: "Calculez Votre ROI Potentiel",
  },
};

type Lang = "en" | "fr";
function bi<T>(obj: { en: T; fr: T }, lang: Lang): T { return obj[lang]; }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Label chip ─────────────────────────────────────────────── */
function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "999px",
      fontSize: "9px",
      fontWeight: 700,
      letterSpacing: "0.13em",
      textTransform: "uppercase",
      color,
      background: `rgba(${color === "#22d3ee" ? "34,211,238" : color === "#818cf8" ? "99,102,241" : "52,211,153"},0.12)`,
      border: `1px solid ${color}33`,
    }}>
      {label}
    </span>
  );
}

/* ─── Row inside a card ──────────────────────────────────────── */
function CardRow({ label, text, colorHex }: { label: string; text: string; colorHex: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{
        fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: colorHex, marginBottom: "6px",
      }}>
        {label}
      </div>
      <p style={{
        fontSize: "13.5px", color: "rgba(255,255,255,0.65)",
        lineHeight: 1.65, margin: 0,
        textShadow: "0px 2px 5px rgba(0,0,0,0.9)",
      }}>
        {text}
      </p>
    </div>
  );
}

export default function ROIPage() {
  const { lang } = useLanguage();
  const l = lang as Lang;

  return (
    <>
      <Helmet>
        <title>ROI Calculator — NT Digital Group</title>
        <meta name="description" content="See exactly how NT Digital Group automation systems pay for themselves within 90 days through lead recovery, operational efficiency, and organic growth." />
        <link rel="canonical" href="https://ntwebux.com/roi" />
        <meta property="og:title" content="The Math Behind the Infrastructure — NT Digital Group" />
        <meta property="og:description" content="Software is an expense. Custom automation is an asset. Here is the ROI math." />
        <meta property="og:url" content="https://ntwebux.com/roi" />
        <meta property="og:image" content="https://ntwebux.com/logo.png" />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />

        <main>
          <section style={{ padding: "130px 24px 100px", background: "rgba(4,10,22,0.65)" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

              {/* ── Header ── */}
              <motion.div
                custom={0} variants={fadeUp} initial="hidden" animate="show"
                style={{ textAlign: "center", marginBottom: "72px" }}
              >
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "5px 16px", marginBottom: "24px",
                  background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.28)",
                  borderRadius: "999px", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase", color: "#93c5fd",
                }}>
                  <Zap size={11} style={{ flexShrink: 0 }} />
                  {bi(copy.badge, l)}
                </span>

                <h1 style={{
                  fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800,
                  color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1,
                  marginBottom: "20px",
                }}>
                  {bi(copy.h1, l)}
                </h1>

                <p style={{
                  fontSize: "clamp(14px, 1.6vw, 17px)",
                  color: "rgba(255,255,255,0.50)",
                  maxWidth: "640px", margin: "0 auto", lineHeight: 1.7,
                }}>
                  {bi(copy.sub, l)}
                </p>
              </motion.div>

              {/* ── Cards ── */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                marginBottom: "72px",
              }}>
                {copy.cards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={i}
                      custom={i + 1} variants={fadeUp} initial="hidden" animate="show"
                      style={{
                        position: "relative",
                        borderRadius: "20px",
                        padding: "32px 28px",
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        display: "flex", flexDirection: "column",
                        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                        overflow: "hidden",
                      }}
                      whileHover={{ y: -4 }}
                    >
                      {/* Ambient glow */}
                      <div aria-hidden style={{
                        position: "absolute", top: 0, left: 0,
                        width: "240px", height: "240px", pointerEvents: "none",
                        background: `radial-gradient(circle, rgba(${card.color},0.18) 0%, rgba(${card.color},0) 65%)`,
                        filter: "blur(36px)", zIndex: 0,
                      }} />

                      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>

                        {/* Card header */}
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
                          <div style={{
                            width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                            background: `rgba(${card.color},0.14)`, border: `1px solid rgba(${card.color},0.28)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Icon size={20} color={card.colorHex} />
                          </div>
                          <span style={{
                            fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                            color: "rgba(255,255,255,0.18)",
                          }}>
                            {card.num}
                          </span>
                        </div>

                        <h2 style={{
                          fontSize: "18px", fontWeight: 800, color: "#fff",
                          letterSpacing: "-0.02em", marginBottom: "24px",
                        }}>
                          {bi(card.title, l)}
                        </h2>

                        {/* Divider */}
                        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "24px" }} />

                        <CardRow label={l === "fr" ? "Le Problème" : "The Problem"} text={bi(card.problem, l)} colorHex={card.colorHex} />
                        <CardRow label={l === "fr" ? "Le Moteur" : "The Engine"} text={bi(card.engine, l)} colorHex={card.colorHex} />

                        {/* ROI row — highlighted */}
                        <div style={{
                          marginTop: "auto", padding: "16px",
                          background: `rgba(${card.color},0.07)`,
                          border: `1px solid rgba(${card.color},0.18)`,
                          borderRadius: "12px",
                        }}>
                          <div style={{
                            fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
                            textTransform: "uppercase", color: card.colorHex, marginBottom: "8px",
                          }}>
                            {l === "fr" ? "Le ROI" : "The ROI"}
                          </div>
                          <p style={{
                            fontSize: "13px", color: "rgba(255,255,255,0.70)",
                            lineHeight: 1.65, margin: "0 0 14px",
                            textShadow: "0px 2px 5px rgba(0,0,0,0.9)",
                          }}>
                            {bi(card.roi, l)}
                          </p>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                            <span style={{
                              fontSize: "28px", fontWeight: 800, color: card.colorHex,
                              letterSpacing: "-0.03em", lineHeight: 1,
                            }}>
                              {card.stat}
                            </span>
                            <span style={{ fontSize: "11px", color: `rgba(${card.color},0.65)`, fontWeight: 600 }}>
                              {bi(card.statLabel, l)}
                            </span>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── CTA ── */}
              <motion.div
                custom={5} variants={fadeUp} initial="hidden" animate="show"
                style={{ textAlign: "center" }}
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/#contact";
                  }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    padding: "16px 36px",
                    background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                    borderRadius: "999px",
                    fontSize: "15px", fontWeight: 700, color: "#fff",
                    textDecoration: "none", letterSpacing: "-0.01em",
                    boxShadow: "0 0 32px rgba(59,130,246,0.35)",
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
                >
                  {bi(copy.cta, l)}
                  <ArrowRight size={16} />
                </a>
              </motion.div>

            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
