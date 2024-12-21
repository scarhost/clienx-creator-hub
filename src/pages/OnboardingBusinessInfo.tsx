import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  tagline: z.string().min(2, "Tagline must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  contact_email: z.string().email("Invalid email address"),
  contact_phone: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  services: z.string().min(10, "Services must be at least 10 characters"),
});

const OnboardingBusinessInfo = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: "",
      tagline: "",
      description: "",
      contact_email: "",
      contact_phone: "",
      address: "",
      services: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      // Save the business information
      const { error: saveError } = await supabase.from("website_info").insert({
        website_type: "business",
        business_name: values.business_name,
        tagline: values.tagline,
        description: values.description,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone,
        address: values.address,
        services: { list: values.services.split("\n") },
      });

      if (saveError) throw saveError;

      toast.success("Information saved successfully!");
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // If authenticated, go to templates
        navigate("/templates/business");
      } else {
        // If not authenticated, go to signup
        navigate("/auth/signup");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Business Information</h1>
      <p className="text-muted-foreground mb-8">
        Tell us about your business to create your website
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="business_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input placeholder="A short, catchy description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your business"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="Your business address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services Offered</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List your services (one per line)"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingBusinessInfo;