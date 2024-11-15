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

type ProductDiscountEditProps = {
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

const ProductDiscountEdit = ({
  product,
  vendorId,
  productId,
}: ProductDiscountEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      discount: product.discount || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (data: any) => {
    try {
      data.discount = parseFloat(data.discount);

      await axios.patch(`/api/vendors/${vendorId}/products/${productId}`, data);
      toast.success("Product Discount updated successfully");
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
        <h2 className="text-xl font-semibold text-black">Product Discount</h2>
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
            <ProductDiscount form={form} />
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
        <div className="flex flex-col items-start gap-4 my-2">
          <div>
            Product Discount :
            <span className="text-slate-500"> {product.discount?product.discount:0}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDiscountEdit;
