
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Crown, Eye, Clock } from "lucide-react";
import { toast } from "sonner";

interface WebsiteRequest {
  id: string;
  template_name: string;
  template_style: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRequests, setUserRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth/signin");
        return;
      }

      try {
        setLoading(true);
        // Fetch the user's website requests
        const { data, error } = await supabase
          .from("website_requests")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setUserRequests(data || []);
      } catch (error) {
        console.error("Error fetching website requests:", error);
        toast.error("Failed to load your website requests");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Websites Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Website Requests</h2>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading your requests...</div>
              ) : userRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>You haven't made any website requests yet.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate("/templates")}
                  >
                    Choose a Template
                  </Button>
                </div>
              ) : (
                userRequests.map((request) => (
                  <div key={request.id} className="p-4 border border-gray-800 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-medium">{request.template_name}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Created on {formatDate(request.created_at)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === 'pending' ? 'bg-yellow-800 text-yellow-100' :
                            request.status === 'approved' ? 'bg-green-800 text-green-100' :
                            request.status === 'rejected' ? 'bg-red-800 text-red-100' :
                            'bg-blue-800 text-blue-100'
                          }`}>
                            <Clock className="w-3 h-3 mr-1" />
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary-foreground">
                            {request.template_style.charAt(0).toUpperCase() + request.template_style.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate("/preview-template")}>
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate("/requests")}>
                        <Pencil className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))
              )}
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
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => navigate("/templates")}>
                  Choose Template
                </Button>
                <Button variant="outline" onClick={() => navigate("/onboarding")}>
                  Website Setup
                </Button>
              </div>
            </div>
          </Card>

          {/* Customization Request Form */}
          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Request Customization</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <select className="w-full p-2 rounded-md border border-gray-800 bg-background">
                  {userRequests.length > 0 ? (
                    userRequests.map(request => (
                      <option key={request.id} value={request.id}>
                        {request.template_name} - {formatDate(request.created_at)}
                      </option>
                    ))
                  ) : (
                    <option disabled>No websites available</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Changes Requested</label>
                <textarea 
                  className="w-full p-2 rounded-md border border-gray-800 bg-background min-h-[100px]"
                  placeholder="Describe the changes you'd like..."
                />
              </div>
              <Button type="submit" className="w-full" disabled={userRequests.length === 0}>
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
