
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
import { ChevronRight, AlertCircle } from "lucide-react";

const ecommerceTypes = [
  { value: "dropshipping", label: "Dropshipping" },
  { value: "clothing", label: "Clothing" },
  { value: "tech", label: "Tech Store" },
  { value: "bike", label: "Bike Shop" },
  { value: "other", label: "None of the Above" }
];

const ECommerceRequestForm = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    storeName: "",
    storeNiche: "",
    storeType: "",
    productDescription: "",
    shippingPreference: "",
    paymentPreference: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
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
        localStorage.setItem('pendingEcommerceRequest', JSON.stringify({
          templateId,
          formData
        }));
        setIsAuthModalOpen(true);
        return;
      }
      
      // Get template details
      const templates = await fetchEcommerceTemplates();
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
          template_style: "e-commerce",
          website_type: "e-commerce",
          request_details: `
## E-commerce Website Request

### Store Information
- Store Name: ${formData.storeName}
- Store Niche: ${formData.storeNiche}
- Store Type: ${formData.storeType}

### Product Information
${formData.productDescription}

### Shipping & Payment
- Shipping Preference: ${formData.shippingPreference}
- Payment Preference: ${formData.paymentPreference}

### Contact Information
- Email: ${formData.contactEmail}
- Phone: ${formData.contactPhone}
- Address: ${formData.address}

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
      
      toast.success("Your e-commerce website request has been submitted!");
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchEcommerceTemplates = () => {
    // This would typically be a database call, but we'll use static data for now
    return Promise.resolve([
      {
        id: 1,
        name: "E-commerce Basic",
        description: "Simple, clean design for small online stores",
      },
      {
        id: 2,
        name: "E-commerce Fashion",
        description: "Elegant design for clothing and fashion stores",
      },
      {
        id: 3,
        name: "E-commerce Tech",
        description: "Modern design for tech and gadget stores",
      },
    ]);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Create Your E-commerce Website</h1>
        <p className="text-gray-400 mb-8">Please provide the information needed for your online store</p>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Store Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="storeName">Store Name *</Label>
                  <Input 
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    placeholder="Your Store Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="storeNiche">Store Niche *</Label>
                  <Input
                    id="storeNiche"
                    name="storeNiche"
                    value={formData.storeNiche}
                    onChange={handleInputChange}
                    placeholder="e.g. Fashion, Electronics, Home Goods"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="storeType">Store Type *</Label>
                <Select
                  value={formData.storeType}
                  onValueChange={(value) => handleSelectChange("storeType", value)}
                >
                  <SelectTrigger id="storeType">
                    <SelectValue placeholder="Select a store type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ecommerceTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Information</h2>
              <div>
                <Label htmlFor="productDescription">Products Description *</Label>
                <Textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the types of products you plan to sell, their price range, and any special features or categories"
                  className="min-h-[150px]"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Shipping & Payment</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="shippingPreference">Shipping Preference *</Label>
                  <Input
                    id="shippingPreference"
                    name="shippingPreference"
                    value={formData.shippingPreference}
                    onChange={handleInputChange}
                    placeholder="e.g. Domestic only, International, Free shipping options"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="paymentPreference">Payment Preference *</Label>
                  <Input
                    id="paymentPreference"
                    name="paymentPreference"
                    value={formData.paymentPreference}
                    onChange={handleInputChange}
                    placeholder="e.g. Credit Card, PayPal, Apple Pay"
                    required
                  />
                </div>
              </div>
              
              <div className="bg-amber-900/20 border border-amber-600/30 rounded-md p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-amber-200">
                  For e-commerce websites, we will contact you via your phone number to discuss payment setup and Stripe integration details.
                </p>
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
                    placeholder="contact@yourstore.com"
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
                    placeholder="https://facebook.com/yourstore"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram URL (Optional)</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/yourstore"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL (Optional)</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/yourstore"
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

export default ECommerceRequestForm;
