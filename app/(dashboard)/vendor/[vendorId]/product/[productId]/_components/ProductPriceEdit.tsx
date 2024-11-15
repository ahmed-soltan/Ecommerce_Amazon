"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Image, Products, Review, Vendor } from "@prisma/client";
import { Pencil, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import Step1 from "@/app/(root)/(auth)/vendor-register/_components/Step1";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductTitle from "../../../create-product/_components/ProductTitle";
import ProductDiscount from "../../../create-product/_components/ProductDiscount";
import ProductPrice from "../../../create-product/_components/ProductPrice";
import { formatPrice } from "@/lib/formatPrice";

type ProductPriceEditProps = {
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

const ProductPriceEdit = ({
  product,
  vendorId,
  productId,
}: ProductPriceEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      price: product.price || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (data: any) => {
    try {
      data.price = parseFloat(data.price);

      await axios.patch(`/api/vendors/${vendorId}/products/${productId}`, data);
      toast.success("Product Price updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white w-full p-5 flex flex-col gap-2 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">Product Price</h2>
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ProductPrice form={form} />
            <Button
              type="submit"
              className="my-2"
              disabled={!isDirty || isSubmitting || !isValid}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div className="font-medium">
            Product Price :
            <span className="text-slate-700 font-normal">
              {" "}
              {formatPrice(product.price)}
            </span>
        </div>
      )}
    </div>
  );
};

export default ProductPriceEdit;
