"use client";
import { Separator } from "@/components/ui/separator";
import { BillingAddress, Order, ShippingAddress } from "@prisma/client";
import OrderItem from "../../_components/OrderItem";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatPrice";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import OrderButton from "../../../../../../../components/OrderButton";
import { ArrowLeft, XCircle } from "lucide-react";

const OrderContainerDetails = ({
  order,
}: {
  order: Order & {
    ShippingAddress: ShippingAddress | null;
    BillingAddress: BillingAddress | null;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onclick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/profiles/${order.profileId}/orders/${order.id}`, {
        paymentStatus: "open",
      });
      toast.success("Order Canceled Successfully");
      router.refresh();
      // router.back()
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-row items-start justify-between w-full bg-white p-5">
      <div className="flex items-start flex-col gap-4">
        <Button variant={"link"} onClick={() => router.back()} className="pl-0">
          <ArrowLeft className="w-4 h-4 mr-2" /> View Other Orders
        </Button>
        <h1 className="text-slate-800 font-medium text-3xl">Order Details</h1>
        {order.paymentStatus === "open" ? (
          <p className="text-slate-700 text-sm">You Canceled This Order</p>
        ) : (
          <p className="text-slate-700 text-sm">
            Purchased {moment(order.createdAt).fromNow()}
          </p>
        )}
        <h1 className="text-slate-800 font-medium">
          Order Amount :{" "}
          <span className="text-slate-700 font-normal ">
            {formatPrice(order.amount)}
          </span>
        </h1>
        <h1 className="text-slate-800 font-medium">
          Order Payment Status :{" "}
          <Badge
            className={cn(
              order.paymentStatus === "open" && "bg-slate-400",
              order.paymentStatus === "complete" && "bg-green-600"
            )}
          >
            {order.paymentStatus}
          </Badge>
        </h1>
        <h1 className="text-slate-800 font-medium">
          Order Delivery Status :{" "}
          <Badge
            className={cn(
              order.deliveryStatus && "bg-slate-400",
              order.deliveryStatus && "bg-green-600"
            )}
          >
            {order.deliveryStatus ? "Delivered " : "Not Delivered Yet"}
          </Badge>
        </h1>{" "}
        {order.ShippingAddress && (
          <>
            <h1 className="text-slate-800 font-medium">
              Order Shipping Address Information :{" "}
            </h1>

            <div className="flex flex-col items-start ml-4 gap-1">
              <span className="text-slate-700 font-normal text-sm">
                Counrty : {order.ShippingAddress!.country}
              </span>
              <span className="text-slate-700 font-normal text-sm">
                City : {order.ShippingAddress!.city}
              </span>
              <span className="text-slate-700 font-normal text-sm">
                State : {order.ShippingAddress!.state}
              </span>
              <span className="text-slate-700 font-normal text-sm">
                Street : {order.ShippingAddress!.street}
              </span>
              <span className="text-slate-700 font-normal text-sm">
                Postal Code : {order.ShippingAddress!.postalCode}
              </span>
            </div>
          </>
        )}
        <Separator />
        <div className="flex flex-wrap gap-6 items-start">
          {order?.products.map((product) => (
            <OrderItem key={product.productId} product={product} />
          ))}
        </div>
      </div>
      {order.paymentStatus === "complete" &&
        (!order.deliveryStatus && (
          <OrderButton
            onClick={onclick}
            isLoading={isLoading}
            variant={"destructive"}
            title={"Cancel Order"}
            icon={XCircle}
          />
        ))}
    </div>
  );
};

export default OrderContainerDetails;
