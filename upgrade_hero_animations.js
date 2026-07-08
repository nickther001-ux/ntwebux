const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('find . -type f -name "*.tsx" ! -path "*/node_modules/*" | xargs grep -l "h1_1" | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  if (!code.includes("import { motion }")) {
    code = code.replace(/import React/, "import React\nimport { motion }");
  }

  const variantsCode = `
  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
  const textVars = { hidden: { y: "120%", opacity: 0, rotateZ: 2 }, show: { y: "0%", opacity: 1, rotateZ: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } } };
  `;
  
  if (!code.includes('containerVars')) {
    code = code.replace(/export function Hero\([^)]*\)\s*\{/, "$&\n" + variantsCode);
  }

  code = code.replace(
    /<h1([^>]*)>([\s\S]*?)<\/h1>/,
    `<motion.h1$1 variants={containerVars} initial="hidden" animate="show" style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {[t('hero.h1_1'), t('hero.h1_2'), t('hero.h1_3'), t('hero.h1_4')].map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span variants={textVars} style={{ display: 'inline-block', transformOrigin: 'bottom left' }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>`
  );

  fs.writeFileSync(file, code);
  console.log("Upgraded Hero section successfully.");
} catch (e) {
  console.error("Error patching Hero:", e.toString());
}
