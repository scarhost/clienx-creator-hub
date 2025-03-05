
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Search, X, Edit, MessageSquare, User, Users, FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface UserInfo {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  plan?: string;
  website_url?: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<WebsiteRequest[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [status, setStatus] = useState("");
  const [userPlan, setUserPlan] = useState("");

  useEffect(() => {
    if (activeTab === "requests") {
      fetchAllRequests();
    } else if (activeTab === "users") {
      fetchAllUsers();
    }
  }, [activeTab]);

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

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch from your users table
      // This is mock data for demonstration
      const mockUsers: UserInfo[] = [
        {
          id: "1",
          email: "john@example.com",
          name: "John Doe",
          phone: "+1 555-123-4567",
          plan: "starter",
          website_url: "https://johndoe-business.example.com",
          created_at: "2023-11-15T10:30:00Z"
        },
        {
          id: "2",
          email: "sarah@example.com",
          name: "Sarah Smith",
          phone: "+1 555-987-6543",
          plan: "standard",
          website_url: "https://sarahsmith-portfolio.example.com",
          created_at: "2023-12-05T14:45:00Z"
        },
        {
          id: "3",
          email: "mike@example.com",
          name: "Mike Johnson",
          phone: "+1 555-456-7890",
          plan: "pro-ecommerce",
          website_url: "https://mikeshop.example.com",
          created_at: "2024-01-20T09:15:00Z"
        },
        {
          id: "4",
          email: "emily@example.com",
          name: "Emily Brown",
          phone: "+1 555-789-0123",
          plan: "starter",
          created_at: "2024-02-08T16:20:00Z"
        }
      ];

      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
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

  const handleUserSearch = (query: string) => {
    setUserSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      const searchableText = `${user.name || ""} ${user.email} ${user.phone || ""} ${user.plan || ""}`.toLowerCase();
      return searchableText.includes(query.toLowerCase());
    });

    setFilteredUsers(filtered);
  };

  const handleSelectRequest = (request: WebsiteRequest) => {
    setSelectedRequest(request);
    setAdminNotes(request.admin_notes || "");
    setStatus(request.status);
  };

  const handleSelectUser = (user: UserInfo) => {
    setSelectedUser(user);
    setUserPlan(user.plan || "");
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

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      // In a real app, you would update the user in your database
      toast.success("User plan updated successfully");
      
      // Update the local state
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
        ? { ...user, plan: userPlan } 
        : user
      );
      
      setUsers(updatedUsers);
      setFilteredUsers(
        filteredUsers.map(user => 
          user.id === selectedUser.id 
          ? { ...user, plan: userPlan } 
          : user
        )
      );
      
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="requests">
              <FileText className="w-4 h-4 mr-2" />
              Website Requests
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="requests" className="mt-0">
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
        </TabsContent>

        <TabsContent value="users" className="mt-0">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, email, or plan..."
                className="pl-9"
                value={userSearchQuery}
                onChange={(e) => handleUserSearch(e.target.value)}
              />
            </div>
            <Button onClick={fetchAllUsers}>Refresh</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users List */}
            <div className="md:col-span-1 space-y-4">
              <h2 className="text-xl font-semibold mb-4">All Users</h2>
              {loading ? (
                <div className="text-center py-8">Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No users found</div>
              ) : (
                filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedUser?.id === user.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user.name || "Unnamed User"}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        <p className="text-xs text-gray-400">
                          Joined: {formatDate(user.created_at)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.plan === 'starter' ? 'bg-blue-800 text-blue-100' :
                        user.plan === 'standard' ? 'bg-purple-800 text-purple-100' :
                        user.plan === 'pro-ecommerce' ? 'bg-green-800 text-green-100' :
                        'bg-gray-800 text-gray-100'
                      }`}>
                        {user.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : "No Plan"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* User Details */}
            <div className="md:col-span-2">
              {selectedUser ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center">
                          <User className="w-6 h-6 mr-2 text-gray-400" />
                          <h2 className="text-xl font-semibold">{selectedUser.name || "Unnamed User"}</h2>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{selectedUser.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Select value={userPlan} onValueChange={setUserPlan}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">No Plan</SelectItem>
                            <SelectItem value="starter">Starter</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="pro-ecommerce">Pro E-commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Contact Information</h3>
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-sm text-gray-300">
                              <span className="text-gray-400">Phone:</span> {selectedUser.phone || "Not provided"}
                            </p>
                            <p className="text-sm text-gray-300">
                              <span className="text-gray-400">Email:</span> {selectedUser.email}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Account Details</h3>
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-sm text-gray-300">
                              <span className="text-gray-400">User ID:</span> {selectedUser.id}
                            </p>
                            <p className="text-sm text-gray-300">
                              <span className="text-gray-400">Created:</span> {formatDate(selectedUser.created_at)}
                            </p>
                            <p className="text-sm text-gray-300">
                              <span className="text-gray-400">Current Plan:</span> {selectedUser.plan ? selectedUser.plan.charAt(0).toUpperCase() + selectedUser.plan.slice(1) : "No Plan"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Website</h3>
                          <div className="bg-gray-800 p-3 rounded-md">
                            {selectedUser.website_url ? (
                              <div>
                                <p className="text-sm text-gray-300 mb-2">
                                  <span className="text-gray-400">URL:</span> {selectedUser.website_url}
                                </p>
                                <a 
                                  href={selectedUser.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-xs text-primary hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View Website
                                </a>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-300">No website created yet</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Activity</h3>
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-sm text-gray-300">Last login: Not available</p>
                            <p className="text-sm text-gray-300">Requests submitted: Not available</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedUser(null)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateUser}>
                        <Check className="w-4 h-4 mr-2" />
                        Update Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px] border border-dashed border-gray-700 rounded-lg">
                  <div className="text-center text-gray-500">
                    <User className="w-8 h-8 mx-auto mb-2" />
                    <p>Select a user to view and edit details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
