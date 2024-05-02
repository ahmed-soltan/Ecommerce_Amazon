"use client"

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { Order, orderType } from "@prisma/client";
import moment from "moment";
import VendorOrderItem from "./OrderItem";

type OrderContainerDetailsProps ={
    order: Order;
    products:orderType[]
    vendorId:string
}
const OrderContainerDetails = ({
    order,
    products,
    vendorId
}:OrderContainerDetailsProps) => {
    
  
    const amount = products.reduce((acc, product) => (
        acc + product.priceAfterDiscount * product.quantity
      ),0)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-slate-800 font-medium text-3xl">Order Details</h1>
      <Separator/>
      {order.paymentStatus === "open" ? (
        <p className="text-slate-700 text-sm">This Order was Canceled</p>
      ) : (
        <p className="text-slate-700 text-sm">
          Purchased {moment(order.createdAt).fromNow()}
        </p>
      )}
      <h1 className="text-slate-800 font-medium">
        Order Amount :{" "}
        <span className="text-slate-700 font-normal ">
          {formatPrice(amount)}
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
          {order.paymentStatus === "complete" ? "completed" : "Canceled"}
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
        {products.map((product) => (
          <VendorOrderItem key={product.productId} product={product} vendorId={vendorId}/>
        ))}
      </div>
    </div>

  )
}

export default OrderContainerDetails