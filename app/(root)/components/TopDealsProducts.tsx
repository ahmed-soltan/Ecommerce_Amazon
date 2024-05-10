import TopDealsProductsCard from "@/components/TopDealsproductsCard";
import { Products } from "@prisma/client";

type TopDealsProductsProps = {
  products: Products[] 
};

const TopDealsProducts = ({ products }: TopDealsProductsProps) => {
  return (
    <div className="border-[1px] rounded-md p-4 bg-white">
      <h1 className="text-xl font-medium my-4 text-slate-800">Top Deals</h1>
      <div className="w-full overflow-x-auto" style={{ overflowX: 'auto', scrollbarWidth:"none" }}>
        <div className="flex items-start flex-row gap-4 ">
          {products.map((product: any) => (
            <TopDealsProductsCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDealsProducts;
