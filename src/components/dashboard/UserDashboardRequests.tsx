
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";

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
}

export const UserDashboardRequests = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const fetchUserRequests = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return;
      }
      
      setLoading(true);
      const { data, error } = await supabase
        .from("website_requests")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setRequests(data as WebsiteRequest[]);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load your requests");
    } finally {
      setLoading(false);
    }
  };

  const pendingRequests = requests.filter(req => 
    req.status === 'pending' || req.status === 'in_progress'
  );
  
  const completedRequests = requests.filter(req => 
    req.status === 'completed' || req.status === 'rejected'
  );

  const statusIcons = {
    pending: <Clock className="w-5 h-5 text-yellow-500" />,
    in_progress: <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />,
    completed: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    rejected: <XCircle className="w-5 h-5 text-red-500" />
  };

  const statusLabels = {
    pending: "Pending Review",
    in_progress: "In Progress",
    completed: "Completed",
    rejected: "Rejected"
  };

  const renderRequestCard = (request: WebsiteRequest) => (
    <Card key={request.id} className="mb-4 border border-gray-800">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold">{request.template_name}</h3>
              <span className="ml-3 text-sm text-gray-400">({request.template_style})</span>
            </div>
            
            <div className="flex items-center gap-1 mb-3">
              {statusIcons[request.status]}
              <span className="text-sm font-medium">{statusLabels[request.status]}</span>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">
              <span className="font-medium">Submitted:</span> {new Date(request.created_at).toLocaleDateString()}
            </p>
            
            <div className="bg-gray-800/50 p-3 rounded-md mt-2 mb-4">
              <p className="text-sm font-medium mb-1">Your Request:</p>
              <p className="text-gray-300 text-sm whitespace-pre-line">
                {request.request_details}
              </p>
            </div>
            
            {request.admin_notes && (
              <div className="bg-primary/10 p-3 rounded-md mt-2 border border-primary/30">
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
  );

  if (loading) {
    return (
      <div className="text-center py-4">
        <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2" />
        <p>Loading your requests...</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="pending">Pending Requests ({pendingRequests.length})</TabsTrigger>
        <TabsTrigger value="completed">Completed Requests ({completedRequests.length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending">
        {pendingRequests.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-gray-400">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>You don't have any pending requests</p>
                <Button className="mt-4" onClick={() => navigate("/templates")}>
                  Make a Request
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          pendingRequests.map(renderRequestCard)
        )}
      </TabsContent>
      
      <TabsContent value="completed">
        {completedRequests.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-gray-400">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No completed requests found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          completedRequests.map(renderRequestCard)
        )}
      </TabsContent>
    </Tabs>
  );
};
