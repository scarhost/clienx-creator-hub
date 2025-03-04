
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";

const StandardPlan = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Standard Plan</h1>
        
        <div className="max-w-4xl mx-auto bg-gray-900/50 rounded-xl p-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Plan Overview</h2>
              <p className="text-gray-300 mb-6">
                Our Standard plan is perfect for small businesses and professionals who need a more comprehensive 
                website with regular updates. It includes more pages, better SEO, and more frequent content updates.
              </p>
              
              <h3 className="text-xl font-medium mb-3 mt-8">What's Included</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>5-10 pages website design</span>
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
                  <span>Basic SEO optimization</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Monthly text and image updates</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Basic e-commerce functionality (if needed)</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Social media integration</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Contact forms and lead capture</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3 mt-8">E-commerce Features</h3>
              <p className="text-gray-300 mb-4">
                Basic e-commerce features available with the Standard plan include:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Up to 20 products</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Simple payment processing</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <Check className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                  <span>Basic inventory management</span>
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
                <div className="text-2xl font-semibold mb-2">Standard Plan</div>
                <div className="text-4xl font-bold mb-2">$30-$50/mo</div>
                <div className="text-sm text-gray-400 mb-4">+ $69.99 setup fee</div>
                <p className="text-gray-400 mb-6">Best for small businesses</p>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 mb-4"
                  onClick={() => navigate("/templates")}
                >
                  Get Started
                </Button>
                
                <div className="text-sm text-gray-400 mt-4">
                  <p className="mb-2">One-time purchase option:</p>
                  <p className="font-semibold">$150 for website files only</p>
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

export default StandardPlan;
