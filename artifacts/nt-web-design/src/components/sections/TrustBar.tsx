import { useLanguage } from '@/lib/i18n';
import { HardHat, Stethoscope, ShoppingBag, Cloud, Building2, Scale, Users, Sparkles } from 'lucide-react';

const INDUSTRIES_EN = [
  { icon: HardHat,     label: 'CoreBuild',    sub: 'Construction' },
  { icon: Stethoscope, label: 'PhysioPlus',   sub: 'Healthcare' },
  { icon: ShoppingBag, label: 'Charmant',     sub: 'eCommerce' },
  { icon: Cloud,       label: 'FieldOps',     sub: 'SaaS' },
  { icon: Building2,   label: 'Haventra',     sub: 'Real Estate' },
  { icon: Scale,       label: 'Civitas',      sub: 'Legal' },
  { icon: Users,       label: 'AudreyRH',     sub: 'HR' },
  { icon: Sparkles,    label: 'Goalz',        sub: 'Fitness' },
];

const INDUSTRIES_FR = [
  { icon: HardHat,     label: 'CoreBuild',    sub: 'Construction' },
  { icon: Stethoscope, label: 'PhysioPlus',   sub: 'Santé' },
  { icon: ShoppingBag, label: 'Charmant',     sub: 'eCommerce' },
  { icon: Cloud,       label: 'FieldOps',     sub: 'SaaS' },
  { icon: Building2,   label: 'Haventra',     sub: 'Immobilier' },
  { icon: Scale,       label: 'Civitas',      sub: 'Juridique' },
  { icon: Users,       label: 'AudreyRH',     sub: 'RH' },
  { icon: Sparkles,    label: 'Goalz',        sub: 'Fitness' },
];

export function TrustBar() {
  const { lang } = useLanguage();
  const items  = lang === 'fr' ? INDUSTRIES_FR : INDUSTRIES_EN;
  const label  = lang === 'fr'
    ? 'AU SERVICE D\'OPÉRATIONS SUR 3 CONTINENTS'
    : 'POWERING OPERATIONS ACROSS 3 CONTINENTS';

  /* Duplicate the list for a seamless infinite marquee loop */
  const loop = [...items, ...items];

  return (
    <div style={{ width: '100%', padding: '40px 0 60px', position: 'relative', overflow: 'hidden' }}>
      {/* Eyebrow label */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.32)',
        }}>
          {label}
        </span>
      </div>

      {/* Marquee track */}
      <div className="trustbar-mask" style={{ position: 'relative', width: '100%' }}>
        <div className="trustbar-track" style={{ display: 'flex', gap: '64px', width: 'max-content', alignItems: 'center' }}>
          {loop.map((item, i) => (
            <div
              key={i}
              className="trustbar-logo"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'rgba(255,255,255,0.7)',
                /* Grayscale + 50% baseline opacity, lifts to full on hover */
                filter: 'grayscale(100%)',
                opacity: 0.5,
                transition: 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <item.icon size={26} strokeWidth={1.6} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                <span style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em' }}>{item.label}</span>
                <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trustbar-track {
          animation: marquee-scroll 48s linear infinite;
          will-change: transform;
        }
        .trustbar-mask {
          /* Soft fade on the left/right edges */
          mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
        .trustbar-logo:hover {
          opacity: 1 !important;
          filter: grayscale(0%) !important;
          color: #fff !important;
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .trustbar-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
