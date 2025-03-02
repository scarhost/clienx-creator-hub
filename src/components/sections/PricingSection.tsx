
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 relative">
      <div className="border-t border-gradient-to-r from-primary-400 to-accent -mt-20 mb-20" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Choose a plan that best suits your needs. All plans include access to our template library and personalized support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-6 bg-gray-900/50 border transition-all duration-300 hover:transform hover:-translate-y-1 ${
                plan.name === "Professional" 
                  ? "relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-primary-400 before:to-accent before:-z-10 before:animate-pulse" 
                  : "border-gray-800"
              }`}
            >
              <div className="text-2xl font-semibold mb-2">{plan.name}</div>
              <div className="text-4xl font-bold mb-4">{plan.price}</div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-400">
                    <span className="mr-2 text-primary-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${plan.name === "Professional" ? "bg-primary hover:bg-primary/90" : ""}`}
                onClick={() => navigate("/templates")}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const plans = [
  {
    name: "Basic",
    price: "$499",
    description: "Perfect for small businesses getting started",
    features: [
      "Choose from basic templates",
      "1 week delivery time",
      "Basic customization options",
      "3 revision rounds",
      "Email support"
    ]
  },
  {
    name: "Professional",
    price: "$999",
    description: "Best for growing businesses",
    features: [
      "All templates available",
      "3-5 days delivery time",
      "Advanced customization",
      "Unlimited revisions",
      "Priority email & phone support",
      "SEO optimization"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large businesses with specific needs",
    features: [
      "Custom template design",
      "1-2 days delivery time",
      "Full customization options",
      "Unlimited revisions",
      "24/7 priority support",
      "SEO & Marketing setup",
      "Analytics integration"
    ]
  }
];
