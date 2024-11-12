"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, XCircle, XIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

import { Category } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import FileUpload from "@/components/fileUpload";

type CategoryImageEditProps = {
  category: Category;
  categoryId: string;
  vendorId: string;
};

const CategoryImageEdit = ({
  category,
  vendorId,
  categoryId,
}: CategoryImageEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(category.image);
  const router = useRouter();

  const handleAddImage = (item: string) => {
    setImage(item);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `/api/vendors/${vendorId}/categories/${categoryId}`,
        image
      );
      toast.success("category image updated successfully");
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
        <h2 className="text-xl font-medium text-slate-700">category Images</h2>
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
          {image && (
            <div className="flex items-start gap-1">
              <Image
                src={image!}
                alt="image"
                width={80}
                height={80}
                className="max-h-[100px]"
              />
              <XCircle
                className="w-4 h-4 cursor-pointer"
                onClick={handleRemoveImage}
              />
            </div>
          )}
          <div className="col-span-2 text-center flex flex-row items-center justify-start border-dashed ">
            <FileUpload
              endpoint="imageUploader"
              onChange={(url) => {
                if (url) {
                  setImage(url);
                }
              }}
            />
          </div>
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
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Image src={image!} alt={image!} width={100} height={100} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryImageEdit;
