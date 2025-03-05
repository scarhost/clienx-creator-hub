
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { toast } from "sonner";
import { Auth } from "@/components/ui/auth";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const pendingTemplateRequest = localStorage.getItem('pendingTemplateRequest');
        if (pendingTemplateRequest) {
          localStorage.removeItem('pendingTemplateRequest');
          navigate('/templates');
          return;
        }
        
        // Check if user has any websites
        const { data: websites } = await supabase
          .from("website_info")
          .select("id")
          .eq("user_id", session.user.id);

        if (!websites || websites.length === 0) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      }
    });

    // Show welcome toast for new users
    const isNewUser = new URLSearchParams(window.location.search).get("new_user");
    if (isNewUser === "true") {
      toast.success("Account created successfully! Please sign in with your credentials.");
    }

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-8rem)] bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-primary/20">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">
              Sign in to manage your websites
            </p>
          </div>
          
          <Auth 
            supabaseClient={supabase}
            view="sign_in"
            appearance={{ 
              extend: false,
              className: {
                container: 'space-y-4',
                button: 'bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg w-full',
                input: 'bg-background border border-gray-700 focus:border-primary rounded-lg px-4 py-2 w-full',
                label: 'text-sm font-medium text-gray-300',
              }
            }}
            providers={[]}
          />
          
          <div className="mt-6 text-center">
            <span className="text-gray-400">Don't have an account?</span>{" "}
            <Link
              to="/auth/signup"
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SignIn;
