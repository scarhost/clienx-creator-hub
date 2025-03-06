
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UpdateRequestProps {
  userPlan: 'starter' | 'standard' | 'pro-ecommerce';
  creditsUsed: number;
  creditsTotal: number;
  onRequestSubmitted: () => void;
}

export const SingleUpdateRequest = ({ 
  userPlan, 
  creditsUsed, 
  creditsTotal,
  onRequestSubmitted 
}: UpdateRequestProps) => {
  const [requestDetails, setRequestDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const creditsRemaining = creditsTotal - creditsUsed;
  const isOutOfCredits = creditsRemaining <= 0;

  const getBadgeVariant = () => {
    if (creditsRemaining <= 0) return "destructive";
    if (creditsRemaining <= 2) return "secondary"; // Changed from "warning" to "secondary"
    return "default";
  };

  const handleSubmitRequest = async () => {
    if (isOutOfCredits) {
      toast.error("You've used all your request credits for this month. Please upgrade your plan or wait for next month's reset.");
      return;
    }

    if (!requestDetails.trim()) {
      toast.error("Please describe your update request");
      return;
    }

    try {
      setIsSubmitting(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be signed in to submit a request");
        return;
      }

      const { error } = await supabase
        .from('website_requests')
        .insert({
          user_id: session.user.id,
          template_id: 0, // Generic update request
          template_name: "Website Update",
          template_style: userPlan,
          request_details: requestDetails,
          status: "pending"
        });

      if (error) {
        console.error("Error submitting request:", error);
        toast.error("Failed to submit your request");
        return;
      }

      toast.success("Your update request has been submitted!");
      setRequestDetails("");
      onRequestSubmitted();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Submit a Website Update Request</CardTitle>
            <CardDescription>
              Use your monthly update credits to request changes to your website
            </CardDescription>
          </div>
          <Badge variant={getBadgeVariant()}>
            {creditsRemaining} credits remaining
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Describe the update you need for your website in detail..."
              value={requestDetails}
              onChange={(e) => setRequestDetails(e.target.value)}
              className="min-h-[150px]"
              disabled={isOutOfCredits || isSubmitting}
            />
          </div>

          {isOutOfCredits && (
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
              You've used all your update credits for this month. 
              <a href="/plans/selection" className="underline ml-1">
                Upgrade your plan
              </a> for more credits or wait for next month's reset.
            </div>
          )}

          <div className="bg-primary/10 text-primary-foreground px-4 py-3 rounded-md text-sm">
            <p className="font-medium mb-1">Your {userPlan} plan includes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                {creditsTotal} update credits per month 
                ({creditsUsed} used, {creditsRemaining} remaining)
              </li>
              <li>Each credit can be used for one update request</li>
              <li>Credits reset on the first day of each month</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmitRequest}
          disabled={isOutOfCredits || !requestDetails.trim() || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Update Request"}
        </Button>
      </CardFooter>
    </Card>
  );
};
