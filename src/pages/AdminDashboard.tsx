
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersList } from "@/components/admin/UsersList";
import { AdminRequestsTab } from "@/components/admin/AdminRequestsTab";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
        
        // In a real app, we'd check if the user has admin rights
        if (!data.session) {
          toast.error("You must be signed in to access this page");
          navigate("/auth/signin");
          return;
        }

        // For demo purposes, all logged-in users can access the admin dashboard
        // In a production app, you would check for admin role here
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="requests">Update Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UsersList />
          </TabsContent>
          
          <TabsContent value="requests">
            <AdminRequestsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
