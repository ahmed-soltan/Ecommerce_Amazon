"use client";
import React, { useEffect, useState } from "react";
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
import {
  AccessibilityIcon,
  Footprints,
  ForkliftIcon,
  Gamepad2Icon,
  HeartPulseIcon,
  HomeIcon,
  LaptopIcon,
  PcCaseIcon,
  PhoneIcon,
  Shirt,
  Sofa,
  StoreIcon,
  Tv2Icon,
  WatchIcon,
} from "lucide-react";
import ProductCategory from "@/app/(dashboard)/vendor/[vendorId]/create-product/_components/ProductCategory";

type ProductCategoryEditProps = {
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
export const categories = [
  {
    label: "All",
    icon: StoreIcon,
  },
  {
    label: "Phones",
    icon: PhoneIcon,
  },
  {
    label: "Labtops",
    icon: LaptopIcon,
  },
  {
    label: "Desktop",
    icon: PcCaseIcon,
  },
  {
    label: "Watchs",
    icon: WatchIcon,
  },
  {
    label: "TVs",
    icon: Tv2Icon,
  },
  {
    label: "Accessories",
    icon: AccessibilityIcon,
  },
  {
    label: "Clothes",
    icon: Shirt,
  },
  {
    label: "Furnitures",
    icon: Sofa,
  },
  {
    label: "Home",
    icon: HomeIcon,
  },
  {
    label: "Kitchen",
    icon: ForkliftIcon,
  },
  {
    label: "Personal Care",
    icon: HeartPulseIcon,
  },
  {
    label: "Video Games",
    icon: Gamepad2Icon,
  },
  {
    label: "Shoes",
    icon: Footprints,
  },
];
const ProductCategoryEdit = ({
  product,
  vendorId,
  productId,
}: ProductCategoryEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      category: product.category || "",
    },
  });

  const category = form.watch("category");
  useEffect(()=>{
    console.log(category)

  },[category])

  const { isSubmitting, isValid, isDirty } = form.formState;
  const onSubmit = async (data: any) => {
    try {
      await axios.patch(`/api/vendors/${vendorId}/products/${productId}`, data);
      toast.success("Product Category updated successfully");
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
        <h2 className="text-xl font-medium text-slate-700">Product Category</h2>
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
            <div className="w-full font-medium ">
              <div className="mb-2 font-medium text-md ">Select Categoy</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => {
                  if (item.label === "All") return null;
                  return (
                    <div key={item.label}>
                      <ProductCategory
                        label={item.label}
                        icon={item.icon}
                        onClick={(category: string) =>
                          form.setValue("category", category)
                        }
                        selected={category === item.label}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              type="submit"
              className="my-2"
              disabled={ isSubmitting || !isValid || product.category===category}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col items-start gap-4 my-2">
          <div>
            Product Category :
            <span className="text-slate-500"> {product.category}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategoryEdit;
