"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Products, Review } from "@prisma/client";
import { Pencil, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clothesSizes, shoesSizes } from "@/Utils/sizes";
import ProductSizes from "@/app/(dashboard)/vendor/[vendorId]/create-product/_components/ProductSizes";

type ProductSizesEditProps = {
  product: Products & {
    reviews: Review[] | null;
    images: {
      image: string;
      color: string;
      colorCode: string;
    }[];
  };
  productId: string;
  vendorId: string;
};

const ProductSizesEdit = ({
  product,
  vendorId,
  productId,
}: ProductSizesEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sizes, setSizes] = useState<string[]>(product.sizes);

  const router = useRouter();

  const form = useForm();

  const onClick = (size: string) => {
    if (sizes.includes(size)) {
      // If the size is already in the array, remove it
      setSizes((prev) => prev.filter((item) => item !== size));
    } else {
      // If the size is not in the array, add it
      setSizes((prev) => [...prev, size]);
    }
  };

  const onSubmit = async () => {
    const productSizes = {
      sizes,
    };
    try {
      setIsLoading(true);
      await axios.patch(
        `/api/vendors/${vendorId}/products/${productId}`,
        productSizes
      );
      toast.success("Product Sizes updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 w-full p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-slate-700">Product Sizes</h2>
        <Button
          variant={"ghost"}
          className="flex items-center text-md"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              Cancel <XIcon className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Edit <Pencil className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
      <Separator />
      {isEditing ? (
        <Form {...form}>
          <form>
            <div className="flex-col flex items-start gap-4">
              {product.category === "Clothes" && (
                <div className="w-full font-medium ">
                  <div className="mb-2 font-medium ">
                    Select a {product.category} Size
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto">
                    {clothesSizes.map((size) => {
                      return (
                        <div key={size.label}>
                          <ProductSizes
                          checked={product.sizes.includes(size.value)}
                            label={size.label}
                            onClick={onClick}
                            value={size.value}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {product.category === "Shoes" && (
                <div className="w-full font-medium ">
                  <div className="mb-2 font-medium ">
                    Select a {product.category} Size
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto">
                    {shoesSizes.map((size) => {
                      return (
                        <div key={size.label}>
                          <ProductSizes
                            label={size.label}
                            onClick={onClick}
                            value={size.value}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <Button disabled={isLoading} onClick={onSubmit}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col items-start gap-4 my-2">
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
    </div>
  );
};

export default ProductSizesEdit;
