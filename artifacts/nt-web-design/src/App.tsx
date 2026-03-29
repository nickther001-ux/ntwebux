import { Switch, Route, Router as WouterRouter } from "wouter";
import Hyperspeed from './hyperspeed';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/lib/i18n";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import ServicesPortfolio from "@/pages/ServicesPortfolio";
import ProcessPage from "@/pages/ProcessPage";
import WhyUsPage from "@/pages/WhyUsPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-black">
        <Hyperspeed />
        <div className="absolute inset-0 bg-black/70" /> 
      </div>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/services" component={ServicesPortfolio} />
              <Route path="/process" component={ProcessPage} />
              <Route path="/about" component={WhyUsPage} />
              <Route path="/contact" component={ContactPage} />
              <Route component={NotFound} />
            </Switch>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
