
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const AdminAddonRequestsTab = () => {
  const [addon_requests, setAddonRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAddonRequests = async (status = 'pending') => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('addon_requests')
        .select(`
          *,
          user_profiles:user_id (name, email, phone)
        `)
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching addon requests:', error);
        toast.error('Failed to load addon requests');
        return;
      }

      setAddonRequests(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddonRequests(selectedStatus);
  }, [selectedStatus]);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setAdminNotes(request.admin_notes || '');
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
    setAdminNotes('');
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      setIsUpdating(true);
      
      const updates = {
        status: newStatus,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('addon_requests')
        .update(updates)
        .eq('id', selectedRequest.id);

      if (error) {
        console.error('Error updating addon request:', error);
        toast.error('Failed to update request status');
        return;
      }

      toast.success(`Request marked as ${newStatus}`);
      fetchAddonRequests(selectedStatus);
      handleCloseDetails();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'accepted':
        return <Badge variant="default" className="bg-blue-500">Accepted, In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add-on Support Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStatus}>
            {loading ? (
              <div className="text-center py-8">
                <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2" />
                <p>Loading requests...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Request Type</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {addon_requests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No {selectedStatus} add-on requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    addon_requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.user_profiles?.name || 'Unknown'}</p>
                            <p className="text-sm text-gray-400">{request.user_profiles?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.addon_type}</TableCell>
                        <TableCell>{formatDate(request.created_at)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(request)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>

        {selectedRequest && (
          <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && handleCloseDetails()}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add-on Request Details</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-300">User</h3>
                    <p>{selectedRequest.user_profiles?.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-400">{selectedRequest.user_profiles?.email}</p>
                    <p className="text-sm text-gray-400">{selectedRequest.user_profiles?.phone || 'No phone'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-300">Request Type</h3>
                    <p>{selectedRequest.addon_type}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-300">Status</h3>
                    <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-300 mb-2">Request Details</h3>
                  <div className="p-3 border border-gray-700 rounded-md bg-gray-800">
                    <p className="whitespace-pre-wrap">{selectedRequest.request_details}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-300 mb-2">Admin Notes</h3>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes visible only to admins"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {selectedRequest.status === 'pending' && (
                  <>
                    <Button 
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleUpdateStatus('accepted')}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Accept Request'}
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleUpdateStatus('rejected')}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Reject Request'}
                    </Button>
                  </>
                )}
                
                {selectedRequest.status === 'accepted' && (
                  <Button 
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleUpdateStatus('completed')}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Mark as Completed'}
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  onClick={handleCloseDetails}
                  disabled={isUpdating}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};
