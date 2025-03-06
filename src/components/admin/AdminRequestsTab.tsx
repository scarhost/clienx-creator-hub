
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Search, CheckCircle, Clock, XCircle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { WebsiteCompletionDetails } from '@/components/admin/WebsiteCompletionDetails';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
  user_email?: string;
  user_name?: string;
  website_type?: "one_time" | "subscription";
  website_url?: string;
}

export const AdminRequestsTab = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [supportRequests, setSupportRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSupport, setLoadingSupport] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [websiteType, setWebsiteType] = useState<"one_time" | "subscription">("one_time");
  const [websiteUrl, setWebsiteUrl] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      
      // First fetch all requests
      const { data: requestsData, error: requestsError } = await supabase
        .from('website_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (requestsError) {
        console.error('Error fetching requests:', requestsError);
        toast.error('Failed to load requests');
        return;
      }

      // Then fetch all user profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('user_profiles')
        .select('id, email, name');
      
      if (profilesError) {
        console.error('Error fetching user profiles:', profilesError);
        toast.error('Failed to load user data');
        return;
      }
      
      // Map user data to requests
      const profileMap = new Map();
      profilesData?.forEach(profile => {
        profileMap.set(profile.id, profile);
      });
      
      // Combine the data
      const transformedData = requestsData.map(request => {
        const userProfile = profileMap.get(request.user_id) || {};
        return {
          ...request,
          user_email: userProfile.email || 'Unknown email',
          user_name: userProfile.name || 'Unknown user'
        };
      });
      
      setRequests(transformedData as WebsiteRequest[]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchSupportRequests = async () => {
    try {
      setLoadingSupport(true);
      
      // Placeholder for support requests - in a real app, this would fetch from a support_requests table
      // For now, we're simulating this with empty data
      const mockSupportRequests = [];
      
      setSupportRequests(mockSupportRequests);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred loading support requests');
    } finally {
      setLoadingSupport(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchSupportRequests();
  }, []);

  const handleStatusChange = async (requestId: string, newStatus: RequestStatus) => {
    if (newStatus === "completed") {
      if (selectedRequest) {
        setShowCompletionDialog(true);
      }
      return;
    }

    try {
      setUpdatingStatus(true);
      
      const { error } = await supabase
        .from('website_requests')
        .update({ 
          status: newStatus,
          admin_notes: adminNotes || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);
      
      if (error) {
        console.error('Error updating request status:', error);
        toast.error('Failed to update request status');
        return;
      }
      
      toast.success(`Request status updated to ${newStatus === 'in_progress' ? 'Accepted, In Progress' : newStatus}`);
      setSelectedRequest(null);
      setAdminNotes('');
      fetchRequests();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleCompleteRequest = async () => {
    if (!selectedRequest || !websiteUrl.trim()) {
      toast.error("Please provide the website URL");
      return;
    }

    try {
      setUpdatingStatus(true);
      
      const { error: requestError } = await supabase
        .from('website_requests')
        .update({ 
          status: "completed",
          admin_notes: adminNotes || null,
          website_type: websiteType,
          website_url: websiteUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedRequest.id);
      
      if (requestError) {
        console.error('Error completing request:', requestError);
        toast.error('Failed to complete request');
        return;
      }
      
      // Also update the user profile with the website URL
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ 
          website_url: websiteUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedRequest.user_id);
      
      if (profileError) {
        console.error('Error updating user profile:', profileError);
        toast.error('Updated request but failed to update user profile');
      }
      
      toast.success("Request marked as completed with website details");
      setSelectedRequest(null);
      setAdminNotes('');
      setShowCompletionDialog(false);
      setWebsiteType("one_time");
      setWebsiteUrl('');
      fetchRequests();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredRequests = requests.filter(req => {
    const searchLower = searchTerm.toLowerCase();
    return (
      req.template_name.toLowerCase().includes(searchLower) ||
      req.request_details.toLowerCase().includes(searchLower) ||
      req.status.toLowerCase().includes(searchLower) ||
      (req.user_email && req.user_email.toLowerCase().includes(searchLower)) ||
      (req.user_name && req.user_name.toLowerCase().includes(searchLower))
    );
  });

  const statusIcons = {
    pending: <Clock className="w-5 h-5 text-yellow-500" />,
    in_progress: <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />,
    completed: <CheckCircle className="w-5 h-5 text-green-500" />,
    rejected: <XCircle className="w-5 h-5 text-red-500" />
  };

  const statusLabels = {
    pending: "Pending Review",
    in_progress: "Accepted, In Progress",
    completed: "Completed",
    rejected: "Rejected"
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website Request Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="requests">Website Requests</TabsTrigger>
            <TabsTrigger value="support">Add-on Support Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests">
            <div className="flex items-center mb-4">
              <Search className="w-4 h-4 mr-2 text-gray-400" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            {loading ? (
              <div className="text-center py-4">Loading requests...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.user_name || 'Unknown'}</p>
                            <p className="text-sm text-gray-400">{request.user_email || 'No email'}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.template_name} ({request.template_style})</TableCell>
                        <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {statusIcons[request.status]}
                            <span className="text-sm font-medium">{statusLabels[request.status]}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedRequest(request);
                              setAdminNotes(request.admin_notes || '');
                              setWebsiteType(request.website_type || "one_time");
                              setWebsiteUrl(request.website_url || '');
                            }}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          
          <TabsContent value="support">
            <h3 className="text-lg font-medium mb-4">Add-on Feature Requests</h3>
            
            {loadingSupport ? (
              <div className="text-center py-4">Loading support requests...</div>
            ) : supportRequests.length === 0 ? (
              <Card className="bg-muted/30">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No add-on support requests found.</p>
                  <p className="text-sm text-muted-foreground mt-1">When users request additional features for their websites, they will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Feature Requested</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* This will be populated when we have actual support request data */}
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No support requests available
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>

        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Review Request</h3>
              
              <div className="grid gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-400">User</label>
                  <p>{selectedRequest.user_name || 'Unknown'} ({selectedRequest.user_email || 'No email'})</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Template</label>
                  <p>{selectedRequest.template_name} ({selectedRequest.template_style})</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Request Details</label>
                  <div className="bg-gray-800/50 p-3 rounded-md mt-1 whitespace-pre-line">
                    {selectedRequest.request_details}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Current Status</label>
                  <div className="flex items-center gap-1 mt-1">
                    {statusIcons[selectedRequest.status]}
                    <span>{statusLabels[selectedRequest.status]}</span>
                  </div>
                </div>

                {selectedRequest.status === "completed" && selectedRequest.website_url && (
                  <WebsiteCompletionDetails 
                    websiteType={selectedRequest.website_type || "one_time"} 
                    websiteUrl={selectedRequest.website_url} 
                  />
                )}
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Admin Notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full h-24 mt-1 bg-gray-800 border border-gray-700 rounded-md p-2"
                    placeholder="Add notes for the user about this request..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Update Status</label>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleStatusChange(selectedRequest.id, 'in_progress')}
                      disabled={updatingStatus}
                      className="flex-1"
                    >
                      Mark Accepted, In Progress
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={() => handleStatusChange(selectedRequest.id, 'completed')}
                      disabled={updatingStatus}
                      className="flex-1"
                    >
                      Mark Completed
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                      disabled={updatingStatus}
                      className="flex-1"
                    >
                      Reject Request
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedRequest(null);
                    setAdminNotes('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleStatusChange(selectedRequest.id, selectedRequest.status)}
                  disabled={updatingStatus}
                >
                  Save Notes Only
                </Button>
              </div>
            </div>
          </div>
        )}

        <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Website Request</DialogTitle>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div>
                <Label>Website Delivery Type</Label>
                <RadioGroup 
                  value={websiteType} 
                  onValueChange={(value) => setWebsiteType(value as "one_time" | "subscription")}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one_time" id="one_time" />
                    <Label htmlFor="one_time">One-time Payment (Google Drive Link)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="subscription" id="subscription" />
                    <Label htmlFor="subscription">Subscription-based (Website URL)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="website-url">
                  {websiteType === "one_time" ? "Google Drive Link" : "Website URL"}
                </Label>
                <Input
                  id="website-url"
                  className="mt-1"
                  placeholder={websiteType === "one_time" ? "Paste Google Drive link here" : "Enter the website URL"}
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCompletionDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCompleteRequest}
                disabled={updatingStatus || !websiteUrl.trim()}
              >
                Complete Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
