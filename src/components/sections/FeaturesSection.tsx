
import { Card } from "@/components/ui/card";

export const FeaturesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="border-t border-gradient-to-r from-primary-400 to-accent" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gray-900/50 border border-gray-800">
              <div className="mb-4 text-primary text-4xl">{feature.icon}</div>
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
    title: "1. Choose a Template",
    description: "Browse our collection of professional website templates and select one that matches your vision.",
    icon: "🎨"
  },
  {
    title: "2. Submit Your Request",
    description: "Tell us exactly what you want to customize in your chosen template.",
    icon: "📝"
  },
  {
    title: "3. Get Your Website",
    description: "We'll customize the template according to your requirements and deliver your perfect website.",
    icon: "🚀"
  }
];
