
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PreBuiltWebsiteSupport = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [featureType, setFeatureType] = useState("");
  const [featureDetails, setFeatureDetails] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  
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
    setIsPaying(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsPaying(false);
      toast.success("Feature request submitted successfully!");
      setFeatureDetails("");
      setWebsiteUrl("");
    }, 1500);
  };
  
  return (
    <Card className="border border-gray-800">
      <CardContent className="pt-6">
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-3">
            We can help customize your existing website with new features or changes, 
            regardless of where it was built. Pricing depends on complexity.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Website URL</label>
            <Input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://your-website.com"
              required
            />
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
                <SelectValue placeholder="Select complexity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy ($20)</SelectItem>
                <SelectItem value="medium">Medium ($35)</SelectItem>
                <SelectItem value="complex">Complex ($50)</SelectItem>
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
              disabled={!websiteUrl || !featureType || !featureDetails || isPaying}
              className="w-full"
            >
              {isPaying ? (
                <>Processing Payment...</>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay ${getFeaturePrice()} & Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
