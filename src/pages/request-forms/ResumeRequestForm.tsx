
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

const ResumeRequestForm = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    professionalSummary: "",
    workExperience: "",
    education: "",
    skills: "",
    projects: "",
    certifications: "",
    linkedin: "",
    github: "",
    portfolio: "",
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
        localStorage.setItem('pendingResumeRequest', JSON.stringify({
          templateId,
          formData
        }));
        setIsAuthModalOpen(true);
        return;
      }
      
      // Get template details
      const templates = await fetchResumeTemplates();
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
          template_style: "resume",
          website_type: "resume",
          request_details: `
## Resume Website Request

### Personal Information
- Full Name: ${formData.fullName}
- Contact Email: ${formData.contactEmail}
- Contact Phone: ${formData.contactPhone}
- Address: ${formData.address}

### Professional Summary
${formData.professionalSummary}

### Work Experience
${formData.workExperience}

### Education
${formData.education}

### Skills
${formData.skills}

### Projects & Achievements
${formData.projects}

### Certifications
${formData.certifications}

### Social & Portfolio Links
- LinkedIn: ${formData.linkedin}
- GitHub: ${formData.github}
- Portfolio: ${formData.portfolio}
          `.trim(),
          status: "pending"
        });
        
      if (error) throw error;
      
      toast.success("Your resume website request has been submitted!");
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchResumeTemplates = () => {
    // This would typically be a database call, but we'll use static data for now
    return Promise.resolve([
      {
        id: 1,
        name: "Professional Resume",
        description: "Clean and professional resume design",
      },
      {
        id: 2,
        name: "Creative Resume",
        description: "Stand out with a creative resume design",
      },
      {
        id: 3,
        name: "Technical Resume",
        description: "Highlight your technical skills effectively",
      },
    ]);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Resume Website</h1>
        <p className="text-gray-400 mb-8">Please provide the information needed for your professional resume website</p>
        
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
                  <Label htmlFor="contactEmail">Email *</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone *</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address (Optional)</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Professional Profile</h2>
              <div>
                <Label htmlFor="professionalSummary">Professional Summary *</Label>
                <Textarea
                  id="professionalSummary"
                  name="professionalSummary"
                  value={formData.professionalSummary}
                  onChange={handleInputChange}
                  placeholder="A brief introduction about yourself and your professional background"
                  className="min-h-[100px]"
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
                  placeholder="Company Name, Job Title, Dates, Key Responsibilities and Achievements (one experience per line)"
                  className="min-h-[150px]"
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
                  placeholder="Degree, Institution, Graduation Year (one degree per line)"
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Skills & Achievements</h2>
              <div>
                <Label htmlFor="skills">Skills *</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="List your key skills (separated by commas)"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="projects">Projects & Achievements *</Label>
                <Textarea
                  id="projects"
                  name="projects"
                  value={formData.projects}
                  onChange={handleInputChange}
                  placeholder="Notable projects, achievements, or personal works (one per line)"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="certifications">Certifications (Optional)</Label>
                <Textarea
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="Professional certifications or relevant training (one per line)"
                  className="min-h-[100px]"
                />
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
                  <Label htmlFor="portfolio">Portfolio URL (Optional)</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://your-portfolio.com"
                  />
                </div>
              </div>
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

export default ResumeRequestForm;
