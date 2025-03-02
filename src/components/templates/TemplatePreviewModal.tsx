
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogClose } from "@/components/ui/dialog";

interface TemplatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateName: string;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  open,
  onOpenChange,
  templateName,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh]">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>Previewing: {templateName}</DialogTitle>
          <DialogClose className="h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <iframe 
            src="/preview-template" 
            className="w-full h-[75vh] border-none" 
            title="Template Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
