
import React from 'react';
import { X, RefreshCw, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TemplatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateName: string;
  previewUrl: string;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  open,
  onOpenChange,
  templateName,
  previewUrl,
}) => {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenExternal = () => {
    window.open(previewUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0">
        <DialogHeader className="p-4 flex flex-row items-center justify-between">
          <DialogTitle>Previewing: {templateName}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh} title="Refresh preview">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleOpenExternal} title="Open in new tab">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <DialogClose className="h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <iframe 
            key={refreshKey}
            src={previewUrl} 
            className="w-full h-[80vh] border-none" 
            title="Template Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
