"use client";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { cartProductType } from "../../product/[productId]/_components/ProductContainerDetails";
import CartProductItem from "./CartProductItem";
import SavedProductCard from "./SavedProductCard";
import CheckoutButton from "./CheckoutButton";
import { Order, Products } from "@prisma/client";
import BuyAgainProducts from "../../buy-again/_components/BuyAgainProducts";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const CartDetails = ({
  orders,
  panned,
}: {
  orders: Order[];
  panned: boolean;
}) => {
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

  const ShippingFee = 100;
  const Taxes = (subTotal * 5) / 100;
  const totalAmount = subTotal + ShippingFee + Taxes;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 ">
      <div className=" col-span-12 md:col-span-4  flex flex-col gap-4">
        <div className="bg-white p-5 rounded-md flex flex-col items-start gap-4">
          <h1 className="font-medium text-3xl">Shopping Cart</h1>
          <Separator />
          <div className="flex items-start flex-col gap-4">
            {cartProductLength > 0 ? (
              cartProducts?.map((product, index) => (
                <div key={index} className="flex flex-col gap-4 w-full">
                  <CartProductItem product={product} index={index} />
                  <Separator />
                </div>
              ))
            ) : (
              <div className="flex items-start flex-col gap-3">
                <h1>Your Shopping Cart is Empty</h1>
                <Link href={"/products?&page=1"}>
                  <Button variant={"amazonBtn"}>Start Shopping</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="saved-items" className="w-full bg-white p-5">
          <h1 className="font-semibold text-3xl mb-4">Your Items</h1>
          <TabsList>
            <TabsTrigger value="saved-items">Saved Items</TabsTrigger>
            <TabsTrigger value="buy-again">Buy Again</TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="saved-items">
            <div className="flex items-start justify-center md:justify-start gap-4 flex-wrap">
              {savedProductLength > 0 ? (
                savedProduct?.map((product, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <SavedProductCard product={product} index={index} />
                  </div>
                ))
              ) : (
                <div className="flex items-start flex-col gap-3">
                  <h1>No Items Has Been Saved For Later</h1>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="buy-again">
            <BuyAgainProducts orders={orders} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-col gap-2 col-span-12 md:col-span-2 w-full">
        <div className="bg-white p-2 flex flex-col gap-3">
          <h1 className="text-lg flex items-center justify-between">
            Subtotal ({cartProductLength} items){" "}
            <span className="font-medium">{formatPrice(subTotal)}</span>
          </h1>
          <h1 className="text-lg flex items-center justify-between">
            Taxes (5%) <span className="font-medium">{formatPrice(Taxes)}</span>
          </h1>
          <h1 className="text-lg flex items-center justify-between">
            Shipping Fees{" "}
            <span className="font-medium">{formatPrice(ShippingFee)}</span>
          </h1>
          <Separator />
          <h1 className="text-lg flex items-center justify-between">
            Total Amount{" "}
            <span className="font-medium">{formatPrice(totalAmount)}</span>
          </h1>
          <CheckoutButton
            cartProducts={cartProducts!}
            cartProductLength={cartProductLength}
            totalAmount={totalAmount}
            panned={panned}
          />
          {panned && (
            <p className="text-sm text-rose-600">
              This is Account is Panned.{" "}
              <Link href={"#"}>
                <Button variant={"link"} size={"sm"} className="pl-0">
                  Report Now
                </Button>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
