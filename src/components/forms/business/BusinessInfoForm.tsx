import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BusinessBasicInfo } from "./BusinessBasicInfo";
import { BusinessContactInfo } from "./BusinessContactInfo";
import { BusinessServicesInfo } from "./BusinessServicesInfo";

const formSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  tagline: z.string().min(2, "Tagline must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  contact_email: z.string().email("Invalid email address"),
  contact_phone: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  services: z.string().min(10, "Services must be at least 10 characters"),
});

export function BusinessInfoForm() {
  const navigate = useNavigate();
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
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        // Save form data to localStorage before redirecting to auth
        localStorage.setItem('pendingBusinessInfo', JSON.stringify(values));
        toast.info("Please sign up to continue");
        navigate("/auth/signup");
        return;
      }

      const { error: saveError } = await supabase.from("website_info").insert({
        website_type: "business",
        user_id: session.user.id, // Set the user_id from the session
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
      navigate("/templates/business");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save information. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BusinessBasicInfo form={form} />
        <BusinessContactInfo form={form} />
        <BusinessServicesInfo form={form} />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}