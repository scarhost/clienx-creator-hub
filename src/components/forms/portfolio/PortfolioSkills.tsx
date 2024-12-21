import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface PortfolioSkillsProps {
  form: UseFormReturn<any>;
}

export function PortfolioSkills({ form }: PortfolioSkillsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skills</FormLabel>
            <FormControl>
              <Input placeholder="React, Node.js, TypeScript, etc." {...field} />
            </FormControl>
            <FormDescription>
              Enter your skills separated by commas
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}