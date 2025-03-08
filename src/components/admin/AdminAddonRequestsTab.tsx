
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { AddonRequest } from '@/types/addon-requests';
import { RequestsTable } from './addon-requests/RequestsTable';
import { RequestDetailsDialog } from './addon-requests/RequestDetailsDialog';

export const AdminAddonRequestsTab = () => {
  const [addonRequests, setAddonRequests] = useState<AddonRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<AddonRequest | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('pending');

  const fetchAddonRequests = async (status = 'pending') => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('addon_requests' as any)
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

      setAddonRequests(data as unknown as AddonRequest[] || []);
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

  const handleViewDetails = (request: AddonRequest) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
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
            <RequestsTable 
              loading={loading}
              addonRequests={addonRequests}
              selectedStatus={selectedStatus}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
        </Tabs>

        <RequestDetailsDialog 
          selectedRequest={selectedRequest}
          onClose={handleCloseDetails}
          onStatusChange={() => fetchAddonRequests(selectedStatus)}
          selectedStatus={selectedStatus}
        />
      </CardContent>
    </Card>
  );
};
