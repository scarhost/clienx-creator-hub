import { PersonalInfoForm } from "@/components/forms/personal/PersonalInfoForm";

const OnboardingPersonalInfo = () => {
  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Personal Website Information</h1>
      <p className="text-muted-foreground mb-8">
        Tell us about yourself to create your personal website
      </p>
      <PersonalInfoForm />
    </div>
  );
};

export default OnboardingPersonalInfo;