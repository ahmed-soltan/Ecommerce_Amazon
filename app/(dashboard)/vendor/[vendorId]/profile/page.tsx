import { redirect } from "next/navigation";
import React from "react";

import BusinessInformation from "../_components/BusinessInformation";
import SellerInformation from "../_components/SellerInformation";
import StoreInformation from "../_components/StoreInformation";
import { getVendorById } from "@/actions/getVendorById";
import { Separator } from "@/components/ui/separator";

const page = async ({ params }: { params: { vendorId: string } }) => {
  const vendor = await getVendorById(params.vendorId);
  if (!vendor) {
    return redirect(`/vendor/${params.vendorId}/manage-products`);
  }
  return (
    <div className="flex flex-col items-start gap-4 px-4 py-10 bg-slate-100">
      <h1 className="text-3xl text-black font-medium">My Profile</h1>
      <Separator />
      <div className="flex items-start gap-5 flex-col w-full">
        <StoreInformation vendor={vendor} />
        <BusinessInformation vendor={vendor} />
        <SellerInformation vendor={vendor} />
      </div>
    </div>
  );
};

export default page;
