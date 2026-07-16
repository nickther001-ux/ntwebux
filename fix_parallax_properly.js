const fs = require('fs');
const path = 'artifacts/nt-web-design/src/components/sections/Services.tsx';
let c = fs.readFileSync(path, 'utf8');

// 1. Clean up the misplaced hooks from the main Services function
c = c.replace(/\s*const \{ scrollYProgress \} = useScroll\(\);\s*const yOffset = useTransform\(scrollYProgress, \[0, 1\], \[0, -150\]\);/g, '');

// 2. Clean up any leftover 'as={motion.div}' from previous attempts
c = c.replace(/\s*as=\{motion\.div\}/g, '');

// 3. Ensure framer-motion imports are correct
if (!c.includes('useScroll')) {
    if (/import\s+\{[^}]*\}\s+from\s+['"]framer-motion['"]/.test(c)) {
        c = c.replace(/import\s+\{[^}]*\}\s+from\s+['"]framer-motion['"]/, 'import { motion, useScroll, useTransform } from "framer-motion"');
    } else {
        c = `import { motion, useScroll, useTransform } from "framer-motion";\n` + c;
    }
}

// 4. Inject hooks safely inside the PillarCard component right before it returns
let idx = c.indexOf('className="pillar-card"');
if (idx !== -1 && !c.includes('const yOffset = useTransform')) {
    let returnIdx = c.lastIndexOf('return', idx);
    if (returnIdx !== -1) {
        let before = c.substring(0, returnIdx);
        let after = c.substring(returnIdx);
        c = before + "const { scrollYProgress } = useScroll();\n  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -150]);\n  " + after;
    }
}

// 5. Inject yOffset into the existing style object cleanly
if (!c.includes('y: yOffset')) {
    c = c.replace(/(className=["']pillar-card["'][\s\n]*)style=\{\{/g, '$1style={{ y: yOffset, ');
}

fs.writeFileSync(path, c);
console.log("Success: Parallax effect cleanly applied directly inside PillarCard!");
