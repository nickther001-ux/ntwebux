import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/lib/i18n";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import ServicesPortfolio from "@/pages/ServicesPortfolio";
import BusinessSolutions from "@/pages/BusinessSolutions";
import BusinessSuite from "@/pages/BusinessSuite";
import ROIPage from "@/pages/ROIPage";
import IndustryPage from "@/pages/IndustryPage";
import LocationPage from "@/pages/LocationPage";
import Privacy from "@/pages/Privacy";
import About from "@/pages/About";
import { Toronto } from "@/pages/Toronto";
import NotFound from "@/pages/not-found";
import ChatWidget from "@/components/ChatWidget";

const queryClient = new QueryClient();

// Intercept anchor-link clicks and smooth-scroll without setting
// scroll-behavior: smooth on <html> (which breaks native momentum scroll on mobile)
function useSmoothAnchorScroll() {
  useEffect(() => {
    function handle(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
}

function App() {
  useSmoothAnchorScroll();

  // On every fresh page load, scroll to the very top regardless of any URL hash.
  // Anchor-link scrolling is handled intentionally via useSmoothAnchorScroll /
  // Navbar handleAnchorClick — never via the browser's default hash behaviour.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    // Strip the hash so the browser doesn't re-jump if the user refreshes
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* ── Landio-style animated blur orbs ── */}
      {/* isolation:isolate + transform:translateZ(0) puts this on its own GPU
          compositing layer, so scroll never triggers a repaint of the orbs */}
      <div className="orb-layer" style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none", isolation: "isolate", transform: "translateZ(0)" }} aria-hidden>
        {/* Hero orb */}
        <div className="orb orb-hero" style={{
          position: "absolute",
          top: "-260px",
          left: "50%",
          width: "1100px",
          height: "820px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.55) 0%, rgba(37,99,235,0.28) 32%, transparent 62%)",
          filter: "blur(90px)",
          willChange: "transform, opacity",
          animation: "orb-breathe 9s ease-in-out infinite",
        }} />
        {/* Bottom-right accent */}
        <div className="orb orb-right" style={{
          position: "absolute",
          bottom: "-100px",
          right: "-120px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(29,78,216,0.4) 0%, rgba(17,51,160,0.15) 40%, transparent 65%)",
          filter: "blur(80px)",
          willChange: "transform",
          animation: "orb-drift-right 14s ease-in-out infinite",
        }} />
        {/* Mid-left accent */}
        <div className="orb orb-left" style={{
          position: "absolute",
          top: "45%",
          left: "-180px",
          width: "600px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.22) 0%, transparent 65%)",
          filter: "blur(70px)",
          willChange: "transform",
          animation: "orb-drift-left 18s ease-in-out infinite",
        }} />
      </div>
      <style>{`
        /* Desktop: reduce blur — visually identical, much cheaper GPU compositing */
        @media (min-width: 769px) {
          .orb-hero  { filter: blur(55px) !important; }
          .orb-right { filter: blur(48px) !important; }
          .orb-left  { filter: blur(40px) !important; }
        }
        /* Mobile: even smaller blur + smaller elements */
        @media (max-width: 768px) {
          .orb-hero  { filter: blur(32px) !important; width: 560px !important; height: 460px !important; }
          .orb-right { filter: blur(28px) !important; width: 380px !important; height: 380px !important; }
          .orb-left  { filter: blur(24px) !important; width: 320px !important; height: 280px !important; }
        }
      `}</style>

      <HelmetProvider>
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.PROD ? '' : import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/services" component={ServicesPortfolio} />
                <Route path="/business" component={BusinessSolutions} />
                <Route path="/business-suite" component={BusinessSuite} />
                <Route path="/roi" component={ROIPage} />
                <Route path="/industry/:slug" component={IndustryPage} />
                <Route path="/locations/:slug" component={LocationPage} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/about" component={About} />
                <Route path="/toronto" component={Toronto} />
                <Route path="/digital-policy" component={Privacy} />
                <Route component={NotFound} />
              </Switch>
            </WouterRouter>
            <Toaster />
            <ChatWidget />
          </TooltipProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
