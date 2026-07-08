import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  "Web Design", "·", "Automation", "·", "72h Delivery", "·",
  "AI Systems", "·", "Bilingual", "·", "Canada & USA", "·",
  "No Templates", "·", "Code Ownership", "·",
];

export function ScrollTextBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const track = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        overflow: "hidden",
        padding: "48px 0",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      {/* Row 1 — moves left */}
      <motion.div
        style={{
          x: x1,
          display: "flex",
          gap: "32px",
          width: "max-content",
          marginBottom: "14px",
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: "12px",
              fontWeight: item === "·" ? 400 : 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: item === "·"
                ? "rgba(59,130,246,0.5)"
                : "rgba(255,255,255,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>

      {/* Row 2 — moves right (opposite) */}
      <motion.div
        style={{
          x: x2,
          display: "flex",
          gap: "32px",
          width: "max-content",
        }}
      >
        {[...track].reverse().map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: "12px",
              fontWeight: item === "·" ? 400 : 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: item === "·"
                ? "rgba(59,130,246,0.5)"
                : "rgba(255,255,255,0.18)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
