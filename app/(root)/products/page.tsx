import { getFilteredProducts } from "@/actions/getFilteredProducts";
import Container from "@/components/Container";
import ProductsContainer from "./_components/ProductsContainer";

type SearchProps ={
    searchParams:{
      key:string;
      page:number;
      pageSize:number
    }
  }
const page = async({searchParams}:SearchProps) => {
   const products = await getFilteredProducts({...searchParams})
   console.log(searchParams)
  return (
    <div className="py-6">
        <ProductsContainer products={products!} searchParams={searchParams}/>
    </div>
  )
}

export default page