const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('find . -type f -name "*.tsx" ! -path "*/node_modules/*" ! -name "*i18n*" ! -name "*LanguageContext*" | xargs grep -l "StatsAndMarquee" | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  // 1. Add required Framer Motion hooks
  if (!code.includes('useMotionValue')) {
    code = code.replace(
      /import \{ motion \} from 'framer-motion';/,
      "import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';"
    );
  }

  // 2. Inject the dynamic Counter component
  if (!code.includes('function Counter(')) {
    const counterCode = `
function Counter({ text }: { text: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const match = typeof text === 'string' ? text.match(/^([0-9.]+)(.*)$/) : null;
  
  const count = useMotionValue(0);
  const num = match ? parseFloat(match[1]) : 0;
  const isFloat = match ? match[1].includes('.') : false;
  const display = useTransform(count, (v) => match ? (isFloat ? v.toFixed(1) : Math.round(v)) : text);
  
  React.useEffect(() => {
    if (isInView && match) {
      animate(count, num, { duration: 7, ease: "easeOut" });
    }
  }, [isInView, num, count, match]);
  
  if (!match) return <span ref={ref}>{text}</span>;
  return <span ref={ref}><motion.span>{display}</motion.span>{match[2]}</span>;
}
`;
    code = code.replace(/export function StatsAndMarquee/, counterCode + '\nexport function StatsAndMarquee');
  }

  // 3. Replace static values with the animated Counter component
  code = code.replace(/\{\s*stat\.v\s*\}/g, "<Counter text={stat.v} />");

  fs.writeFileSync(file, code);
  console.log("Injected dynamic Counter component. Numbers will now tally from zero over 7 seconds.");
} catch (e) {
  console.error("Error:", e.toString());
}
