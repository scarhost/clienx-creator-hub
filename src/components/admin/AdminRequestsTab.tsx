
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebsiteCompletionDetails } from './WebsiteCompletionDetails';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminRequestsTab = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('pending');

  const fetchRequests = async (status = 'pending') => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_requests')
        .select(`
          *,
          user_profiles:user_id (name, email, phone)
        `)
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        toast.error('Failed to load website requests');
        return;
      }

      setRequests(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(selectedStatus);
  }, [selectedStatus]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const handleRequestStatusChange = () => {
    fetchRequests(selectedStatus);
    handleCloseDetails();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-500">Pending</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-500">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">Completed</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-500">Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-500">{status}</span>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedStatus} onValueChange={handleStatusChange} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
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
                    <TableHead>Website Type</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No {selectedStatus} website requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.user_profiles?.name || 'Unknown'}</p>
                            <p className="text-sm text-gray-400">{request.user_profiles?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.website_type || 'Unknown'}</TableCell>
                        <TableCell>{request.template_name}</TableCell>
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
          <WebsiteCompletionDetails
            selectedRequest={selectedRequest}
            onClose={handleCloseDetails}
            onStatusChange={handleRequestStatusChange}
          />
        )}
      </CardContent>
    </Card>
  );
};
