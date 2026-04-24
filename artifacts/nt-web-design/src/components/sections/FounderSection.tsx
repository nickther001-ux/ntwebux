import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { MapPin, Globe, Shield } from 'lucide-react';

export function FounderSection() {
  const { lang } = useLanguage();

  const badges = [
    { icon: MapPin, label: lang === 'fr' ? 'Basé à Montréal' : 'Based in Montréal' },
    { icon: Globe, label: lang === 'fr' ? 'Bilingue' : 'Bilingual' },
    { icon: Shield, label: lang === 'fr' ? 'Conforme à la Loi 25' : 'Law 25 Compliant' },
  ];

  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '48px 48px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '24px',
          }}
        >
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px',
          }}>
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '5px 12px',
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: '999px',
                  fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.04em', color: '#93c5fd',
                }}>
                  <Icon size={11} />
                  {b.label}
                </span>
              );
            })}
          </div>

          <h2 style={{
            fontSize: 'clamp(24px, 3.5vw, 38px)',
            fontWeight: 800, lineHeight: 1.15,
            color: '#fff', marginBottom: '20px',
          }}>
            {lang === 'fr'
              ? <>Construit par un fondateur<br /><span style={{ color: '#93c5fd' }}>qui comprend votre réalité.</span></>
              : <>Built by a founder<br /><span style={{ color: '#93c5fd' }}>who gets your reality.</span></>}
          </h2>

          <p style={{
            fontSize: '15px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.75,
            maxWidth: '620px', marginBottom: '20px',
          }}>
            {lang === 'fr'
              ? "NT Digital Group a été fondé à Montréal pour répondre à un besoin clair : les entrepreneurs bilingues méritent une présence numérique aussi professionnelle que leur travail. Chaque projet est livré bilingue, conforme à la Loi 25, et conçu pour convertir — pas pour impressionner les designers."
              : "NT Digital Group was founded in Montréal to solve a clear problem: bilingual service businesses deserve a digital presence as professional as their work. Every project is delivered bilingual, Law 25 compliant, and engineered to convert — not to win design awards."}
          </p>

          <p style={{
            fontSize: '14px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7,
          }}>
            {lang === 'fr'
              ? "Nous sommes une équipe compacte et obsédée par les résultats. Pas d'agence gonflée, pas de délais de 3 mois. Juste du travail de haute qualité, livré vite, qui génère des revenus réels."
              : "We're a lean, results-obsessed team. No bloated agency structure, no 3-month timelines. Just high-quality work, delivered fast, that drives real revenue."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
