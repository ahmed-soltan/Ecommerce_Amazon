import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type ProductBrandProps = {
    form:any
}
const ProductBrand = ({form}:ProductBrandProps) => {
  return (
    <FormField
        name="brand"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Product Brand</FormLabel>
                <FormControl>
                    <Input placeholder="Enter Product Brand" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default ProductBrand