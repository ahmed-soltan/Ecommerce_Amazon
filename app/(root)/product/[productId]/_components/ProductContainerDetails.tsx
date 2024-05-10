"use client";
import { Products, Profile, Review, User } from "@prisma/client";
import { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import { Button } from "@/components/ui/button";
import SetColor from "./SetColor";
import SetSizes from "./SetSize";
import SetQuantity from "./SetQuantity";
import { formatPrice } from "@/lib/formatPrice";
import { Rating } from "@mui/material";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { useWishlist } from "@/hooks/useWishList";
import { shortenTitle } from "@/Utils/stringCut";
import { useBrowsingHistory } from "@/hooks/useBrowsingHistory";

type ProductContainerDetailsProps = {
  product: Products & {
    reviews: Review[] | null;
    images: {
      image: string;
      color: string;
      colorCode: string;
    }[];
  };
  user: User & {
    profile: Profile[];
  };
};

export type cartProductType = {
  productId: string;
  name: string;
  quantity: number;
  selectedImage: {
    image: string;
    color: string;
    colorCode: string;
  };
  category: string;
  vendorId: string;
  priceAfterDiscount: number;
  sizes: string[];
};

const ProductContainerDetails = ({
  product,
  user,
}: ProductContainerDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {handleAddToCartProduct , cartProducts} = useCart()
  const {handleAddToBrowsingHistory} = useBrowsingHistory()
  const {handleAddToWishList} = useWishlist()
  const [cartProduct, setcartProduct] = useState<cartProductType>({
    productId: product.id,
    name: product.name,
    selectedImage: { ...product.images[0] },
    quantity: 1,
    category: product.category,
    vendorId: product.vendorId,
    priceAfterDiscount:
      product.price - (product.price * (product?.discount || 0 * 100)) / 100,
    sizes: [],
  });

  useEffect(()=>{
    handleAddToBrowsingHistory(product)
  },[product])



  const productRating =
    product.reviews &&
    product.reviews.reduce((acc: any, item: any) => acc + item.rating, 0) /
      product.reviews.length;

  const handleColor = (image: {
    color: string;
    image: string;
    colorCode: string;
  }) => {
    setcartProduct((prev) => {
      return { ...prev, selectedImage: image };
    });
  };

  
  const handleSelectSizes = (size: string) => {
    setcartProduct((prev: cartProductType) => {
      const index = prev?.sizes?.indexOf(size);

      if (index !== -1) {
        const updatedSizes = prev?.sizes?.filter((s) => s !== size);
        return { ...prev, sizes: updatedSizes };
      } else {
        const updatedSizes = [...(prev?.sizes || []), size];
        return { ...prev, sizes: updatedSizes };
      }
    });
  };

  const AddToCart = (product:cartProductType)=>{
    handleAddToCartProduct(product);
    toast.success(`${shortenTitle(product.name , 20)} Added To Cart`)
  }
  const AddToWishlist = (product:Products)=>{
    handleAddToWishList(product);
    toast.success(`${shortenTitle(product.name , 20)} Added To WishList`)
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColor}
        />
        <div className="flex flex-col gap-3 items-start">
          <h2 className="text-slate-700 text-3xl font-medium">
            {product?.name}
          </h2>
          <div className="gap-2 flex items-center">
            <Rating value={productRating} readOnly />
            <div>
              <span className="text-slate-700 font-medium">
                ({(product.reviews && product.reviews.length) || 0}) reviews
              </span>
            </div>
          </div>
          <div className="text-justify flex items-center gap-2">
            <span className="font-medium text-lg text-slate-800">Price : </span>
            {product.discount && product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <h1 className="text-slate-700 font-bold text-lg">
                  {formatPrice(
                    product.price -
                      (product.price * (product?.discount || 0 * 100)) / 100
                  )}
                </h1>
                <del className="text-rose-400 line-through">
                  {formatPrice(product.price)}
                </del>
              </div>
            ) : (
              formatPrice(product.price)
            )}
          </div>
          {product.discount && product.discount > 0 ? (
            <div className="text-justify flex items-center gap-2">
              <span className="font-medium text-lg text-slate-800">
                Discount :{" "}
              </span>
              <div className="flex items-center gap-2">
                <h1 className="bg-rose-600 font-bold text-xl p-2 text-white">
                  {product.discount}% OFF
                </h1>
              </div>
            </div>
          ):null}
          <div className="text-slate-700">
            <span className="font-medium text-lg text-slate-800">
              CATEGORY :{" "}
            </span>
            {product.category}
          </div>
          <div className="text-slate-700">
            <span className="font-medium text-lg text-slate-800 ">
              BRAND :{" "}
            </span>
            {product.brand}
          </div>
          <SetColor
            images={product.images}
            cartProduct={cartProduct}
            handleColorSelect={handleColor}
          />
          {product.category === "Clothes" && (
            <SetSizes
              cartProduct={cartProduct}
              handleSelectSizes={handleSelectSizes}
              sizes={product.sizes}
            />
          )}
          {user.role === "VENDOR" ? null : (
            <>
              <SetQuantity
                isLoading={isLoading}
                cartCounter={cartProduct.quantity}
                cartProduct={cartProduct}
                handleQuantityIncrease={() => {
                  if (cartProduct.quantity === 99) {
                    return;
                  }
                  setcartProduct((prev) => {
                    return {
                      ...prev,
                      quantity: prev.quantity + 1,
                    };
                  });
                }}
                handleQuantityDecrease={() => {
                  if (cartProduct.quantity < 2) {
                    return;
                  }
                  setcartProduct((prev) => {
                    return {
                      ...prev,
                      quantity: prev.quantity - 1,
                    };
                  });
                }}
              />
              <div className="max-w-[300px] flex gap-3 items-center">
                <Button
                  disabled={
                    cartProduct.quantity === 0 ||
                    isLoading ||
                    (cartProduct?.category === "Clothes" &&
                      cartProduct?.sizes?.length === 0)
                      ||!user
                  }
                  variant={"amazonBtn"}
                  onClick={() => AddToCart(cartProduct)}
                >
                  Add To Cart
                </Button>
                <Button disabled={isLoading} onClick={()=>AddToWishlist(product)}>Add To WishList</Button>
                {!user && <p className="text-rose-400">Login First</p>}
              </div>
            </>
          )}
        </div>
      </div>
      <Separator className="h-[1px] bg-slate-600" />

      <div>
        <h2 className="text-slate-800 text-2xl font-semibold p-2">
          Product Details
        </h2>
        <Preview value={product.details} />
      </div>
      <Separator className="h-[1px] bg-slate-600" />
      <div>
        <h2 className="text-slate-800 text-2xl font-semibold p-2 my-2">
          Products Description
        </h2>
        <p className="text-slate-600 text-sm">{product.description}</p>
      </div>
      <Separator className="h-[1px] bg-slate-600" />
    </div>
  );
};

export default ProductContainerDetails;
