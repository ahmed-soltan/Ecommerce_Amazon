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
    <div className="p-6">
      <Container>
        <ProductsContainer products={products!} searchParams={searchParams}/>
      </Container>
    </div>
  )
}

export default page