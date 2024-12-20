import { Card } from "@/components/ui/card";

export const FeaturesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="border-t border-gradient-to-r from-primary-400 to-accent" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gray-900/50 border border-gray-800">
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Portfolio Builder",
    description: "Showcase your work with our professional portfolio templates.",
    icon: "🎨"
  },
  {
    title: "Business Builder",
    description: "Create a powerful online presence for your business.",
    icon: "💼"
  },
  {
    title: "Personal Builder",
    description: "Express yourself with a personalized website.",
    icon: "👤"
  }
];