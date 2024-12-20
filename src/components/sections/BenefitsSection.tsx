import { Card } from "@/components/ui/card";
import { Zap, Clock, Palette, CreditCard } from "lucide-react";

export const BenefitsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="border-t border-gradient-to-r from-primary-400 to-accent -mt-20 mb-20" /> {/* Adjusted spacing */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent animate-fade-up">
          Why Choose ClienxDev?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gray-900/50 border border-gray-800 hover:border-primary-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary-600/10 text-primary-400 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const benefits = [
  {
    title: "Quick Setup",
    description: "Get your professional website up and running in minutes with our streamlined process.",
    icon: <Clock className="w-6 h-6" />
  },
  {
    title: "Customizable Templates",
    description: "Choose from our collection of professionally designed templates tailored for your needs.",
    icon: <Palette className="w-6 h-6" />
  },
  {
    title: "Affordable Plans",
    description: "Start with our free tier and upgrade as your business grows.",
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    title: "Instant Deployment",
    description: "Your website goes live instantly with our automated deployment system.",
    icon: <Zap className="w-6 h-6" />
  }
];