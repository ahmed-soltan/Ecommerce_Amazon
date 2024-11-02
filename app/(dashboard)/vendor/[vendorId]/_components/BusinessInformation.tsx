"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Products, Vendor } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import Step1 from "@/app/(root)/(auth)/vendor-register/_components/Step1";

type BusinessInformationProps = {
  vendor: Vendor & {
    Products: Products[] | null;
  };
};

const BusinessInformation = ({ vendor }: BusinessInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      businessName: vendor.businessName,
      companyRegistrationNumber: vendor.companyRegistrationNumber,
      country: vendor.country,
      city: vendor.city,
      state: vendor.state,
      addressLine1: vendor.addressLine1,
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
    }finally{
        setIsEditing(false)
    }
  };

  return (
    <div className="bg-slate-100 w-full p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">
          Business Information
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
            <Step1 form={form} />
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
            Business Name :
            <span className="text-slate-500"> {vendor.businessName}</span>
          </div>
          <div>
            Company Registeration Number :
            <span className="text-slate-500">
               {vendor.companyRegistrationNumber}
            </span>
          </div>
          <div>
            Country :<span className="text-slate-500"> {vendor.country}</span>
          </div>
          <div>
            State :<span className="text-slate-500"> {vendor.state}</span>
          </div>
          <div>
            City :<span className="text-slate-500"> {vendor.city}</span>
          </div>
          <div>
            Address Line 1 :
            <span className="text-slate-500"> {vendor.addressLine1}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessInformation;
