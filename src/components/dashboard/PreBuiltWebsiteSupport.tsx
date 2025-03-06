
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ShoppingCart, Upload, Code, Layout, Search, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const PreBuiltWebsiteSupport = () => {
  const [selectedService, setSelectedService] = useState<PreBuiltService | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleServiceSelect = (service: PreBuiltService) => {
    setSelectedService(service);
    setShowDialog(true);
  };

  const handleRequestService = () => {
    // In a real app, this would create a service request
    toast.success(`Service request for ${selectedService?.title} submitted!`);
    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Pre-built Website Support</h2>
        <p className="text-gray-400">Add additional features to your website with our pre-built services</p>
      </div>

      <Tabs defaultValue="popular">
        <TabsList>
          <TabsTrigger value="popular">Popular Services</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onSelect={handleServiceSelect} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ecommerce" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ecommerceServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onSelect={handleServiceSelect} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketingServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onSelect={handleServiceSelect} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedService?.title}</DialogTitle>
            <DialogDescription>
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Price:</span>
              <span className="font-bold text-lg">${selectedService?.price}</span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Delivery Time:</span>
              <span>{selectedService?.deliveryTime}</span>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">What's included:</h4>
              <ul className="space-y-2">
                {selectedService?.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestService}>
              Request Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface PreBuiltService {
  id: number;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  features: string[];
  icon: React.ReactNode;
  category: 'popular' | 'ecommerce' | 'marketing';
}

interface ServiceCardProps {
  service: PreBuiltService;
  onSelect: (service: PreBuiltService) => void;
}

const ServiceCard = ({ service, onSelect }: ServiceCardProps) => {
  return (
    <Card className="border border-gray-800">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-md bg-gray-800/70">{service.icon}</div>
          <Badge variant="outline">${service.price}</Badge>
        </div>
        <CardTitle className="mt-4">{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-2">Delivery in {service.deliveryTime}</p>
        <ul className="space-y-1">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <CheckCircle className="h-3 w-3 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
          {service.features.length > 3 && (
            <li className="text-sm text-gray-400 pl-5">
              +{service.features.length - 3} more features
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => onSelect(service)}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const popularServices: PreBuiltService[] = [
  {
    id: 1,
    title: "Contact Form Setup",
    description: "Professional contact form with validation and email notifications",
    price: 20,
    deliveryTime: "2-3 days",
    features: [
      "Form validation",
      "Custom styling to match your site",
      "Email notifications",
      "Anti-spam protection",
      "Mobile responsive"
    ],
    icon: <Layout className="h-6 w-6 text-primary" />,
    category: 'popular'
  },
  {
    id: 2,
    title: "SEO Optimization",
    description: "Improve your site's search engine visibility",
    price: 50,
    deliveryTime: "3-5 days",
    features: [
      "Keyword optimization",
      "Meta tags setup",
      "Sitemap generation",
      "Image optimization",
      "Performance improvements",
      "SEO report"
    ],
    icon: <Search className="h-6 w-6 text-primary" />,
    category: 'popular'
  },
  {
    id: 3,
    title: "Image Gallery",
    description: "Beautiful image gallery with lightbox functionality",
    price: 30,
    deliveryTime: "2-4 days",
    features: [
      "Responsive grid layout",
      "Lightbox functionality",
      "Lazy loading",
      "Touch-friendly controls",
      "Custom styling options"
    ],
    icon: <Upload className="h-6 w-6 text-primary" />,
    category: 'popular'
  }
];

const ecommerceServices: PreBuiltService[] = [
  {
    id: 4,
    title: "Product Page Setup",
    description: "Professional product display with images and details",
    price: 40,
    deliveryTime: "3-5 days",
    features: [
      "Image gallery",
      "Product details layout",
      "Variable pricing options",
      "Mobile responsive design",
      "SEO optimization"
    ],
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    category: 'ecommerce'
  },
  {
    id: 5,
    title: "Payment Gateway",
    description: "Secure payment processing integration",
    price: 70,
    deliveryTime: "4-6 days",
    features: [
      "Stripe or PayPal integration",
      "Secure checkout process",
      "Payment confirmation emails",
      "Mobile-friendly checkout",
      "Order tracking capabilities"
    ],
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    category: 'ecommerce'
  },
  {
    id: 6,
    title: "Shopping Cart",
    description: "Functional shopping cart with product management",
    price: 60,
    deliveryTime: "3-5 days",
    features: [
      "Add/remove products",
      "Quantity adjustments",
      "Cart persistence",
      "Price calculations",
      "Responsive design"
    ],
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    category: 'ecommerce'
  }
];

const marketingServices: PreBuiltService[] = [
  {
    id: 7,
    title: "Newsletter Signup",
    description: "Email collection form with mailing list integration",
    price: 25,
    deliveryTime: "2-3 days",
    features: [
      "Custom signup form",
      "Mailchimp integration",
      "GDPR compliant",
      "Popup or embedded options",
      "Thank you message/page"
    ],
    icon: <Code className="h-6 w-6 text-primary" />,
    category: 'marketing'
  },
  {
    id: 8,
    title: "Social Media Feed",
    description: "Display your latest social media posts on your website",
    price: 35,
    deliveryTime: "2-4 days",
    features: [
      "Instagram feed integration",
      "Twitter feed integration",
      "Custom styling options",
      "Auto-refresh capabilities",
      "Mobile responsive design"
    ],
    icon: <Code className="h-6 w-6 text-primary" />,
    category: 'marketing'
  },
  {
    id: 9,
    title: "Google Analytics",
    description: "Professional analytics setup to track website performance",
    price: 30,
    deliveryTime: "1-2 days",
    features: [
      "Google Analytics setup",
      "Goal tracking",
      "Event tracking",
      "Custom dashboard setup",
      "Initial performance report"
    ],
    icon: <Code className="h-6 w-6 text-primary" />,
    category: 'marketing'
  }
];
