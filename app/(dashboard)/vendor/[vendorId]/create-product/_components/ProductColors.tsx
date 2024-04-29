import { colors } from "@/Utils/Colors";
import React, { Dispatch, SetStateAction } from "react";

import SelectColor from "./SelectColor";
// import { Image } from "@prisma/client";
import Image from "next/image";
import { X, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ProductColorsProps = {
  handleAddImage: (value: {
    color: string;
    colorCode: string;
    image: string | null;
  }) => void;
  images: {
    color: string;
    colorCode: string;
    image: string | null;
  }[];
  handleRemoveImage: (index: number) => void;
};
const ProductColors = ({
  handleAddImage,
  images,
  handleRemoveImage,
}: ProductColorsProps) => {
  const addImageToState = (value: {
    color: string;
    colorCode: string;
    image: string | null;
  }) => {
    handleAddImage(value);
  };
  const removeImageFromState = (index: number) => {
    handleRemoveImage(index);
  };
  return (
    <div className="mt-5">
      <Separator className="my-4" />
      {images && images.length>0 && (
        <>
          <h1 className="font-medium text-slate-700 text-lg">Selected Images</h1>
          <div className="flex items-start flex-wrap gap-3 my-4">
            {images.map((image, index) => (
              <div className="flex items-start gap-1" key={index}>
                <Image
                  src={image?.image!}
                  alt="image"
                  width={80}
                  height={80}
                  className="max-h-[100px]"
                />
                <XCircle
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => removeImageFromState(index)}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <h2 className="font-medium text-slate-700 text-lg">
        Choose Image's Color
      </h2>
      <div className="flex items-center justify-start flex-wrap gap-4">
        {colors.map((color, index) => {
          return (
            <SelectColor
              key={index}
              item={color!}
              addImageToState={addImageToState}
              isProductCreated={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductColors;
