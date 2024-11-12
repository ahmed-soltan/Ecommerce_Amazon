import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type CategoryTitleProps = {
  form: any;
};

const CategoryTitle = ({ form }: CategoryTitleProps) => {
  return (
    <FormField
      name="name"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter Category Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategoryTitle;
