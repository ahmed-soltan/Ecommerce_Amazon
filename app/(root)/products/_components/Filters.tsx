import Image from "next/image";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Category, Products } from "@prisma/client";

interface FiltersProps {
  categories: Category[];
  onSubmit: (data: { minPrice: number; maxPrice: number }) => void;
}

const Filters = ({ categories, onSubmit }: FiltersProps) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      minPrice: 0,
      maxPrice: 0,
    },
  });

  const filterByCategory = (categoryId: string) => {
    if (!categoryId) {
      router.push(`/products?page=1`);
    } else {
      router.push(`/products?key=${categoryId}&page=1`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-lg font-medium text-slate-900">
          Select a Category
        </h1>
        <div className="flex flex-col items-start">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-x-3" key={category.id}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={40}
                  height={40}
                />
                <p
                  onClick={() => filterByCategory(category.id)}
                  className="cursor-pointer flex items-center text-sm"
                >
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-medium text-slate-900">Filter By price</h1>
        <div className="flex flex-row items-center flex-wrap">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
    </>
  );
};

export default Filters;
