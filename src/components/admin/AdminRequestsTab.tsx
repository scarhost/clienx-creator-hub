
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
}

export const AdminRequestsTab = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

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

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (requestId: string, newStatus: RequestStatus) => {
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
      
      toast.success(`Request status updated to ${newStatus}`);
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
    in_progress: "In Progress",
    completed: "Completed",
    rejected: "Rejected"
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website Update Requests</CardTitle>
        <div className="flex items-center mt-4">
          <Search className="w-4 h-4 mr-2 text-gray-400" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
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
                      Mark In Progress
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
      </CardContent>
    </Card>
  );
};
