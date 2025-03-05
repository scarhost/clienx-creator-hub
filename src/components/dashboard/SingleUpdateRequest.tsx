
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock } from "lucide-react";
import { toast } from "sonner";

interface SingleUpdateRequestProps {
  planType: 'starter' | 'standard' | 'pro-ecommerce';
}

export const SingleUpdateRequest: React.FC<SingleUpdateRequestProps> = ({ planType }) => {
  const [selectedWebsite, setSelectedWebsite] = useState<string>("");
  const [requestDetails, setRequestDetails] = useState<string>("");
  const [isPaying, setIsPaying] = useState(false);
  
  // Get update price based on plan - all plans have the same price for single updates
  const getUpdatePrice = () => {
    return 5; // $5 for all plans
  };
  
  const getUpdateLimit = () => {
    switch (planType) {
      case 'starter':
        return 2;
      case 'standard':
        return 10;
      case 'pro-ecommerce':
        return 10;
      default:
        return 2;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsPaying(false);
      toast.success("Update request submitted successfully!");
      setRequestDetails("");
      setSelectedWebsite("");
    }, 1500);
  };
  
  return (
    <Card className="border border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Single Update Request</CardTitle>
            <CardDescription>
              Pay-as-you-go for individual website changes
            </CardDescription>
          </div>
          <Badge variant="secondary" className="px-2 py-1 bg-primary/20 text-primary-foreground">
            ${getUpdatePrice()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Website</label>
            <Select value={selectedWebsite} onValueChange={setSelectedWebsite}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a website" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website1">Business Pro - Created Feb 20, 2024</SelectItem>
                <SelectItem value="website2">Portfolio Minimal - Created Mar 15, 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Update Details</label>
            <Textarea 
              value={requestDetails}
              onChange={(e) => setRequestDetails(e.target.value)}
              placeholder="Describe the exact changes you need for your website..."
              className="h-24"
            />
          </div>
          
          <div className="pt-2">
            <p className="text-xs text-gray-400 mb-3">
              <Clock className="w-3 h-3 inline mr-1" />
              Updates are typically completed within 24-48 hours
            </p>
            <p className="text-xs text-gray-400">
              Your plan includes {getUpdateLimit()} updates per month. Additional updates are ${getUpdatePrice()} each.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          disabled={!selectedWebsite || !requestDetails || isPaying}
          onClick={handleSubmit}
          className="w-full"
        >
          {isPaying ? (
            <>Processing Payment...</>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay ${getUpdatePrice()} & Submit Request
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
