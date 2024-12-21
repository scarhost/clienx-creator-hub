import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Crown } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth/signin");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Websites Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Websites</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-800 rounded-lg">
                <p className="text-lg font-medium">Portfolio Website</p>
                <p className="text-sm text-gray-400 mt-1">Created on April 1, 2024</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Plan Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Plan</h2>
            <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-primary" />
                <p className="text-lg font-medium">Free Plan</p>
              </div>
              <p className="text-sm text-gray-400 mb-4">Access to basic features</p>
              <Button className="w-full">Upgrade Plan</Button>
            </div>
          </Card>

          {/* Customization Request Form */}
          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Request Customization</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <select className="w-full p-2 rounded-md border border-gray-800 bg-background">
                  <option>Portfolio Website</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Changes Requested</label>
                <textarea 
                  className="w-full p-2 rounded-md border border-gray-800 bg-background min-h-[100px]"
                  placeholder="Describe the changes you'd like..."
                />
              </div>
              <Button type="submit" className="w-full">
                <Pencil className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;