import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

function useMouseParallax(strength = 1) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  const handleMouse = (e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    x.set(((e.clientX - cx) / cx) * strength * 30);
    y.set(((e.clientY - cy) / cy) * strength * 30);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouse, { passive: true });
  }

  return { x: springX, y: springY };
}

export function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Scroll parallax per layer
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0px', '200px']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0px', '400px']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0px', '600px']);
  const layer4Y = useTransform(scrollYProgress, [0, 1], ['0px', '900px']);

  // Scroll rotation for 3D depth
  const rotateX = useTransform(scrollYProgress, [0, 0.3], ['0deg', '8deg']);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Mouse parallax
  const mouse1 = useMouseParallax(0.3);
  const mouse2 = useMouseParallax(0.6);
  const mouse3 = useMouseParallax(1.0);

  return (
    <div ref={ref} style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>

      {/* Layer 1 — Deep background grid (slowest) */}
      <motion.div style={{
        position: 'absolute', inset: '-20%',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        y: layer1Y,
        opacity: gridOpacity,
        rotateX,
        transformPerspective: '800px',
        transformOrigin: 'center top',
        x: mouse1.x,
      }} />

      {/* Layer 2 — Mid grid, smaller dots */}
      <motion.div style={{
        position: 'absolute', inset: '-20%',
        backgroundImage: 'radial-gradient(rgba(96,165,250,0.06) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        y: layer2Y,
        x: mouse1.x,
      }} />

      {/* Layer 3 — Floating orbs (medium speed) */}
      <motion.div style={{ position: 'absolute', inset: 0, y: layer2Y, x: mouse2.x, y: mouse2.y }}>

        {/* Top center blue orb */}
        <motion.div style={{
          position: 'absolute',
          top: '5%', left: '50%',
          width: '700px', height: '500px',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 65%)',
          filter: 'blur(60px)',
          y: layer2Y,
        }} />

        {/* Left purple orb */}
        <motion.div style={{
          position: 'absolute',
          top: '20%', left: '-10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)',
          y: layer3Y,
        }} />

        {/* Right cyan orb */}
        <motion.div style={{
          position: 'absolute',
          top: '30%', right: '-10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 65%)',
          filter: 'blur(70px)',
          y: layer2Y,
        }} />

        {/* Bottom center orb */}
        <motion.div style={{
          position: 'absolute',
          top: '60%', left: '40%',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 65%)',
          filter: 'blur(90px)',
          y: layer4Y,
        }} />
      </motion.div>

      {/* Layer 4 — Floating geometric shapes (fastest, mouse-reactive) */}
      <motion.div style={{ position: 'absolute', inset: 0, x: mouse3.x, y: mouse3.y }}>

        {/* Top-left diamond */}
        <motion.div
          style={{
            position: 'absolute',
            top: '12%', left: '8%',
            width: '180px', height: '180px',
            border: '1px solid rgba(96,165,250,0.12)',
            borderRadius: '24px',
            transform: 'rotate(45deg)',
            y: layer3Y,
          }}
          animate={{ rotate: [45, 50, 45], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Top-right circle ring */}
        <motion.div
          style={{
            position: 'absolute',
            top: '8%', right: '12%',
            width: '120px', height: '120px',
            border: '1px solid rgba(167,139,250,0.15)',
            borderRadius: '50%',
            y: layer2Y,
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Mid-left small square */}
        <motion.div
          style={{
            position: 'absolute',
            top: '35%', left: '5%',
            width: '60px', height: '60px',
            border: '1px solid rgba(34,211,238,0.12)',
            borderRadius: '8px',
            y: layer4Y,
          }}
          animate={{ rotate: [0, 90, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Mid-right large ring */}
        <motion.div
          style={{
            position: 'absolute',
            top: '25%', right: '6%',
            width: '200px', height: '200px',
            border: '1px solid rgba(59,130,246,0.08)',
            borderRadius: '50%',
            y: layer3Y,
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Bottom-left diamond */}
        <motion.div
          style={{
            position: 'absolute',
            top: '65%', left: '10%',
            width: '100px', height: '100px',
            border: '1px solid rgba(139,92,246,0.12)',
            borderRadius: '14px',
            y: layer4Y,
          }}
          animate={{ rotate: [45, 30, 45], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        {/* Bottom-right circle */}
        <motion.div
          style={{
            position: 'absolute',
            top: '70%', right: '8%',
            width: '140px', height: '140px',
            border: '1px solid rgba(96,165,250,0.10)',
            borderRadius: '50%',
            y: layer3Y,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

      </motion.div>

      {/* Noise texture overlay for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

    </div>
  );
}
