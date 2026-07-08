const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "Audrey Mondésir-L" . | grep -v node_modules | head -n 1').toString().trim();
  if (!file) {
    console.error("Testimonials file not found.");
    process.exit(1);
  }

  let code = fs.readFileSync(file, 'utf8');

  // Expand the fade gradient area from 5% to 15/85% for a much smoother and longer transition
  code = code.replace(
    /maskImage:\s*['"`]linear-gradient[^'"`]+['"`]/g, 
    "maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'"
  );
  code = code.replace(
    /WebkitMaskImage:\s*['"`]linear-gradient[^'"`]+['"`]/g, 
    "WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'"
  );

  fs.writeFileSync(file, code);
  console.log(`Patched ${file}: Expanded fade mask to 15% for a smoother top and bottom transition.`);
} catch (e) {
  console.error(e.toString());
}
