const fs = require('fs');

// 1. Build the physics-based Magnetic wrapper component
const magneticCode = `import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // 0.15 controls the magnetic pull strength
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      style={{ display: 'inline-flex', position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
`;

fs.writeFileSync('artifacts/nt-web-design/src/components/Magnetic.tsx', magneticCode);

// 2. Inject it into the Hero section
const heroPath = 'artifacts/nt-web-design/src/components/sections/Hero.tsx';
if (fs.existsSync(heroPath)) {
  let heroCode = fs.readFileSync(heroPath, 'utf8');
  if (!heroCode.includes('Magnetic')) {
    // Add import
    heroCode = heroCode.replace(
      /import \{ motion.*\} from 'framer-motion';/, 
      "$& \nimport { Magnetic } from '@/components/Magnetic';"
    );
    
    // Wrap the "Start My Project" button
    heroCode = heroCode.replace(
      /(<motion\.button[^>]*onClick=\{onStart\}[^>]*>[\s\S]*?<\/motion\.button>)/g,
      "<Magnetic>$1</Magnetic>"
    );
    
    // Wrap the "See How It Works" button
    heroCode = heroCode.replace(
      /(<motion\.a[^>]*href=["']#process["'][^>]*>[\s\S]*?<\/motion\.a>)/g,
      "<Magnetic>$1</Magnetic>"
    );
    
    fs.writeFileSync(heroPath, heroCode);
    console.log("Magnetic physics applied to Hero CTAs.");
  } else {
    console.log("Magnetic interaction already present.");
  }
}
