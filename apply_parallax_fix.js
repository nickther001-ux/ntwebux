const fs = require('fs');
const path = 'artifacts/nt-web-design/src/components/sections/Services.tsx';
let c = fs.readFileSync(path, 'utf8');

// 1. Ensure framer-motion imports exist
if (!c.includes('useScroll')) {
    c = c.replace(/import \{[^}]*\} from ['"]framer-motion['"]/, 'import { motion, useScroll, useTransform } from "framer-motion"');
}

// 2. Inject parallax hooks inside the function
if (!c.includes('const yOffset')) {
    c = c.replace(/export function Services\(\) \{/, `export function Services() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -150]);`);
}

// 3. Apply the motion transform to pillar cards
c = c.replace(/className=["']pillar-card["']/g, '$& as={motion.div} style={{ y: yOffset }}');

fs.writeFileSync(path, c);
console.log("Parallax depth effect applied to Service Pillars.");
