import React from "react";

interface CardItem {
  title: string;
  desc: string;
}

const COLUMN_CONTENT: CardItem[][] = [
  [
    { title: "100% Code Ownership", desc: "Full source, no lock-in." },
    { title: "72h Delivery", desc: "Live in three days, not six weeks." },
    { title: "AI-Driven Builds", desc: "Modern tooling, built in." },
    { title: "Canada & USA Ready", desc: "Built for North American speed." },
  ],
  [
    { title: "Booking Automation", desc: "Clients confirm their own slot." },
    { title: "SMS Reminders", desc: "Fewer no-shows, less chasing." },
    { title: "Centralized CRM", desc: "Every client, one place." },
    { title: "Lead Follow-Up", desc: "Auto-nurture until they convert." },
  ],
  [
    { title: "Custom CRM", desc: "Built around how you work." },
    { title: "Real Dashboards", desc: "See what's actually happening." },
    { title: "API Integrations", desc: "Connect the tools you already use." },
    { title: "Ongoing Support", desc: "Direct line, no ticket queue." },
  ],
];

const COLUMN_CONFIG: { duration: number; direction: "up" | "down" }[] = [
  { duration: 22, direction: "up" },
  { duration: 28, direction: "down" },
  { duration: 18, direction: "up" },
];

function Card({ title, desc }: CardItem) {
  return (
    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-1.5 text-lg font-bold text-zinc-50">{title}</h3>
      <p className="text-sm text-zinc-400">{desc}</p>
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
    <div className="relative h-full overflow-hidden">
      <div
        className="col-track absolute left-0 top-0 w-full will-change-transform"
        style={{ animation: `${animName} ${duration}s linear infinite` }}
      >
        {track.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export const ScrollLinkedColumns = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#030712] py-20"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
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
      `}</style>

      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />

      <div className="relative z-10 mx-auto mb-14 max-w-xl px-6 text-center">
        <h2 className="text-4xl font-black tracking-tight text-zinc-50 md:text-5xl">
          Built for how you actually work
        </h2>
      </div>

      <div className="relative z-10 mx-auto grid h-[520px] max-w-5xl grid-cols-3 gap-6 overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        {COLUMN_CONTENT.map((items, i) => (
          <Column
            key={i}
            items={items}
            duration={COLUMN_CONFIG[i].duration}
            direction={COLUMN_CONFIG[i].direction}
          />
        ))}
      </div>
    </section>
  );
};
