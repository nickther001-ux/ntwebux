const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "testimonials.items" . | grep -v node_modules | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  // Remove the old style block if it exists
  code = code.replace(/<style>\{\`[\s\S]*?\`\}<\/style>/, "");

  // Inject the comprehensive CSS overrides for both the infinite loop and the fade masks
  const styleBlock = `<style>{\`
        .testimonial-col.scroll-down { animation-duration: 22s !important; animation-timing-function: linear !important; }
        .testimonial-col.scroll-up { animation-duration: 22s !important; animation-timing-function: linear !important; }
        .testimonials-grid {
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%) !important;
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%) !important;
        }
        .fade-overlay { display: none !important; } /* Hide the broken div overlays */
      \`}</style>`;

  code = code.replace(
    /<div className="testimonials-grid">/,
    styleBlock + '\n      <div className="testimonials-grid">'
  );

  fs.writeFileSync(file, code);
  console.log("Forced CSS mask applied to testimonials grid.");
} catch (e) {
  console.error("Error:", e.toString());
}
