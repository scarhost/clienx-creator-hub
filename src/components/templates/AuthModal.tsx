
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Auth } from "@/components/ui/auth";
import { supabase } from "@/integrations/supabase/client";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  open, 
  onOpenChange,
  onSuccess
}) => {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        // Close modal and call onSuccess when signed in
        onOpenChange(false);
        onSuccess();
      }
    });

    return () => subscription.unsubscribe();
  }, [onOpenChange, onSuccess]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Account Required</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-center text-gray-400 mb-4">
            Please create an account or sign in to continue with your template selection
          </p>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Auth
                view="sign_in"
                supabaseClient={supabase}
                redirectTo={window.location.origin + "/onboarding"}
                showLinks={false}
                appearance={{
                  extend: false,
                  className: {
                    container: "space-y-4",
                    input: "w-full border border-gray-700 rounded-md p-2 bg-background",
                    button: "w-full bg-primary text-background rounded-md px-4 py-2 font-medium hover:bg-primary/90",
                    label: "text-sm text-gray-400",
                  },
                }}
              />
            </TabsContent>
            <TabsContent value="signup">
              <Auth
                view="sign_up"
                supabaseClient={supabase}
                redirectTo={window.location.origin + "/onboarding"}
                showLinks={false}
                appearance={{
                  extend: false,
                  className: {
                    container: "space-y-4",
                    input: "w-full border border-gray-700 rounded-md p-2 bg-background",
                    button: "w-full bg-primary text-background rounded-md px-4 py-2 font-medium hover:bg-primary/90",
                    label: "text-sm text-gray-400",
                  },
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
