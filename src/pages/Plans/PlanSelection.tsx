
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PlanSelector } from "@/components/dashboard/PlanSelector";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PlanSelection = () => {
  const [userPlan, setUserPlan] = useState<'starter' | 'standard' | 'pro-ecommerce'>('starter');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth/signin");
        return;
      }

      try {
        setLoading(true);
        // In a real app, we would fetch the user's plan from a database
        // For now, just use 'starter' as default
        setUserPlan('starter');
      } catch (error) {
        console.error("Error fetching user plan:", error);
        toast.error("Failed to load your plan information");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handlePlanChange = (plan: 'starter' | 'standard' | 'pro-ecommerce') => {
    setUserPlan(plan);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Your Plan</h1>
        
        {loading ? (
          <div className="text-center py-16">Loading your plan information...</div>
        ) : (
          <PlanSelector currentPlan={userPlan} onPlanChange={handlePlanChange} />
        )}
      </div>
    </MainLayout>
  );
};

export default PlanSelection;
