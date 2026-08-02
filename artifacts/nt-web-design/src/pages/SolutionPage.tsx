import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoute } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

interface ScanResult {
  url: string;
  businessName: string;
  complianceScore: number;
  structuralFailures: {
    html_lang_missing_or_incorrect?: { current_lang: string; required: string };
    hreflang_alternate_fr_missing?: { found_hreflangs: string[] };
    meta_description_missing?: boolean;
    meta_description_not_french?: { text: string };
    french_text_density_insufficient?: { measured_density: number; threshold: number };
  };
  contactEmail: string | null;
  contactPhone: string | null;
  metaDescription: string | null;
}

const STAGES_EN = [
  "Resolving target domain DNS and establishing connection...",
  "Crawling root HTML document...",
  "Inspecting lang attribute on <html> element...",
  "Analyzing link alternate hreflang arrays...",
  "Extracting meta description content...",
  "Calculating French vocabulary density score...",
  "Running heuristics and generating compliance report..."
];

const STAGES_FR = [
  "Résolution du DNS du domaine cible et établissement de la connexion...",
  "Exploration du document HTML racine...",
  "Inspection de l'attribut lang sur l'élément <html>...",
  "Analyse des balises de liens alternatifs hreflang...",
  "Extraction de la méta-description...",
  "Calcul du score de densité du vocabulaire français...",
  "Exécution des heuristiques et génération du rapport de conformité..."
];

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function SolutionPage() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  const [, params] = useRoute("/solutions/:niche/:location");
  const rawNiche = params?.niche || "business";
  const rawLocation = params?.location || "canada";

  const niche = capitalize(rawNiche.replace("-", " "));
  const location = capitalize(rawLocation.replace("-", " "));

  const isQuebec = ["Montreal", "Quebec", "Laval", "Sherbrooke", "Gatineau", "Longueuil"].some(
    (city) => location.toLowerCase().includes(city.toLowerCase())
  );

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const stages = isFr ? STAGES_FR : STAGES_EN;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setStageIndex((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
      }, 1600);
    } else {
      setStageIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading, stages]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setLeadSuccess(false);

    try {
      const response = await fetch("/api/v1/scanner/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(isFr ? "Le serveur a renvoyé une réponse non valide. Vérifiez vos routes d'API." : "Server returned non-JSON response. Check your API route or proxy settings.");
        }
        const errData = await response.json();
        throw new Error(errData.error || (isFr ? "Échec de l'audit." : "Failed to complete website compliance scan."));
      }

      const data: ScanResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || (isFr ? "Une erreur inattendue est survenue." : "An unexpected error occurred."));
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !result) return;

    setSubmittingLead(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: leadName.split(" ")[0] || "SEO Niche",
          lastName: leadName.split(" ").slice(1).join(" ") || "Lead",
          email: leadEmail,
          phone: result.contactPhone || "",
          service: `Niche Solution Landing page - ${niche} in ${location}`,
          message: `Lead scanned website: ${result.url}. Current Compliance Score: ${result.complianceScore}%.\nFailures recorded:\n${JSON.stringify(result.structuralFailures, null, 2)}`
        })
      });

      if (response.ok) {
        setLeadSuccess(true);
      }
    } catch (err) {
      console.error("Lead submission failed:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = result
    ? circumference - (result.complianceScore / 100) * circumference
    : circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981";
    if (score >= 50) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="min-h-screen bg-[#060A14] text-[#D8E8FF] font-sans selection:bg-[#00AADD] selection:text-black">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#00AADD] text-xs font-semibold tracking-widest uppercase bg-[#00AADD]/10 px-3 py-1 rounded-full">
            {isFr ? "Solutions de croissance localisées" : "Localized Growth Solutions"}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-4 mb-4 leading-tight">
            {isFr 
              ? `${niche} à ${location} : Sécurisez votre moteur de revenus au Québec`
              : `${niche} in ${location}: Secure Your Quebec Revenue Engine`
            }
          </h1>
          
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mt-4">
            {isQuebec ? (
              isFr 
                ? `Opérer en tant que ${niche.toLowerCase()} à ${location} signifie que votre site web est soumis à des contrôles de conformité linguistique stricts (Loi 96 / OQLF). Sécurisez vos actifs et automatisez vos réservations.`
                : `Operating as a ${niche.toLowerCase()} in ${location} means your digital footprint is subject to strict OQLF Bill 96 language compliance checks. Ensure your business is secure from heavy fines while implementing automated missed-call booking to capture every inbound lead.`
            ) : (
              isFr 
                ? `Étendre votre marque de ${niche.toLowerCase()} au marché québécois depuis ${location} est un excellent vecteur de croissance, mais franchir les barrières linguistiques régionales peut s'avérer complexe. NT WebUX agit comme votre passerelle technique.`
                : `Expanding your ${niche.toLowerCase()} brand into the Quebec market from ${location} is a massive growth vector, but navigating regional language requirements can be a major entry barrier. NT WebUX acts as your technical bridge—automating your bilingual customer experience and compliance checks.`
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#0b1222]/50 border border-white/5 p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">
              {isFr ? "📞 Text-Back sur Appels Manqués" : "📞 Missed-Call Text-Back SaaS"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isFr 
                ? "Lorsqu'un prospect appelle votre entreprise et que vous êtes occupé, notre système lui envoie instantanément un SMS automatisé par IA en moins de 150 ms pour planifier un rendez-vous immédiatement."
                : "When a local lead calls your business and you are busy, our system instantly texts them back within seconds using AI. We book appointments directly, preventing them from calling your competitors."
              }
            </p>
          </div>
          <div className="bg-[#0b1222]/50 border border-white/5 p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">
              {isFr ? "⚖️ Passerelle de Conformité Loi 96" : "⚖️ Bill 96 Compliance Bridge"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isFr 
                ? "Assurez-vous que votre site web satisfait automatiquement aux exigences linguistiques de l'OQLF. Nous mettons en œuvre des redirections de langue, des hreflangs bilingues et des métadonnées conformes."
                : "Ensure your website automatically satisfies language requirements. We implement root redirects, bilingual hreflangs, and translated descriptions to protect your business."
              }
            </p>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isFr ? "Testez instantanément la conformité de votre site web" : "Test Your Website Compliance Instantly"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isFr ? "Auditez les en-têtes de langue et la densité de vocabulaire de votre page d'accueil en direct." : "Audit your website homepage lang parameters and stopword density live."}
          </p>
        </div>

        <div className="bg-[#0b1222]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
          
          <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4 relative z-10">
            <input
              type="text"
              required
              placeholder={isFr ? "ex. votreentreprise.com" : "e.g. yourbusiness.com"}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00AADD]/60 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-[#00AADD] to-[#0088CC] text-black font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap shadow-lg shadow-[#00AADD]/10 w-full md:w-auto"
            >
              {loading ? (isFr ? "Audit en cours..." : "Auditing...") : (isFr ? "Scanner le site" : "Scan Website")}
            </button>
          </form>

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 flex flex-col items-center justify-center text-center py-6 border-t border-white/5"
              >
                <div className="w-12 h-12 border-4 border-[#00AADD]/20 border-t-[#00AADD] rounded-full animate-spin mb-4" />
                <motion.p
                  key={stageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs tracking-wider text-gray-400 font-mono"
                >
                  {stages[stageIndex]}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-mono">
              ⚠️ {isFr ? "Erreur d'audit :" : "Scan Error :"} {error}
            </div>
          )}
        </div>

        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1 bg-[#0b1222]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xs text-gray-400 font-mono tracking-widest uppercase mb-4">
                  {isFr ? "Score d'audit" : "Audit Score"}
                </span>
                
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      stroke="rgba(255, 255, 255, 0.05)"
                      fill="transparent"
                      strokeWidth={stroke}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                    <motion.circle
                      stroke={getScoreColor(result.complianceScore)}
                      fill="transparent"
                      strokeWidth={stroke}
                      strokeDasharray={circumference + " " + circumference}
                      style={{ strokeDashoffset }}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-extrabold text-white">
                      {result.complianceScore}
                    </span>
                    <span className="text-gray-500 text-sm">%</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-white">
                    {result.complianceScore >= 80 
                      ? (isFr ? "Faible risque" : "Low Risk") 
                      : result.complianceScore >= 50 
                      ? (isFr ? "Risque modéré" : "Moderate Risk") 
                      : (isFr ? "Alerte de conformité critique" : "Critical Compliance Alert")
                    }
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    {result.complianceScore >= 80 
                      ? (isFr ? "Votre site satisfait la plupart des règles de l'OQLF." : "Your site meets most key OQLF localization checks. Minor tweaks might be needed.")
                      : (isFr ? "Défaillances de conformité importantes détectées. Risques d'inspections de l'OQLF." : "Significant compliance failures detected. Potential vulnerability to user reports.")
                    }
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="bg-[#0b1222]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">
                    {isFr ? `Détail de l'audit — ${result.businessName}` : `Audit Breakdown — ${result.businessName}`}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {isFr ? "Vérification de la langue racine HTML" : "HTML Language Header check"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {isFr ? "La langue racine de la page est-elle déclarée en français ?" : "Is root language declared as French?"}
                        </p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                        result.structuralFailures.html_lang_missing_or_incorrect 
                          ? "bg-red-500/10 text-red-400" 
                          : "bg-green-500/10 text-green-400"
                      }`}>
                        {result.structuralFailures.html_lang_missing_or_incorrect 
                          ? (isFr ? "Échec (0/40)" : "Fail (0/40)") 
                          : (isFr ? "Réussite (40/40)" : "Pass (40/40)")}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {isFr ? "Vérification des liens alternatifs bilingues" : "Bilingual Alternate Links check"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {isFr ? "Des balises hreflang françaises sont-elles déclarées ?" : "Are alternate French hreflangs declared?"}
                        </p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                        result.structuralFailures.hreflang_alternate_fr_missing 
                          ? "bg-red-500/10 text-red-400" 
                          : "bg-green-500/10 text-green-400"
                      }`}>
                        {result.structuralFailures.hreflang_alternate_fr_missing 
                          ? (isFr ? "Échec (0/30)" : "Fail (0/30)") 
                          : (isFr ? "Réussite (30/30)" : "Pass (30/30)")}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {isFr ? "Méta-description française" : "Meta Description Translation"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {isFr ? "La description est-elle présente et localisée en français ?" : "Is the site description localized in French?"}
                        </p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                        result.structuralFailures.meta_description_missing || result.structuralFailures.meta_description_not_french
                          ? "bg-red-500/10 text-red-400" 
                          : "bg-green-500/10 text-green-400"
                      }`}>
                        {result.structuralFailures.meta_description_missing 
                          ? (isFr ? "Manquant (0/15)" : "Missing (0/15)") 
                          : result.structuralFailures.meta_description_not_french 
                          ? (isFr ? "Non français (5/15)" : "Not French (5/15)") 
                          : (isFr ? "Réussite (15/15)" : "Pass (15/15)")}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {isFr ? "Densité heuristique du texte français" : "French Text Density Heuristic"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {isFr ? "Score de densité de vocabulaire français sur la page" : "French keyword density distribution score"}
                        </p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                        result.structuralFailures.french_text_density_insufficient 
                          ? "bg-red-500/10 text-red-400" 
                          : "bg-green-500/10 text-green-400"
                      }`}>
                        {result.structuralFailures.french_text_density_insufficient 
                          ? (isFr ? "Insuffisant (0/15)" : "Insufficient (0/15)") 
                          : (isFr ? "Réussite (15/15)" : "Pass (15/15)")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0b1222]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#00AADD]/5 pointer-events-none" />
                  <h3 className="text-lg font-bold text-white relative z-10">
                    {isFr ? "Corrigez vos vulnérabilités de conformité Loi 96" : "Fix your Bill 96 Compliance Vulnerabilities"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 relative z-10 leading-relaxed">
                    {isFr
                      ? "Obtenez un plan de correction détaillé ou réservez un appel gratuit de 15 minutes pour configurer des redirections ou des text-backs automatisés."
                      : "Request a detailed fix plan or book a free 15-minute consultation to implement missed-call text-backs and bilingual web redirects."
                    }
                  </p>

                  <AnimatePresence mode="wait">
                    {!leadSuccess ? (
                      <motion.form
                        onSubmit={handleLeadSubmit}
                        className="mt-6 flex flex-col md:flex-row gap-3 relative z-10"
                      >
                        <input
                          type="text"
                          required
                          placeholder={isFr ? "Votre Nom" : "Your Name"}
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00AADD]/60 text-sm flex-1"
                        />
                        <input
                          type="email"
                          required
                          placeholder={isFr ? "Votre Adresse Courriel" : "Your Email Address"}
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00AADD]/60 text-sm flex-1"
                        />
                        <button
                          type="submit"
                          disabled={submittingLead}
                          className="px-6 py-3 bg-[#00AADD] text-black font-semibold text-sm rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap w-full md:w-auto"
                        >
                          {submittingLead 
                            ? (isFr ? "Demande en cours..." : "Requesting...") 
                            : (isFr ? "Obtenir mon plan" : "Get Free Fix Plan")}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center relative z-10"
                      >
                        📬 **{isFr ? "Demande de plan envoyée !" : "Audit plan request sent!"}** {isFr ? "Nous vous contacterons à " : "We will contact you at "} {leadEmail} {isFr ? " avec votre plan de correction." : " avec votre plan de correction."}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
