
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Search, X, Edit, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WebsiteRequest {
  id: string;
  user_id: string;
  template_name: string;
  template_style: string;
  request_details: string;
  status: string;
  created_at: string;
  admin_notes?: string;
}

const AdminDashboard = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("website_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setRequests(data || []);
      setFilteredRequests(data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredRequests(requests);
      return;
    }

    const filtered = requests.filter((request) => {
      const searchableText = `${request.template_name} ${request.template_style} ${request.request_details} ${request.status}`.toLowerCase();
      return searchableText.includes(query.toLowerCase());
    });

    setFilteredRequests(filtered);
  };

  const handleSelectRequest = (request: WebsiteRequest) => {
    setSelectedRequest(request);
    setAdminNotes(request.admin_notes || "");
    setStatus(request.status);
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;

    try {
      const { error } = await supabase
        .from("website_requests")
        .update({
          admin_notes: adminNotes,
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq("id", selectedRequest.id);

      if (error) throw error;

      toast.success("Request updated successfully");
      
      // Update the local state
      const updatedRequests = requests.map(req => 
        req.id === selectedRequest.id 
        ? { ...req, admin_notes: adminNotes, status: status } 
        : req
      );
      
      setRequests(updatedRequests);
      setFilteredRequests(
        filteredRequests.map(req => 
          req.id === selectedRequest.id 
          ? { ...req, admin_notes: adminNotes, status: status } 
          : req
        )
      );
      
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePostUpdate = async () => {
    if (!selectedRequest || !updateMessage.trim()) return;

    try {
      // For now, we'll just append the update to the admin_notes
      // In a real app, you might want a separate updates table
      const newNotes = adminNotes 
        ? `${adminNotes}\n\n[UPDATE ${new Date().toLocaleDateString()}]: ${updateMessage}`
        : `[UPDATE ${new Date().toLocaleDateString()}]: ${updateMessage}`;

      await supabase
        .from("website_requests")
        .update({
          admin_notes: newNotes,
          updated_at: new Date().toISOString()
        })
        .eq("id", selectedRequest.id);

      setAdminNotes(newNotes);
      setUpdateMessage("");
      toast.success("Update posted successfully");
    } catch (error) {
      console.error("Error posting update:", error);
      toast.error("Failed to post update");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name, status, or details..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button onClick={fetchAllRequests}>Refresh</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Request List */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Website Requests</h2>
            {loading ? (
              <div className="text-center py-8">Loading requests...</div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No requests found</div>
            ) : (
              filteredRequests.map((request) => (
                <div 
                  key={request.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRequest?.id === request.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => handleSelectRequest(request)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{request.template_name}</p>
                      <p className="text-xs text-gray-400">
                        Created: {formatDate(request.created_at)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-800 text-yellow-100' :
                      request.status === 'in_progress' ? 'bg-blue-800 text-blue-100' :
                      request.status === 'completed' ? 'bg-green-800 text-green-100' :
                      request.status === 'rejected' ? 'bg-red-800 text-red-100' :
                      'bg-gray-800 text-gray-100'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Request Details */}
          <div className="md:col-span-2">
            {selectedRequest ? (
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{selectedRequest.template_name}</h2>
                      <p className="text-sm text-gray-400">Style: {selectedRequest.template_style}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-md mb-4">
                    <h3 className="text-sm font-medium mb-2">Request Details:</h3>
                    <p className="text-gray-300 text-sm whitespace-pre-line">{selectedRequest.request_details}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Admin Notes:</label>
                      <Textarea 
                        value={adminNotes} 
                        onChange={(e) => setAdminNotes(e.target.value)}
                        className="min-h-[100px]"
                        placeholder="Add notes for this request (visible to user)"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Website Link:</label>
                      <Input 
                        value={websiteLink} 
                        onChange={(e) => setWebsiteLink(e.target.value)}
                        placeholder="Add the website link when completed"
                      />
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-md mb-4">
                    <h3 className="text-sm font-medium mb-2">Post Update:</h3>
                    <Textarea 
                      value={updateMessage} 
                      onChange={(e) => setUpdateMessage(e.target.value)}
                      placeholder="Write an update message for the user"
                      className="mb-2"
                    />
                    <Button 
                      size="sm"
                      onClick={handlePostUpdate}
                      disabled={!updateMessage.trim()}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Post Update
                    </Button>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedRequest(null)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateRequest}>
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px] border border-dashed border-gray-700 rounded-lg">
                <div className="text-center text-gray-500">
                  <Edit className="w-8 h-8 mx-auto mb-2" />
                  <p>Select a request to view and edit details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
