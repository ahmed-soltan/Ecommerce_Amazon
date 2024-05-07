"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Profile, User } from "@prisma/client";
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
type CustomerDetailsProps = {
  customer: User & {
    profile: Profile[];
  };
};
const CustomerDetails = ({ customer }: CustomerDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onclick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/admin/customer/${customer.id}`, { panned: !customer.panned });
      router.refresh();
      toast.success("Customer Status Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <Button variant={"link"} className="pl-0" onClick={()=>router.push(`/admin/customers`)}><ArrowLeft className="w-4 h-4 mr-2"/> View Other Customers</Button>
        <div className="flex items-start justify-between w-full">
        <h1 className="text-3xl font-medium test-slate-900">
          Customer Details
        </h1>
      {customer.panned ? (
        <Button
          variant={"success"}
          size={"sm"}
          onClick={onclick}
          disabled={isLoading}
        >
          <MinusCircle className="w-4 h-4 mr-2" />
          unblock Customer
        </Button>
      ) : (
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={onclick}
          disabled={isLoading}
        >
          <MinusCircle className="w-4 h-4 mr-2" />
          Pan Customer
        </Button>
      )}
    </div>
        <Separator />
        <h1 className="text-xl font-medium test-slate-800">
          Customer ID :{" "}
          <span className="text-base text-slate-600">{customer.id}</span>
        </h1>
        <h1 className="text-xl font-medium test-slate-800">
          Customer Name :{" "}
          <span className="text-base text-slate-600">{customer.username}</span>
        </h1>
        <h1 className="text-xl font-medium test-slate-800">
          Customer Email Address :{" "}
          <span className="text-base text-slate-600">{customer.email}</span>
        </h1>
        <h1 className="text-xl font-medium test-slate-800">
          Customer Status :{" "}
          <Badge
            className={cn(
              customer.panned && "bg-rose-500",
              !customer.panned && "bg-green-600"
            )}
          >
            {customer.panned ? `Panned` : "Not Panned"}
          </Badge>
        </h1>
        <h1 className="text-xl font-medium test-slate-800">
          Customer Created Account Date :{" "}
          <span className="text-base text-slate-600">
            {moment(customer.createdAt).fromNow()}
          </span>
        </h1>
        <Separator />
        <p>Customer Profiles : ({customer.profile.length}) Profiles</p>
        <div className="flex items-center gap-4">
          {customer.profile.map((profile) => (
            <div
              className="flex flex-col items-center justify-center rounded-md border shadow-sm gap-2 p-4 w-[300px]"
              key={profile.id}
            >
              <Image
                src={profile.profileImage || unknown}
                alt={profile.name}
                width={100}
                height={100}
                className="w-12 h-12 rounded-full"
              />
              <p className="text-slate-800 font-medium">{profile.name}</p>
              <Link
                href={`/admin/customers/${customer.id}/profile/${profile.id}`}
              >
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

export default CustomerDetails;
