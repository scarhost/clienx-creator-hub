
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, FileText, Globe, Workflow, 
  Megaphone, Search, RefreshCw, Server,
  Database, Globe2
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SupportService = ({ 
  icon: Icon, 
  title, 
  description, 
  onSelect 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  onSelect: () => void 
}) => (
  <Card className="cursor-pointer hover:bg-gray-900/50 transition-colors" onClick={onSelect}>
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const PreBuiltWebsiteSupport = () => {
  const [selectedService, setSelectedService] = useState('');
  const [formDetails, setFormDetails] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setFormDetails('');
  };

  const handleBackToServices = () => {
    setSelectedService('');
    setFormDetails('');
    setWebsiteUrl('');
  };

  const handleFormDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormDetails(e.target.value);
  };

  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };

  const handleSubmitRequest = async () => {
    try {
      setIsSubmitting(true);
      
      // Check if the user is logged in
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        toast.error('You must be logged in to submit a request');
        return;
      }
      
      const { error } = await supabase
        .from('addon_requests')
        .insert({
          user_id: session.user.id,
          addon_type: selectedService,
          request_details: `Website URL: ${websiteUrl}\n\n${formDetails}`,
          status: 'pending',
        });
      
      if (error) {
        console.error('Error submitting request:', error);
        toast.error('Failed to submit request');
        return;
      }
      
      toast.success('Support request submitted successfully');
      handleBackToServices();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderServiceForm = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">{selectedService} Request</h3>
          <Button variant="ghost" onClick={handleBackToServices}>
            Back to all services
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website-url">Your Website URL</Label>
            <Input 
              id="website-url" 
              placeholder="https://yourwebsite.com" 
              value={websiteUrl}
              onChange={handleWebsiteUrlChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="request-details">
              {selectedService === 'Custom Code' ? 'Describe what functionality you need:' :
               selectedService === 'Content Update' ? 'Describe what content needs to be updated:' :
               selectedService === 'SEO Optimization' ? 'Any specific SEO concerns or goals:' :
               selectedService === 'Performance Boost' ? 'Describe any performance issues you\'re experiencing:' :
               selectedService === 'Design Tweak' ? 'Describe the design changes you\'d like:' :
               selectedService === 'Web Hosting & Domain' ? 'Describe your hosting and domain needs:' :
               'Request details:'}
            </Label>
            <Textarea 
              id="request-details"
              placeholder="Provide as much detail as possible to help us understand your request"
              value={formDetails}
              onChange={handleFormDetailsChange}
              rows={8}
              className="resize-none"
            />
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleSubmitRequest}
            disabled={!websiteUrl.trim() || !formDetails.trim() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Support Services</CardTitle>
        <CardDescription>
          Request additional services and support for your pre-built website
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedService ? (
          renderServiceForm()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SupportService 
              icon={Code}
              title="Custom Code"
              description="Request custom coding for specific functionality or features"
              onSelect={() => handleServiceSelect('Custom Code')}
            />
            <SupportService 
              icon={FileText}
              title="Content Update"
              description="Request changes or updates to your website content"
              onSelect={() => handleServiceSelect('Content Update')}
            />
            <SupportService 
              icon={Search}
              title="SEO Optimization"
              description="Get help improving your website's search engine ranking"
              onSelect={() => handleServiceSelect('SEO Optimization')}
            />
            <SupportService 
              icon={RefreshCw}
              title="Performance Boost"
              description="Optimize your website for better speed and performance"
              onSelect={() => handleServiceSelect('Performance Boost')}
            />
            <SupportService 
              icon={Workflow}
              title="Design Tweak"
              description="Request minor design changes to improve your website's look"
              onSelect={() => handleServiceSelect('Design Tweak')}
            />
            <SupportService 
              icon={Globe2}
              title="Web Hosting & Domain"
              description="Get help with domain registration and web hosting solutions"
              onSelect={() => handleServiceSelect('Web Hosting & Domain')}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
