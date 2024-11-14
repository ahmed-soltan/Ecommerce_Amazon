import Image from "next/image";
import Link from "next/link";

import { shortenTitle } from "@/Utils/stringCut";
import { formatPrice } from "@/lib/formatPrice";

import { Products, Review } from "@prisma/client";

import { Rating } from "@mui/material";
import { Button } from "./ui/button";

type TopDealsProductsCardProps = {
  product: Products & {
    reviews: Review[] | null;
    images: {
      image: string;
      color: string;
      colorCode: string;
    }[];
  };
  isInCart?: boolean;
};

const TopDealsProductsCard = ({
  product,
  isInCart,
}: TopDealsProductsCardProps) => {
  const productRating =
    product.reviews &&
    product.reviews.reduce((acc: any, item: any) => acc + item.rating, 0) /
      product.reviews.length;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col w-full max-w-[250px] p-2 items-start border-b gap-2">
        <div className="relative h-[200px] md:h-[250px] w-full z-0">
          <Image
            src={product.images[0].image}
            alt={product.name || ""}
            fill
            className="object-fit"
          />
        </div>
        <div className="flex items-start justify-start flex-col text-start w-full gap-1">
          <div className="flex items-center">
            <Rating value={productRating} readOnly size="small" />
            <p className="text-sm text-slate-600">
              ({product.reviews?.length})
            </p>
          </div>
          <h1 className="font-medium text-slate-800 text-sm">
            {shortenTitle(product.name, 100)}
          </h1>
          {product.discount && product.discount > 0 ? (
            <>
              <div className="flex items-center">
                <h1 className="text-slate-100 px-1 bg-rose-600 text-sm">
                  {product.discount}% OFF
                </h1>
                <span className="text-rose-700 text-sm py-[2px] mx-2 font-medium rounded-md">
                  Limited Time Deal
                </span>
              </div>
              <h1 className="text-slate-700 text-sm">
                <span className=" text-slate-700 font-medium">
                  {formatPrice(
                    product.price -
                      (product.price * (product?.discount || 0 * 100)) / 100
                  )}
                </span>

                <span className="text-xs text-slate-500">
                  {" "}
                  Was : {formatPrice(product.price)}
                </span>
              </h1>
            </>
          ) : (
            <h1 className="text-slate-700 text-sm">
              {formatPrice(product.price)}
            </h1>
          )}
        </div>
      </div>
      {isInCart && (
        <Button className="w-full" variant={"ghost"}>
          In The Cart
        </Button>
      ) }
    </Link>
  );
};

export default TopDealsProductsCard;
