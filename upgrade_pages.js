const fs = require('fs');

// 1. Fix the ROI Calculator (Adding fields and fixing the submission hang)
const roiPath = 'artifacts/nt-web-design/src/components/ROICalculator.tsx';
let roiCode = fs.readFileSync(roiPath, 'utf8');

if (!roiCode.includes('const API_BASE')) {
  roiCode = roiCode.replace(
    /export function ROICalculator\(\) \{/,
    "const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\\/$/, '');\n\nexport function ROICalculator() {"
  );
}

if (roiCode.includes('formspree')) {
  roiCode = roiCode.replace(
    /const form = new FormData\(\);[\s\S]*?const res = await fetch\(['"`]https:\/\/formspree\.io[^\n]+,\s*\{[\s\S]*?body:\s*form[\s\S]*?\}\);/m,
    `const res = await fetch(\`\${API_BASE}/api/contact\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: 'FieldOps Pro (from ROI Audit)',
          message: \`Pain point: \${pain}\\nAnnual leakage: $\{(annualLeakage || 0).toLocaleString()\}\\nProjected recovery: $\{(projectedRecovery || 0).toLocaleString()}\`
        })
      });`
  );
}

if (!roiCode.includes('value={email}')) {
  const emailPhoneFields = `
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>Phone / WhatsApp *</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#fff', outline: 'none' }} />
              </div>
  `;
  
  roiCode = roiCode.replace(
    /(<input[^>]*value=\{company\}[^>]*>[\s\S]*?<\/div>)/,
    `$1\n${emailPhoneFields}`
  );
}

fs.writeFileSync(roiPath, roiCode);
console.log("ROI Calculator updated successfully.");

// 2. Add 'Start My Project' CTA to remaining pages
const pages = [
  'artifacts/nt-web-design/src/pages/Toronto.tsx',
  'artifacts/nt-web-design/src/pages/IndustryPage.tsx',
  'artifacts/nt-web-design/src/pages/LocationPage.tsx',
  'artifacts/nt-web-design/src/pages/BusinessSolutions.tsx'
];

const ctaHtml = `
        {/* ── Start My Project CTA ── */}
        <section style={{ padding: '80px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60a5fa' }}>
              Ready to get started?
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Start your project
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>
              Bilingual, fast, and built to convert. Most sites go live in 72 hours.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-violet"
              style={{ padding: '14px 32px', fontSize: '15px', fontWeight: 700, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              Start My Project <ArrowRight size={16} />
            </button>
          </div>
        </section>
`;

pages.forEach(p => {
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  
  if (!content.includes('Start My Project CTA')) {
    // Add useState if missing
    if (!content.includes('useState')) {
        content = content.replace(/import \{/, "import { useState } from 'react';\nimport {");
    }

    if (!content.includes('setModalOpen')) {
       content = content.replace(
         /export default function \w+\(.*\) \{/,
         `const DEFAULT_PLAN = { name: "New Project", price: "500" };\n\n$&\n  const [modalOpen, setModalOpen] = useState(false);`
       );
    }
    
    if (!content.includes('OnboardingModal')) {
       content = content.replace(/import \{ Footer \} from [^;]+;/, `$& \nimport { OnboardingModal } from '@/components/OnboardingModal';`);
    }
    
    if (!content.includes('ArrowRight')) {
       content = content.replace(/import \{([^}]+)\} from ['"]lucide-react['"];/, (match, p1) => {
         return `import { ArrowRight, ${p1} } from 'lucide-react';`;
       });
       // Fallback if no lucide-react import exists
       if (!content.includes('lucide-react')) {
           content = content.replace(/import \{ Footer \} from [^;]+;/, `$& \nimport { ArrowRight } from 'lucide-react';`);
       }
    }

    content = content.replace(
      /<Footer \/>/,
      `${ctaHtml}\n        <Footer />`
    );

    // Some pages end with </>, some with </div></>, this ensures the modal is inside the fragment before closing
    content = content.replace(
      /<\/>\s*\);\s*\}/,
      `  <OnboardingModal plan={modalOpen ? DEFAULT_PLAN : null} onClose={() => setModalOpen(false)} />\n    </>\n  );\n}`
    );

    fs.writeFileSync(p, content);
    console.log(`Added CTA to ${p}`);
  }
});
