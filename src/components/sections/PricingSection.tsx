import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const PricingSection = () => {
  return (
    <section className="py-20 relative">
      <div className="border-t border-gradient-to-r from-primary-400 to-accent" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className="p-6 bg-gray-900/50 border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4">{plan.price}</div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-400">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">{plan.buttonText}</Button>
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
    price: "Free",
    buttonText: "Get Started",
    features: [
      "Basic templates",
      "Custom domain",
      "Community support"
    ]
  },
  {
    name: "Pro",
    price: "$20/mo",
    buttonText: "Choose Pro",
    features: [
      "All templates",
      "Priority support",
      "Advanced analytics"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    buttonText: "Contact Us",
    features: [
      "Custom templates",
      "Dedicated support",
      "Custom integrations"
    ]
  }
];