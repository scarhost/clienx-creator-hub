
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Crown, Eye, Clock, ExternalLink, MessageSquare, Info } from "lucide-react";
import { toast } from "sonner";
import { SingleUpdateRequest } from "@/components/dashboard/SingleUpdateRequest";
import { PreBuiltWebsiteSupport } from "@/components/dashboard/PreBuiltWebsiteSupport";

interface WebsiteRequest {
  id: string;
  template_name: string;
  template_style: string;
  status: string;
  created_at: string;
  admin_notes?: string;
  updated_at?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRequests, setUserRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState<'starter' | 'standard' | 'pro-ecommerce'>('starter');
  const [usedRequests, setUsedRequests] = useState(0);

  // Get monthly request limit based on plan
  const getMonthlyRequestLimit = () => {
    switch (userPlan) {
      case 'starter':
        return 2;
      case 'standard':
        return 10;
      case 'pro-ecommerce':
        return 10;
      default:
        return 2;
    }
  };

  // Check if the user can make customization requests based on their plan
  const canRequestCustomization = () => {
    return userPlan === 'standard' || userPlan === 'pro-ecommerce';
  };

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
        
        // For demo purposes, we'll use a fixed plan type
        // In a real app, this would come from the user's subscription data
        setUserPlan('starter');
        
        // Count requests made in the current month (demo)
        const currentMonthRequests = (data || []).filter(req => {
          const requestDate = new Date(req.created_at);
          const currentDate = new Date();
          return requestDate.getMonth() === currentDate.getMonth() && 
                 requestDate.getFullYear() === currentDate.getFullYear();
        }).length;
        
        setUsedRequests(currentMonthRequests);
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

  const extractUpdates = (notes?: string) => {
    if (!notes) return [];
    
    const updates: {date: string, message: string}[] = [];
    const updateRegex = /\[UPDATE ([^\]]+)\]: (.+?)(?=\n\[UPDATE|$)/gs;
    
    let match;
    while ((match = updateRegex.exec(notes)) !== null) {
      updates.push({
        date: match[1],
        message: match[2].trim()
      });
    }
    
    return updates.reverse(); // Most recent first
  };
  
  const getWebsiteLink = (notes?: string) => {
    if (!notes) return null;
    
    // This is a simple implementation - might need to be more sophisticated
    // based on how admins actually format the website links
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const match = linkRegex.exec(notes);
    
    return match ? match[0] : null;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
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
                            request.status === 'in_progress' ? 'bg-blue-800 text-blue-100' :
                            request.status === 'completed' ? 'bg-green-800 text-green-100' :
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
                        
                        {getWebsiteLink(request.admin_notes) && (
                          <a 
                            href={getWebsiteLink(request.admin_notes) || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-3 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Your Website
                          </a>
                        )}
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

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Plan</h2>
            <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-primary" />
                <p className="text-lg font-medium">{userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan</p>
              </div>
              <p className="text-sm text-gray-400 mb-2">Access to basic features</p>
              <div className="bg-gray-800/50 rounded-md px-3 py-2 mb-4 flex items-center justify-between">
                <span className="text-sm">Monthly Update Requests</span>
                <span className="text-sm font-medium">{usedRequests} / {getMonthlyRequestLimit()} used</span>
              </div>
              <Button className="w-full" onClick={() => navigate('/pricing')}>Upgrade Plan</Button>
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

          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                Developer Updates
              </div>
            </h2>
            
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading updates...</div>
            ) : userRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No updates available yet. Submit a website request to get started.</p>
              </div>
            ) : (
              <div>
                {userRequests.some(request => extractUpdates(request.admin_notes).length > 0) ? (
                  <div className="space-y-5">
                    {userRequests
                      .filter(request => extractUpdates(request.admin_notes).length > 0)
                      .map(request => (
                        <div key={request.id} className="border-l-2 border-primary/50 pl-4">
                          <p className="font-medium text-base mb-2">{request.template_name}</p>
                          {extractUpdates(request.admin_notes).map((update, idx) => (
                            <div key={idx} className="mb-3">
                              <p className="text-sm text-gray-400">{update.date}</p>
                              <p className="text-sm">{update.message}</p>
                            </div>
                          ))}
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>No updates available yet. Our developers will post updates here as they work on your website.</p>
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Pay-Per-Update</h2>
            <SingleUpdateRequest planType={userPlan} />
          </Card>

          {canRequestCustomization() && (
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
                <div className="flex items-center justify-between text-sm text-gray-400 mt-2 mb-4">
                  <span>Updates remaining this month: {getMonthlyRequestLimit() - usedRequests}</span>
                  <Button variant="link" className="p-0 h-auto text-primary" size="sm">
                    <Info className="h-3 w-3 mr-1" />
                    Included with your plan
                  </Button>
                </div>
                <Button type="submit" className="w-full" disabled={userRequests.length === 0 || usedRequests >= getMonthlyRequestLimit()}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </Card>
          )}

          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Pre-built Website Support</h2>
            <PreBuiltWebsiteSupport />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
