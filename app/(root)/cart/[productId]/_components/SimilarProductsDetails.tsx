"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatPrice";
import { Rating } from "@mui/material";
import { Products, Review } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

type SimilarProductsDetailsProps = {
  similarProducts: any[];
  product: Products & {
    reviews: {
      rating: number;
    }[];
  };
};
const SimilarProductsDetails = ({
  similarProducts,
  product,
}: SimilarProductsDetailsProps) => {
  const { cartProducts, handleAddToCartProduct } = useCart();
  const ScartProduct = cartProducts?.find(p => p.productId === product.id)
  const productRating =
    product.reviews &&
    product.reviews.reduce((acc: any, item: any) => acc + item.rating, 0) /
      product.reviews.length;

  const onClick = (cartProduct: Products) => {
    const cartProductDetails = {
      productId: cartProduct.id,
      name: cartProduct.name,
      selectedImage: { ...cartProduct.images[0] },
      quantity: 1,
      category: cartProduct.category,
      vendorId: cartProduct.vendorId,
      priceAfterDiscount:
      cartProduct.price - (cartProduct.price * (cartProduct?.discount || 0 * 100)) / 100,
      sizes: [...ScartProduct?.sizes!],
    };
    handleAddToCartProduct(cartProductDetails)
    toast.success(`${cartProduct.name} Added To Cart`)
  };

  
  return (
    <div className="flex flex-col items-start gap-5 bg-white p-5 rounded-md">
      <h1 className="font-medium text-lg font-slate-700">
        Similar Products{" "}
        <span className="text-slate-700">({similarProducts.length})</span>
      </h1>
      <div className="flex item-center flex-wrap gap-4">
        <Link
          href={`/product/${product.id}`}
          className="flex flex-col items-start gap-2"
        >
          <Image
            src={product.images[0].image}
            alt={product.name}
            width={200}
            height={100}
            className="max-h-[150px]"
          />
          <h1 className="text-lg font-medium text-slate-700">{product.name}</h1>
          <ul className="flex flex-col items-start gap-2 w-full">
            <li className="bg-slate-200 w-full p-1">
              {formatPrice(product.price)}
            </li>
            <li className="flex items-center gap-x-1 bg-slate-100 w-full p-1">
              <Rating value={productRating} readOnly /> (
              {product.reviews.length})
            </li>
            <li className="bg-slate-200 w-full p-1">{product.brand}</li>
            <li className="bg-slate-100 w-full p-1">{product.category}</li>
            <Button variant={"ghost"} className="pl-0">
              in Your Cart
            </Button>
          </ul>
        </Link>
        {similarProducts.map((product) => {
          const rating =
            product.reviews &&
            product.reviews.reduce(
              (acc: any, item: any) => acc + item.rating,
              0
            ) / product.reviews.length;
          const isInCart = cartProducts?.find(
            (cartProduct) => cartProduct.productId === product.id
          );
          return (
            <div key={product.id}>
              <Link
                href={`/product/${product.id}`}
                className="flex flex-col items-start gap-2 z-10 mb-3"
              >
                <Image
                  src={product.images[0].image}
                  alt={product.name}
                  width={200}
                  height={100}
                  className="max-h-[150px]"
                />
                <h1 className="text-lg font-medium text-slate-700">
                  {product.name}
                </h1>
                <ul className="flex flex-col items-start gap-2 w-full">
                  <li className="bg-slate-200 w-full p-1">
                    {formatPrice(product.price)}
                  </li>
                  <li className="flex items-center gap-x-1 bg-slate-100 w-full p-1">
                    <Rating value={rating} readOnly /> ({product.reviews.length}
                    )
                  </li>
                  <li className="bg-slate-200 w-full p-1">{product.brand}</li>
                  <li className="bg-slate-100 w-full p-1">
                    {product.category}
                  </li>
                </ul>
              </Link>
              {isInCart ? (
                <Button variant={"ghost"} className="pl-0">
                  in Your Cart
                </Button>
              ) : (
                <Button
                  variant={"amazonBtn"}
                  className="w-full z-50"
                  size={"sm"}
                  onClick={() => onClick(product)}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProductsDetails;
