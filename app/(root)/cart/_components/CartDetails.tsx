"use client";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { cartProductType } from "../../product/[productId]/_components/ProductContainerDetails";
import CartProductItem from "./CartProductItem";
import SavedProductCard from "./SavedProductCard";
import CheckoutButton from "./CheckoutButton";

const CartDetails = () => {
    const { cartProducts, savedProduct } = useCart();
    const cartProductLength = cartProducts?.length ? cartProducts.length : 0;
    const savedProductLength = savedProduct?.length ? savedProduct.length : 0;
    const subTotal = cartProducts
      ? parseFloat(
          cartProducts
            .reduce(
              (acc, item: cartProductType) =>
                acc + item.priceAfterDiscount * item.quantity,
              0
            )
            .toFixed(2)
        )
      : 0;
  
      const ShippingFee =100
      const Taxes =( (subTotal * 5)/100)
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 ">
    <div className=" col-span-4  flex flex-col gap-4">
      <div className="bg-white p-5 rounded-md flex flex-col items-start gap-4">
        <h1 className="font-medium text-3xl">Shopping Cart</h1>
        <Separator />
        <div className="flex items-start flex-col gap-4">
          {cartProductLength > 0 ? (
            cartProducts?.map((product) => (
              <div
                key={product.productId}
                className="flex flex-col gap-4 w-full"
              >
                <CartProductItem product={product} />
                <Separator />
              </div>
            ))
          ) : (
            <div className="flex items-start flex-col gap-3">
              <h1>Your Shopping Cart is Empty</h1>
              <Button variant={"amazonBtn"}>Start Shopping</Button>
            </div>
          )}
        </div>
      </div>

      <div className=" bg-white p-5 rounded-md flex flex-col items-start gap-4">
        <h1 className="font-semibold text-2xl">Your Items</h1>
        <Separator />

        <div className="flex items-start justify-start gap-4">
          {savedProductLength > 0 ? (
            savedProduct?.map((product) => (
              <div
                key={product.productId}
                className="flex flex-col gap-4"
              >
                <SavedProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="flex items-start flex-col gap-3">
              <h1>No Items Has Been Saved For Later</h1>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-2 col-span-2">
      <div className="bg-white p-2 flex flex-col gap-3">
        <h1 className="text-lg flex items-center justify-between">
          Subtotal ({cartProductLength} items){" "}
          <span className="font-medium">{formatPrice(subTotal)}</span>
        </h1>
        <h1 className="text-lg flex items-center justify-between">
          Taxes (5%){" "}
          <span className="font-medium">{formatPrice(Taxes)}</span>
        </h1>
        <h1 className="text-lg flex items-center justify-between">
          Shipping Fees{" "}
          <span className="font-medium">{formatPrice(ShippingFee)}</span>
        </h1>
        <Separator/>
        <h1 className="text-lg flex items-center justify-between">
          Total Amount{" "}
          <span className="font-medium">{formatPrice(subTotal+ShippingFee+Taxes)}</span>
        </h1>
        <CheckoutButton/>
      </div>
    </div>
  </div>
  )
}

export default CartDetails