
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Provider } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthProps {
  supabaseClient?: typeof supabase;
  appearance?: any;
  providers?: Provider[];
  [key: string]: any;
}

export const Auth = ({ supabaseClient = supabase, appearance, providers = [], ...props }: AuthProps) => {
  return (
    <SupabaseAuth
      supabaseClient={supabaseClient}
      providers={providers}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: 'rgb(79, 70, 229)',
              brandAccent: 'rgb(67, 56, 202)',
              brandButtonText: 'white',
              defaultButtonBackground: 'rgb(17, 24, 39)',
              defaultButtonBackgroundHover: 'rgb(31, 41, 55)',
              inputBackground: 'transparent',
              inputBorder: 'rgb(75, 85, 99)',
              inputBorderHover: 'rgb(107, 114, 128)',
              inputBorderFocus: 'rgb(79, 70, 229)',
            },
          }
        },
        ...appearance
      }}
      {...props}
    />
  );
};
