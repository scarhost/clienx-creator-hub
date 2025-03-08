
import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AuthModal } from "@/components/templates/AuthModal";
import { ChevronRight } from "lucide-react";

const PortfolioRequestForm = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    profession: "",
    bio: "",
    skills: "",
    projects: "",
    workExperience: "",
    education: "",
    contactEmail: "",
    contactPhone: "",
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
    colorPreference: "",
  });
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    
    checkSession();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (!session) {
        localStorage.setItem('pendingPortfolioRequest', JSON.stringify({
          templateId,
          formData
        }));
        setIsAuthModalOpen(true);
        return;
      }
      
      // Get template details
      const templates = await fetchPortfolioTemplates();
      const selectedTemplate = templates.find(t => t.id === parseInt(templateId || '0'));
      
      if (!selectedTemplate) {
        toast.error("Template not found");
        return;
      }
      
      const { error } = await supabase
        .from("website_requests")
        .insert({
          user_id: session.user.id,
          template_id: parseInt(templateId || '0'),
          template_name: selectedTemplate.name,
          template_style: "portfolio",
          website_type: "portfolio",
          request_details: `
## Portfolio Website Request

### Personal Information
- Full Name: ${formData.fullName}
- Profession: ${formData.profession}

### Bio
${formData.bio}

### Professional Details
- Skills: ${formData.skills}
- Projects: ${formData.projects}
- Work Experience: ${formData.workExperience}
- Education: ${formData.education}

### Contact Information
- Email: ${formData.contactEmail}
- Phone: ${formData.contactPhone}

### Social Media & Online Presence
- LinkedIn: ${formData.linkedin}
- GitHub: ${formData.github}
- Twitter: ${formData.twitter}
- Website: ${formData.website}

### Design Preference
- Color Preference: ${formData.colorPreference}
          `.trim(),
          status: "pending"
        });
        
      if (error) throw error;
      
      toast.success("Your portfolio website request has been submitted!");
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchPortfolioTemplates = () => {
    // This would typically be a database call, but we'll use static data for now
    return Promise.resolve([
      {
        id: 1,
        name: "Portfolio Minimal",
        description: "Clean, minimalist design to showcase your work",
      },
      {
        id: 2,
        name: "Portfolio Creative",
        description: "Bold, creative design for artists and designers",
      },
      {
        id: 3,
        name: "Developer Portfolio",
        description: "Technical portfolio ideal for developers",
      },
    ]);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Portfolio Website</h1>
        <p className="text-gray-400 mb-8">Please provide the information needed for your professional portfolio</p>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="profession">Profession / Title *</Label>
                  <Input
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    placeholder="e.g. Web Developer, Graphic Designer, Photographer"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Bio / About Me *</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Write a brief introduction about yourself, your background, and what you do"
                  className="min-h-[150px]"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Skills & Experience</h2>
              <div>
                <Label htmlFor="skills">Skills *</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="List your key skills, separated by commas (e.g. JavaScript, React, UI Design, Photography)"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="projects">Projects / Portfolio Items *</Label>
                <Textarea
                  id="projects"
                  name="projects"
                  value={formData.projects}
                  onChange={handleInputChange}
                  placeholder="Describe your key projects or portfolio items (one per line)"
                  className="min-h-[150px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="workExperience">Work Experience *</Label>
                <Textarea
                  id="workExperience"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  placeholder="List your relevant work experience (one position per line)"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="education">Education *</Label>
                <Textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="List your relevant education (one per line)"
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="contactEmail">Email *</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone (Optional)</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Online Presence</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub URL (Optional)</Label>
                  <Input
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL (Optional)</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Personal Website URL (Optional)</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="colorPreference">Color Preference (Optional)</Label>
              <Input
                id="colorPreference"
                name="colorPreference"
                value={formData.colorPreference}
                onChange={handleInputChange}
                placeholder="e.g. Blue and White, Dark theme, Minimalist"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
        </Card>
        
        <AuthModal 
          open={isAuthModalOpen} 
          onOpenChange={setIsAuthModalOpen}
          onSuccess={() => {
            // After authentication, submit the form automatically
            setTimeout(() => {
              handleSubmit(new Event('submit') as any);
            }, 1000);
          }}
        />
      </div>
    </MainLayout>
  );
};

export default PortfolioRequestForm;
