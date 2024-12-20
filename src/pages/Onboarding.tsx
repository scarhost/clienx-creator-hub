import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, User, Briefcase } from "lucide-react";
import { toast } from "sonner";

const websiteTypes = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "Showcase your work and skills professionally",
    icon: Briefcase,
  },
  {
    id: "business",
    title: "Business Website",
    description: "Establish your business presence online",
    icon: Building2,
  },
  {
    id: "personal",
    title: "Personal Website",
    description: "Share your story and information",
    icon: User,
  },
];

const Onboarding = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelection = (typeId: string) => {
    setSelectedType(typeId);
    toast.success("Website type selected!");
    // Navigate to the information collection form
    navigate(`/onboarding/${typeId}/info`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
            Choose Your Website Type
          </h1>
          <p className="text-gray-400 text-center mb-12">
            Select the type of website that best fits your needs
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {websiteTypes.map((type) => (
              <Card
                key={type.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 ${
                  selectedType === type.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-gray-800 hover:border-primary/50"
                }`}
                onClick={() => handleSelection(type.id)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <type.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{type.title}</h3>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Onboarding;