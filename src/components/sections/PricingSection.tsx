
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
          Choose a plan that best suits your needs. All plans include a personalized website built for your requirements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-6 bg-gray-900/50 border transition-all duration-300 hover:transform hover:-translate-y-1 ${
                plan.name === "Standard" 
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
              <div className="text-sm text-gray-400 mb-4">Setup Fee: {plan.setupFee}</div>
              <Button 
                className={`w-full ${plan.name === "Standard" ? "bg-primary hover:bg-primary/90" : ""}`}
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
    name: "Starter",
    price: "$10-$20/mo",
    description: "Perfect for simple personal sites",
    setupFee: "$50-$100",
    features: [
      "1-3 pages included",
      "Domain & hosting not included",
      "Basic text updates monthly",
      "Mobile responsive design",
      "Contact form",
      "No e-commerce features"
    ]
  },
  {
    name: "Standard",
    price: "$30-$50/mo",
    description: "Best for small businesses",
    setupFee: "$50-$100",
    features: [
      "5-10 pages included",
      "Domain & hosting included",
      "Basic SEO optimization",
      "Text & image updates monthly",
      "Basic e-commerce (if needed)",
      "Social media integration"
    ]
  },
  {
    name: "Pro E-commerce",
    price: "$80-$150/mo",
    description: "For online stores & businesses",
    setupFee: "$50-$100",
    features: [
      "Unlimited pages",
      "Domain & hosting included",
      "Full SEO optimization",
      "Full support & updates",
      "Complete online store",
      "Product management system",
      "Payment processing"
    ]
  }
];
