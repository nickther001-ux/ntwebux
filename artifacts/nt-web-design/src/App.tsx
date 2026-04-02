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
      {/* Background gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-200px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)",
            filter: "blur(1px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147,197,253,0.10) 0%, transparent 65%)",
            filter: "blur(1px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "900px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 60%)",
          }}
        />
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
