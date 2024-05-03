import ProductCard from "@/components/ProductCard";
import { Image, Products, Review } from "@prisma/client";

type TopDealsProductsProps = {
  products: Products[] 
};

const TopDealsProducts = ({ products }: TopDealsProductsProps) => {
  return (
    <div className="border-[1px] rounded-md p-4 bg-white">
      <h1 className="text-xl font-medium my-4 text-slate-800">Top Deals</h1>
      <div className="w-full overflow-x-auto">
        <div className="flex items-center flex-row gap-4 ">
          {products.map((product: any) => (
            <>
              <ProductCard product={product} key={product.id} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDealsProducts;
