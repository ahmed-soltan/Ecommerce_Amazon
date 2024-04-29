import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type ProductPriceProps = {
    form:any
}
const ProductPrice = ({form}:ProductPriceProps) => {
  return (
    <FormField
        name="price"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                    <Input placeholder="Enter Product Price" {...field} type="number"/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default ProductPrice