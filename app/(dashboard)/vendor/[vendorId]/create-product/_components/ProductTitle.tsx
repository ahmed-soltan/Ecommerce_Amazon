import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type ProductTitleProps = {
    form:any
}
const ProductTitle = ({form}:ProductTitleProps) => {
  return (
    <FormField
        name="name"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter Product Name" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default ProductTitle