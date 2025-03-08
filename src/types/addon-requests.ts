
export type AddonRequest = {
  id: string;
  user_id: string;
  addon_type: string;
  request_details: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
};
