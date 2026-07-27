import os, glob, re, subprocess

print("==================================================")
print("     Removing Card Numbers (01, 02, 03)           ")
print("==================================================")

search_dirs = ["src/components", "artifacts/nt-web-design/src/components"]

for s_dir in search_dirs:
    if os.path.exists(s_dir):
        for root, _, files in os.walk(s_dir):
            for file in files:
                if file.endswith(".tsx") or file.endswith(".jsx"):
                    fp = os.path.join(root, file)
                    with open(fp, "r", encoding="utf-8") as f:
                        content = f.read()

                    # Check if file contains Lead Leakage Recovery
                    if "Lead Leakage Recovery" in content or "01" in content:
                        # Remove index number spans like <span>01</span> or {idx + 1} or 01, 02, 03 badges
                        new_content = re.sub(r'<span[^>]*class[^>]*opacity-30[^>]*>\s*0[1-9]\s*<\/span>', '', content)
                        new_content = re.sub(r'<span[^>]*style=\{\{[^}]*opacity:\s*0\.3[^}]*\}\}>\s*0[1-9]\s*<\/span>', '', new_content)
                        new_content = re.sub(r'<span[^>]*style=\{\{[^}]*color:\s*[\'"]rgba\(255,255,255,0\.2\)[\'"][^}]*\}\}>\s*0[1-9]\s*<\/span>', '', new_content)
                        new_content = re.sub(r'<span[^>]*>\s*0[1-9]\s*<\/span>', '', new_content)
                        new_content = re.sub(r'<div[^>]*>\s*0[1-9]\s*<\/div>', '', new_content)

                        if new_content != content:
                            with open(fp, "w", encoding="utf-8") as f:
                                f.write(new_content)
                            print(f"✔ Removed numbers from: {fp}")

subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "style: remove generic 01, 02, 03 numbers from cards"])
subprocess.run(["git", "push", "origin", "master"])
print("\n★ CARDS CLEANED & PUSHED LIVE TO VERCEL! ★\n")
