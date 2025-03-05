
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";

const ProEcommercePlan = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Pro E-commerce Plan</h1>
        
        <div className="max-w-4xl mx-auto bg-gray-900/50 rounded-xl p-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Plan Overview</h2>
              <p className="text-gray-300 mb-6">
                Our Pro E-commerce plan is designed for businesses that need a full-featured online store with 
                comprehensive e-commerce capabilities. This plan includes everything you need to sell products online 
                effectively and scale your business.
              </p>
              
              <h3 className="text-xl font-medium mb-3 mt-8">What's Included</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Unlimited pages</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Domain name registration included ($11/year)</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Hosting service included ($20/month or $50/year)</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Full SEO optimization</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>10 updates per month included</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Complete online store functionality</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Advanced product management system</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Website customization requests</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3 mt-8">Update & Support Options</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>10 updates per month included</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Pay-per-update: $5 per additional update</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Pre-built website support: $20-50 per feature (based on complexity)</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3 mt-8">E-commerce Features</h3>
              <p className="text-gray-300 mb-4">
                The Pro E-commerce plan includes these advanced features:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Unlimited products</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Multiple payment gateway integration</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Advanced inventory management</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Customer account management</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Order tracking and management</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Discount and coupon system</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Product reviews and ratings</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate("/templates")}
                >
                  Browse Templates
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="ml-4"
                  onClick={() => navigate("/contact")}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
            
            <div>
              <Card className="p-6 bg-gray-900/50 border border-gray-800 sticky top-24">
                <div className="text-2xl font-semibold mb-2">Pro E-commerce</div>
                <div className="text-4xl font-bold mb-2">$80-$150/mo</div>
                <div className="text-sm text-gray-400 mb-4">+ $69.99 setup fee</div>
                <p className="text-gray-400 mb-6">For online stores & businesses</p>
                
                <div className="bg-primary-400/10 text-primary-400 px-3 py-2 rounded-md text-sm mb-6 font-medium">
                  10 updates/month included
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 mb-4"
                  onClick={() => navigate("/templates")}
                >
                  Get Started
                </Button>
                
                <div className="text-sm text-gray-400 mt-4">
                  <p className="mb-2">One-time purchase option:</p>
                  <p className="font-semibold">$449 for website files only</p>
                  <p className="text-xs mt-2">(self-hosting, no setup fee)</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProEcommercePlan;
