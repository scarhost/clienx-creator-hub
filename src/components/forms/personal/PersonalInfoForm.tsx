import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PersonalBasicInfo } from "./PersonalBasicInfo";
import { PersonalInterests } from "./PersonalInterests";
import { PersonalSocial } from "./PersonalSocial";

const formSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  tagline: z.string().min(2, "Tagline must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  interests: z.string().min(10, "Please add your interests"),
  hobbies: z.string().min(10, "Please add your hobbies"),
  contact_email: z.string().email("Invalid email address"),
  instagram_url: z.string().url("Invalid Instagram URL").optional(),
  twitter_url: z.string().url("Invalid Twitter URL").optional(),
  youtube_url: z.string().url("Invalid YouTube URL").optional(),
  blog_url: z.string().url("Invalid Blog URL").optional(),
});

export function PersonalInfoForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      tagline: "",
      bio: "",
      interests: "",
      hobbies: "",
      contact_email: "",
      instagram_url: "",
      twitter_url: "",
      youtube_url: "",
      blog_url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        localStorage.setItem('pendingPersonalInfo', JSON.stringify(values));
        toast.info("Please sign up to continue");
        navigate("/auth/signup");
        return;
      }

      const { error: saveError } = await supabase.from("website_info").insert({
        website_type: "personal",
        user_id: session.user.id,
        business_name: values.full_name,
        tagline: values.tagline,
        description: values.bio,
        contact_email: values.contact_email,
        services: { 
          interests: values.interests.split("\n"),
          hobbies: values.hobbies.split("\n")
        },
        social_links: {
          instagram: values.instagram_url,
          twitter: values.twitter_url,
          youtube: values.youtube_url,
          blog: values.blog_url
        }
      });

      if (saveError) throw saveError;

      toast.success("Information saved successfully!");
      navigate("/templates/personal");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save information. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalBasicInfo form={form} />
        <PersonalInterests form={form} />
        <PersonalSocial form={form} />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}