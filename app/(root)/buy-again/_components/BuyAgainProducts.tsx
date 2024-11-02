import { getCurrentProfile } from "@/actions/getCurrentProfile";
import OrderCard from "@/components/OrderCard";

const BuyAgainProducts = async () => {
  const profile = await getCurrentProfile();

  if(!profile || !profile.Order){
    return (
      <div className="text-slate-700 italic">You Haven't make any orders yet</div>
    )
  }

  return (
    <div className="flex items-center justify-start gap-4 flex-wrap">
      {profile.Order.length > 0 ? (
        profile.Order.map((order) => {
          return order.products.map((product) => (
            <OrderCard
              key={product.productId}
              product={product}
              createdAt={order.createdAt}
            />
          ));
        })
      ) : (
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
