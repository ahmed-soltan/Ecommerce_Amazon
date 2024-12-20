import Image from "next/image";
import Link from "next/link";

import { Rating } from "@mui/material";

import { formatPrice } from "@/lib/formatPrice";

type ProductCardProps = {
  product: any
};

const ProductCard = ({ product }: ProductCardProps) => {
  const productRating =
    product.reviews &&
    product.reviews.reduce((acc: any, item: any) => acc + item.rating, 0) /
      product.reviews.length;
  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col w-full max-w-[250px] p-2 items-start border-b gap-2">
        <div className="relative h-[250px] w-full z-0">
          <Image
            src={product.images[0].image}
            alt={product.name || ""}
            fill
            className="object-fit"
          />
        </div>
        <div className="flex items-center justify-center flex-col text-center w-full gap-1">
          <h1 className="font-medium text-slate-800 text-sm line-clamp-2">
            {product.name}
          </h1>
          <div className="flex items-center">
            <Rating value={productRating} readOnly size="small" />
            <p className="text-sm text-slate-600">
              ({product.reviews?.length})
            </p>
          </div>
          {product.discount && product.discount > 0 ? (
            <>
              <h1 className=" text-rose-600">
                {product.discount}%{"  "}
                <span className="text-sm text-slate-700">
                  {formatPrice(
                    product.price -
                      (product.price * (product?.discount || 0 * 100)) / 100
                  )}
                </span>
              </h1>
              <h1 className="text-slate-700 text-sm">
                Typical Price :
                <span className="line-through">
                  {" "}
                  {formatPrice(product.price)}
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
    </Link>
  );
};

export default ProductCard;
