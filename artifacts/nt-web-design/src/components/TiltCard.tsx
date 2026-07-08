import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function TiltCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouse = (e: React.MouseEvent) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 12;
    const y = ((e.clientY - top) / height - 0.5) * -12;
    const glowX = ((e.clientX - left) / width) * 100;
    const glowY = ((e.clientY - top) / height) * 100;
    setTilt({ x, y });
    setGlow({ x: glowX, y: glowY });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        transformStyle: "preserve-3d",
        position: "relative",
        ...style,
      }}
      className={className}
    >
      {/* Glow follow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.12), transparent 60%)`,
          pointerEvents: "none",
          transition: "opacity 0.3s",
          opacity: tilt.x !== 0 || tilt.y !== 0 ? 1 : 0,
        }}
      />
      {children}
    </motion.div>
  );
}
