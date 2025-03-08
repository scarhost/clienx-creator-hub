
-- Create a table for add-on support requests
CREATE TABLE IF NOT EXISTS public.addon_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  addon_type TEXT NOT NULL,
  request_details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.addon_requests ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own requests
CREATE POLICY "Users can view their own addon requests"
  ON public.addon_requests
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own requests
CREATE POLICY "Users can create their own addon requests"
  ON public.addon_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for admins to view all addon requests
CREATE POLICY "Admins can view all addon requests"
  ON public.addon_requests
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );
