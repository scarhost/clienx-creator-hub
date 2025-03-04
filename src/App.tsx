
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import TemplatePreview from "./pages/TemplatePreview";
import Onboarding from "./pages/Onboarding";
import OnboardingBusinessInfo from "./pages/OnboardingBusinessInfo";
import OnboardingPersonalInfo from "./pages/OnboardingPersonalInfo";
import OnboardingPortfolioInfo from "./pages/OnboardingPortfolioInfo";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import UserRequests from "./pages/UserRequests";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/preview-template" element={<TemplatePreview />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding/business/info" element={<OnboardingBusinessInfo />} />
        <Route path="/onboarding/personal/info" element={<OnboardingPersonalInfo />} />
        <Route path="/onboarding/portfolio/info" element={<OnboardingPortfolioInfo />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<UserRequests />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
