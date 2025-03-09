
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import OnboardingBusinessInfo from "./pages/OnboardingBusinessInfo";
import OnboardingPersonalInfo from "./pages/OnboardingPersonalInfo";
import OnboardingPortfolioInfo from "./pages/OnboardingPortfolioInfo";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import UserRequests from "./pages/UserRequests";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Pricing from "./pages/Pricing";
import StarterPlan from "./pages/Plans/StarterPlan";
import StandardPlan from "./pages/Plans/StandardPlan";
import ProEcommercePlan from "./pages/Plans/ProEcommercePlan";
import PlanSelection from "./pages/Plans/PlanSelection";
import { Toaster } from "sonner";
import PortfolioTemplates from "./pages/templates/PortfolioTemplates";
import ECommerceTemplates from "./pages/templates/ECommerceTemplates";
import BusinessShowcaseTemplates from "./pages/templates/BusinessShowcaseTemplates";
import ResumeTemplates from "./pages/templates/ResumeTemplates";
import ResumeRequestForm from "./pages/request-forms/ResumeRequestForm";
import BusinessRequestForm from "./pages/request-forms/BusinessRequestForm";
import ECommerceRequestForm from "./pages/request-forms/ECommerceRequestForm";
import PortfolioRequestForm from "./pages/request-forms/PortfolioRequestForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* All template routes go to onboarding */}
        <Route path="/templates" element={<Onboarding />} />
        <Route path="/preview-template" element={<Onboarding />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding/business/info" element={<OnboardingBusinessInfo />} />
        <Route path="/onboarding/personal/info" element={<OnboardingPersonalInfo />} />
        <Route path="/onboarding/portfolio/info" element={<OnboardingPortfolioInfo />} />
        
        {/* Template Routes - Updated to use /onboarding prefix */}
        <Route path="/onboarding/portfolio" element={<PortfolioTemplates />} />
        <Route path="/onboarding/e-commerce" element={<ECommerceTemplates />} />
        <Route path="/onboarding/business-showcase" element={<BusinessShowcaseTemplates />} />
        <Route path="/onboarding/resume" element={<ResumeTemplates />} />
        
        {/* Request Form Routes */}
        <Route path="/request/portfolio/:templateId" element={<PortfolioRequestForm />} />
        <Route path="/request/e-commerce/:templateId" element={<ECommerceRequestForm />} />
        <Route path="/request/business-showcase/:templateId" element={<BusinessRequestForm />} />
        <Route path="/request/resume/:templateId" element={<ResumeRequestForm />} />
        
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<UserRequests />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/plans/starter" element={<StarterPlan />} />
        <Route path="/plans/standard" element={<StandardPlan />} />
        <Route path="/plans/pro-ecommerce" element={<ProEcommercePlan />} />
        <Route path="/plans/selection" element={<PlanSelection />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
