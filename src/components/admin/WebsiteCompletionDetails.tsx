
import { useState } from 'react';
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WebsiteCompletionDetailsProps {
  selectedRequest: any;
  onClose: () => void;
  onStatusChange: () => void;
}

export const WebsiteCompletionDetails = ({ 
  selectedRequest, 
  onClose, 
  onStatusChange 
}: WebsiteCompletionDetailsProps) => {
  const [adminNotes, setAdminNotes] = useState(selectedRequest?.admin_notes || '');
  const [websiteUrl, setWebsiteUrl] = useState(selectedRequest?.website_url || '');
  const [websiteType, setWebsiteType] = useState<'one_time' | 'subscription'>(
    selectedRequest?.website_type || 'one_time'
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedRequest) return;

    try {
      setIsUpdating(true);
      
      const updates = {
        status: newStatus,
        admin_notes: adminNotes,
        website_url: newStatus === 'completed' ? websiteUrl : selectedRequest.website_url,
        website_type: newStatus === 'completed' ? websiteType : selectedRequest.website_type,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('website_requests')
        .update(updates)
        .eq('id', selectedRequest.id);

      if (error) {
        console.error('Error updating website request:', error);
        toast.error('Failed to update request status');
        return;
      }

      toast.success(`Request marked as ${newStatus}`);
      onStatusChange();
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
          <DialogTitle>Website Request Details</DialogTitle>
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
              <h3 className="font-medium text-gray-300">Template</h3>
              <p>{selectedRequest.template_name}</p>
              <p className="text-sm text-gray-400">{selectedRequest.website_type || 'One-time'}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-300">Status</h3>
              <div className="mt-1">
                {selectedRequest.status === 'pending' && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-500">Pending</span>
                )}
                {selectedRequest.status === 'in_progress' && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-500">In Progress</span>
                )}
                {selectedRequest.status === 'completed' && (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">Completed</span>
                )}
                {selectedRequest.status === 'rejected' && (
                  <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-500">Rejected</span>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-300 mb-2">Request Details</h3>
            <div className="p-3 border border-gray-700 rounded-md bg-gray-800">
              <p className="whitespace-pre-wrap">{selectedRequest.request_details}</p>
            </div>
          </div>
          
          {/* Show website URL and type fields if marking as completed */}
          {selectedRequest.status !== 'completed' && (
            <div>
              <h3 className="font-medium text-gray-300 mb-2">Complete Website Information</h3>
              <div className="grid grid-cols-1 gap-4 mb-2">
                <div>
                  <label htmlFor="website-url" className="text-sm text-gray-300 mb-1 block">
                    Website URL
                  </label>
                  <input
                    id="website-url"
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="website-type" className="text-sm text-gray-300 mb-1 block">
                    Website Type
                  </label>
                  <select
                    id="website-type"
                    value={websiteType}
                    onChange={(e) => setWebsiteType(e.target.value as 'one_time' | 'subscription')}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                  >
                    <option value="one_time">One-time Payment</option>
                    <option value="subscription">Subscription</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Display completed website details if status is completed */}
          {selectedRequest.status === 'completed' && selectedRequest.website_url && (
            <div className="bg-primary/10 text-primary-foreground p-3 rounded-md">
              <h4 className="font-medium mb-1">
                {selectedRequest.website_type === 'one_time' 
                  ? 'Completed Website (One-time Payment)' 
                  : 'Completed Website (Subscription)'}
              </h4>
              <div className="flex items-start gap-2">
                <div className="flex-1 text-sm break-all">
                  {selectedRequest.website_url}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => window.open(selectedRequest.website_url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open
                </Button>
              </div>
            </div>
          )}
          
          <div>
            <h3 className="font-medium text-gray-300 mb-2">Admin Notes</h3>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes visible to both user and admins"
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
                onClick={() => handleUpdateStatus('in_progress')}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Start Working'}
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
          
          {selectedRequest.status === 'in_progress' && (
            <Button 
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleUpdateStatus('completed')}
              disabled={isUpdating || !websiteUrl}
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
