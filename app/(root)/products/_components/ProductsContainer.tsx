"use client";

import { filterProducts } from "@/actions/filterByPrice";
import { categories } from "@/app/(dashboard)/vendor/[vendorId]/create-product/_components/AddProductsForm";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Products, Review } from "@prisma/client";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  FilterIcon,
  LucideIcon,
  LucideMoveDown,
  MoveDown,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

interface ProductsContainerProps {
  products: any;
  searchParams: {
    key: string;
    page: any;
    pageSize: any;
  };
}
const SORT_OPTIONS = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "Price Low to High",
    value: "price_asc",
  },
  {
    name: "Price High to Low",
    value: "price_dsc",
  },
];
const ProductsContainer = ({
  products,
  searchParams,
}: ProductsContainerProps) => {
  const [filters, setFilters] = useState({
    sort: "none",
  });
  const [filteredProducts, setFilteredProducts] =
    useState<Products[]>(products);
  const router = useRouter();
  const searchParamsLinks = useSearchParams();
  const currentPage = searchParamsLinks?.get("page");
  const form = useForm({
    defaultValues: {
      minPrice: 0,
      maxPrice: 0,
    },
  });
  const length = products ? Math.ceil(products.length) : 0;

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  useEffect(() => {
    sortProducts();
  }, [filters]);
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (minPriceRef.current) minPriceRef.current.blur();
    if (maxPriceRef.current) maxPriceRef.current.blur();
  }, []);

  const sortProducts = () => {
    let sortedProducts = [...filteredProducts];
    if (filters.sort === "price_asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
      setFilteredProducts(sortedProducts);
    } else if (filters.sort === "price_dsc") {
      sortedProducts.sort((a, b) => b.price - a.price);
      setFilteredProducts(sortedProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  const onIncrease = () => {
    if (!searchParams.key) {
      router.push(`/products?&page=${parseInt(currentPage!) + 1}`);
    } else {
      router.push(
        `/products?key=${searchParams.key}&page=${parseInt(currentPage!) + 1}`
      );
    }
  };
  const onDecrease = () => {
    if (!searchParams.key) {
      router.push(`/products?&page=${parseInt(currentPage!) - 1}`);
    } else {
      router.push(
        `/products?key=${searchParams.key}&page=${parseInt(currentPage!) - 1}`
      );
    }
  };

  const filterByCategory = (category: string) => {
    if (category === "All") {
      router.push(`/products?page=1`);
    } else {
      router.push(`/products?key=${category}&page=1`);
    }
  };

  const onSubmit = (data: FieldValues) => {
    const { minPrice, maxPrice } = data; // Retrieve minPrice and maxPrice from form data

    const filtered = products.filter((product: any) => {
      const price = parseFloat(product.price);
      console.log(price);
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredProducts(filtered);
  };

  if (!products) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-2">
      <div className="col-span-1 rounded-md p-3 hidden lg:block bg-white ">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-lg font-medium text-slate-900">
            Select a Category
          </h1>
          <div className="flex flex-col items-start gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <p
                  onClick={() => filterByCategory(category.label)}
                  key={category.label}
                  className="cursor-pointer flex items-center text-sm"
                >
                  <Input type="radio" className="text-sm w-3 h-3 mr-2" name={"Category"} id={category.label} />
                  <Icon className="w-4 h-4 mr-1" /> <Label htmlFor={category.label}>{category.label}{" "}</Label>
                </p>
              );
            })}
          </div>
        </div>
        <Separator className="my-5" />
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-medium text-slate-900">
            Filter By price
          </h1>
          <div className="flex flex-row items-center flex-wrap gap-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <div className="flex flex-row items-center gap-1">
                  <FormField
                    name="minPrice"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className=" p-0 m-0">min</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="max-w-[80px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="maxPrice"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className=" p-0 m-0">Max</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="max-w-[80px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  size={"sm"}
                  type="submit"
                  className="w-full md:w-auto"
                  variant={"amazonBtn"}
                >
                  Search
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 rounded-md bg-white flex flex-col items-start gap-4 p-5 w-full">
        <div className="flex w-full items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className={`my-1 ${
                      filters.sort === option.value
                        ? "bg-slate-100 text-slate-900"
                        : "bg-transparent text-slate-700"
                    }`}
                    onClick={() =>
                      setFilters({ ...filters, sort: option.value })
                    }
                  >
                    {option.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"sm"}>
                  <FilterIcon className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"} className="overflow-y-auto">
                <div className="flex flex-col items-start gap-4 overflow-y-auto">
                  <h1 className="text-lg font-medium text-slate-900">
                    Select a Category
                  </h1>
                  <div className="flex flex-col items-start gap-3">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <p
                          onClick={() => filterByCategory(category.label)}
                          key={category.label}
                          className="cursor-pointer flex items-center text-sm"
                        >
                          <Icon className="w-4 h-4 mr-1" /> {category.label}{" "}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <Separator className="my-5" />
                <div className="flex flex-col items-start gap-4">
                  <h1 className="text-lg font-medium text-slate-900">
                    Filter By price
                  </h1>
                  <div className="flex flex-row items-center flex-wrap gap-3">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                      >
                        <div className="flex flex-row items-center gap-1">
                          <FormField
                            name="minPrice"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className=" p-0 m-0">min</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    className="max-w-[80px]"
                                    autoFocus={false}
                                    ref={minPriceRef}
                                    />
                                </FormControl>
                              </FormItem>
                            )}
                            />
                          <FormField
                            name="maxPrice"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className=" p-0 m-0">Max</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    className="max-w-[80px]"
                                    autoFocus={false}
                                    ref={maxPriceRef}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          size={"sm"}
                          type="submit"
                          className="w-full md:w-auto"
                          variant={"amazonBtn"}
                        >
                          Search
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2 w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <div>No Product Found</div>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 w-full">
          <Button
            size={"sm"}
            onClick={onDecrease}
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
            onClick={onIncrease}
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
