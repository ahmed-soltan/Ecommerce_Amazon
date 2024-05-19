"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Products, Profile, User, Vendor } from "@prisma/client";
import { ArrowLeft, ArrowRight, MinusCircle } from "lucide-react";
import Image from "next/image";
import unknown from "../../../../../../public/unknown.jpeg";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { formatPrice } from "@/lib/formatPrice";
import { shortenTitle } from "@/Utils/stringCut";
type VendorDetailsProps = {
  vendor: Vendor & {
    Products: Products[];
  };
};
const VendorDetails = ({ vendor }: VendorDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const onclick = async () => {
  //   try {
  //     setIsLoading(true);
  //     await axios.patch(`/api/admin/vendor/${vendor.id}`, { panned: !vendor.panned });
  //     router.refresh();
  //     toast.success("vendor Status Updated Successfully");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <Button
        variant={"link"}
        className="pl-0"
        onClick={() => router.push(`/admin/manage-vendors`)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> View Other vendors
      </Button>
      <div className="flex items-start justify-between w-full">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold test-slate-900">vendor Details</h1>
      </div>
      <Separator  className="h-[1px] bg-slate-600"/>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor ID :{" "}
        <span className="text-base text-slate-600">{vendor.id}</span>
      </h1>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold test-slate-900">
        Store Information
      </h1>
      <Separator  className="h-[1px] bg-slate-600"/>
      <Image src={vendor.storeLogo} alt="Store Logo" width={200} height={200} />
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Store Name :{" "}
        <span className="text-base text-slate-600">{vendor.storeName}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Store Description :{" "}
        <span className="text-base text-slate-600">{vendor.storeDescription}</span>
      </h1>
      <Separator  className="h-[1px] bg-slate-600"/>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold test-slate-900">
        Business Information
      </h1>
      <Separator  className="h-[1px] bg-slate-600"/>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Business Name :{" "}
        <span className="text-base text-slate-600">{vendor.businessName}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Company Registertion Number :{" "}
        <span className="text-base text-slate-600">{vendor.companyRegistrationNumber}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Country :{" "}
        <span className="text-base text-slate-600">{vendor.country}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor State :{" "}
        <span className="text-base text-slate-600">{vendor.state}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor City :{" "}
        <span className="text-base text-slate-600">{vendor.city}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Address Line 1 :{" "}
        <span className="text-base text-slate-600">{vendor.addressLine1}</span>
      </h1>
      <Separator className="h-[1px] bg-slate-600"/>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold test-slate-900">
        Seller Information
      </h1>
      <Separator className="h-[1px] bg-slate-600"/>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Full Name :{" "}
        <span className="text-base text-slate-600">{vendor.fullName}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor username :{" "}
        <span className="text-base text-slate-600">{vendor.username}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Phone Number :{" "}
        <span className="text-base text-slate-600">{vendor.phoneNumber}</span>
      </h1>
      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Email Address :{" "}
        <span className="text-base text-slate-600">{vendor.email}</span>
      </h1>

      <h1 className="md:text-normal lg:text-xl font-medium test-slate-700">
        vendor Created Account Date :{" "}
        <span className="text-base text-slate-600">
          {moment(vendor.createdAt).fromNow()}
        </span>
      </h1>
      <Separator  className="h-[1px] bg-slate-600"/>
      <p>vendor Products : ({vendor.Products.length}) Products</p>
      <div className="flex items-start gap-4 flex-wrap">
        {vendor.Products.map((product) => (
          <div
            className="flex flex-col items-start justify-between rounded-md gap-1 max-w-[270px] h-[400px]"
            key={product.id}
          >
            <Image
              src={product.images[0].image || unknown}
              alt={product.name}
              width={200}
              height={100}
              className="max-h-[200px] w-full"
            />
            <h1 className="text-slate-800 font-semibold">{shortenTitle(product.name , 100)}</h1>
            <p className="text-slate-700 font-semibold text-sm">{formatPrice(product.price)}</p>
            <Link href={`/admin/manage-vendors/${vendor.id}/product/${product.id}`}>
              <Button variant={"link"} size={"sm"}>
                View <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDetails;
