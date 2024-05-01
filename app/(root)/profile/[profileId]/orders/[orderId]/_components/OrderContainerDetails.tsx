"use client"
import { Separator } from "@/components/ui/separator";
import { Order } from "@prisma/client";
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
import CancelOrderButton from "./CancelOrderButton";

const OrderContainerDetails = ({ order }: { order: Order }) => {
  const [isLoading , setIsLoading] = useState(false)
  const router = useRouter()
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
    <div className="flex flex-row items-start justify-between w-full">
      <div className="flex flex-col gap-4">
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
        <Separator />
        <div className="flex flex-col gap-4 items-start">
          {order?.products.map((product) => (
            <OrderItem key={product.productId} product={product} />
          ))}
        </div>
      </div>
      {order.paymentStatus === "complete" && !order.deliveryStatus && (

        <CancelOrderButton onCLick={onclick} isLoading={isLoading} variant={"default"} />
      )}
    </div>
  );
};

export default OrderContainerDetails;
