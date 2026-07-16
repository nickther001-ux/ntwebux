import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function ScrollTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const rawScale   = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);
  const rawZ       = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-600, 0, 0, -600]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawBlur    = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [12, 0, 0, 12]);

  const scale = useSpring(rawScale, { stiffness: 50, damping: 18 });
  const z     = useSpring(rawZ,     { stiffness: 50, damping: 18 });

  return (
    <div ref={ref} style={{ perspective: '1000px', perspectiveOrigin: '50% 40%' }}>
      <motion.div
        style={{
          scale,
          z,
          opacity: rawOpacity,
          filter: useTransform(rawBlur, v => `blur(${v}px)`),
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
