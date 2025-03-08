
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WebsiteCompletionDisplayProps {
  websiteType: 'one_time' | 'subscription';
  websiteUrl: string;
}

export const WebsiteCompletionDisplay = ({ 
  websiteType, 
  websiteUrl 
}: WebsiteCompletionDisplayProps) => {
  return (
    <div className="bg-primary/10 text-primary-foreground p-3 rounded-md">
      <h4 className="font-medium mb-1">
        {websiteType === 'one_time' 
          ? 'Completed Website (One-time Payment)' 
          : 'Completed Website (Subscription)'}
      </h4>
      <div className="flex items-start gap-2">
        <div className="flex-1 text-sm break-all">
          {websiteUrl}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0"
          onClick={() => window.open(websiteUrl, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          Open
        </Button>
      </div>
    </div>
  );
};
