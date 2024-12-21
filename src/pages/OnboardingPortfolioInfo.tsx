import { PortfolioInfoForm } from "@/components/forms/portfolio/PortfolioInfoForm";

const OnboardingPortfolioInfo = () => {
  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Portfolio Information</h1>
      <p className="text-muted-foreground mb-8">
        Tell us about your work and experience to create your portfolio website
      </p>
      <PortfolioInfoForm />
    </div>
  );
};

export default OnboardingPortfolioInfo;