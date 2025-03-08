
import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthModal } from "@/components/templates/AuthModal";
import { ChevronRight } from "lucide-react";

const businessTypes = [
  { value: "spa", label: "Spa" },
  { value: "bike-shop", label: "Bike Shop" },
  { value: "salon", label: "Hair Salon/Barbershop" },
  { value: "tattoo", label: "Tattoo Parlor" },
  { value: "other", label: "None of the Above" }
];

const BusinessRequestForm = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    businessType: "",
    overview: "",
    services: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    businessHours: "",
    facebook: "",
    instagram: "",
    twitter: "",
    logoPreference: "",
    colorPreference: "",
  });
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    
    checkSession();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (!session) {
        localStorage.setItem('pendingBusinessRequest', JSON.stringify({
          templateId,
          formData
        }));
        setIsAuthModalOpen(true);
        return;
      }
      
      // Get template details
      const templates = await fetchBusinessTemplates();
      const selectedTemplate = templates.find(t => t.id === parseInt(templateId || '0'));
      
      if (!selectedTemplate) {
        toast.error("Template not found");
        return;
      }
      
      const { error } = await supabase
        .from("website_requests")
        .insert({
          user_id: session.user.id,
          template_id: parseInt(templateId || '0'),
          template_name: selectedTemplate.name,
          template_style: "business-showcase",
          website_type: "business-showcase",
          request_details: `
## Business Showcase Website Request

### Business Information
- Business Name: ${formData.businessName}
- Industry: ${formData.industry}
- Business Type: ${formData.businessType}

### Business Details
${formData.overview}

### Services or Products
${formData.services}

### Contact Information
- Email: ${formData.contactEmail}
- Phone: ${formData.contactPhone}
- Address: ${formData.address}
- Business Hours: ${formData.businessHours}

### Social Media
- Facebook: ${formData.facebook}
- Instagram: ${formData.instagram}
- Twitter: ${formData.twitter}

### Branding
- Logo Preference: ${formData.logoPreference}
- Color Preference: ${formData.colorPreference}
          `.trim(),
          status: "pending"
        });
        
      if (error) throw error;
      
      toast.success("Your business website request has been submitted!");
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBusinessTemplates = () => {
    // This would typically be a database call, but we'll use static data for now
    return Promise.resolve([
      {
        id: 1,
        name: "Business Pro",
        description: "Professional design for established businesses",
      },
      {
        id: 2,
        name: "Small Business",
        description: "Perfect for local businesses and startups",
      },
      {
        id: 3,
        name: "Service Provider",
        description: "Ideal for service-based businesses",
      },
    ]);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Business Website</h1>
        <p className="text-gray-400 mb-8">Please provide the information needed for your business showcase website</p>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Business Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input 
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Your Business Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="e.g. Retail, Healthcare, Technology"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => handleSelectChange("businessType", value)}
                >
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Select a business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Business Details</h2>
              <div>
                <Label htmlFor="overview">Company Overview / About Us *</Label>
                <Textarea
                  id="overview"
                  name="overview"
                  value={formData.overview}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of your business, its history, mission, and values"
                  className="min-h-[150px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="services">Services or Products Offered *</Label>
                <Textarea
                  id="services"
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  placeholder="List your main services or products (one per line)"
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="contactEmail">Business Email *</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="contact@yourbusiness.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Business Phone *</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Business Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St, City, State, ZIP"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="businessHours">Business Hours (Optional)</Label>
                  <Input
                    id="businessHours"
                    name="businessHours"
                    value={formData.businessHours}
                    onChange={handleInputChange}
                    placeholder="e.g. Mon-Fri: 9am-5pm, Sat: 10am-3pm"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Social Media & Branding</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="facebook">Facebook URL (Optional)</Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/yourbusiness"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram URL (Optional)</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/yourbusiness"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL (Optional)</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/yourbusiness"
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="logoPreference">Logo Preference (Optional)</Label>
                  <Input
                    id="logoPreference"
                    name="logoPreference"
                    value={formData.logoPreference}
                    onChange={handleInputChange}
                    placeholder="Describe your logo or upload it later"
                  />
                </div>
                <div>
                  <Label htmlFor="colorPreference">Color Preference (Optional)</Label>
                  <Input
                    id="colorPreference"
                    name="colorPreference"
                    value={formData.colorPreference}
                    onChange={handleInputChange}
                    placeholder="e.g. Blue and White, Company Brand Colors"
                  />
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
        </Card>
        
        <AuthModal 
          open={isAuthModalOpen} 
          onOpenChange={setIsAuthModalOpen}
          onSuccess={() => {
            // After authentication, submit the form automatically
            setTimeout(() => {
              handleSubmit(new Event('submit') as any);
            }, 1000);
          }}
        />
      </div>
    </MainLayout>
  );
};

export default BusinessRequestForm;
