"use client";

import Image from "next/image";
import { cartProductType } from "../../product/[productId]/_components/ProductContainerDetails";
import { useState } from "react";
import SetQuantity from "../../product/[productId]/_components/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

type CartProductItemProps = {
  product: cartProductType;
};

const CartProductItem = ({ product }: CartProductItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {handleQuantityIncrease , handleQuantityDecrease , handleRemoverProductFromCart , handleSaveLater} = useCart()
  return (
    <div className="flex gap-2 items-start justify-start flex-wrap">
      <div className="relative aspect-video">
        <Image
          src={product.selectedImage.image}
          alt={product.name}
          width={200}
          height={100}
          className="object-fit max-h-[200px]"
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-xl text-slate-800 font-medium">{product.name}</h1>
        <p className="text-slate-800 text-sm">
          Color : {product.selectedImage.color}
        </p>
        <p className="text-slate-800 text-sm">Category : {product.category}</p>
        {product.sizes.length > 0 && (
          <p className="text-slate-800">
            Size :{" "}
            {product.sizes.map((size) => (
              <span className="text-slate-700 text-sm" key={size}>
                {size} {"  "}{" "}
              </span>
            ))}
          </p>
        )}
        <SetQuantity
          isLoading={isLoading}
          cartCounter={product.quantity}
          cartProduct={product}
          handleQuantityIncrease={() => {

            handleQuantityIncrease(product)
            
          }}
          handleQuantityDecrease={() => {
            handleQuantityDecrease(product)
          }}
        />
        <div className="flex items-center justify-start flex-wrap gap-3">
            <Button variant={"link"} onClick={()=>handleRemoverProductFromCart(product)} className="m-0 p-0 text-sm" size={"sm"}>Delete</Button>
            <Button variant={"link"} className="m-0 p-0 text-sm" size={"sm"} onClick={()=>handleSaveLater(product)}>Save For Later</Button>
            <Button variant={"link"} className="m-0 p-0 text-sm" size={"sm"}>Compare With Similar Products</Button>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
