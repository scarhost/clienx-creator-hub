import { BusinessInfoForm } from "@/components/forms/business/BusinessInfoForm";

const OnboardingBusinessInfo = () => {
  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Business Information</h1>
      <p className="text-muted-foreground mb-8">
        Tell us about your business to create your website
      </p>
      <BusinessInfoForm />
    </div>
  );
};

export default OnboardingBusinessInfo;