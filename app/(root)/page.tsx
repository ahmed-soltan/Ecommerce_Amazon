import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Banner } from "./components/Banner";
import { Button } from "@/components/ui/button";
import TopDealsProducts from "./components/TopDealsProducts";
import NewProducts from "./components/NewProducts";
import BrowsingHistoryHomePage from "./components/BrowsingHistoryHomePage";
import BannerCategories from "./components/BannerCategories";

import { getProducts } from "@/actions/getProducts";
import { getCategoriesWithProductCount } from "@/actions/getCategoriesWithProductCount";

const Home = async () => {
  const categories = await getCategoriesWithProductCount();
  const products = await getProducts();
  const topDealsProducts = products
    ?.filter((product) => product.discount && product.discount > 0)
    .slice(0, 9);
  const newProducts = products?.slice(0, 9);

  return (
    <div className="mb-10 px-2 md:px-10 lg:px-20 py-6">
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
              </Button>ٍ
            </Link>
          </h1>

          <BannerCategories categories={categories!} />
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
