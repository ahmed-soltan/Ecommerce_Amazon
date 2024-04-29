import { Editor } from "@/components/editor"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ProductDescriptionProps = {
    form:any
}
const ProductDescription = ({form}:ProductDescriptionProps) => {
  return (
    <FormField
        name="description"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                    <Editor {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default ProductDescription