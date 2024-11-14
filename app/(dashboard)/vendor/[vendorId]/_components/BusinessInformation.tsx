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
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white w-full p-5 flex flex-col gap-2 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">
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
        <div className="flex items-start justify-between gap-5 md:px-5 flex-wrap">
          <div className="flex flex-col items-start gap-4 my-2">
            <div className="font-semibold flex flex-col items-start gap-y-2">
              Business Name
              <span className="text-slate-700 font-normal">
                {" "}
                {vendor.businessName}
              </span>
            </div>
            <div className="font-semibold flex flex-col items-start gap-y-2">
              Company Registration Number
              <span className="text-slate-700 font-normal">
                {vendor.companyRegistrationNumber}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 my-2">
            <div className="font-semibold flex flex-col items-start gap-y-2">
              Country
              <span className="text-slate-700 font-normal">
                {" "}
                {vendor.country}
              </span>
            </div>
            <div className="font-semibold flex flex-col items-start gap-y-2">
              State
              <span className="text-slate-700 font-normal">
                {" "}
                {vendor.state}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 my-2">
            <div className="font-semibold flex flex-col items-start gap-y-2">
              City
              <span className="text-slate-700 font-normal">{vendor.city}</span>
            </div>
            <div className="font-semibold flex flex-col items-start gap-y-2">
              Address Line 1
              <span className="text-slate-700 font-normal">
                {vendor.addressLine1}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessInformation;
