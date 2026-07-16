const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "Dr. Aline Côté" . | grep -v node_modules | head -n 1').toString().trim();
  if (!file) {
    console.error("Testimonials file not found.");
    process.exit(1);
  }

  let code = fs.readFileSync(file, 'utf8');

  // 1. Apply fade mask to the scrolling containers
  if (!code.includes('maskImage')) {
    code = code.replace(
      /(overflow:\s*['"]hidden['"],?)/g,
      "$1 maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',"
    );
  }

  // 2. Fix the loop snap (changes 100% translation to 50% for duplicated content arrays)
  code = code.replace(/transform:\s*['"]translateY\(-100%\)['"]/g, "transform: 'translateY(-50%)'");
  code = code.replace(/y:\s*\[['"]?0%?['"]?,\s*['"]?-100%['"]?\]/g, "y: ['0%', '-50%']");

  // 3. Increase animation speed (decreases duration values by ~40%)
  code = code.replace(/animationDuration:\s*['"]([0-9]+)s['"]/g, (match, p1) => {
    return `animationDuration: '${Math.max(15, Math.floor(parseInt(p1) * 0.6))}s'`;
  });
  
  code = code.replace(/duration:\s*([0-9]+)/g, (match, p1) => {
    const val = parseInt(p1);
    return val > 10 ? `duration: ${Math.max(15, Math.floor(val * 0.6))}` : match;
  });

  fs.writeFileSync(file, code);
  console.log(`Patched ${file}: Added fade mask, fixed 50% loop translation, and increased speed.`);
} catch (e) {
  console.error(e.toString());
}
