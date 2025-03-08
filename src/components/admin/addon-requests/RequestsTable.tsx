
import { AddonRequest } from '@/types/addon-requests';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getStatusBadge, formatDate } from './status-utils';

interface RequestsTableProps {
  loading: boolean;
  addonRequests: AddonRequest[];
  selectedStatus: string;
  onViewDetails: (request: AddonRequest) => void;
}

export const RequestsTable = ({ 
  loading, 
  addonRequests, 
  selectedStatus, 
  onViewDetails 
}: RequestsTableProps) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2" />
        <p>Loading requests...</p>
      </div>
    );
  }

  return (
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
        {addonRequests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              No {selectedStatus} add-on requests found
            </TableCell>
          </TableRow>
        ) : (
          addonRequests.map((request) => (
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
                  onClick={() => onViewDetails(request)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
