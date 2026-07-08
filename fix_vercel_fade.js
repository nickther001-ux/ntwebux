const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "testimonials.items" . | grep -v node_modules | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  // Strip the old mask rules from the style block to prevent conflicts
  code = code.replace(/\.testimonials-grid\s*\{[^}]+\}/g, "");

  // Inject the mask directly into the React style prop
  code = code.replace(
    /<div className="testimonials-grid">/g,
    `<div className="testimonials-grid" style={{ WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, transparent 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, transparent 100%)' }}>`
  );

  fs.writeFileSync(file, code);
  console.log("Moved fade mask to inline React style prop for Vercel deployment.");
} catch (e) {
  console.error("Error:", e.toString());
}
