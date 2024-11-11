"use client";

import TopDealsProductsCard from "@/components/TopDealsproductsCard";
import { useBrowsingHistory } from "@/hooks/useBrowsingHistory";
import { useCart } from "@/hooks/useCart";

const BrowsingHistoryHomePage = () => {
  const { BrowsingHistoryProducts } = useBrowsingHistory();
  const { cartProducts } = useCart();

  if (!BrowsingHistoryProducts || BrowsingHistoryProducts.length === 0) {
    return null;
  }
  return (
    <div className="border-[1px] rounded-md p-4 bg-white my-5">
      <h1 className="text-xl font-medium my-4 text-slate-800">
        From Your Browsing History
      </h1>
      <div
        className="w-full overflow-x-auto"
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
      >
        <div className="flex items-start flex-row gap-4 ">
          {BrowsingHistoryProducts.map((product: any) => {
            const isProductInCart = cartProducts?.find(
              (cartProduct) => cartProduct.productId === product.id
            );
            return (
              <TopDealsProductsCard
                product={product}
                key={product.id}
                isInCart={!!isProductInCart}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowsingHistoryHomePage;
