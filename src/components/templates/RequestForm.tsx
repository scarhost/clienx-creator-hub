
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RequestFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    requestDetails: string;
    preferredColor: string;
    deadline: string;
    budget: string;
  };
  handleFormInput: (field: string, value: string) => void;
  handleSubmitRequest: () => void;
  isSubmitting: boolean;
}

export const RequestForm: React.FC<RequestFormProps> = ({
  formData,
  handleFormInput,
  handleSubmitRequest,
  isSubmitting
}) => {
  return (
    <Card className="mt-10 border border-gray-700">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Customize Your Request</h2>
        <p className="text-gray-400 mb-6">
          Please provide your details and requirements for the website customization:
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleFormInput("fullName", e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormInput("email", e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFormInput("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleFormInput("companyName", e.target.value)}
                placeholder="Your Company Ltd."
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="preferredColor">Preferred Color Scheme (Optional)</Label>
              <Input
                id="preferredColor"
                value={formData.preferredColor}
                onChange={(e) => handleFormInput("preferredColor", e.target.value)}
                placeholder="e.g., Blue and White"
              />
            </div>
            <div>
              <Label htmlFor="deadline">Expected Deadline (Optional)</Label>
              <Input
                id="deadline"
                value={formData.deadline}
                onChange={(e) => handleFormInput("deadline", e.target.value)}
                placeholder="e.g., 2 weeks"
              />
            </div>
            <div>
              <Label htmlFor="budget">Budget Range (Optional)</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleFormInput("budget", e.target.value)}
                placeholder="e.g., $500-1000"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="requestDetails">Custom Requirements *</Label>
            <Textarea
              id="requestDetails"
              value={formData.requestDetails}
              onChange={(e) => handleFormInput("requestDetails", e.target.value)}
              placeholder="Please describe any specific features, functionalities, or design elements you'd like to include..."
              className="min-h-[150px] mb-4"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleSubmitRequest} 
            disabled={isSubmitting || !formData.fullName || !formData.email || !formData.phone || !formData.requestDetails} 
            className="flex items-center"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
