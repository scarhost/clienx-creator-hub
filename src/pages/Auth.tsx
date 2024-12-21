import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignIn = location.pathname.includes("signin");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const pendingInfo = localStorage.getItem("pendingBusinessInfo") || 
                          localStorage.getItem("pendingPortfolioInfo") || 
                          localStorage.getItem("pendingPersonalInfo");
        
        if (pendingInfo) {
          const type = localStorage.getItem("pendingWebsiteType");
          localStorage.removeItem("pendingWebsiteType");
          localStorage.removeItem(`pending${type}Info`);
          navigate(`/onboarding/${type?.toLowerCase()}/info`);
        } else {
          navigate("/dashboard");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-8rem)] bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-primary/20">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
              {isSignIn ? "Welcome Back" : "Create Your Account"}
            </h1>
            <p className="text-gray-400 mt-2">
              {isSignIn 
                ? "Sign in to manage your websites" 
                : "Join us to create your professional website"}
            </p>
          </div>
          
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(79, 70, 229)',
                    brandAccent: 'rgb(67, 56, 202)',
                    brandButtonText: 'white',
                    defaultButtonBackground: 'rgb(17, 24, 39)',
                    defaultButtonBackgroundHover: 'rgb(31, 41, 55)',
                    inputBackground: 'transparent',
                    inputBorder: 'rgb(75, 85, 99)',
                    inputBorderHover: 'rgb(107, 114, 128)',
                    inputBorderFocus: 'rgb(79, 70, 229)',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '0.5rem',
                    buttonBorderRadius: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  },
                }
              },
              className: {
                container: 'space-y-4',
                button: 'bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg w-full',
                input: 'bg-background border border-gray-700 focus:border-primary rounded-lg px-4 py-2 w-full',
                label: 'text-sm font-medium text-gray-300',
              }
            }}
            providers={[]}
            redirectTo={window.location.origin}
          />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Auth;