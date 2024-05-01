"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { orderType } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type OrderItemProps = {
  product: orderType;
};
const OrderItem = ({
  product,
}: OrderItemProps) => {
  const router = useRouter();
  return (
    <Link href={`/product/${product.productId}`} className="flex gap-2 items-start justify-start flex-wrap">
      <div className="relative aspect-video">
        <Image
          src={product.selectedImage.image}
          alt={product.name}
          width={100}
          height={100}
          className="object-fit min-h-[150px]"
        />
      </div>
      <div className="flex flex-col items-start gap-2 justify-between h-full">
        <h1 className="text-xl text-slate-800 font-medium">{product.name}</h1>
        <p className="text-slate-800 text-sm">
          Color : {product.selectedImage.color}
        </p>
        <p className="text-slate-800 text-sm">
          Price : {formatPrice(product.priceAfterDiscount)}
        </p>
        <p className="text-slate-800 text-sm">
          Qty : {product.quantity}
        </p>
        {product.sizes.length > 0 && (
          <p className="text-slate-800">
            Size :{" "}
            {product.sizes.map((size) => (
              <span className="text-slate-700 text-sm" key={size}>
                {size} {"  "}{" "}
              </span>
            ))}
          </p> 
        )}      
      </div>
      <Separator/>
    </Link>
  );
};

export default OrderItem;
