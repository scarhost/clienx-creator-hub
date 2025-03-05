
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";

const StarterPlan = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Starter Plan</h1>
        
        <div className="max-w-4xl mx-auto bg-gray-900/50 rounded-xl p-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Plan Overview</h2>
              <p className="text-gray-300 mb-6">
                Our Starter plan is perfect for individuals and small businesses who need a simple 
                website with minimal updates. It's designed to get you online quickly with a 
                professional-looking website at an affordable price.
              </p>
              
              <h3 className="text-xl font-medium mb-3 mt-8">What's Included</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>1-3 pages website design</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Domain name registration ($11/year)</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Hosting service ($20/month or $50/year)</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Mobile responsive design</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>2 content updates per month included</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Contact form setup</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Basic SEO setup</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3 mt-8">Update Options</h3>
              <p className="text-gray-300 mb-4">
                The Starter plan includes 2 basic content updates per month. For additional updates:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Pay-per-update: $5 per simple content change</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Content changes include: text updates, image swaps, simple layout adjustments</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Pre-built website support: $20-50 per feature (based on complexity)</span>
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
                <div className="text-2xl font-semibold mb-2">Starter Plan</div>
                <div className="text-4xl font-bold mb-2">$10/mo</div>
                <div className="text-sm text-gray-400 mb-4">+ $69.99 setup fee</div>
                <p className="text-gray-400 mb-6">Perfect for simple websites with minimal updates</p>
                
                <div className="bg-primary-400/10 text-primary-400 px-3 py-2 rounded-md text-sm mb-6 font-medium">
                  2 updates/month included
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 mb-4"
                  onClick={() => navigate("/templates")}
                >
                  Get Started
                </Button>
                
                <div className="text-sm text-gray-400 mt-4">
                  <p className="mb-2">One-time purchase option:</p>
                  <p className="font-semibold">$69.99 for website files only</p>
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

export default StarterPlan;
