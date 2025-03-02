
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface TemplateCardProps {
  template: {
    id: number;
    name: string;
    description: string;
    style: string;
    image: string;
  };
  selectedTemplate: number | null;
  onSelect: (templateId: number) => void;
  onPreview: (templateName: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  selectedTemplate, 
  onSelect, 
  onPreview 
}) => {
  return (
    <Card 
      key={template.id} 
      className={`overflow-hidden transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
    >
      <div 
        className="aspect-video bg-gray-800 bg-center bg-cover cursor-pointer" 
        style={{ backgroundImage: `url(${template.image})` }}
        onClick={() => onPreview(template.name)}
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{template.description}</p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onPreview(template.name)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            variant={selectedTemplate === template.id ? "default" : "outline"}
            className="flex-1"
            onClick={() => onSelect(template.id)}
          >
            {selectedTemplate === template.id ? "Selected" : "Select Template"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
