const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('find . -type f -name "*.tsx" ! -path "*/node_modules/*" ! -name "*i18n*" ! -name "*LanguageContext*" | xargs grep -l "StatsAndMarquee" | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  // Change the framer-motion transition duration from 0.5s to 7s
  code = code.replace(
    /duration:\s*0\.5/g,
    "duration: 7"
  );

  fs.writeFileSync(file, code);
  console.log("Updated stats slide-up animation duration to 7 seconds.");
} catch (e) {
  console.error("Error:", e.toString());
}
