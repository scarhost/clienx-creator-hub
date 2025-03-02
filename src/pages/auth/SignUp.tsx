
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "@/components/ui/auth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        const pendingTemplateRequest = localStorage.getItem('pendingTemplateRequest');
        const pendingWebsiteType = localStorage.getItem('pendingWebsiteType');
        
        if (pendingTemplateRequest) {
          localStorage.removeItem('pendingTemplateRequest');
          navigate('/templates');
          return;
        }
        
        if (pendingWebsiteType) {
          const route = `/onboarding/${pendingWebsiteType.toLowerCase()}/info`;
          localStorage.removeItem('pendingWebsiteType');
          navigate(route);
          return;
        }
        
        // No pending actions, navigate to dashboard
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="container mx-auto flex min-h-screen w-full flex-col justify-center space-y-6 px-4 sm:w-[350px]">
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-gray-400">
          Enter your email below to create your account
        </p>
      </div>
      <Auth
        view="sign_up"
        supabaseClient={supabase}
        appearance={{
          extend: false,
          className: {
            container: "space-y-4",
            input: "w-full border border-gray-700 rounded-md p-2 bg-gray-800",
            button: "w-full bg-primary text-background rounded-md px-4 py-2 font-medium hover:bg-primary/90",
            label: "text-sm text-gray-400",
          },
        }}
        redirectTo={window.location.origin}
        showLinks={false}
      />
      <div className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          <span className="text-gray-400">Already have an account?</span>{" "}
          <Link
            to="/auth/signin"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
