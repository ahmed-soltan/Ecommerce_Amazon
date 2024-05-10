"use client";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBrowsingHistory } from "@/hooks/useBrowsingHistory";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishList";
import { Products, Review } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const BrowsingHistoryProducts = () => {
  const { BrowsingHistoryProducts, handleRemoveProductFromBrowsingHistory } =
    useBrowsingHistory();
  const { handleAddToCartProduct, cartProducts } = useCart();

  return (
    <div className="flex flex-col items-start gap-5 bg-white p-5">
      <h1 className="text-slate-800 font-medium text-2xl">
        Your Browsing History Products
      </h1>
      <Separator />
      {BrowsingHistoryProducts && BrowsingHistoryProducts.length > 0 ? (
        <div className={"flex flex-wrap items-start gap-3"}>
          {BrowsingHistoryProducts.map((product: Products, index: number) => {
            const cartProduct = {
              productId: product.id,
              name: product.name,
              selectedImage: { ...product.images[0] },
              quantity: 1,
              category: product.category,
              vendorId: product.vendorId,
              priceAfterDiscount:
                product.price -
                (product.price * (product?.discount || 0 * 100)) / 100,
              sizes: [],
            };
            const isProductInCart = cartProducts?.find(
              (cartProduct) => cartProduct.productId === product.id
            );
            return (
              <div key={product.id} className="flex flex-col gap-3">
                {/*@ts-ignore*/}
                <ProductCard product={product} />
                <Button
                  className="w-full"
                  variant={"outline"}
                  onClick={() => handleRemoveProductFromBrowsingHistory(index)}
                   size={"sm"}
                >
                  Delete
                </Button>
                {isProductInCart ? (
                  <Button className="w-full" variant={"ghost"}>
                    In The Cart
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={"amazonBtn"}
                    onClick={() => handleAddToCartProduct(cartProduct)} size={"sm"}
                  >
                    Add To Cart
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={"flex flex-col items-start gap-3"}>
          <p className={"text-slate-700 font-medium"}>
            You Haven&apos;t Browsed Any products Yet
          </p>
          <Link href="/products?&page=1">
            <Button variant={"amazonBtn"}>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BrowsingHistoryProducts;
