import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const processSteps = [
  { 
    title: "Discovery Call", 
    desc: "We learn about your business, goals, and target audience to craft the perfect strategy." 
  },
  { 
    title: "Design & Strategy", 
    desc: "We create wireframes and high-fidelity mockups for your approval." 
  },
  { 
    title: "Build & Test", 
    desc: "We develop the site using modern tech, ensuring it's fast, secure, and bug-free." 
  },
  { 
    title: "Launch & Grow", 
    desc: "We deploy your new digital asset and help you scale your online presence." 
  }
];

export function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });
  
  // 1. Rigid, instant lock for the Y-axis. This entirely eliminates the shaky environment.
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "300vh"]);
  
  // 2. Smooth spring physics strictly applied to the horizontal X-axis slide.
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 400, 
    damping: 40, 
    mass: 0.2 
  });
  
  // Translates exactly to the end of the content minus viewport width
  const x = useTransform(smoothProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  return (
    <section ref={targetRef} style={{ height: "400vh", position: "relative" }}>
      
      <motion.div style={{ 
        y, 
        height: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0
      }}>
        
        <div style={{ textAlign: "center", marginBottom: "60px", padding: "0 20px" }}>
          <span style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", color: "#9ca3af", fontWeight: 600 }}>
            How We Work
          </span>
          <h2 style={{ fontSize: "40px", fontWeight: 800, color: "white", marginTop: "12px" }}>
            A streamlined process.
          </h2>
        </div>

        {/* Premium Layout: max-content allows cards to sit next to each other with a defined gap */}
        <motion.div style={{ x, display: "flex", gap: "32px", padding: "0 10vw", width: "max-content" }}>
          {processSteps.map((step, i) => (
            <div key={i} className="glass" style={{ 
              width: "420px", // Fixed width for each card
              backgroundColor: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.06)", 
              borderRadius: "20px", 
              padding: "48px",
              flexShrink: 0
            }}>
              <div style={{ 
                fontSize: "12px", 
                color: "#60a5fa", 
                textTransform: "uppercase", 
                letterSpacing: "1px", 
                marginBottom: "16px",
                fontWeight: 600
              }}>
                Step 0{i + 1} of 04
              </div>
              <h3 style={{ fontSize: "32px", color: "white", fontWeight: 800, marginBottom: "16px" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "16px", color: "#9ca3af", lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </motion.div>
        
        <div style={{ marginTop: "60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "120px", height: "2px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
             <motion.div style={{ 
               height: "100%", 
               backgroundColor: "#60a5fa", 
               width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) 
             }} />
          </div>
        </div>

      </motion.div>
    </section>
  );
}
