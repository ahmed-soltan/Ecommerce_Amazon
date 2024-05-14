"use client";
import { Separator } from "@/components/ui/separator";
import ProductTitleEdit from "./ProductTitleEdit";
import ProductDescriptionEdit from "./ProductDescriptionEdit";
import ProductBrandEdit from "./ProductBrandEdit";
import ProductCategoryEdit from "./ProductCategoryEdit";
import ProductDiscountEdit from "./ProductDiscountEdit";
import ProductPriceEdit from "./ProductPriceEdit";
import ProductImagesEdit from "./ProductImagesEdit";
import ProductAvailabiltyEdit from "./ProductAvailabiltyEdit";
import ProductSizesEdit from "./ProductSizesEdit";
import Banner from "@/components/banner";
import ProductDetailsEdit from "./ProductDetailsEdit";
import ConfirmModel from "@/components/ConfirmModel";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Products, Review } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Minus, MinusCircle, Trash } from "lucide-react";
import Link from "next/link";

type ProductContainerProps = {
  vendorId: string;
  productId: string;
  product: Products & {
    reviews: Review[];
    images: {
      image: string;
      color: string;
      colorCode: string;
    }[];
  };
};
const ProductContainer = ({
  vendorId,
  productId,
  product,
}: ProductContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/vendors/${vendorId}/products/${productId}`);
      router.push(`/vendor/${vendorId}/manage-products`);
      toast.success("Product Deleted Successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {!product.inStock && (
        <Banner
          variant={"warning"}
          label="This Product is not in Stock. It will not be Visible to your Customer"
        />
      )}
      <div className="p-6 flex flex-wrap flex-col items-start gap-4">
        <Link href={`/vendor/${vendorId}/manage-products`}>
          <Button variant={"link"} className="pl-0"> <ArrowLeft className="w-4 h-4 mr-2"/> View Other Products</Button>
        </Link>
        <div className="flex items-start justify-between w-full flex-wrap gap-3">
          <h1 className="text-slate-800 font-medium text-3xl">
            Product Details
          </h1>
          <ConfirmModel onConfirm={onDelete}>
            <Button variant={"destructive"} size={"sm"} disabled={isLoading}>
              <p className="hidden sm:flex items-center">
                {" "}
                <MinusCircle className="w-4 h-4 mr-2" />
                Delete Product
              </p>
              <Trash className="w-4 h-4 block sm:hidden" />
            </Button>
          </ConfirmModel>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-4 w-full">
          <ProductTitleEdit
            product={product}
            productId={productId}
            vendorId={vendorId}
          />
          <ProductPriceEdit
            product={product}
            productId={productId}
            vendorId={vendorId}
          />
        </div>
        <ProductDescriptionEdit
          product={product}
          productId={productId}
          vendorId={vendorId}
        />
        <ProductDetailsEdit
          product={product}
          productId={productId}
          vendorId={vendorId}
        />
        <div className="flex flex-wrap items-center gap-4 w-full">
          <ProductAvailabiltyEdit
            product={product}
            productId={productId}
            vendorId={vendorId}
          />
          <ProductBrandEdit
            product={product}
            productId={productId}
            vendorId={vendorId}
          />
          <ProductDiscountEdit
            product={product}
            productId={productId}
            vendorId={vendorId}
          />
        </div>
        <ProductCategoryEdit
          product={product}
          productId={productId}
          vendorId={vendorId}
        />
        {product.category !== "Clothes" &&
        product.category !== "Shoes" ? null : (
          <ProductSizesEdit
            product={product}
            productId={productId}
            vendorId={vendorId}
          />
        )}

        <ProductImagesEdit
          product={product}
          productId={productId}
          vendorId={vendorId}
        />
      </div>
    </>
  );
};

export default ProductContainer;
