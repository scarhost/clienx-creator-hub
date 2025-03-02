
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Templates = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [requestDetails, setRequestDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const filteredTemplates = selectedStyle === "all" 
    ? templates 
    : templates.filter(template => template.style === selectedStyle);

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId === selectedTemplate ? null : templateId);
  };

  const handleSubmitRequest = async () => {
    try {
      setIsSubmitting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        localStorage.setItem('pendingTemplateRequest', JSON.stringify({
          templateId: selectedTemplate,
          requestDetails
        }));
        toast.info("Please create an account to submit your request");
        navigate("/auth/signup");
        return;
      }

      if (!selectedTemplate) {
        toast.error("Please select a template");
        return;
      }

      if (!requestDetails.trim()) {
        toast.error("Please provide details about your request");
        return;
      }

      const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

      const { error } = await supabase.from("website_requests").insert({
        user_id: session.user.id,
        template_id: selectedTemplate,
        template_name: selectedTemplateData?.name,
        template_style: selectedTemplateData?.style,
        request_details: requestDetails,
        status: "pending"
      });

      if (error) throw error;

      toast.success("Your website request has been submitted successfully!");
      setRequestDetails("");
      setSelectedTemplate(null);
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div 
                className="aspect-video bg-gray-800 bg-center bg-cover" 
                style={{ backgroundImage: `url(${template.image})` }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {template.description}
                </p>
                <Button 
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  className="w-full"
                >
                  {selectedTemplate === template.id ? "Selected" : "Select Template"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <Card className="mt-10 border border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Customize Your Request</h2>
              <p className="text-gray-400 mb-4">
                Tell us what you'd like to change or customize in the template:
              </p>
              <Textarea
                value={requestDetails}
                onChange={(e) => setRequestDetails(e.target.value)}
                placeholder="Example: I'd like to have my business logo in the header, change the color scheme to blue, and add a contact form with 3 fields..."
                className="min-h-[150px] mb-4"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitRequest} 
                  disabled={isSubmitting || !requestDetails.trim()} 
                  className="flex items-center"
                >
                  Submit Request
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Templates;
