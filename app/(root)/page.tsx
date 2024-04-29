import { getProducts } from "@/actions/getProducts"
import { Banner } from "./components/Banner"
import TopDealsProducts from "./components/TopDealsProducts";

const Home = async() => {
  const products = await getProducts();
  const topDealsProducts = products?.filter(product => product.discount && product.discount>0).slice(0,9)
  
  return (
    <div className="mb-10">
      <Banner/>
      <TopDealsProducts products={topDealsProducts!}/>
    </div>
  )
}

export default Home