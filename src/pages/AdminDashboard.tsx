
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersList } from "@/components/admin/UsersList";
import { AdminRequestsTab } from "@/components/admin/AdminRequestsTab";
import { AdminAddonRequestsTab } from "@/components/admin/AdminAddonRequestsTab";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
        
        if (!data.session) {
          toast.error("You must be signed in to access this page");
          navigate("/auth/signin");
          return;
        }

        // Check if the user has admin rights by checking the is_admin flag
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileError) {
          console.error("Error checking admin status:", profileError);
          toast.error("Error checking admin permissions");
          return;
        }
        
        // Set admin status based on the is_admin flag
        setIsAdmin(profileData?.is_admin || false);
      } catch (error) {
        console.error("Error checking auth:", error);
        toast.error("Error checking authentication");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2" />
            <p>Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!session) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            Please sign in to access the admin dashboard.
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access the admin dashboard. 
              Please contact an administrator if you believe this is an error.
            </AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="requests">Website Requests</TabsTrigger>
            <TabsTrigger value="addons">Add-on Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UsersList />
          </TabsContent>
          
          <TabsContent value="requests">
            <AdminRequestsTab />
          </TabsContent>
          
          <TabsContent value="addons">
            <AdminAddonRequestsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
