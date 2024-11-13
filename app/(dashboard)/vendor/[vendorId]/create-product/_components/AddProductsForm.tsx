"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductPrice from "./ProductPrice";
import Banner from "@/components/banner";
import ProductBrand from "./ProductBrand";
import ProductDiscount from "./ProductDiscount";
import ProductAvailabilty from "./ProductAvailabilty";
import ProductColors from "./ProductColors";
import ProductCategory from "./ProductCategory";
import ProductSizes from "./ProductSizes";
import ProductDetails from "./ProductDetails";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Category } from "@prisma/client";

import { clothesSizes, shoesSizes } from "@/Utils/sizes";

type AddProductsFormProps = {
  vendorId: string;
  categories: Category[];
};

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  price: z.string().min(1, {
    message: "Product price must be at least 1.",
  }),
  category: z.string(),
  description: z.string().min(3, {
    message: "Product description must be at least 3 characters.",
  }),
  brand: z.string().min(3, {
    message: "Product description must be at least 3 characters.",
  }),
  details: z.string(),
  inStock: z.boolean(),
  discount: z.string(),
});

const AddProductsForm = ({ vendorId, categories }: AddProductsFormProps) => {
  const [sizes, setSizes] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<
    {
      color: string;
      colorCode: string;
      image: string | null;
    }[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      details: "",
      brand: "",
      inStock: false,
      discount: "",
    },
  });
  const router = useRouter();
  const { getValues } = form;
  const { isSubmitting, isValid } = form.formState;

  const handleAddImage = (item: {
    color: string;
    colorCode: string;
    image: string | null;
  }) => {
    setImages((prevImages) => (prevImages ? [...prevImages, item] : [item]));
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const category = form.watch("category");

  const requiredField = [
    getValues("name"),
    getValues("description"),
    getValues("price"),
    category,
    images.length > 0,
    category === "Clothes" || category === "Shoes" ? sizes.length > 0 : true,
  ];
  const onClick = (size: string) => {
    if (sizes.includes(size)) {
      setSizes((prev) => prev.filter((item) => item !== size));
    } else {
      setSizes((prev) => [...prev, size]);
    }
  };

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredField.every(Boolean);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { category, ...productData } = data;
    const body = {
      ...productData,
      images,
      sizes,
      vendorId,
      categoryId,
    };

    try {
      await axios.post(`/api/vendors/${vendorId}/products`, body);
      toast.success("Product Created successfully");
      router.refresh();
      router.push(`/vendor/${vendorId}/manage-products`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      {!form.getValues("inStock") && (
        <Banner
          variant={"warning"}
          label="This Product is not in Stock. It will not be Visible to your Customer"
        />
      )}
      <div className="p-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Product Creation</h1>
          <span className="text-sm text-slate-700">
            Complete All Fields {completionText}
          </span>
          <Separator />
        </div>
        <Form {...form}>
          <form
            className="space-y-4 w-full mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ProductTitle form={form} />
            <ProductDescription form={form} />
            <ProductDetails form={form} />
            <ProductPrice form={form} />
            <ProductBrand form={form} />
            <ProductDiscount form={form} />
            <div className="w-full font-medium ">
              <div className="mb-2 font-medium text-md ">Select Category</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => {
                  return (
                    <div key={item.id}>
                      <ProductCategory
                        name={item.name}
                        onClick={(category: string) => {
                          form.setValue("category", category);
                          setCategoryId(item.id);
                        }}
                        selected={category === item.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {category === "Clothes" && (
              <div className="w-full font-medium ">
                <div className="mb-2 font-medium ">
                  Select a {category} Size
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto">
                  {clothesSizes.map((size) => {
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
            {category === "Shoes" && (
              <div className="w-full font-medium ">
                <div className="mb-2 font-medium ">
                  Select a {category} Size
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
            <ProductAvailabilty form={form} />
            <ProductColors
              handleAddImage={handleAddImage}
              images={images}
              handleRemoveImage={handleRemoveImage}
            />
            <Button
              variant={"amazonBtn"}
              disabled={!isComplete || !isValid || isSubmitting}
            >
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddProductsForm;
