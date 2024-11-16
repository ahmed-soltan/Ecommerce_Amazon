"use client";

import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { formatPrice } from "@/lib/formatPrice";

import { orderType } from "@prisma/client";

type VendorOrderItemProps = {
  product: orderType;
  vendorId: string;
};

const VendorOrderItem = ({ product, vendorId }: VendorOrderItemProps) => {
  return (
      <Link
        href={`/vendor/${vendorId}/product/${product.productId}`}
        className="flex gap-2 items-start justify-start flex-wrap"
      >
        <Separator />
        <div className="flex flex-col w-full max-w-[250px] p-2 items-start border-b gap-2">
          <div className="relative h-[250px] w-full z-0">
            <Image
              src={product.selectedImage.image}
              alt={product.name || ""}
              fill
              className="object-fit"
            />
          </div>
          <div className="flex items-center justify-center flex-col text-center w-full gap-1">
            <h1 className="font-medium text-slate-800 text-sm line-clamp-2">
              {product.name}
            </h1>

            <h1 className="text-slate-700 text-sm">
              {formatPrice(product.priceAfterDiscount)}
            </h1>
            <h1 className="text-slate-700 text-sm">Qty : {product.quantity}</h1>
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
        </div>
      </Link>
  );
};

export default VendorOrderItem;
