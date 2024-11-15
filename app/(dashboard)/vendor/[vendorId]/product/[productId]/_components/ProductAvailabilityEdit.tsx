"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Products, Review, Vendor } from "@prisma/client";
import { Pencil, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductAvailability from "../../../create-product/_components/ProductAvailabilty";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProductAvailabilityEditProps = {
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

const ProductAvailabilityEdit = ({
  product,
  vendorId,
  productId,
}: ProductAvailabilityEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      inStock: product.inStock,
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;
  const hasChanged = form.getValues("inStock") !== product.inStock

  const onSubmit = async (data: any) => {
    try {
      await axios.patch(`/api/vendors/${vendorId}/products/${productId}`, data);
      toast.success("Product Availablity updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-md w-full p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">
          Product Availability
        </h2>
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
            <ProductAvailability form={form} />
            <Button
              type="submit"
              className="my-2"
              disabled={!hasChanged || isSubmitting }
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex items-start gap-2 my-2">
          <div>
            Product Availability :
          </div>
            <Badge
              className={cn(
                product.inStock && "bg-slate-400",
                product.inStock && "bg-orange-500"
              )}
            >
              {product.inStock ? `in Stock` : "out of Stock"}
            </Badge>
        </div>
      )}
    </div>
  );
};

export default ProductAvailabilityEdit;
