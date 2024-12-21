import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface PortfolioEducationProps {
  form: UseFormReturn<any>;
}

export function PortfolioEducation({ form }: PortfolioEducationProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="education"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Education</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your education (one per line)"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include degree, institution, and graduation year
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Experience</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your work experience (one per line)"
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include company, position, duration, and key achievements
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}