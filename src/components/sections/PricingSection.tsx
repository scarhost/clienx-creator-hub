
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 relative">
      <div className="border-t border-gradient-to-r from-primary-400 to-accent -mt-20 mb-20" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Flexible Pricing Options</h2>
        <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
          Choose a plan that fits your needs. All plans include a $69.99 setup fee and domain/hosting options.
        </p>
        
        <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="monthly">Monthly Subscription</TabsTrigger>
            <TabsTrigger value="oneTime">One-Time Purchase</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {monthlyPlans.map((plan, index) => (
                <PricingCard 
                  key={index}
                  plan={plan}
                  isHighlighted={plan.name === "Standard"}
                  onGetStarted={() => navigate("/templates")}
                />
              ))}
            </div>
            <div className="mt-8 text-center text-sm text-gray-400">
              <p>All monthly plans include a one-time setup fee of $69.99</p>
              <p className="mt-2">Domain ($11/year) and hosting ($20/month or $50/year) are available for all plans</p>
            </div>
          </TabsContent>
          
          <TabsContent value="oneTime" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {oneTimePlans.map((plan, index) => (
                <PricingCard 
                  key={index}
                  plan={plan}
                  isHighlighted={plan.name === "Standard"}
                  onGetStarted={() => navigate("/templates")}
                />
              ))}
            </div>
            <div className="mt-8 text-center text-sm text-gray-400">
              <p>One-time plans include the website files for self-hosting with no setup fee</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="max-w-2xl mx-auto mt-16 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-center">Additional Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-md bg-gray-800/50">
              <h4 className="font-medium mb-2">Domain & Hosting</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  Domain registration: $11/year
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  Hosting: $20/month or $50/year
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  Managed by our team
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-md bg-gray-800/50">
              <h4 className="font-medium mb-2">Update Options</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  Starter: 2 updates/month included
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  Pay-per-update: $5 per simple change
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  Pro: Unlimited updates included
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  setupFee?: string;
  highlightFeature?: string;
}

const PricingCard = ({ 
  plan, 
  isHighlighted, 
  onGetStarted 
}: { 
  plan: PricingPlan; 
  isHighlighted: boolean;
  onGetStarted: () => void;
}) => {
  return (
    <Card 
      className={`p-6 bg-gray-900/50 border transition-all duration-300 hover:transform hover:-translate-y-1 ${
        isHighlighted 
          ? "relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-primary-400 before:to-accent before:-z-10 before:animate-pulse" 
          : "border-gray-800"
      }`}
    >
      <div className="text-2xl font-semibold mb-2">{plan.name}</div>
      <div className="text-4xl font-bold mb-2">{plan.price}</div>
      {plan.setupFee && (
        <div className="text-sm text-gray-400 mb-4">+ {plan.setupFee} setup fee</div>
      )}
      <p className="text-gray-400 mb-6">{plan.description}</p>
      
      {plan.highlightFeature && (
        <div className="bg-primary-400/10 text-primary-400 px-3 py-2 rounded-md text-sm mb-6 font-medium">
          {plan.highlightFeature}
        </div>
      )}
      
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start text-gray-400">
            <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={`w-full ${isHighlighted ? "bg-primary hover:bg-primary/90" : ""}`}
        onClick={onGetStarted}
      >
        Get Started
      </Button>
    </Card>
  );
};

const monthlyPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$10/mo",
    description: "Perfect for simple websites with minimal updates",
    setupFee: "$69.99",
    features: [
      "1-3 pages included",
      "Domain & hosting included",
      "2 updates per month",
      "Mobile responsive design",
      "Contact form",
      "Basic SEO"
    ],
    highlightFeature: "Pay $5 per additional update"
  },
  {
    name: "Standard",
    price: "$30-$50/mo",
    description: "Best for small businesses",
    setupFee: "$69.99",
    features: [
      "5-10 pages included",
      "Domain & hosting included",
      "Basic SEO optimization",
      "Monthly text & image updates",
      "Basic e-commerce (if needed)",
      "Social media integration"
    ]
  },
  {
    name: "Pro E-commerce",
    price: "$80-$150/mo",
    description: "For online stores & businesses",
    setupFee: "$69.99",
    features: [
      "Unlimited pages",
      "Domain & hosting included",
      "Full SEO optimization",
      "Unlimited updates & support",
      "Complete online store",
      "Product management system",
      "Payment processing"
    ]
  }
];

const oneTimePlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$69.99",
    description: "One-time payment, you host it yourself",
    features: [
      "Complete website files",
      "1-3 pages included",
      "Self-hosting (no monthly fees)",
      "Mobile responsive design",
      "Basic design",
      "No ongoing support included"
    ]
  },
  {
    name: "Standard",
    price: "$150",
    description: "One-time payment for a professional site",
    features: [
      "Complete website files",
      "5-10 pages included",
      "Self-hosting (no monthly fees)",
      "Mobile responsive design",
      "Professional design",
      "No ongoing support included"
    ]
  },
  {
    name: "Pro E-commerce",
    price: "$449",
    description: "One-time payment for a full online store",
    features: [
      "Complete e-commerce website",
      "Unlimited pages",
      "Self-hosting (no monthly fees)",
      "Full product management system",
      "Payment gateway integration",
      "No ongoing support included"
    ]
  }
];
