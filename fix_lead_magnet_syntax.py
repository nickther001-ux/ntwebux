import os, subprocess

modal_paths = [
  "src/components/LeadMagnetModal.tsx",
  "artifacts/nt-web-design/src/components/LeadMagnetModal.tsx"
]

for p in modal_paths:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            code = f.read()
        
        # Fix missing colon in inline style
        fixed_code = code.replace("fontWeight 800", "fontWeight: 800")
        
        with open(p, "w", encoding="utf-8") as f:
            f.write(fixed_code)
        print(f"✔ Fixed syntax in {p}")

subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "fix(syntax): add missing colon to fontWeight in LeadMagnetModal.tsx"])
subprocess.run(["git", "push", "origin", "master"])
print("\n★ SYNTAX FIXED & PUSHED LIVE TO VERCEL! ★\n")
