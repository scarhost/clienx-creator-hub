
import { MainLayout } from "@/components/layout/MainLayout";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Check, Code, Coins, Gem, Globe, Image, LayoutGrid, MessageSquare, Settings, Zap } from "lucide-react";

const Features = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Our Features</h1>
          
          <div className="mb-12">
            <p className="text-xl text-gray-300 mb-6">
              We provide comprehensive website solutions tailored to your specific needs. 
              Our services include design customization, content creation, technical setup, and ongoing support.
            </p>

            <FeaturesSection />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <Zap className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Fast Turnaround</h3>
              <p className="text-gray-400">Get your customized website ready within days, not months. Our streamlined process ensures quick delivery without sacrificing quality.</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <Coins className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Cost-Effective</h3>
              <p className="text-gray-400">Save thousands compared to custom development. Our template-based approach gives you professional results at a fraction of the cost.</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <LayoutGrid className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Responsive Design</h3>
              <p className="text-gray-400">All our websites are fully responsive, ensuring perfect display on all devices from desktops to smartphones.</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <Globe className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">SEO Optimization</h3>
              <p className="text-gray-400">Our websites are built with search engines in mind, helping your business get found online with proper SEO structure.</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <Code className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Clean Code</h3>
              <p className="text-gray-400">Our developers follow best practices to ensure your website loads quickly and functions smoothly without technical issues.</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <MessageSquare className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Ongoing Support</h3>
              <p className="text-gray-400">We don't disappear after launch. Choose a plan with ongoing support for regular updates and technical assistance.</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <Image className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Visual Customization</h3>
              <p className="text-gray-400">Personalize your website with your brand colors, fonts, and imagery for a unique look that represents your business.</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <Settings className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Functionality Add-ons</h3>
              <p className="text-gray-400">Enhance your website with additional features like contact forms, galleries, appointment booking, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Features;
