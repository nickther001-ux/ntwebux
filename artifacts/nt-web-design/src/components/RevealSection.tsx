import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";

const variants: Record<Variant, object> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeIn: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
  },
};

export function RevealSection({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: (variants[variant] as any).hidden,
        visible: {
          ...(variants[variant] as any).visible,
          transition: {
            ...(variants[variant] as any).visible.transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
