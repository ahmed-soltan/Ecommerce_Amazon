"use client";

import { categories } from "@/app/(dashboard)/vendor/[vendorId]/create-product/_components/AddProductsForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const BannerProducts = ({ products }: { products: any }) => {
  return (
    <div
      className="flex items-center gap-4 w-full my-2 overflow-x-auto"
      style={{ overflowX: "auto", scrollbarWidth: "none" }}
    >
      {categories.map((category) => {
        const product = products?.find(
          (product: any) => product.category === category.label
        );

        if (!product || category.label === "Clothes") {
          return null;
        }

        const ProductPhoto =
          product && category.label === "Clothes"
            ? product.images[1].image
            : product.images[0].image;
        return (
          <Link href={`/products?key=${category.label}&page=1`}>
            <div
              className="p-2 bg-white min-w-[250px] lg:min-w-[310px] xl:min-w-[330px] flex items-center justify-between gap-4 rounded-md"
              key={category.label}
            >
              <h1 className="text-lg font-medium text-slate-900 pl-2">
                {category.label}
              </h1>
              <div className="relative mt-4">
                <Image
                  src={ProductPhoto!}
                  alt={`Deals on ${category.label}`}
                  width={100}
                  height={100}
                  className="max-w-[80px] max-h-[50px]"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
              {/* <Button variant={"link"}>Shop Now</Button> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BannerProducts;
