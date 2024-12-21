import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface PortfolioProjectsProps {
  form: UseFormReturn<any>;
}

export function PortfolioProjects({ form }: PortfolioProjectsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="projects"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Projects</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your projects (one per line)"
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include project name, description, and technologies used
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}