"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MinusCircle, Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductTitleEdit from "./CategoryTitleEdit";
import ProductImagesEdit from "./CategoryImageEdit";
import Banner from "@/components/banner";
import ConfirmModel from "@/components/ConfirmModel";

import { Category, Products, Review } from "@prisma/client";
import CategoryImageEdit from "./CategoryImageEdit";
import CategoryTitleEdit from "./CategoryTitleEdit";

type CategoryContainerProps = {
  vendorId: string;
  categoryId: string;
  category: Category;
};

const CategoryContainer = ({
  vendorId,
  categoryId,
  category,
}: CategoryContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/vendors/${vendorId}/categories/${categoryId}`);
      router.push(`/vendor/${vendorId}/manage-products`);
      toast.success("Product Deleted Successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="p-6 flex flex-wrap flex-col items-start gap-4">
        <Link href={`/vendor/${vendorId}/manage-categories`}>
          <Button variant={"link"} className="pl-0">
            {" "}
            <ArrowLeft className="w-4 h-4 mr-2" /> View Other Categories
          </Button>
        </Link>
        <div className="flex items-start justify-between w-full flex-wrap gap-3">
          <h1 className="text-slate-800 font-medium text-3xl">
            Category Details
          </h1>
          <ConfirmModel onConfirm={onDelete}>
            <Button variant={"destructive"} size={"sm"} disabled={isLoading}>
              <p className="hidden sm:flex items-center">
                {" "}
                <MinusCircle className="w-4 h-4 mr-2" />
                Delete Category
              </p>
              <Trash className="w-4 h-4 block sm:hidden" />
            </Button>
          </ConfirmModel>
        </div>
        <Separator />
        <CategoryTitleEdit
          category={category}
          categoryId={categoryId}
          vendorId={vendorId}
        />

        <CategoryImageEdit
          category={category}
          categoryId={categoryId}
          vendorId={vendorId}
        />
      </div>
    </>
  );
};

export default CategoryContainer;
