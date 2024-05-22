"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Products, Review } from "@prisma/client";
import { Pencil, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import Step1 from "@/app/(root)/(auth)/vendor-register/_components/Step1";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductTitle from "../../../create-product/_components/ProductTitle";
import ProductColors from "../../../create-product/_components/ProductColors";
import Image from "next/image";

type ProductImagesEditProps = {
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

const ProductImagesEdit = ({
  product,
  vendorId,
  productId,
}: ProductImagesEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<
    | {
        color: string;
        colorCode: string;
        image: string | null;
      }[]
    | []
  >(product.images);
  const router = useRouter();

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

  const onSubmit = async () => {
    const productImages = {
      images: images,
    };
    try {
      setIsLoading(true);
      await axios.patch(
        `/api/vendors/${vendorId}/products/${productId}`,
        productImages
      );
      toast.success("Product images updated successfully");
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
        <h2 className="text-xl font-medium text-slate-700">Product Images</h2>
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
        <>
          <ProductColors
            handleAddImage={handleAddImage}
            images={images}
            handleRemoveImage={handleRemoveImage}
          />{" "}
          <Button
            type="submit"
            className="my-2"
            disabled={isLoading}
            onClick={onSubmit}
          >
            Save
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-4 my-2">
          {images.map((image) => {
            return (
              <div
                key={image.colorCode}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-slate-500" style={{ color: image.color }}>
                  {image.color}
                </span>
                <div className="relative">
                  <Image
                    src={image.image!}
                    alt={image.color}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductImagesEdit;
