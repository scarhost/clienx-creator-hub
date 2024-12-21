import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import OnboardingBusinessInfo from "./pages/OnboardingBusinessInfo";
import OnboardingPortfolioInfo from "./pages/OnboardingPortfolioInfo";
import OnboardingPersonalInfo from "./pages/OnboardingPersonalInfo";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/business/info" element={<OnboardingBusinessInfo />} />
          <Route path="/onboarding/portfolio/info" element={<OnboardingPortfolioInfo />} />
          <Route path="/onboarding/personal/info" element={<OnboardingPersonalInfo />} />
          <Route path="/auth/signin" element={<Auth />} />
          <Route path="/auth/signup" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/*" element={<Navigate to="/auth/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;