import { formatPrice } from "@/lib/formatPrice";
import { Rating } from "@mui/material";
import { Products, Review, orderType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import moment from "moment";

type OrderCardProps = {
  product: orderType;
  createdAt:Date
};

const OrderCard = ({ product , createdAt }: OrderCardProps) => {
  return (
    <Link href={`/product/${product.productId}`}>
      <div className="flex flex-col w-[300px] p-2 items-start border-b gap-2">
        <div className="relative h-[250px] w-full z-0">
          <Image
            src={product.selectedImage.image}
            alt={product.name || ""}
            fill
            className="object-fit"
          />
        </div>
        <div className="flex items-start justify-start flex-col text-start w-full gap-1">
        <Badge
          className={"bg-green-600"}
        >
          Purchased {moment(createdAt).fromNow()}
        </Badge>
          <h1 className="font-medium text-slate-800 text-lg">{product.name}</h1>
          <h1 className="font-medium text-slate-700 text-sm">{product.category}</h1>
          <p className="font-medium text-slate-600 text-sm">{product.sizes.map(size=>(
            size
          ))}</p>

          <h1 className="text-slate-700 text-sm">
            Price :
            <span>
              {" "}
              {formatPrice(product.priceAfterDiscount)}
            </span>
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
