import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const Templates = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>("all");

  const styles = [
    { id: "all", name: "All Styles" },
    { id: "modern", name: "Modern" },
    { id: "minimal", name: "Minimal" },
    { id: "classic", name: "Classic" },
    { id: "bold", name: "Bold" },
  ];

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
          {/* Placeholder templates - replace with actual templates */}
          {[1, 2, 3, 4, 5, 6].map((template) => (
            <Card key={template} className="overflow-hidden">
              <div className="aspect-video bg-gray-800" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Template {template}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  A professional template perfect for showcasing your work
                </p>
                <Button className="w-full">Select Template</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Templates;