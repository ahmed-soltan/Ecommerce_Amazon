"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Products, Vendor } from "@prisma/client";
import { Pencil, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Step4 from "@/app/(root)/(auth)/vendor-register/_components/Step4";
import Image from "next/image";

type StoreInformationProps = {
  vendor: Vendor & {
    Products: Products[] | null;
  };
};

const StoreInformation = ({ vendor }: StoreInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(vendor.storeLogo);

  const router = useRouter();
  const form = useForm({
    defaultValues: {
      storeName: vendor.storeName,
      storeDescription: vendor.storeDescription,
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const handleSetImage = (image: string) => {
    setImage(image);
  };
  const onSubmit = async (data: any) => {
    try {
      const storeData = {
        storeLogo: image,
        storeName: data.storeName,
        storeDescription: data.storeDescription,
      };
      await axios.patch(`/api/vendors/${vendor.id}`, storeData);
      toast.success("Profile updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white w-full p-5 flex flex-col gap-5 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">Store Information</h2>
        <Button
          variant={"outline"}
          className="flex items-center text-md ml-auto"
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
            <Step4
              form={form}
              handleSetImage={handleSetImage}
              vendorImage={image}
            />
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
        <div className="flex items-start gap-4 my-2 flex-wrap">
          <div className="relative border-2 border-orange-300 rounded-full p-[2px] w-[130px] height-[130px]">
            <Image
              src={vendor.storeLogo}
              alt="Store Logo"
              width={130}
              height={130}
              className="rounded-full"
              style={{ aspectRatio: "1/1" }}
            />
          </div>
          <div className="flex flex-col items-start gap-y-2 my-2">
            <div className="font-semibold">
              Store Name :
              <span className="text-slate-700 font-normal">
                {" "}
                {vendor.storeName}
              </span>
            </div>
            <div className="font-semibold">
              Store Description :
              <span className="text-slate-700 font-normal truncate">
                {" "}
                {vendor.storeDescription}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInformation;
