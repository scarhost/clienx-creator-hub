
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, ChevronRight, Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TemplatePreviewModal } from "@/components/templates/TemplatePreviewModal";
import { AuthModal } from "@/components/templates/AuthModal";

const Templates = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    requestDetails: "",
    preferredColor: "",
    deadline: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplateName, setPreviewTemplateName] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const styles = [
    { id: "all", name: "All Styles" },
    { id: "modern", name: "Modern" },
    { id: "minimal", name: "Minimal" },
    { id: "classic", name: "Classic" },
    { id: "bold", name: "Bold" },
  ];

  const templates = [
    {
      id: 1,
      name: "Business Pro",
      description: "Perfect for small businesses and startups",
      style: "modern",
      image: "https://placehold.co/600x400/808080/FFFFFF/?text=Business+Pro"
    },
    {
      id: 2,
      name: "Portfolio Minimal",
      description: "Showcase your work with elegant simplicity",
      style: "minimal",
      image: "https://placehold.co/600x400/808080/FFFFFF/?text=Portfolio+Minimal"
    },
    {
      id: 3,
      name: "Creative Agency",
      description: "Bold and colorful for creative professionals",
      style: "bold",
      image: "https://placehold.co/600x400/808080/FFFFFF/?text=Creative+Agency"
    },
    {
      id: 4,
      name: "Professional Resume",
      description: "A polished template for job seekers",
      style: "classic",
      image: "https://placehold.co/600x400/808080/FFFFFF/?text=Professional+Resume"
    },
    {
      id: 5,
      name: "E-commerce Basic",
      description: "Start selling products online immediately",
      style: "modern",
      image: "https://placehold.co/600x400/808080/FFFFFF/?text=E-commerce+Basic"
    },
    {
      id: 6,
      name: "Blog Standard",
      description: "Perfect template for content creators",
      style: "classic",
      image: "https://placehold.co/600x400/808080/FFFFFF/?text=Blog+Standard"
    },
  ];

  // Check authentication status
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setLoadingSession(false);
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const filteredTemplates = selectedStyle === "all" 
    ? templates 
    : templates.filter(template => template.style === selectedStyle);

  const handleTemplateSelect = (templateId: number) => {
    // If the user isn't signed in, show the auth modal
    if (!session) {
      setSelectedTemplate(templateId);
      setIsAuthModalOpen(true);
      return;
    }
    
    setSelectedTemplate(templateId === selectedTemplate ? null : templateId);
  };

  const handleFormInput = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreviewTemplate = (templateName: string) => {
    setPreviewTemplateName(templateName);
    setIsPreviewOpen(true);
  };

  const handleSubmitRequest = async () => {
    try {
      setIsSubmitting(true);
      
      if (!session?.user) {
        toast.error("Please sign in to submit your request");
        setIsAuthModalOpen(true);
        return;
      }

      if (!selectedTemplate) {
        toast.error("Please select a template");
        return;
      }

      if (!formData.fullName || !formData.email || !formData.phone || !formData.requestDetails) {
        toast.error("Please fill in all required fields");
        return;
      }

      const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

      const { error } = await supabase
        .from("website_requests")
        .insert({
          user_id: session.user.id,
          template_id: selectedTemplate,
          template_name: selectedTemplateData?.name,
          template_style: selectedTemplateData?.style,
          request_details: `
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.companyName}
Preferred Colors: ${formData.preferredColor}
Deadline: ${formData.deadline}
Budget: ${formData.budget}

Custom Requirements:
${formData.requestDetails}
          `.trim(),
          status: "pending"
        });

      if (error) throw error;

      toast.success("Your website request has been submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        requestDetails: "",
        preferredColor: "",
        deadline: "",
        budget: ""
      });
      setSelectedTemplate(null);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingSession) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Choose Your Template</h1>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter by Style:</span>
            <select 
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="bg-background border border-gray-700 rounded-lg px-3 py-1"
            >
              {styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`overflow-hidden transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
            >
              <div 
                className="aspect-video bg-gray-800 bg-center bg-cover cursor-pointer" 
                style={{ backgroundImage: `url(${template.image})` }}
                onClick={() => handlePreviewTemplate(template.name)}
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handlePreviewTemplate(template.name)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    {selectedTemplate === template.id ? "Selected" : "Select Template"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
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
        )}

        <TemplatePreviewModal 
          open={isPreviewOpen} 
          onOpenChange={setIsPreviewOpen}
          templateName={previewTemplateName}
        />

        <AuthModal 
          open={isAuthModalOpen} 
          onOpenChange={setIsAuthModalOpen}
          onSuccess={() => {
            setIsAuthModalOpen(false);
            // Reselect the template after successful authentication
            if (selectedTemplate) {
              setSelectedTemplate(selectedTemplate);
            }
          }}
        />
      </div>
    </MainLayout>
  );
};

export default Templates;
