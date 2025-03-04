
import { MainLayout } from "@/components/layout/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">About Us</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At WebCraft, we believe every business deserves a stunning online presence without the complexity and high costs. 
                Our mission is to simplify the website creation process by providing customized solutions based on professional templates.
              </p>
              <p className="text-gray-300">
                We bridge the gap between DIY website builders and expensive custom development, giving you the best of both worlds: 
                professional design with personalized customization at affordable rates.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Process</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <div className="text-primary text-4xl mb-4">1</div>
                  <h3 className="text-xl font-medium mb-2">Choose</h3>
                  <p className="text-gray-400">Browse our collection of professionally designed templates and select one that matches your vision.</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <div className="text-primary text-4xl mb-4">2</div>
                  <h3 className="text-xl font-medium mb-2">Request</h3>
                  <p className="text-gray-400">Tell us your specific customization needs - colors, content, features, or any other changes you'd like.</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <div className="text-primary text-4xl mb-4">3</div>
                  <h3 className="text-xl font-medium mb-2">Receive</h3>
                  <p className="text-gray-400">Our team implements your changes and delivers a professionally customized website ready for launch.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p className="text-gray-300 mb-6">
                We're a passionate team of web designers, developers, and digital strategists dedicated to helping businesses succeed online.
                With over a decade of combined experience, we understand what makes a website not just look good, but perform effectively.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center">
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-medium">Sarah Johnson</h3>
                  <p className="text-gray-400">Lead Designer</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center">
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-medium">Michael Chen</h3>
                  <p className="text-gray-400">Senior Developer</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center">
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-medium">Jessica Williams</h3>
                  <p className="text-gray-400">Customer Success</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
