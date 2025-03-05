
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Info, Upload, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const PreBuiltWebsiteSupport = () => {
  const [selectedWebsite, setSelectedWebsite] = useState<string>("");
  const [requestDetails, setRequestDetails] = useState<string>("");
  const [googleDocsLink, setGoogleDocsLink] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Support request submitted successfully!");
      setRequestDetails("");
      setSelectedWebsite("");
      setGoogleDocsLink("");
    }, 1500);
  };
  
  return (
    <>
      <Card className="border border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Pre-Built Website Support</CardTitle>
              <CardDescription>
                Request support for your existing website (not built by us)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Website Type</label>
              <Select value={selectedWebsite} onValueChange={setSelectedWebsite}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your website platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wordpress">WordPress</SelectItem>
                  <SelectItem value="shopify">Shopify</SelectItem>
                  <SelectItem value="wix">Wix</SelectItem>
                  <SelectItem value="squarespace">Squarespace</SelectItem>
                  <SelectItem value="webflow">Webflow</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Details</label>
              <Textarea 
                value={requestDetails}
                onChange={(e) => setRequestDetails(e.target.value)}
                placeholder="Describe what you need help with on your website..."
                className="h-24"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Google Docs Link (optional)</label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  className="h-7 text-xs text-primary"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Info className="h-3 w-3 mr-1" />
                  How to share Google Docs?
                </Button>
              </div>
              <Input
                value={googleDocsLink}
                onChange={(e) => setGoogleDocsLink(e.target.value)}
                placeholder="https://docs.google.com/document/d/..."
              />
            </div>
            
            <div className="pt-2">
              <div className="rounded-md p-3 bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium mb-1">Pricing Information</p>
                <p className="text-xs text-gray-400">
                  • Submission is free - we'll assess your request and provide a quote
                </p>
                <p className="text-xs text-gray-400">
                  • Simple changes typically cost $20-30
                </p>
                <p className="text-xs text-gray-400">
                  • Complex features or customizations may cost $40-50
                </p>
                <p className="text-xs text-gray-400">
                  • You'll only pay if you approve our quote
                </p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            disabled={!selectedWebsite || !requestDetails || isSubmitting}
            onClick={handleSubmit}
            className="w-full"
          >
            {isSubmitting ? (
              <>Processing Submission...</>
            ) : (
              <>Submit Support Request</>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to Share Google Docs</DialogTitle>
            <DialogDescription>
              Follow these steps to create and share a Google Doc with your website details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">1. Create a Google Doc</h3>
              <p className="text-sm text-gray-400">
                Go to <a href="https://docs.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">docs.google.com</a> and create a new document
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">2. Add necessary information</h3>
              <p className="text-sm text-gray-400">
                Include your website URL, credentials (if needed), screenshots, and detailed instructions
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">3. Share your document</h3>
              <p className="text-sm text-gray-400">
                Click the "Share" button in the top right, then:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-400">
                <li>Change access to "Anyone with the link"</li>
                <li>Set permission to "Editor" if you want us to add comments</li>
                <li>Copy the link and paste it in the form</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
