const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "testimonials.items" . | grep -v node_modules | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  // 1. Force max-content so the 50% translation math calculates against the true content height
  code = code.replace(
    /className=\{\`testimonial-col \$\{direction\}\`\}\s*style=\{\{[^\}]+\}\}/g,
    "className={`testimonial-col ${direction}`} style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: 0, height: 'max-content', willChange: 'transform' }}"
  );

  // 2. Define custom keyframes to ensure the global CSS isn't forcing a -100% break
  const styleBlock = `<style>{\`
        @keyframes perfect-scroll-down {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes perfect-scroll-up {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .testimonial-col.scroll-down {
          animation: perfect-scroll-down 25s linear infinite !important;
        }
        .testimonial-col.scroll-up {
          animation: perfect-scroll-up 25s linear infinite !important;
        }
        .testimonials-grid {
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%) !important;
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%) !important;
        }
        .fade-overlay { display: none !important; }
      \`}</style>`;

  code = code.replace(/<style>\{\`[\s\S]*?\`\}<\/style>/, styleBlock);

  fs.writeFileSync(file, code);
  console.log("Applied max-content height and custom keyframes. Infinite loop is secured.");
} catch (e) {
  console.error("Error:", e.toString());
}
