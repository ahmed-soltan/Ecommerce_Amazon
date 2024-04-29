import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type ProductDiscountProps = {
    form:any
}
const ProductDiscount = ({form}:ProductDiscountProps) => {
  return (
    <FormField
        name="discount"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Product Discount</FormLabel>
                <FormControl>
                    <Input {...field} type="number"/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default ProductDiscount