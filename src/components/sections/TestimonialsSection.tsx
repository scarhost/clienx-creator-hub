import { Card } from "@/components/ui/card";

export const TestimonialsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="border-t border-gradient-to-r from-primary-400 to-accent" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-gray-900/50 border border-gray-800">
              <p className="text-gray-400 mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="ml-3">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    text: "ClienxDev helped me create a stunning portfolio in minutes. The templates are beautiful and easy to customize.",
    name: "Sarah Johnson",
    role: "Freelance Designer"
  },
  {
    text: "The business templates are perfect for our company. We saved time and money while maintaining a professional look.",
    name: "Michael Chen",
    role: "Small Business Owner"
  },
  {
    text: "I love how easy it is to create and maintain my personal website. The support team is amazing!",
    name: "Emma Davis",
    role: "Content Creator"
  }
];