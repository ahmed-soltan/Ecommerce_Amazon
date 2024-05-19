import { getProducts } from "@/actions/getProducts";
import { Banner } from "./components/Banner";
import TopDealsProducts from "./components/TopDealsProducts";
import BannerProducts from "./components/BannerProducts";
import NewProducts from "./components/NewProducts";
import BrowsingHistoryHomePage from "./components/BrowsingHistoryHomePage";

const Home = async () => {
  const products = await getProducts();
  const topDealsProducts = products?.filter((product) => product.discount && product.discount > 0).slice(0, 9);

  const newProducts = products?.slice(0, 9);


  return (
    <div className="mb-10 px-2 md:px-10 lg:px-20">
      <div className="relative">
        <Banner />
        <BannerProducts products={products!} />
      </div>
      <div className="">
        <NewProducts products={newProducts!} />
        <TopDealsProducts products={topDealsProducts!} />
        {/* <BrowsingHistoryHomePage /> */}
      </div>
    </div>
  );
};

export default Home;
