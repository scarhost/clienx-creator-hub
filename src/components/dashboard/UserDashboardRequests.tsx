
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
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

export const UserDashboardRequests = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        setLoading(true);
        const { data: session } = await supabase.auth.getSession();
        
        if (!session?.session?.user) {
          toast.error("You must be logged in to view your requests");
          return;
        }
        
        const { data, error } = await supabase
          .from("website_requests")
          .select("*")
          .eq("user_id", session.session.user.id)
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        
        setRequests(data as WebsiteRequest[] || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to load your requests");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserRequests();
  }, []);
  
  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Pending
        </Badge>;
      case "in_progress":
        return <Badge variant="default" className="flex items-center gap-1 bg-blue-600">
          <Loader2 className="h-3 w-3 animate-spin" /> In Progress
        </Badge>;
      case "completed":
        return <Badge variant="default" className="flex items-center gap-1 bg-green-600">
          <CheckCircle className="h-3 w-3" /> Completed
        </Badge>;
      case "rejected":
        return <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" /> Rejected
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <p>Loading your requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No requests found</h3>
          <p className="text-sm text-muted-foreground text-center mb-6">
            You haven't made any website requests yet.
          </p>
          <Button onClick={() => window.location.href = "/onboarding"}>
            Browse Templates
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{request.template_name}</h3>
                  <span className="text-sm text-muted-foreground">({request.template_style})</span>
                  {getStatusBadge(request.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Requested on {new Date(request.created_at).toLocaleDateString()}
                </p>
                
                {request.status === "completed" && request.website_url && (
                  <div className="mb-4">
                    <WebsiteCompletionDisplay 
                      websiteType={request.website_type || "one_time"} 
                      websiteUrl={request.website_url} 
                    />
                  </div>
                )}
                
                {request.admin_notes && (
                  <div className="bg-primary/5 p-3 rounded-md mb-4">
                    <p className="text-sm font-medium">Admin Notes:</p>
                    <p className="text-sm whitespace-pre-line">{request.admin_notes}</p>
                  </div>
                )}
                
                <div className="text-sm">
                  <details className="cursor-pointer">
                    <summary className="font-medium mb-2">Your Request Details</summary>
                    <div className="pl-4 border-l-2 border-muted whitespace-pre-wrap">
                      {request.request_details}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
