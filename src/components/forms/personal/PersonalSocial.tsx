import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface PersonalSocialProps {
  form: UseFormReturn<any>;
}

export function PersonalSocial({ form }: PersonalSocialProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="instagram_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instagram Profile URL (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://instagram.com/yourusername" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="twitter_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twitter Profile URL (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://twitter.com/yourusername" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="youtube_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>YouTube Channel URL (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://youtube.com/@yourchannel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="blog_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Blog URL (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://yourblog.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}