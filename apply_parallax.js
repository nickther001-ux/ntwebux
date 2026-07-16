const fs = require('fs');
const path = 'artifacts/nt-web-design/src/App.tsx';

try {
  let code = fs.readFileSync(path, 'utf8');

  // 1. Ensure useTransform is imported
  if (!code.includes('useTransform')) {
    code = code.replace(
      /import \{ MotionConfig, useScroll, motion \} from "framer-motion";/,
      "import { MotionConfig, useScroll, useTransform, motion } from \"framer-motion\";"
    );
  }

  // 2. Set up the physics mapping for the 3 Orbs
  if (!code.includes('const yOrb1 =')) {
    code = code.replace(
      /const \{ scrollYProgress \} = useScroll\(\);/,
      `const { scrollYProgress } = useScroll();
  const yOrb1 = useTransform(scrollYProgress, [0, 1], ['0vh', '120vh']); // Drifts down
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ['0vh', '-90vh']); // Drifts up
  const yOrb3 = useTransform(scrollYProgress, [0, 1], ['0vh', '80vh']);  // Drifts down`
    );
  }

  // 3. Wrap the Hero Orb in a Parallax Layer
  if (!code.includes('y: yOrb1')) {
    code = code.replace(
      /(<div className="orb orb-hero"[\s\S]*?\/>)/,
      `<motion.div style={{ position: 'absolute', inset: 0, y: yOrb1, pointerEvents: 'none' }}>
          $1
        </motion.div>`
    );
  }

  // 4. Wrap the Bottom-Right Orb
  if (!code.includes('y: yOrb2')) {
    code = code.replace(
      /(<div className="orb orb-right"[\s\S]*?\/>)/,
      `<motion.div style={{ position: 'absolute', inset: 0, y: yOrb2, pointerEvents: 'none' }}>
          $1
        </motion.div>`
    );
  }

  // 5. Wrap the Mid-Left Orb
  if (!code.includes('y: yOrb3')) {
    code = code.replace(
      /(<div className="orb orb-left"[\s\S]*?\/>)/,
      `<motion.div style={{ position: 'absolute', inset: 0, y: yOrb3, pointerEvents: 'none' }}>
          $1
        </motion.div>`
    );
  }

  fs.writeFileSync(path, code);
  console.log("Global 3D Parallax applied to background orbs successfully.");
} catch (e) {
  console.error("Error:", e.toString());
}
