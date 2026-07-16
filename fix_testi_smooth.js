const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "Dr. Aline Côté" . | grep -v node_modules | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  // 1. Strip out the broken mask attempts
  code = code.replace(/maskImage:\s*['"][^'"]+['"],?\s*/g, '');
  code = code.replace(/WebkitMaskImage:\s*['"][^'"]+['"],?\s*/g, '');

  // 2. Inject a universally supported percentage mask
  code = code.replace(
    /(overflow:\s*['"]hidden['"],?)/g,
    "$1 WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',"
  );

  // 3. Offset the -50% loop translation to account for standard flex gaps (usually 16px to 24px)
  code = code.replace(/y:\s*\[['"]?0%?['"]?,\s*['"]?-50%['"]?\]/g, "y: ['0%', 'calc(-50% - 8px)']");
  code = code.replace(/transform:\s*['"]translateY\(-50%\)['"]/g, "transform: 'translateY(calc(-50% - 8px))'");
  
  // Note: if the middle column scrolls down (positive y), adjust its specific array:
  code = code.replace(/y:\s*\[['"]?-50%['"]?,\s*['"]?0%?['"]?\]/g, "y: ['calc(-50% - 8px)', '0%']");

  fs.writeFileSync(file, code);
  console.log("Patched smooth fade mask and offset loop calculation to prevent snapping.");
} catch (e) {
  console.error("Error:", e.toString());
}
