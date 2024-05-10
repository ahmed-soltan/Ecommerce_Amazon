import { getProducts } from "@/actions/getProducts"
import { Banner } from "./components/Banner"
import TopDealsProducts from "./components/TopDealsProducts";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { categories } from "../(dashboard)/vendor/[vendorId]/create-product/_components/AddProductsForm";
import BannerProducts from "./components/BannerProducts";

const Home = async() => {
  const products = await getProducts();
  const topDealsProducts = products?.filter(product => product.discount && product.discount>0).slice(0,9)

  return (
    <div className="mb-10 px-2 md:px-10 lg:px-20">
      <div className="relative">
      <Banner/>
      <BannerProducts products={products!}/>
      </div>
      <div className="">

        
      <TopDealsProducts products={topDealsProducts!}/>
      </div>
    </div>
  )
}

export default Home