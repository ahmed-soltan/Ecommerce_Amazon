import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ProductAvailabilityProps = {
  form: any;
};
const ProductAvailability = ({ form }: ProductAvailabilityProps) => {
  return (
    <FormField
      name="inStock"
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex items-center flex-row space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormDescription>
              Check this box if The Product is Available in Your Stock.
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductAvailability;
