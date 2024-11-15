"use client";

import moment from "moment";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import VendorOrderItem from "./OrderItem";

import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

import {
  BillingAddress,
  Order,
  ShippingAddress,
  orderType,
} from "@prisma/client";
import { ArrowLeft } from "lucide-react";

type OrderContainerDetailsProps = {
  order: Order & {
    ShippingAddress: ShippingAddress | null;
    BillingAddress: BillingAddress | null;
  };
  products: orderType[];
  vendorId: string;
};

const OrderContainerDetails = ({
  order,
  products,
  vendorId,
}: OrderContainerDetailsProps) => {
  const amount = products.reduce(
    (acc, product) => acc + product.priceAfterDiscount * product.quantity,
    0
  );
  return (
    <div className="p-6 flex flex-wrap flex-col items-start gap-4">
      <Link href={`/vendor/${vendorId}/manage-orders`}>
        <Button variant={"link"} className="pl-0">
          {" "}
          <ArrowLeft className="w-4 h-4 mr-2" /> View Other Orders
        </Button>
      </Link>
      <div className="flex flex-col gap-4">
        <h1 className="text-slate-800 font-medium text-3xl">Order Details</h1>
        <Separator />
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
        <div className="flex flex-col gap-4 items-start">
          {products.map((product) => (
            <VendorOrderItem
              key={product.productId}
              product={product}
              vendorId={vendorId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderContainerDetails;
