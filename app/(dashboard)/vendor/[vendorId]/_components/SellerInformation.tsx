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
    <div className="bg-slate-100 w-full p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">
          Seller Information
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
        <div className="flex flex-col items-start gap-4 my-2">
          <div>
            Full Name :<span className="text-slate-500"> {vendor.fullName}</span>
          </div>
          <div>
            username :<span className="text-slate-500"> {vendor.username}</span>
          </div>
          <div>
            Email Address :
            <span className="text-slate-500"> {vendor.email}</span>
          </div>
          <div>
            Phone Number :
            <span className="text-slate-500"> {vendor.phoneNumber}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerInformation;
