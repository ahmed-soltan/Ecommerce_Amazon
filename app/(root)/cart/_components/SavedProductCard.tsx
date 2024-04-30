"use client";

import Image from "next/image";
import { cartProductType } from "../../product/[productId]/_components/ProductContainerDetails";
import { useState } from "react";
import SetQuantity from "../../product/[productId]/_components/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

type SavedProductCardProps = {
  product: cartProductType;
};

const SavedProductCard = ({ product }: SavedProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleAddToCartProduct, handleRemoverProductFromSavedLater } =
    useCart();
  return (
    <div className="flex flex-col p-2 items-start border-b gap-1">
      <Link href={`/product/${product.productId}`} className="z-10">
        <div className="flex flex-col min-w-[250px] p-2 items-start gap-1">
          <div className="relative h-[250px] w-full z-0">
            <Image
              src={product.selectedImage.image}
              alt={product.name || ""}
              fill
              className="object-fit"
            />
          </div>
          <div className="flex items-start justify-start flex-col text-start w-full gap-1">
            <h1 className="font-medium text-slate-800 text-lg">
              {product.name}
            </h1>
            <h1 className="text-slate-700 font-bold">
              {formatPrice(product.priceAfterDiscount)}
            </h1>
            <p className="text-slate-800 text-xs">
              Category : {product.category}
            </p>

            <p className="text-slate-800 text-xs">
              Color : {product.selectedImage.color}
            </p>

            {product.sizes.length > 0 && (
              <p className="text-slate-800 text-xs">
                Size :{" "}
                {product.sizes.map((size) => (
                  <span className="text-slate-700 text-xs" key={size}>
                    {size} {"  "}{" "}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </Link>
      <Button
        variant={"outline"}
        className="w-full"
        size={"sm"}
        onClick={() => handleAddToCartProduct(product)}
      >
        Move To Cart
      </Button>
      <Button
        variant={"link"}
        size={"sm"}
        onClick={() => handleRemoverProductFromSavedLater(product)}
        className="text-xs z-50"
      >
        {" "}
        Delete
      </Button>
    </div>
  );
};

export default SavedProductCard;
