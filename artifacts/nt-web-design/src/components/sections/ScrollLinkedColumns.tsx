import React from "react";
import { useLanguage } from "@/lib/i18n";

interface CardItem {
  title: string;
  desc: string;
}

const COLUMN_CONFIG: { duration: number; direction: "up" | "down" }[] = [
  { duration: 22, direction: "up" },
  { duration: 28, direction: "down" },
  { duration: 18, direction: "up" },
];

function Card({ title, desc }: CardItem) {
  return (
    <div style={{
      marginBottom: '16px',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(255,255,255,0.04)',
      padding: '20px',
    }}>
      <h3 style={{ marginBottom: '6px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function Column({
  items,
  duration,
  direction,
}: {
  items: CardItem[];
  duration: number;
  direction: "up" | "down";
}) {
  const track = [...items, ...items];
  const animName = direction === "down" ? "col-down" : "col-up";
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <div style={{ animation: `${animName} ${duration}s linear infinite`, position: 'absolute', top: 0, left: 0, width: '100%' }}>
        {track.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export const ScrollLinkedColumns = () => {
  const { t } = useLanguage();
  const title: string = t("scrollColumns.title");
  const COLUMN_CONTENT: CardItem[][] = t("scrollColumns.columns");

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      background: '#030712',
      padding: '80px 24px',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    }}>
      <style>{`
        @keyframes col-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes col-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .col-track { animation: none !important; }
        }
        .scroll-cols-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          height: 420px;
        }
        .scroll-cols-grid > div:nth-child(2),
        .scroll-cols-grid > div:nth-child(3) {
          display: none;
        }
        @media (min-width: 768px) {
          .scroll-cols-grid {
            grid-template-columns: repeat(3, 1fr);
            height: 520px;
          }
          .scroll-cols-grid > div:nth-child(2),
          .scroll-cols-grid > div:nth-child(3) {
            display: block;
          }
        }
      `}</style>

      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: '-8rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40rem',
        height: '24rem',
        borderRadius: '50%',
        background: 'rgba(37,99,235,0.25)',
        filter: 'blur(120px)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '560px', margin: '0 auto 56px', textAlign: 'center', padding: '0 16px' }}>
        <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
          {title}
        </h2>
      </div>

      <div
        className="scroll-cols-grid"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '0 8px',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      >
        {COLUMN_CONTENT.map((items, i) => (
          <div key={i}>
            <Column
              items={items}
              duration={COLUMN_CONFIG[i].duration}
              direction={COLUMN_CONFIG[i].direction}
            />
          </div>
        ))}
      </div>
    </section>
  );
};