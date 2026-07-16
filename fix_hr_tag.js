const fs = require('fs');
const { execSync } = require('child_process');

try {
  const file = execSync('grep -rl "Audrey Mondésir-L" . | grep -v node_modules | head -n 1').toString().trim();
  let code = fs.readFileSync(file, 'utf8');

  const parts = code.split("Audrey Mondésir-L");
  
  if (parts.length > 1) {
    let beforeAudrey = parts[0];
    const searchWindowLength = 800;
    const startIdx = Math.max(0, beforeAudrey.length - searchWindowLength);
    
    let safeWindow = beforeAudrey.substring(startIdx);
    
    // Replace uppercase and title case variations just in case
    safeWindow = safeWindow.replace(/CONSTRUCTION/g, "HR CONSULTING");
    safeWindow = safeWindow.replace(/Construction/g, "HR Consulting");
    
    parts[0] = beforeAudrey.substring(0, startIdx) + safeWindow;
    
    fs.writeFileSync(file, parts.join("Audrey Mondésir-L"));
    console.log("Updated Audrey's category tag to HR Consulting.");
  }
} catch (e) {
  console.error("File not found or error occurred:", e.toString());
}
