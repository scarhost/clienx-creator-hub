
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TemplatePreviewModal } from "@/components/templates/TemplatePreviewModal";
import { AuthModal } from "@/components/templates/AuthModal";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { RequestForm } from "@/components/templates/RequestForm";

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
            <TemplateCard
              key={template.id}
              template={template}
              selectedTemplate={selectedTemplate}
              onSelect={handleTemplateSelect}
              onPreview={handlePreviewTemplate}
            />
          ))}
        </div>

        {selectedTemplate && (
          <RequestForm
            formData={formData}
            handleFormInput={handleFormInput}
            handleSubmitRequest={handleSubmitRequest}
            isSubmitting={isSubmitting}
          />
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
