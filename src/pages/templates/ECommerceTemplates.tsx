
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle } from "lucide-react";
import { TemplatePreviewModal } from "@/components/templates/TemplatePreviewModal";

const ecommerceTemplates = [
  {
    id: 1,
    name: "E-commerce Basic",
    description: "Simple, clean design for small online stores",
    image: "https://placehold.co/600x400/808080/FFFFFF/?text=E-commerce+Basic",
    previewUrl: "https://kzmgi522ped7f70ydq3a.lite.vusercontent.net"
  },
  {
    id: 2,
    name: "E-commerce Fashion",
    description: "Elegant design for clothing and fashion stores",
    image: "https://placehold.co/600x400/808080/FFFFFF/?text=E-commerce+Fashion",
    previewUrl: "https://kzmgi522ped7f70ydq3a.lite.vusercontent.net"
  },
  {
    id: 3,
    name: "E-commerce Tech",
    description: "Modern design for tech and gadget stores",
    image: "https://placehold.co/600x400/808080/FFFFFF/?text=E-commerce+Tech",
    previewUrl: "https://kzmgi522ped7f70ydq3a.lite.vusercontent.net"
  },
];

const ECommerceTemplates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplateName, setPreviewTemplateName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
    navigate(`/request/e-commerce/${templateId}`);
  };

  const handlePreviewTemplate = (templateName: string, previewUrl: string) => {
    setPreviewTemplateName(templateName);
    setPreviewUrl(previewUrl);
    setIsPreviewOpen(true);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">E-commerce Website Templates</h1>
            <p className="text-gray-400 mt-2">Select a template for your online store</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ecommerceTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden border border-gray-800 rounded-lg">
              <div className="relative h-48 bg-gray-800">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreviewTemplate(template.name, template.previewUrl)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                  
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "secondary"}
                    size="sm"
                    onClick={() => handleTemplateSelect(template.id)}
                    className="flex items-center gap-1"
                  >
                    {selectedTemplate === template.id && (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    )}
                    Select
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <TemplatePreviewModal
          open={isPreviewOpen} 
          onOpenChange={setIsPreviewOpen}
          templateName={previewTemplateName}
          previewUrl={previewUrl}
        />
      </div>
    </MainLayout>
  );
};

export default ECommerceTemplates;
