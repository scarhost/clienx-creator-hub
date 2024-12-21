import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PortfolioBasicInfo } from "./PortfolioBasicInfo";
import { PortfolioSkills } from "./PortfolioSkills";
import { PortfolioProjects } from "./PortfolioProjects";
import { PortfolioEducation } from "./PortfolioEducation";

const formSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  skills: z.string().min(2, "Please add at least one skill"),
  projects: z.string().min(10, "Please add at least one project"),
  education: z.string().min(10, "Please add your education details"),
  experience: z.string().min(10, "Please add your work experience"),
  contact_email: z.string().email("Invalid email address"),
  linkedin_url: z.string().url("Invalid LinkedIn URL").optional(),
  github_url: z.string().url("Invalid GitHub URL").optional(),
});

export function PortfolioInfoForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      title: "",
      bio: "",
      skills: "",
      projects: "",
      education: "",
      experience: "",
      contact_email: "",
      linkedin_url: "",
      github_url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        localStorage.setItem('pendingPortfolioInfo', JSON.stringify(values));
        localStorage.setItem('pendingWebsiteType', 'Portfolio');
        toast.info("Please create an account to continue");
        navigate("/auth/signup");
        return;
      }

      const { error: saveError } = await supabase.from("website_info").insert({
        website_type: "portfolio",
        user_id: session.user.id,
        business_name: values.full_name,
        tagline: values.title,
        description: values.bio,
        contact_email: values.contact_email,
        services: { 
          skills: values.skills.split(",").map(s => s.trim()),
          projects: values.projects.split("\n"),
          education: values.education.split("\n"),
          experience: values.experience.split("\n")
        },
        social_links: {
          linkedin: values.linkedin_url,
          github: values.github_url
        }
      });

      if (saveError) throw saveError;

      toast.success("Information saved successfully!");
      navigate("/templates");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save information. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PortfolioBasicInfo form={form} />
        <PortfolioSkills form={form} />
        <PortfolioProjects form={form} />
        <PortfolioEducation form={form} />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}