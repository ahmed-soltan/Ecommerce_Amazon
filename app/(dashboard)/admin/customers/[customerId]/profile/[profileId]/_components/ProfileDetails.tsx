"use client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Order, Profile, Review } from "@prisma/client";
import moment from "moment";
import unknown from "../../../../../../../../public/unknown.jpeg";
import Image from "next/image";
import OrderContainerDetails from "@/app/(dashboard)/admin/order/[orderId]/_components/OrderContainerDetails";
import { Rating } from "@mui/material";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmModel from "@/components/ConfirmModel";
type ProfileDetailsProps = {
  profile: Profile & {
    Order: Order[];
    Review: Review[];
  };
};
const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const onDelete = async (id: string) => {
    try {
      setisLoading(true);
      await axios.delete(`/api/profiles/${profile.id}/rating/${id}`);
      toast.success("Review Deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-start gap-4 w-full">
        <Button
          variant={"link"}
          className="pl-0"
          onClick={() => router.push(`/admin/customers/${profile.userId}`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back To Customer Details
        </Button>
      <div className="flex items-start justify-between w-full">
        <h1 className="text-3xl font-medium test-slate-900">Profile Details</h1>

      </div>
      <Separator />
      <Image
        src={profile.profileImage || unknown}
        alt={profile.name}
        width={200}
        height={200}
        className="w-20 h-20 rounded-full"
      />

      <h1 className="text-xl font-medium test-slate-800">
        profile ID :{" "}
        <span className="text-base text-slate-600">{profile.id}</span>
      </h1>
      <h1 className="text-xl font-medium test-slate-800">
        profile Name :{" "}
        <span className="text-base text-slate-600">{profile.name}</span>
      </h1>
      <h1 className="text-xl font-medium test-slate-800">
        profile Status :{" "}
        <Badge
          className={cn(
            !profile.isSelected && "bg-slate-400",
            profile.isSelected && "bg-green-600"
          )}
        >
          {profile.isSelected ? `Current Profile` : "Not Used"}
        </Badge>
      </h1>
      <h1 className="text-xl font-medium test-slate-800">
        profile Created Account Date :{" "}
        <span className="text-base text-slate-600">
          {moment(profile.createdAt).fromNow()}
        </span>
      </h1>
      <Separator />
      <p>Profile Reviews : ({profile.Review.length}) Reviews</p>
      <div className="flex flex-col items-start gap-4 w-full">
        {profile.Review.length ? (
          profile.Review.map((review) => (
            <div className="flex items-start justify-between rounded-md border shadow-sm gap-2 p-4 w-full" key={review.id}>
              <div
                className="flex flex-col items-start justify-start"
                key={review.id}
              >
                <span className="text-sm text-slate-600">
                  Posted {moment(review.createdAt).fromNow()}
                </span>
                <Rating value={review.rating} />
                <p className="text-slate-800">{review.comment}</p>
                <Link href={`/product/${review.productId}`}>
                  <Button variant={"link"} className="pl-0">
                    View Reviewed Product{" "}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <ConfirmModel onConfirm={() => onDelete(review.id)}>
                <Button variant={"destructive"} disabled={isLoading}>
                  Delete Review
                </Button>
              </ConfirmModel>
            </div>
          ))
        ) : (
          <div className="text-slate-700">
            This Profile Haven&apos;t Posted a Review Before
          </div>
        )}
        <Separator />
      </div>
      <p>Profile Orders : ({profile.Order.length}) Orders</p>
      <div className="flex flex-row items-start gap-4 w-full flex-wrap">
        {profile.Order.length ? (
          profile.Order.map((order) => (
            <div
              className="flex items-center justify-start rounded-md border shadow-sm gap-2 p-4 w-full"
              key={order.id}
            >
              <OrderContainerDetails order={order} products={order.products} />
            </div>
          ))
        ) : (
          <div className="text-slate-700">
            This Profile Haven&apos;t Submitted an Order Before
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
