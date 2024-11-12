"use client";
import React, { useState } from "react";
import { Pencil, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { Category } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CategoryTitle from "../../../create-category/_components/CategoryTitle";

type CategoryTitleEditProps = {
  category: Category
  categoryId: string;
  vendorId: string;
};

const CategoryTitleEdit = ({
  category,
  vendorId,
  categoryId,
}: CategoryTitleEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: category.name || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: any) => {
    try {
      await axios.patch(
        `/api/vendors/${vendorId}/categories/${categoryId}`,
        data
      );
      toast.success("category Title updated successfully");
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
        <h2 className="text-xl font-medium text-slate-700">category Title</h2>
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
            <CategoryTitle form={form} />
            <Button
              type="submit"
              className="my-2"
              disabled={isSubmitting || !isValid}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col items-start gap-4 my-2">
          <div>
            category Title :
            <span className="text-slate-500"> {category.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTitleEdit;
