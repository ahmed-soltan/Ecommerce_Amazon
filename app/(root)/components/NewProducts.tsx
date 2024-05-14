import TopDealsProductsCard from "@/components/TopDealsproductsCard";
import { Products } from "@prisma/client";

type NewProductsProps = {
  products: Products[] 
};

const NewProducts = ({ products }: NewProductsProps) => {
  return (
    <div className="border-[1px] rounded-md p-4 bg-white my-5">
      <h1 className="text-xl font-medium my-4 text-slate-800">New Products</h1>
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

export default NewProducts;
