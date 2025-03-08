
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { UserProfileEditor } from './UserProfileEditor';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Shield } from 'lucide-react';

type UserProfile = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  plan: 'starter' | 'standard' | 'pro-ecommerce';
  website_url: string | null;
  created_at: string;
  is_admin: boolean;
};

export const UsersList = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
        return;
      }

      setUsers(data as UserProfile[]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user: UserProfile) => {
    setSelectedUser(user);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedUser(null);
    fetchUsers(); // Refresh the list after editing
  };

  const formatPlan = (plan: string) => {
    switch (plan) {
      case 'starter':
        return 'Starter (5 credits/mo)';
      case 'standard':
        return 'Standard (10 credits/mo)';
      case 'pro-ecommerce':
        return 'Pro E-commerce (15 credits/mo)';
      default:
        return plan;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Users</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading users...</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name || 'No name'}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || 'N/A'}</TableCell>
                      <TableCell>
                        {user.website_url ? (
                          <div className="flex items-center space-x-1">
                            <a 
                              href={user.website_url.startsWith('http') ? user.website_url : `https://${user.website_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline flex items-center"
                            >
                              {user.website_url}
                              <ExternalLink className="ml-1 w-3 h-3" />
                            </a>
                          </div>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>{formatPlan(user.plan)}</TableCell>
                      <TableCell>
                        {user.is_admin ? (
                          <Badge className="bg-purple-600 flex items-center space-x-1">
                            <Shield className="w-3 h-3 mr-1" />
                            Admin
                          </Badge>
                        ) : (
                          <Badge variant="secondary">User</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {showEditor && selectedUser && (
              <UserProfileEditor 
                user={selectedUser} 
                onClose={handleCloseEditor} 
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
