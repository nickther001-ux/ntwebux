import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
interface ScanResult {
  url: string;
  businessName: string;
  complianceScore: number;
  structuralFailures: {
    html_lang_missing_or_incorrect?: { current_lang: string; required: string };
    hreflang_alternate_fr_missing?: { found_hreflangs: string[] };
    meta_description_missing?: boolean;
    meta_description_not_french?: { text: string };
    french_text_density_insufficient?: {
      measured_density: number;
      threshold: number;
    };
  };
  contactEmail: string | null;
  contactPhone: string | null;
  metaDescription: string | null;
}

const STAGES = [
  "Resolving target domain DNS and establishing connection...",
  "Crawling root HTML document...",
  "Inspecting lang attribute on <html> element...",
  "Analyzing link alternate hreflang arrays...",
  "Extracting meta description content...",
  "Calculating French vocabulary density score...",
  "Running heuristics and generating compliance report...",
];

export default function Bill96Scanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Lead capture form state
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
      }, 1600);
    } else {
      setStageIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setLeadSuccess(false);

    try {
      const apiBase = import.meta.env.PROD ? "" : "";
      const response = await fetch(`${apiBase}/api/v1/scanner/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.error || "Failed to complete website compliance scan.",
        );
      }

      const data: ScanResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !result) return;

    setSubmittingLead(true);
    try {
      const apiBase = import.meta.env.PROD ? "" : "";
      // Send to existing contact form route
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: leadName.split(" ")[0] || "Compliance",
          lastName: leadName.split(" ").slice(1).join(" ") || "Lead",
          email: leadEmail,
          phone: result.contactPhone || "",
          service: "Bill 96 Detailed Fix Audit Request",
          message: `Requesting full PDF remediation guidelines for scanned domain: ${result.url}. Current Compliance Score: ${result.complianceScore}%.\nFailures recorded:\n${JSON.stringify(result.structuralFailures, null, 2)}`,
        }),
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

  // SVG parameters for radial gauge
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = result
    ? circumference - (result.complianceScore / 100) * circumference
    : circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981"; // green
    if (score >= 50) return "#F59E0B"; // orange
    return "#EF4444"; // red
  };

  return (
    <div className="min-h-screen bg-[#060A14] text-[#D8E8FF] font-sans selection:bg-[#00AADD] selection:text-black">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        {/* Title Block */}
        <div className="text-center mb-12">
          <span className="text-[#00AADD] text-xs font-semibold tracking-widest uppercase bg-[#00AADD]/10 px-3 py-1 rounded-full">
            Outbound Growth Intelligence
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-4 mb-4">
            Quebec Bill 96 Compliance Scanner
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            Under Quebec’s OQLF regulations, commercial websites targeting the
            Quebec market must prioritize French. Audit your homepage assets
            instantly.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#0b1222]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />

          <form
            onSubmit={handleScan}
            className="flex flex-col md:flex-row gap-4 relative z-10"
          >
            <input
              type="text"
              required
              placeholder="e.g. yourbusiness.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00AADD]/60 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-[#00AADD] to-[#0088CC] text-black font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap shadow-lg shadow-[#00AADD]/10"
            >
              {loading ? "Analyzing..." : "Scan Website"}
            </button>
          </form>

          {/* Loader */}
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
                  {STAGES[stageIndex]}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-mono">
              ⚠️ Scan Error: {error}
            </div>
          )}
        </div>

        {/* Results Screen */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Left Score Gauge Column */}
              <div className="md:col-span-1 bg-[#0b1222]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xs text-gray-400 font-mono tracking-widest uppercase mb-4">
                  Audit Score
                </span>

                {/* SVG Circular Gauge */}
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
                      ? "Low Risk"
                      : result.complianceScore >= 50
                        ? "Moderate Risk"
                        : "Critical Compliance Alert"}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    {result.complianceScore >= 80
                      ? "Your site meets most key OQLF localization checks. Minor tweaks might be needed."
                      : "Significant compliance failures detected. Potential vulnerability to user reports."}
                  </p>
                </div>
              </div>

              {/* Right Details Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Details Card */}
                <div className="bg-[#0b1222]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">
                    Audit Breakdown — {result.businessName}
                  </h3>

                  <div className="space-y-6">
                    {/* Check item 1 */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          HTML Language Header check
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Is root language declared as French?
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                          result.structuralFailures
                            .html_lang_missing_or_incorrect
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {result.structuralFailures
                          .html_lang_missing_or_incorrect
                          ? "Fail (0/40)"
                          : "Pass (40/40)"}
                      </span>
                    </div>

                    {/* Check item 2 */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          Bilingual Alternate Links check
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Are alternate French hreflangs declared?
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                          result.structuralFailures
                            .hreflang_alternate_fr_missing
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {result.structuralFailures.hreflang_alternate_fr_missing
                          ? "Fail (0/30)"
                          : "Pass (30/30)"}
                      </span>
                    </div>

                    {/* Check item 3 */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          Meta Description Translation
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Is the site description localized in French?
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                          result.structuralFailures.meta_description_missing ||
                          result.structuralFailures.meta_description_not_french
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {result.structuralFailures.meta_description_missing
                          ? "Missing (0/15)"
                          : result.structuralFailures
                                .meta_description_not_french
                            ? "Not French (5/15)"
                            : "Pass (15/15)"}
                      </span>
                    </div>

                    {/* Check item 4 */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          French Text Density Heuristic
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          French keyword density distribution score
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                          result.structuralFailures
                            .french_text_density_insufficient
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {result.structuralFailures
                          .french_text_density_insufficient
                          ? "Insufficient (0/15)"
                          : "Pass (15/15)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lead Capture CTA */}
                <div className="bg-[#0b1222]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#00AADD]/5 pointer-events-none" />
                  <h3 className="text-lg font-bold text-white relative z-10">
                    Fix your Bill 96 Compliance Vulnerabilities
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 relative z-10 leading-relaxed">
                    Under Quebec’s law, businesses targeting the province face
                    regulatory review for non-compliant websites. Enter your
                    email below to receive a detailed remediation fix report.
                  </p>

                  <AnimatePresence mode="wait">
                    {!leadSuccess ? (
                      <motion.form
                        onSubmit={handleLeadSubmit}
                        className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10"
                      >
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00AADD]/60 text-sm flex-1"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your Email Address"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00AADD]/60 text-sm flex-1"
                        />
                        <button
                          type="submit"
                          disabled={submittingLead}
                          className="px-6 py-3 bg-[#00AADD] text-black font-semibold text-sm rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap"
                        >
                          {submittingLead
                            ? "Requesting..."
                            : "Get Free Fix Plan"}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center relative z-10"
                      >
                        📬 **Audit plan request sent!** Check your inbox. We
                        will deliver your compliance report within 24 hours.
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
