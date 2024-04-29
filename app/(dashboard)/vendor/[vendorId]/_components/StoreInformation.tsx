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
      const storeData ={
        storeLogo: image,
        storeName: data.storeName,
        storeDescription: data.storeDescription,
      }
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
    <div className="bg-slate-100 w-full p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">
          Store Information
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
            <Step4 form={form} handleSetImage={handleSetImage} vendorImage={image}/>
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
          <div className="flex items-start flex-col gap-2">
            Store Logo
            <div className="relative border border-orange-300 rounded-md p-2">
              <Image
                src={vendor.storeLogo}
                alt="Store Logo"
                width={130}
                height={130}
              />
            </div>
          </div>
          <div>
            Store Name :
            <span className="text-slate-500"> {vendor.storeName}</span>
          </div>
          <div>
            Store Description :
            <span className="text-slate-500 truncate"> {vendor.storeDescription}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInformation;
