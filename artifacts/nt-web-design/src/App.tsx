import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/lib/i18n";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import ServicesPortfolio from "@/pages/ServicesPortfolio";
import IndustryPage from "@/pages/IndustryPage";
import LocationPage from "@/pages/LocationPage";
import NotFound from "@/pages/not-found";
import ChatWidget from "@/components/ChatWidget";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ── Landio-style animated blur orbs ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden>
        {/* Hero orb — massive, breathes */}
        <div style={{
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
        {/* Bottom-right accent orb — drifts */}
        <div style={{
          position: "absolute",
          bottom: "-100px",
          right: "-120px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(29,78,216,0.4) 0%, rgba(17,51,160,0.15) 40%, transparent 65%)",
          filter: "blur(80px)",
          willChange: "transform, opacity",
          animation: "orb-drift-right 14s ease-in-out infinite",
        }} />
        {/* Mid-left accent — subtle */}
        <div style={{
          position: "absolute",
          top: "45%",
          left: "-180px",
          width: "600px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.22) 0%, transparent 65%)",
          filter: "blur(70px)",
          willChange: "transform, opacity",
          animation: "orb-drift-left 18s ease-in-out infinite",
        }} />
      </div>

      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/services" component={ServicesPortfolio} />
              <Route path="/industry/:slug" component={IndustryPage} />
              <Route path="/locations/:slug" component={LocationPage} />
              <Route component={NotFound} />
            </Switch>
          </WouterRouter>
          <Toaster />
          <ChatWidget />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
