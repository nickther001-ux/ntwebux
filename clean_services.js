const fs = require('fs');
const path = './artifacts/nt-web-design/src/components/sections/Services.tsx';

let code = fs.readFileSync(path, 'utf8');

// 1. Remove italics from subheadings
code = code.replace(/fontStyle:\s*['"]italic['"]/g, "fontStyle: 'normal'");

// 2. Increase bullet spacing
code = code.replace(/gap:\s*['"]12px['"]/g, "gap: '24px'");

// 3. Flatten the 'Pour Qui' container
code = code.replace(/background:\s*`rgba\(\$\{[^}]+\},\s*0\.07\)`/g, "background: 'transparent'");
code = code.replace(/border:\s*`1px solid rgba\(\$\{[^}]+\},\s*0\.18\)`/g, "borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none'");

// 4. Remove redundant title span
code = code.replace(/<span[^>]*style=\{\{[\s\S]*?\}\}[^>]*>\s*\{[^}]+\.tag\}\s*<\/span>/g, "");

fs.writeFileSync(path, code);
console.log("Services.tsx layout updated!");
