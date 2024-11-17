"use client";

import { ArrowLeft, ArrowRight, FilterIcon } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SortOptions from "./SortOptions";
import Filters from "./Filters";

import useProductsHandler from "../hooks/use-product-handler";

import { Category, Products } from "@prisma/client";

interface ProductsContainerProps {
  products: Products[];
  searchParams: {
    key: string;
    page: any;
    pageSize: any;
  };
  categories: Category[];
}

const ProductsContainer = ({
  products,
  searchParams,
  categories,
}: ProductsContainerProps) => {
  const {
    filters,
    setFilters,
    filteredProducts,
    currentPage,
    length,
    onPageChange,
    onSubmit,
  } = useProductsHandler({ initialProducts: products, searchParams });

  if (!products) {
    return <div className="w-full text-center italic text-slate-700">No Products Found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-2">
      <div className="col-span-1 rounded-md p-3 hidden lg:block bg-white ">
        <Filters categories={categories} onSubmit={onSubmit} />
      </div>
      <div className="col-span-12 lg:col-span-6 rounded-md bg-white flex flex-col items-start gap-4 p-5 w-full">
        <div className="flex w-full items-center justify-between">
          <SortOptions setFilters={setFilters} filters={filters} />
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"sm"}>
                  <FilterIcon className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"} className="overflow-y-auto">
                <Filters categories={categories} onSubmit={onSubmit} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2 w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <div className="w-full text-center italic text-slate-500">No Products Found</div>
          )}
        </div>
        <div className="flex items-center justify-center w-full gap-2">
          <Button
            size={"sm"}
            onClick={() => onPageChange(-1)}
            variant={"outline"}
            disabled={
              !currentPage || (!!currentPage && parseInt(currentPage) === 1)
            }
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            size={"sm"}
            onClick={() => onPageChange(1)}
            disabled={length <= 9}
            variant={"outline"}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
