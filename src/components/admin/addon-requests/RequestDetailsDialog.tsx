
import { useState } from 'react';
import { AddonRequest } from '@/types/addon-requests';
import { getStatusBadge } from './status-utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RequestDetailsDialogProps {
  selectedRequest: AddonRequest | null;
  onClose: () => void;
  onStatusChange: () => void;
  selectedStatus: string;
}

export const RequestDetailsDialog = ({ 
  selectedRequest, 
  onClose, 
  onStatusChange,
  selectedStatus 
}: RequestDetailsDialogProps) => {
  const [adminNotes, setAdminNotes] = useState(selectedRequest?.admin_notes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedRequest) return;

    try {
      setIsUpdating(true);
      
      const updates = {
        status: newStatus,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('addon_requests' as any)
        .update(updates)
        .eq('id', selectedRequest.id);

      if (error) {
        console.error('Error updating addon request:', error);
        toast.error('Failed to update request status');
        return;
      }

      toast.success(`Request marked as ${newStatus}`);
      onStatusChange();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!selectedRequest) return null;

  return (
    <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && onClose()}>
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
            onClick={onClose}
            disabled={isUpdating}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
