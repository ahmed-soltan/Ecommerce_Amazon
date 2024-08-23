import { getProducts } from "@/actions/getProducts";
import { Banner } from "./components/Banner";
import TopDealsProducts from "./components/TopDealsProducts";
import BannerProducts from "./components/BannerProducts";
import NewProducts from "./components/NewProducts";
import BrowsingHistoryHomePage from "./components/BrowsingHistoryHomePage";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const products = await getProducts();
  const topDealsProducts = products
    ?.filter((product) => product.discount && product.discount > 0)
    .slice(0, 9);

  const newProducts = products?.slice(0, 9);

  return (
    <div className="mb-10 px-2 md:px-10 lg:px-20">
      <div className="relative">
        <Banner />
        <div className=" bg-white p-2 rounded-md">
          <h1 className="text-xl font-bold text-slate-900 p-2 w-full rounded-xl flex items-center justify-between">
            <span>Categories</span>
            <Link href={`/products?&page=1`}>
              <Button
                variant={"amazonBtn"}
                className="flex items-center"
                size={"sm"}
              >
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </h1>

          <BannerProducts products={products!} />
        </div>
      </div>
      <div className="">
        <NewProducts products={newProducts!} />
        <TopDealsProducts products={topDealsProducts!} />
        <BrowsingHistoryHomePage />
      </div>
    </div>
  );
};

export default Home;
