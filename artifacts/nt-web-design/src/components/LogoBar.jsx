import { HardHat, Stethoscope, ShoppingBag, Cloud, Building2, Scale, Users, Sparkles, Car, Lightbulb } from "lucide-react";

const logos = [
  { name: "PhysioPlus",  category: "HEALTHCARE",    icon: Stethoscope },
  { name: "Charmant",    category: "ECOMMERCE",     icon: ShoppingBag },
  { name: "FieldOps",    category: "SAAS",          icon: Cloud       },
  { name: "Haventra",    category: "REAL ESTATE",   icon: Building2   },
  { name: "Civitas",     category: "LEGAL",         icon: Scale       },
  { name: "AudreyRH",    category: "HR",            icon: Users       },
  { name: "Goalz",       category: "FITNESS",       icon: Sparkles    },
  { name: "CoreBuild",   category: "CONSTRUCTION",  icon: HardHat     },
  { name: "AceEsthétique", category: "AUTO DETAILING", icon: Car      },
  { name: "Living Lights", category: "RETAIL",      icon: Lightbulb   },
];

const LogoItem = ({ name, category, icon: Icon }) => (
  <div className="flex items-center gap-3 shrink-0 px-8" style={{ opacity: 0.5, filter: 'grayscale(100%)', transition: 'opacity 0.3s, filter 0.3s, transform 0.3s', whiteSpace: 'nowrap' }}
    onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
    onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    <Icon size={22} strokeWidth={1.6} style={{ color: 'rgba(255,255,255,0.7)', flexShrink: 0 }} />
    <div style={{ lineHeight: 1.05 }}>
      <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{name}</div>
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>{category}</div>
    </div>
  </div>
);

export default function LogoBar() {
  return (
    <section style={{ width: '100%', padding: '40px 0 60px', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      <p style={{ textAlign: 'center', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '32px' }}>
        POWERING OPERATIONS ACROSS 3 CONTINENTS
      </p>

      <div style={{ position: 'relative', width: '100%', maskImage: 'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)' }}>
        <div className="logobar-track" style={{ display: 'flex', width: 'max-content', alignItems: 'center' }}>
          {logos.map((logo) => <LogoItem key={`a-${logo.name}`} {...logo} />)}
          {logos.map((logo) => <LogoItem key={`b-${logo.name}`} {...logo} />)}
        </div>
      </div>

      <style>{`
        @keyframes logobar-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .logobar-track {
          animation: logobar-scroll 48s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .logobar-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
