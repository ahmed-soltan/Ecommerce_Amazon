"use client";

import { categories } from "@/app/(dashboard)/vendor/[vendorId]/create-product/_components/AddProductsForm";
import Image from "next/image";
import Link from "next/link";

const BannerProducts = ({ products }: { products: any }) => {
  return (
    <div
      className="flex items-center gap-10 w-full my-2 overflow-x-auto"
      style={{ overflowX: "auto", scrollbarWidth: "none" }}
    >
      {categories.map((category) => {
        const product = products?.find(
          (product: any) => product.category === category.label
        );
        const filteredProduct = products?.filter(
          (product: any) => product.category !== category.label
        );

        if (!product || category.label === "Clothes") {
          return null;
        }

        const ProductPhoto =
          product && category.label === "Clothes"
            ? product.images[1].image
            : product.images[0].image;
        return (
          <Link
            href={`/products?key=${category.label}&page=1`}
            key={category.label}
          >
            <div
              className="
             flex flex-col items-center justify-between gap-2 rounded-full"
            >
              <div className="relative mt-4 rounded-full w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-white border-[1px] border-orange-200 flex items-center justify-center hover:border-orange-700 transition-all">
                <Image
                  src={ProductPhoto!}
                  alt={`Deals on ${category.label}`}
                  width={100}
                  height={100}
                  className=" max-w-[60px] max-h-[60px] md:max-w-[80px] md:max-h-[80px]"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-md font-medium text-slate-900">
                  {category.label}
                </h1>
                <p className="text-sm font-medium text-slate-500">
                  {filteredProduct.length} Products
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BannerProducts;
