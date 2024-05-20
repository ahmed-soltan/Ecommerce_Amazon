"use client";

import OrderCard from "@/components/OrderCard";
import ProductCard from "@/components/ProductCard";
import { Order } from "@prisma/client";

const BuyAgainProducts = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="flex items-center justify-start gap-4 flex-wrap">
      {orders.length > 0 ? orders.map((order) => {
        return order.products.map((product) => (
          <OrderCard key={product.productId}
           product={product} 
           createdAt={order.createdAt}/>
        ));
      }):(
        <div className="flex items-center justify-center">
              <p className="text-center">
                Looks Like You Haven&apos;t Placed Orders
              </p>
            </div>
      )}
    </div>
  );
};

export default BuyAgainProducts;
