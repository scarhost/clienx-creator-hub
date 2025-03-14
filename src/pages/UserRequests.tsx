import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WebsiteCompletionDisplay } from "@/components/dashboard/WebsiteCompletionDisplay";

type RequestStatus = "pending" | "in_progress" | "completed" | "rejected";

interface WebsiteRequest {
  id: string;
  user_id: string;
  template_id: number;
  template_name: string;
  template_style: string;
  request_details: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  admin_notes?: string;
  website_type?: "one_time" | "subscription";
  website_url?: string;
}

const statusIcons = {
  pending: <Clock className="w-5 h-5 text-yellow-500" />,
  in_progress: <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />,
  completed: <CheckCircle className="w-5 h-5 text-green-500" />,
  rejected: <XCircle className="w-5 h-5 text-red-500" />
};

const statusLabels = {
  pending: "Pending Review",
  in_progress: "In Progress",
  completed: "Completed",
  rejected: "Rejected"
};

const UserRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast.error("Please sign in to view your requests");
        navigate("/auth/signin");
        return;
      }
      
      fetchUserRequests(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const fetchUserRequests = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("website_requests")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setRequests((data as WebsiteRequest[]) || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load your requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Website Requests</h1>
          <Button onClick={() => navigate("/onboarding")}>
            Submit New Request
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-8 h-8 text-primary" />
            <span className="ml-2">Loading your requests...</span>
          </div>
        ) : requests.length === 0 ? (
          <Card className="bg-gray-900/50 border border-gray-800">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Requests Found</h3>
              <p className="text-gray-400 text-center max-w-md mb-6">
                You haven't submitted any website requests yet. Choose a template and tell us what you'd like to customize.
              </p>
              <Button onClick={() => navigate("/templates")}>
                Browse Templates
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <Card key={request.id} className="border border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold">{request.template_name}</h3>
                        <span className="ml-3 text-sm text-gray-400">({request.template_style})</span>
                      </div>
                      <div className="flex items-center gap-1 mb-4">
                        {statusIcons[request.status]}
                        <span className="text-sm font-medium">{statusLabels[request.status]}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        <span className="font-medium">Submitted:</span> {new Date(request.created_at).toLocaleDateString()}
                      </p>
                      
                      {request.status === "completed" && request.website_url && (
                        <div className="my-4">
                          <WebsiteCompletionDisplay 
                            websiteType={request.website_type || "one_time"} 
                            websiteUrl={request.website_url} 
                          />
                        </div>
                      )}
                      
                      <div className="bg-gray-800/50 p-3 rounded-md mt-4">
                        <p className="text-sm font-medium mb-1">Your Request:</p>
                        <p className="text-gray-300 text-sm whitespace-pre-line">
                          {request.request_details}
                        </p>
                      </div>
                      {request.admin_notes && (
                        <div className="bg-primary/10 p-3 rounded-md mt-4 border border-primary/30">
                          <p className="text-sm font-medium mb-1">Admin Response:</p>
                          <p className="text-gray-300 text-sm whitespace-pre-line">
                            {request.admin_notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UserRequests;
