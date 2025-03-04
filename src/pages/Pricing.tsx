
import { MainLayout } from "@/components/layout/MainLayout";
import { PricingSection } from "@/components/sections/PricingSection";

const Pricing = () => {
  return (
    <MainLayout>
      <div className="pt-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto px-4">
          Choose the perfect plan for your needs. All plans include our professional customization service
          and responsive design.
        </p>
        <PricingSection />
      </div>
    </MainLayout>
  );
};

export default Pricing;
