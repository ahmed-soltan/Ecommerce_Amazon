import { Editor } from "@/components/editor"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


type ProductDetailsProps = {
    form:any
}
const ProductDetails = ({form}:ProductDetailsProps) => {
  return (
    <FormField
        name="details"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Product Details</FormLabel>
                <FormControl>
                    <Editor {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default ProductDetails