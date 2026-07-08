const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "testimonials.items" . | grep -v node_modules | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  // 1. Rewrite the Column component to use isolated tracking groups
  const newColumn = `function Column({ items, direction }: { items: TestimonialItem[]; direction: 'scroll-down' | 'scroll-up' }) {
  const Track = () => (
    <div className="testimonial-track" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1.5rem' }}>
      {items.map((item, i) => (
        <TestimonialCard key={i} item={item} />
      ))}
    </div>
  );

  return (
    <div className={\`testimonial-col \${direction}\`} style={{ gap: 0, padding: 0 }}>
      <Track />
      <Track />
    </div>
  );
}`;

  code = code.replace(
    /function Column\([\s\S]*?return \([\s\S]*?<\/\s*div>\s*\);\s*\}/,
    newColumn
  );

  // 2. Inject CSS override for speed and linear looping
  if (!code.includes('.testimonial-col.scroll-down { animation-duration:')) {
    code = code.replace(
      /<section className="testimonials-wrapper">/,
      `<section className="testimonials-wrapper">\n      <style>{\`\n        .testimonial-col.scroll-down { animation-duration: 22s !important; animation-timing-function: linear !important; }\n        .testimonial-col.scroll-up { animation-duration: 22s !important; animation-timing-function: linear !important; }\n      \`}</style>`
    );
  }

  fs.writeFileSync(file, code);
  console.log("Successfully rebuilt component for a mathematically perfect infinite scroll.");
} catch (e) {
  console.error("Error:", e.toString());
}
