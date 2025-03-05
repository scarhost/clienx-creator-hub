
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, HelpCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export const PreBuiltWebsiteSupport = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [featureType, setFeatureType] = useState("");
  const [featureDetails, setFeatureDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDocsDialog, setShowDocsDialog] = useState(false);
  
  // Get price based on feature complexity
  const getFeaturePrice = () => {
    switch (featureType) {
      case "easy":
        return 20;
      case "medium":
        return 35;
      case "complex":
        return 50;
      default:
        return 0;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate request submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Feature request submitted successfully! We'll review and provide a quote based on complexity.");
      setFeatureDetails("");
      setWebsiteUrl("");
      setFeatureType("");
    }, 1500);
  };
  
  return (
    <Card className="border border-gray-800">
      <CardContent className="pt-6">
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-3">
            We can help customize your existing website with new features or changes, 
            regardless of where it was built. Simply submit your request below and we'll review it.
            Pricing will depend on complexity (typically $20-$50).
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Google Docs Link</label>
            <div className="relative">
              <Input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://docs.google.com/document/d/..."
                required
                onClick={() => setShowDocsDialog(true)}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowDocsDialog(true)}
              >
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              Please share a Google Docs document with your website details and requirements
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Feature Complexity</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                      <HelpCircle className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[250px]">
                      Easy: Simple text/image changes<br />
                      Medium: New pages or form functionality<br />
                      Complex: Interactive features or integrations
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select value={featureType} onValueChange={setFeatureType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select expected complexity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy (approx. $20)</SelectItem>
                <SelectItem value="medium">Medium (approx. $35)</SelectItem>
                <SelectItem value="complex">Complex (approx. $50)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Feature Details</label>
            <Textarea 
              value={featureDetails}
              onChange={(e) => setFeatureDetails(e.target.value)}
              placeholder="Describe in detail what you'd like us to add or change on your existing website..."
              className="h-32"
              required
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit"
              disabled={!websiteUrl || !featureType || !featureDetails || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>Submitting Request...</>
              ) : (
                <>
                  Submit Request
                </>
              )}
            </Button>
            <p className="text-xs text-center mt-2 text-gray-400">
              There's no charge to submit a request. We'll review and provide a quote based on complexity.
            </p>
          </div>
        </form>
      </CardContent>

      <Dialog open={showDocsDialog} onOpenChange={setShowDocsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How to Share Google Docs</DialogTitle>
            <DialogDescription>
              Follow these steps to properly share your Google Docs document with us.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">1. Create a Google Doc</h3>
              <p className="text-sm text-gray-400">
                Create a new Google Docs document with all your website details, screenshots, and specific requirements.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">2. Set Sharing Permissions</h3>
              <p className="text-sm text-gray-400">
                Click "Share" in the top right, then change access to "Anyone with the link" and set to "Editor" so we can add comments.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">3. Copy and Share the Link</h3>
              <p className="text-sm text-gray-400">
                Copy the link from the sharing dialog and paste it in the field above.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="default">Got it</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
