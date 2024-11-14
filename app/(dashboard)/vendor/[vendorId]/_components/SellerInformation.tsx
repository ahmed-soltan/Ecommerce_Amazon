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
import Step2 from "@/app/(root)/(auth)/vendor-register/_components/Step2";

type SellerInformationProps = {
  vendor: Vendor & {
    Products: Products[] | null;
  };
};

const SellerInformation = ({ vendor }: SellerInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      username: vendor.username,
      fullName: vendor.fullName,
      email: vendor.email,
      phoneNumber: vendor.phoneNumber,
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (data: any) => {
    try {
      await axios.patch(`/api/vendors/${vendor.id}`, data);
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
    <div className="bg-white w-full p-5 flex flex-col gap-2 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">Seller Information</h2>
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
            <Step2 form={form} />
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
        <div className="flex items-start justify-between gap-5 md:px-5 flex-wrap">
          <div className="flex flex-col items-start gap-4 my-2">
            <div className="font-semibold flex flex-col items-start gap-y-1">
              Full Name
              <span className="text-slate-700 font-normal"> {vendor.fullName}</span>
            </div>
            <div className="font-semibold flex flex-col items-start gap-y-1">
              username
              <span className="text-slate-700 font-normal"> {vendor.username}</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 my-2">
            <div className="font-semibold flex flex-col items-start gap-y-1">
              Email Address
              <span className="text-slate-700 font-normal"> {vendor.email}</span>
            </div>
            <div className="font-semibold flex flex-col items-start gap-y-1">
              Phone Number
              <span className="text-slate-700 font-normal"> {vendor.phoneNumber}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerInformation;
