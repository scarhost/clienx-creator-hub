import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface BusinessServicesInfoProps {
  form: UseFormReturn<any>;
}

export function BusinessServicesInfo({ form }: BusinessServicesInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="services"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Services Offered</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your services (one per line)"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}