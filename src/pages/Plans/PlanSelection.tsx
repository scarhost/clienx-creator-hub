
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PlanSelector } from "@/components/dashboard/PlanSelector";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PlanSelection = () => {
  const [userPlan, setUserPlan] = useState<'starter' | 'standard' | 'pro-ecommerce'>('starter');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchPlan = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth/signin");
        return;
      }

      try {
        setLoading(true);
        
        // Fetch the user's current plan from the user_profiles table
        const { data, error } = await supabase
          .from('user_profiles')
          .select('plan')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error("Error fetching user plan:", error);
          toast.error("Failed to load your plan information");
          return;
        }
        
        if (data) {
          // Type assertion to ensure the plan is one of the valid options
          setUserPlan(data.plan as 'starter' | 'standard' | 'pro-ecommerce');
        }
      } catch (error) {
        console.error("Error fetching user plan:", error);
        toast.error("Failed to load your plan information");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthAndFetchPlan();
  }, [navigate]);

  const handlePlanChange = (plan: 'starter' | 'standard' | 'pro-ecommerce') => {
    setUserPlan(plan);
    toast.success(`Your plan has been updated to ${plan}`);
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Your Plan</h1>
        
        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2" />
            <p>Loading your plan information...</p>
          </div>
        ) : (
          <PlanSelector currentPlan={userPlan} onPlanChange={handlePlanChange} />
        )}
      </div>
    </MainLayout>
  );
};

export default PlanSelection;
