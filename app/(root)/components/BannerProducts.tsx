"use client";

import Image from "next/image";
import Link from "next/link";

import { Category } from "@prisma/client";

type CategoryWithProductCount = Category & {
  productCount: number;
};

interface BannerProductsProps {
  categories: CategoryWithProductCount[];
}

const BannerProducts = ({ categories }: BannerProductsProps) => {
  return (
    <div
      className="flex items-center gap-10 w-full my-2 overflow-x-auto"
      style={{ overflowX: "auto", scrollbarWidth: "none" }}
    >
      {categories.map((category) => {
        return (
          <Link
            href={`/products?key=${category.id}&page=1`}
            key={category.id}
          >
            <div
              className="
             flex flex-col items-center justify-between gap-2 rounded-full"
            >
              <div className="relative mt-4 rounded-full w-[70px] h-[70px] md:w-[90px] md:h-[90px] bg-white border-[1px] border-orange-200 flex items-center justify-center hover:border-orange-700 transition-all">
                <Image
                  src={category.image}
                  alt={`Deals on ${category.name}`}
                  width={100}
                  height={100}
                  className=" max-w-[50px] max-h-[50px] md:max-w-[70px] md:max-h-[70px]"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-md font-medium text-slate-900">
                  {category.name}
                </h1>
                <p className="text-sm font-medium text-slate-500">
                  {category.productCount} Products
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
