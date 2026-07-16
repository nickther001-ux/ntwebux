import React, { useEffect, useRef } from "react";

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

const SPEEDS = [0.35, -0.22, 0.5];

function Card({ title, desc }: CardItem) {
  return (
    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-1.5 text-lg font-bold text-zinc-50">{title}</h3>
      <p className="text-sm text-zinc-400">{desc}</p>
    </div>
  );
}

function Column({ items, colRef }: { items: CardItem[]; colRef: React.RefObject<HTMLDivElement> }) {
  const track = [...items, ...items, ...items];
  return (
    <div ref={colRef} className="absolute left-0 top-0 w-full will-change-transform">
      {track.map((item, i) => (
        <Card key={i} {...item} />
      ))}
    </div>
  );
}

export const ScrollLinkedColumns = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const colRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const offsets = useRef([0, 0, 0]);
  const lastScrollY = useRef(0);
  const inView = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const obs = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (inView.current) lastScrollY.current = window.scrollY;
      },
      { threshold: 0 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);

    function applyTransforms() {
      colRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const trackHeight = ref.current.scrollHeight / 3;
        let o = offsets.current[i] % trackHeight;
        if (o > 0) o -= trackHeight;
        ref.current.style.transform = `translateY(${o}px)`;
      });
    }

    function onScroll() {
      const current = window.scrollY;
      if (!inView.current) {
        lastScrollY.current = current;
        return;
      }
      const delta = current - lastScrollY.current;
      lastScrollY.current = current;

      offsets.current = offsets.current.map((o, i) => o + delta * SPEEDS[i]);

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(applyTransforms);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-zinc-950 py-20"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="relative z-10 mx-auto mb-14 max-w-xl px-6 text-center">
        <h2 className="text-4xl font-black tracking-tight text-zinc-50 md:text-5xl">
          Built for how you actually work
        </h2>
      </div>

      <div className="relative mx-auto grid h-[520px] max-w-5xl grid-cols-3 gap-6 overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        {COLUMN_CONTENT.map((items, i) => (
          <div key={i} className="relative h-full overflow-hidden">
            <Column items={items} colRef={colRefs[i]} />
          </div>
        ))}
      </div>
    </section>
  );
};
