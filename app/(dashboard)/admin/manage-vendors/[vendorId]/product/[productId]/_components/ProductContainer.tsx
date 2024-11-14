"use client";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { Badge } from "@/components/ui/badge";

import { Category, Products, Review } from "@prisma/client";
import { cn } from "@/lib/utils";

type ProductContainerProps = {
  product: Products & {
    reviews: Review[];
    images: {
      image: string;
      color: string;
      colorCode: string;
    }[];
  };
  category: Category;
};
const ProductContainer = ({ product, category }: ProductContainerProps) => {
  return (
    <div className="bg-slate-100">
      {!product.inStock && (
        <Banner
          variant={"warning"}
          label="This Product is not in Stock. It will not be Visible to your Customer"
        />
      )}
      <div className="p-6 flex flex-wrap flex-col items-start gap-4">
        <div className="flex items-start justify-between w-full flex-wrap gap-3">
          <h1 className="text-slate-800 font-medium text-3xl">
            Product Details
          </h1>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-4 w-full">
          <div className="bg-white rounded-md w-full p-5 flex flex-col gap-2">
            <div className="font-semibold text-black">
              Product Title:{" "}
              <span className="text-slate-700 font-normal">{product.name}</span>
            </div>
          </div>
          <div className="bg-white rounded-md w-full p-5 flex flex-col gap-2">
            <div className="font-semibold text-black">
              Product Price:{" "}
              <span className="text-slate-700 font-normal">{product.price}</span>
            </div>
          </div>
          <div className="bg-white rounded-md w-full p-5 flex flex-col gap-2">
            <div className="font-semibold text-black">
              Product Description:{" "}
              <span className="text-slate-700 font-normal">{product.price}</span>
            </div>
          </div>
          <div className="bg-white rounded-md w-full p-5 flex flex-col gap-2">
            <div className="font-semibold text-black">
              Product Details: <Preview value={product.details} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md p-5 flex flex-wrap items-center gap-4 w-full">
          <div className="flex items-start gap-2 my-2 font-semibold text-black">
            <div>Product Availability :</div>
            <Badge
              className={cn( 
                product.inStock && "bg-slate-400",
                product.inStock && "bg-orange-500"
              )}
            >
              {product.inStock ? `in Stock` : "out of Stock"}
            </Badge>
          </div>
        </div>
        <div className="bg-white rounded-md w-full p-5 flex flex-col gap-2">
          <div className="font-semibold text-black">
            Product Brand:{" "}
            <span className="text-slate-700 font-normal">{product.brand}</span>
          </div>
        </div>
        <div className="bg-white rounded-md w-full p-5 flex flex-col gap-2">
          <div className="font-semibold text-black">
            Product discount:{" "}
            <span className="text-slate-700 font-normal">
              {product?.discount ? product.discount : 0}%
            </span>
          </div>
        </div>
        <div className="bg-white rounded-md w-full p-5 flex flex-col gap-2">
          <div className="font-semibold text-black">
            Product Category: {""}
            <span className="text-slate-700 font-normal">{category.name}</span>
          </div>
        </div>
        {category.name !== "Clothes" && category.name !== "Shoes" ? null : (
          <div className="bg-white rounded-md w-full p-5 flex flex-col items-start gap-4 my-2">
            <div>Product Sizes :</div>
            <div className="flex items-center gap-4">
              {product.sizes.map((size) => {
                return (
                  <div key={size}>
                    <Button variant={"outline"}>{size}</Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex items-start gap-4 my-2 bg-white rounded-md w-full p-5 ">
          {product.images.map((image) => {
            return (
              <div
                key={image.colorCode}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-slate-700 font-normal" style={{ color: image.color }}>
                  {image.color}
                </span>
                <div className="relative">
                  <Image
                    src={image.image!}
                    alt={image.color}
                    width={130}
                    height={130}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
