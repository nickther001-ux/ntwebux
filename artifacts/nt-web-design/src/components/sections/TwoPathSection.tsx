import { Cpu, Code2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useLocation } from 'wouter';

const COPY = {
  en: {
    eyebrow: 'How We Help You Scale',
    heading: 'Two ways to grow your business with NT Digital Group.',
    left: {
      eyebrow: 'The Software',
      title: 'NT Business Suite',
      desc: 'The all-in-one AI operating system for service businesses. Automate follow-ups, capture missed calls, and manage your entire pipeline.',
      cta: 'Explore the Software',
    },
    right: {
      eyebrow: 'The Labor',
      title: 'Custom Development',
      desc: 'Need a high-converting website or a custom internal application? We build high-performance digital assets you own 100%.',
      cta: 'Request a Custom Build',
    },
  },
  fr: {
    eyebrow: "Comment Pouvons-Nous Vous Aider à Grandir",
    heading: "Deux façons de faire croître votre entreprise avec NT Digital Group.",
    left: {
      eyebrow: "Le Logiciel",
      title: "NT Business Suite",
      desc: "Le système d'exploitation IA tout-en-un pour les entreprises de services. Automatisez les suivis, capturez les appels manqués et gérez tout votre pipeline.",
      cta: "Explorer le Logiciel",
    },
    right: {
      eyebrow: "Le Service",
      title: "Développement Sur Mesure",
      desc: "Besoin d'un site web haute conversion ou d'une application interne ? Nous construisons des actifs numériques haute performance que vous possédez à 100 %.",
      cta: "Demander un Devis",
    },
  },
};

export function TwoPathSection() {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  const t = COPY[lang];

  return (
    <section style={{ width: '100%', padding: '80px 24px 72px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Eyebrow + Heading */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '14px',
          }}>
            {t.eyebrow}
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: 'rgba(255,255,255,0.45)',
            fontWeight: 400,
          }}>
            {t.heading}
          </p>
        </div>

        {/* Two cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="two-path-grid">

          {/* Left — NT Business Suite */}
          <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Icon */}
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'rgba(34,211,238,0.1)',
              border: '1px solid rgba(34,211,238,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Cpu size={24} color="rgb(34,211,238)" />
            </div>

            {/* Text */}
            <div>
              <p style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.13em',
                textTransform: 'uppercase', color: 'rgba(34,211,238,0.7)',
                marginBottom: '10px',
              }}>{t.left.eyebrow}</p>
              <h3 style={{
                fontSize: 'clamp(1.4rem, 2.4vw, 1.75rem)',
                fontWeight: 800, color: '#fff',
                letterSpacing: '-0.03em', lineHeight: 1.15,
                marginBottom: '14px',
              }}>{t.left.title}</h3>
              <p style={{
                fontSize: '15px', color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.65,
              }}>{t.left.desc}</p>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/business-suite')}
              style={{
                alignSelf: 'flex-start',
                marginTop: '4px',
                padding: '12px 22px',
                borderRadius: '10px',
                border: '1px solid rgba(34,211,238,0.35)',
                background: 'rgba(34,211,238,0.08)',
                color: 'rgb(34,211,238)',
                fontSize: '14px', fontWeight: 600,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(34,211,238,0.15)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(34,211,238,0.55)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(34,211,238,0.08)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(34,211,238,0.35)';
              }}
            >
              {t.left.cta} <ArrowRight size={15} />
            </button>
          </div>

          {/* Right — Custom Development */}
          <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Icon */}
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Code2 size={24} color="rgb(59,130,246)" />
            </div>

            {/* Text */}
            <div>
              <p style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.13em',
                textTransform: 'uppercase', color: 'rgba(59,130,246,0.7)',
                marginBottom: '10px',
              }}>{t.right.eyebrow}</p>
              <h3 style={{
                fontSize: 'clamp(1.4rem, 2.4vw, 1.75rem)',
                fontWeight: 800, color: '#fff',
                letterSpacing: '-0.03em', lineHeight: 1.15,
                marginBottom: '14px',
              }}>{t.right.title}</h3>
              <p style={{
                fontSize: '15px', color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.65,
              }}>{t.right.desc}</p>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              style={{
                alignSelf: 'flex-start',
                marginTop: '4px',
                padding: '12px 22px',
                borderRadius: '10px',
                border: '1px solid rgba(59,130,246,0.35)',
                background: 'rgba(59,130,246,0.08)',
                color: 'rgb(59,130,246)',
                fontSize: '14px', fontWeight: 600,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.15)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.55)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.08)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.35)';
              }}
            >
              {t.right.cta} <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .two-path-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
