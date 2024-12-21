import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthChangeEvent } from "@supabase/supabase-js";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event === "SIGNED_UP" && session) {
        navigate("/auth/signin?new_user=true");
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
              Create Your Account
            </h1>
            <p className="text-gray-400 mt-2">
              Join us to create your professional website
            </p>
          </div>
          
          <Auth 
            supabaseClient={supabase}
            view="sign_up"
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
          />
        </Card>
      </div>
    </MainLayout>
  );
};

export default SignUp;