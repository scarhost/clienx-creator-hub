
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

const Index = () => {
  return (
    <MainLayout>
      <div className="relative min-h-screen">
        {/* Grid Background with enhanced visibility */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] grid-rows-[repeat(auto-fill,minmax(50px,1fr))] h-full w-full opacity-20">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="border border-primary-400/30 bg-gradient-to-br from-primary-400/5 to-transparent"
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-20 pb-20">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  <span className="block">Request Your Perfect</span>
                  <span className="block bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
                    Custom Website
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                  Browse our professional templates, tell us what you want to customize, and we'll create the perfect website for you.
                </p>
                <div className="mt-10 flex justify-center">
                  <Link to="/templates">
                    <Button size="lg" className="bg-primary hover:bg-primary-600 shadow-lg shadow-primary/25 animate-fade-up">
                      Browse Templates
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-32"> {/* Increased spacing between sections */}
            <BenefitsSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
