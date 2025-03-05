
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Crown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PlanSelectorProps {
  currentPlan: string;
  onPlanChange: (plan: 'starter' | 'standard' | 'pro-ecommerce') => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({ currentPlan, onPlanChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$10/mo',
      description: 'Perfect for simple websites with minimal updates',
      features: [
        '1-3 pages included',
        'Domain & hosting included',
        '2 updates per month',
        'Mobile responsive design'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$30-$50/mo',
      description: 'Best for small businesses',
      features: [
        '5-10 pages included',
        'Domain & hosting included',
        '10 monthly updates included',
        'Basic SEO optimization'
      ]
    },
    {
      id: 'pro-ecommerce',
      name: 'Pro E-commerce',
      price: '$80-$150/mo',
      description: 'For online stores & businesses',
      features: [
        'Unlimited pages',
        'Domain & hosting included',
        'Full SEO optimization',
        '10 monthly updates included',
        'Complete online store'
      ]
    }
  ];
  
  const handleSelectPlan = async (plan: 'starter' | 'standard' | 'pro-ecommerce') => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to select a plan");
        navigate("/auth/signin");
        return;
      }
      
      // For demo/testing, just update the state without actual payment
      setTimeout(() => {
        onPlanChange(plan);
        toast.success(`Your plan has been updated to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error updating plan:", error);
      toast.error("Failed to update plan");
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select a Plan</h2>
      <p className="text-gray-400">Choose the plan that works best for your needs. For testing purposes, plans can be switched without payment.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`transition-all hover:shadow-md ${currentPlan === plan.id ? 'border-primary border-2' : 'border-gray-800'}`}
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                {currentPlan === plan.id && (
                  <Crown className="w-5 h-5 text-primary mr-2" />
                )}
                {plan.name}
              </CardTitle>
              <div className="text-2xl font-bold">{plan.price}</div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full"
                disabled={currentPlan === plan.id || isLoading}
                onClick={() => handleSelectPlan(plan.id as 'starter' | 'standard' | 'pro-ecommerce')}
              >
                {currentPlan === plan.id ? 'Current Plan' : `Select ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
