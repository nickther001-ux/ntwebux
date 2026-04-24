import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Bot, BarChart3, Bell } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

const FEATURES = [
  {
    icon: Bot,
    en: { title: 'AI Appointment Bot', desc: 'Captures leads, books calls, and follows up automatically — 24/7, in French or English.' },
    fr: { title: 'Bot IA de prise de rendez-vous', desc: 'Capture les leads, réserve des appels et assure le suivi automatiquement — 24h/7, en français ou en anglais.' },
  },
  {
    icon: BarChart3,
    en: { title: 'Client & Revenue Dashboard', desc: 'One unified view of your pipeline, invoices, and performance — no spreadsheets needed.' },
    fr: { title: 'Tableau de bord clients & revenus', desc: 'Vue unifiée de votre pipeline, vos factures et vos performances — sans tableur.' },
  },
  {
    icon: Bell,
    en: { title: 'Smart Follow-Up System', desc: 'Automated reminders and re-engagement sequences that keep clients moving forward.' },
    fr: { title: 'Système de relance intelligent', desc: 'Rappels automatiques et séquences de réengagement qui maintiennent l\'élan client.' },
  },
];

export function NTBusinessSuite() {
  const { lang } = useLanguage();

  return (
    <section style={{ padding: '100px 24px', background: 'rgba(6,13,26,0.6)' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 14px',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: '999px',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#93c5fd',
            marginBottom: '20px',
          }}>
            {lang === 'fr' ? 'Plateforme tout-en-un' : 'All-in-One Platform'}
          </span>

          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 800, lineHeight: 1.1,
            color: '#fff', marginBottom: '16px',
          }}>
            {lang === 'fr'
              ? <>NT Business Suite<br /><span style={{ color: '#93c5fd' }}>Tout ce qu'il faut pour croître.</span></>
              : <>NT Business Suite<br /><span style={{ color: '#93c5fd' }}>Everything you need to scale.</span></>}
          </h2>

          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.65 }}>
            {lang === 'fr'
              ? "Un CRM, un bot IA, et un système de relance automatique — conçu pour les entrepreneurs bilingues qui n'ont pas le temps de tout gérer manuellement."
              : "A CRM, AI bot, and automated follow-up system — built for bilingual service businesses that can't afford to lose leads."}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const copy = lang === 'fr' ? f.fr : f.en;
            return (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                style={{
                  padding: '28px 24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(59,130,246,0.12)',
                  borderRadius: '16px',
                  transition: 'border-color 0.25s',
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'rgba(59,130,246,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <Icon size={20} color="#93c5fd" />
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {copy.title}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {copy.desc}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          style={{ textAlign: 'center' }}
        >
          <Link href="/business" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
            borderRadius: '999px',
            fontSize: '13px', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: '#fff', textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(29,78,216,0.35)',
            transition: 'opacity 0.2s',
          }}>
            {lang === 'fr' ? 'Découvrir la suite →' : 'Explore the Suite →'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
