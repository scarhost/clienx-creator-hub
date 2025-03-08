
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type UserProfile = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  plan: 'starter' | 'standard' | 'pro-ecommerce';
  website_url: string | null;
  is_admin: boolean;
};

interface UserProfileEditorProps {
  user: UserProfile;
  onClose: () => void;
}

export const UserProfileEditor: React.FC<UserProfileEditorProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    website_url: user.website_url || '',
    plan: user.plan,
    is_admin: user.is_admin || false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      plan: value as 'starter' | 'standard' | 'pro-ecommerce' 
    }));
  };

  const handleAdminToggle = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_admin: checked }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({
          name: formData.name || null,
          email: formData.email,
          phone: formData.phone || null,
          website_url: formData.website_url || null,
          plan: formData.plan,
          is_admin: formData.is_admin,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user:', error);
        toast.error('Failed to update user profile');
        return;
      }

      toast.success('User profile updated successfully');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website_url" className="text-right">
              Website
            </Label>
            <Input
              id="website_url"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="plan" className="text-right">
              Plan
            </Label>
            <Select 
              value={formData.plan} 
              onValueChange={handlePlanChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter (5 credits/mo)</SelectItem>
                <SelectItem value="standard">Standard (10 credits/mo)</SelectItem>
                <SelectItem value="pro-ecommerce">Pro E-commerce (15 credits/mo)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_admin" className="text-right">
              Admin Access
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch 
                id="is_admin" 
                checked={formData.is_admin} 
                onCheckedChange={handleAdminToggle} 
              />
              <Label htmlFor="is_admin" className="cursor-pointer">
                {formData.is_admin ? 'Enabled' : 'Disabled'}
              </Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
