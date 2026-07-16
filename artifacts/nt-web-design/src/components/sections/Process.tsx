const processSteps = [
  {
    title: "Discovery Call",
    desc: "We learn about your business, goals, and target audience to craft the perfect strategy."
  },
  {
    title: "Design & Strategy",
    desc: "We create wireframes and high-fidelity mockups for your approval."
  },
  {
    title: "Build & Test",
    desc: "We develop the site using modern tech, ensuring it's fast, secure, and bug-free."
  },
  {
    title: "Launch & Grow",
    desc: "We deploy your new digital asset and help you scale your online presence."
  }
];

export function Process() {
  return (
    <section id="process" style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", color: "#9ca3af", fontWeight: 600 }}>
            How We Work
          </span>
          <h2 style={{ fontSize: "40px", fontWeight: 800, color: "white", marginTop: "12px" }}>
            A streamlined process.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {processSteps.map((step, i) => (
            <div key={i} style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "40px 36px",
            }}>
              <div style={{
                fontSize: "12px",
                color: "#60a5fa",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "16px",
                fontWeight: 600
              }}>
                Step 0{i + 1} of 04
              </div>
              <h3 style={{ fontSize: "28px", color: "white", fontWeight: 800, marginBottom: "14px" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "15px", color: "#9ca3af", lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
