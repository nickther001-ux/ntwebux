const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "testimonials.items" . | grep -v node_modules | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  // 1. Multiply the array so the track is massively tall. 
  // This ensures the browser never reveals empty space before the 50% loop resets.
  if (!code.includes('Array(4).fill(items).flat()')) {
    code = code.replace(
      /\{items\.map\(\(item,\s*i\)\s*=>/g,
      "{Array(4).fill(items).flat().map((item, i) =>"
    );
  }

  // 2. Change column classes to bypass ALL global CSS conflicts
  code = code.replace(
    /className=\{\`testimonial-col \$\{direction\}\`\}(?:\s*style=\{\{[^\}]+\}\})?/g,
    "className={direction === 'scroll-down' ? 'nt-anim-down' : 'nt-anim-up'}"
  );

  // 3. Inject an absolute source-of-truth style block
  const newStyleBlock = `<style>{\`
    @keyframes nt-slide-down {
      0% { transform: translateY(-50%); }
      100% { transform: translateY(0%); }
    }
    @keyframes nt-slide-up {
      0% { transform: translateY(0%); }
      100% { transform: translateY(-50%); }
    }
    .nt-anim-down {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 0;
      height: max-content;
      will-change: transform;
      animation: nt-slide-down 35s linear infinite !important;
    }
    .nt-anim-up {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 0;
      height: max-content;
      will-change: transform;
      animation: nt-slide-up 35s linear infinite !important;
    }
    .testimonials-grid {
      -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, transparent 100%) !important;
      mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, transparent 100%) !important;
    }
    .fade-overlay { display: none !important; }
  \`}</style>`;

  code = code.replace(/<style>\{\`[\s\S]*?\`\}<\/style>/, newStyleBlock);

  fs.writeFileSync(file, code);
  console.log("Applied absolute fix: Extended track length and isolated CSS classes.");
} catch (e) {
  console.error("Error:", e.toString());
}
