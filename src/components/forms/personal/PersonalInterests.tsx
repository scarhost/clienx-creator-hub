import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface PersonalInterestsProps {
  form: UseFormReturn<any>;
}

export function PersonalInterests({ form }: PersonalInterestsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="interests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Interests</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your interests (one per line)"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Share what you're passionate about
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hobbies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hobbies</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your hobbies (one per line)"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Share what you like to do in your free time
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}