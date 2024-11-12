"use client";
import React, { useState } from "react";
import axios from "axios";
import { Pencil, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Category, Products, Review } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ProductTitle from "../../../create-product/_components/ProductTitle";

type ProductTitleEditProps = {
  name: string;
  productId: string;
  vendorId: string;
};

const ProductTitleEdit = ({
  name,
  vendorId,
  productId,
}: ProductTitleEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: name || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (data: any) => {
    try {
      await axios.patch(`/api/vendors/${vendorId}/products/${productId}`, data);
      toast.success("Product Title updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-slate-100 w-full p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-slate-700">Product Title</h2>
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
            <ProductTitle form={form} />
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
            Product Title :
            <span className="text-slate-500"> {name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTitleEdit;
