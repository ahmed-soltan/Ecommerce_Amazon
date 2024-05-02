"use client";
import { Order } from "@prisma/client";
import OrderItem from "./OrderItem";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatPrice";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CancelOrderButton from "../../../../../../components/OrderButton";

type OrderListProps = {
  order: Order;
  canceled?: boolean;
  profileId: string;
  delivered?: boolean;
};
const OrderList = ({
  order,
  canceled,
  profileId,
  delivered,
}: OrderListProps) => {
  const router = useRouter();
  const [isLoading , setIsLoading] = useState(false)
  const onclick = async()=>{
    try {
      setIsLoading(true)
      await axios.patch(`/api/profiles/${order.profileId}/orders/${order.id}` , {paymentStatus:"open"})
      toast.success("Order Canceled Successfully")
      router.refresh()
      // router.back()
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="flex items-start flex-col gap-4">
      {canceled ? (
        <p className="text-slate-700 text-sm">You Canceled This Order</p>
      ) : (
        <p className="text-slate-700 text-sm">
          Purchased {moment(order.createdAt).fromNow()}
        </p>
      )}
      <h1 className="text-slate-800 font-medium">
        Order Amount :{" "}
        <span className="text-slate-700 font-normal ">{formatPrice(order.amount)}</span>
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
      </h1>
      <div className="flex items-center justify-start flex-wrap gap-3">
        <Button
          variant={"link"}
          className="m-0 p-0 text-sm"
          size={"sm"}
          onClick={() =>
            router.push(`/profile/${profileId}/orders/${order.id}`)
          }
        >
          View Order Details
        </Button>
        {canceled || order.deliveryStatus ? null : (
         <CancelOrderButton variant={"link"} onClick={onclick} isLoading={isLoading} title="Cancel Order" />
        )}
      </div>
      <Separator />
    </div>
  );
};

export default OrderList;
