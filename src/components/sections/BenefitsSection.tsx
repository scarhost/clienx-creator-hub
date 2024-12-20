import { Card } from "@/components/ui/card";

export const BenefitsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="border-t border-gradient-to-r from-primary-400 to-accent" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ClienxDev?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 bg-gray-900/50 border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const benefits = [
  {
    title: "Quick Setup",
    description: "Get your professional website up and running in minutes with our streamlined process."
  },
  {
    title: "Customizable Templates",
    description: "Choose from our collection of professionally designed templates tailored for your needs."
  },
  {
    title: "Affordable Plans",
    description: "Start with our free tier and upgrade as your business grows."
  }
];