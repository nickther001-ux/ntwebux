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
import IndustryPage from "@/pages/IndustryPage";
import LocationPage from "@/pages/LocationPage";
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
      {/* ── Global Landio master layout ── */}
      <div className="min-h-screen w-full bg-[#050507] text-white relative overflow-x-hidden font-sans">

        {/* Fixed dot-grid texture (persists across pages & scroll) */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

        {/* Fixed Framer-style glow (persists across pages & scroll) */}
        <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none z-0" />

        <HelmetProvider>
          <LanguageProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/services" component={ServicesPortfolio} />
                  <Route path="/business" component={BusinessSolutions} />
                  <Route path="/industry/:slug" component={IndustryPage} />
                  <Route path="/locations/:slug" component={LocationPage} />
                  <Route component={NotFound} />
                </Switch>
              </WouterRouter>
              <Toaster />
              <ChatWidget />
            </TooltipProvider>
          </LanguageProvider>
        </HelmetProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
