import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AccessibilityToolbar from "@/components/accessibility-toolbar";
import SkipToContent from "@/components/skip-to-content";
import CookieConsent from "@/components/cookie-consent";
import { AuthProvider } from "@/hooks/use-auth";
import Home from "@/pages/home";
import Portal from "@/pages/portal";
import Provider from "@/pages/provider";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import BookAppointment from "@/pages/book-appointment";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/book-appointment" component={BookAppointment} />
      <Route path="/portal" component={Portal} />
      <Route path="/provider" component={Provider} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <SkipToContent />
          <Toaster />
          <AccessibilityToolbar />
          <Router />
          <CookieConsent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
