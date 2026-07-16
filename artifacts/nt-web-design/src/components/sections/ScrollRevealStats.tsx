import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const STATS = [
  { num: 200, suffix: "+", label: { en: "Websites Delivered", fr: "Sites Livrés" } },
  { num: 72,  suffix: "h", label: { en: "Avg. Turnaround",   fr: "Délai Moyen" } },
  { num: 98,  suffix: "%", label: { en: "Client Satisfaction", fr: "Satisfaction Client" } },
  { num: 5,   suffix: "★", label: { en: "Average Rating",    fr: "Note Moyenne" } },
];

function useCountUp(target: number, duration = 1600, triggered: boolean) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!triggered || done.current) return;
    done.current = true;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target, duration]);
  return val;
}

function StatCard({
  num, suffix, label, delay, lang,
}: {
  num: number; suffix: string;
  label: { en: string; fr: string };
  delay: number; lang: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const count = useCountUp(num, 1600, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTriggered(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "48px 16px",
        position: "relative",
      }}
    >
      {/* Subtle glow behind each number */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)",
        borderRadius: "16px",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        fontWeight: 900,
        letterSpacing: "-0.04em",
        background: "linear-gradient(135deg, #93c5fd 0%, #bfdbfe 40%, #3b82f6 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1,
      }}>
        {count}{suffix}
      </div>

      <div style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)",
        marginTop: "12px",
      }}>
        {label[lang as "en" | "fr"]}
      </div>
    </motion.div>
  );
}

export function ScrollRevealStats({ lang = "en" }: { lang?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useSpring(
    useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]),
    { stiffness: 60, damping: 20 }
  );

  return (
    <div
      ref={sectionRef}
      style={{
        width: "100%",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.01)",
        overflow: "hidden",
      }}
    >
      {/* Scroll-driven line that grows across the top */}
      <motion.div style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "1px",
        width: lineWidth,
        background: "linear-gradient(to right, transparent, rgba(59,130,246,0.6), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
      }}
        className="stat-reveal-grid"
      >
        {STATS.map((s, i) => (
          <StatCard
            key={s.label.en}
            {...s}
            delay={i * 0.1}
            lang={lang}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stat-reveal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
