
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, Edit, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UserDashboardRequests } from "@/components/dashboard/UserDashboardRequests";
import { SingleUpdateRequest } from "@/components/dashboard/SingleUpdateRequest";
import { PreBuiltWebsiteSupport } from "@/components/dashboard/PreBuiltWebsiteSupport";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState<'starter' | 'standard' | 'pro-ecommerce'>('starter');
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    website_url: '',
  });
  const [requestsUsed, setRequestsUsed] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
        
        if (!data.session) {
          navigate("/auth/signin");
          return;
        }
        
        // Fetch user profile including plan
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast.error("Failed to load your profile");
          return;
        }
        
        if (profileData) {
          setUserPlan(profileData.plan as 'starter' | 'standard' | 'pro-ecommerce');
          setUserProfile({
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            website_url: profileData.website_url || '',
          });
        }
        
        // Fetch number of request credits used
        // In a real app, this would be implemented properly
        const { data: requestsData, error: requestsError } = await supabase
          .from('website_requests')
          .select('*')
          .eq('user_id', data.session.user.id)
          .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
          
        if (!requestsError && requestsData) {
          setRequestsUsed(requestsData.length);
        }
        
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Get the number of requests included in the current plan
  const getRequestCredits = () => {
    switch(userPlan) {
      case 'starter': return 5;
      case 'standard': return 10;
      case 'pro-ecommerce': return 15;
      default: return 5;
    }
  };

  const formatPlanName = (plan: string) => {
    switch(plan) {
      case 'starter': return 'Starter';
      case 'standard': return 'Standard';
      case 'pro-ecommerce': return 'Pro E-commerce';
      default: return plan;
    }
  };

  const handleRequestSubmitted = async () => {
    // Refresh the number of requests used
    if (session) {
      const { data: requestsData } = await supabase
        .from('website_requests')
        .select('*')
        .eq('user_id', session.user.id)
        .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
        
      if (requestsData) {
        setRequestsUsed(requestsData.length);
      }
    }
  };

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
            Please sign in to access your dashboard.
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your active subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPlanName(userPlan)}</div>
              <p className="text-gray-400 mt-2">{getRequestCredits()} request credits per month</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/plans/selection")} variant="outline" className="w-full">
                Manage Plan
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Update Credits</CardTitle>
              <CardDescription>Available this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getRequestCredits() - requestsUsed} Credits</div>
              <p className="text-gray-400 mt-2">
                Used {requestsUsed} of {getRequestCredits()} credits this month
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/requests")} variant="outline" className="w-full">
                Make a Request
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Website</CardTitle>
              <CardDescription>Your website status</CardDescription>
            </CardHeader>
            <CardContent>
              {userProfile.website_url ? (
                <>
                  <div className="text-green-500 flex items-center mb-2">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span>Live</span>
                  </div>
                  <a 
                    href={userProfile.website_url.startsWith('http') 
                      ? userProfile.website_url 
                      : `https://${userProfile.website_url}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    <span className="truncate">{userProfile.website_url}</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </>
              ) : (
                <>
                  <div className="text-yellow-500 flex items-center mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Not yet published</span>
                  </div>
                  <p className="text-gray-400">Submit a website request to get started</p>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/templates")} variant="outline" className="w-full">
                {userProfile.website_url ? "Update Website" : "Create Website"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="requests">Your Requests</TabsTrigger>
            <TabsTrigger value="updateRequest">New Update Request</TabsTrigger>
            <TabsTrigger value="addOns">Pre-built Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests">
            <UserDashboardRequests />
          </TabsContent>
          
          <TabsContent value="updateRequest">
            <SingleUpdateRequest 
              userPlan={userPlan}
              creditsUsed={requestsUsed}
              creditsTotal={getRequestCredits()}
              onRequestSubmitted={handleRequestSubmitted}
            />
          </TabsContent>
          
          <TabsContent value="addOns">
            <PreBuiltWebsiteSupport />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
