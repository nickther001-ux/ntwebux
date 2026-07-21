import { useLanguage } from "../LanguageContext";

const processSteps = {
  en: [
    {
      title: "Discovery Call",
      desc: "We learn about your business, goals, and target audience to craft the perfect strategy.",
    },
    {
      title: "Design & Strategy",
      desc: "We create wireframes and high-fidelity mockups for your approval.",
    },
    {
      title: "Build & Test",
      desc: "We develop the site using modern tech, ensuring it's fast, secure, and bug-free.",
    },
    {
      title: "Launch & Grow",
      desc: "We deploy your new digital asset and help you scale your online presence.",
    },
  ],
  fr: [
    {
      title: "Appel découverte",
      desc: "Nous apprenons à connaître votre entreprise, vos objectifs et votre clientèle cible pour élaborer la stratégie idéale.",
    },
    {
      title: "Design & Stratégie",
      desc: "Nous créons des maquettes filaires et des prototypes haute-fidélité soumis à votre approbation.",
    },
    {
      title: "Développement & Tests",
      desc: "Nous développons votre site avec des technologies modernes pour qu'il soit rapide, sécurisé et sans bogues.",
    },
    {
      title: "Lancement & Croissance",
      desc: "Nous déployons votre nouvel actif numérique et vous aidons à développer votre présence en ligne.",
    },
  ],
};

const labels = {
  en: { eyebrow: "How We Work", heading: "A streamlined process.", step: "Step", of: "of" },
  fr: { eyebrow: "Notre Méthode", heading: "Un processus simplifié.", step: "Étape", of: "sur" },
};

export function Process() {
  const { lang } = useLanguage();
  const l = (lang as "en" | "fr") === "fr" ? "fr" : "en";
  const steps = processSteps[l];
  const lbl = labels[l];

  return (
    <section id="process" style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", color: "#9ca3af", fontWeight: 600 }}>
            {lbl.eyebrow}
          </span>
          <h2 style={{ fontSize: "40px", fontWeight: 800, color: "white", marginTop: "12px" }}>
            {lbl.heading}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {steps.map((step, i) => (
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
                fontWeight: 600,
              }}>
                {lbl.step} 0{i + 1} {lbl.of} 04
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
